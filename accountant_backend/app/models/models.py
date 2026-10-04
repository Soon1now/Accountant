import datetime
import enum
import uuid
from typing import List, Optional
from decimal import Decimal

from sqlalchemy import String, ForeignKey, DateTime, Numeric, Integer, Text, func, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PriceType(str, enum.Enum):
    FIXED = "fixed"
    FLEXIBLE = "flexible"


class BillingPeriod(str, enum.Enum):
    PER_LESSON = "per_lesson"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    CUSTOM_DAYS = "custom_days"


class PaymentStatus(str, enum.Enum):
    COMPLETED = "completed"
    PENDING = "pending"
    CANCELED = "canceled"


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    clients: Mapped[List["Client"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    services: Mapped[List["Service"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    phone: Mapped[Optional[str]] = mapped_column(String(20), default=None)
    telegram_username: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    notes: Mapped[Optional[str]] = mapped_column(Text, default=None)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    user: Mapped["User"] = relationship(back_populates="clients")
    payments: Mapped[List["Payment"]] = relationship(back_populates="client")


class Service(Base):
    __tablename__ = "services"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), 
        ForeignKey("users.id", ondelete="CASCADE"), 
        nullable=False,
        index=True
    )
    
    name: Mapped[str] = mapped_column(String(150))
    description: Mapped[Optional[str]] = mapped_column(Text, default=None)
    color: Mapped[str] = mapped_column(String(7), default="#3B82F6")
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    user: Mapped["User"] = relationship(back_populates="services")
    billing_plans: Mapped[List["BillingPlan"]] = relationship(back_populates="service", cascade="all, delete-orphan")


class BillingPlan(Base):
    __tablename__ = "billing_plans"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    service_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), 
        ForeignKey("services.id", ondelete="CASCADE"), 
        nullable=False,
        index=True
    )
    
    name: Mapped[str] = mapped_column(String(100), default="Основной тариф")
    price_type: Mapped[PriceType] = mapped_column(default=PriceType.FIXED)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0.00)
    
    billing_period: Mapped[BillingPeriod] = mapped_column(default=BillingPeriod.MONTHLY)
    billing_day: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    custom_period_days: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    
    is_active: Mapped[bool] = mapped_column(default=True)

    service: Mapped["Service"] = relationship(back_populates="billing_plans")


class ClientService(Base):
    """Связь Клиент <-> Тарифный план (была в вашем SQL, добавлена сюда для полноты)"""
    __tablename__ = "client_services"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    client_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("clients.id", ondelete="CASCADE"), index=True)
    billing_plan_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("billing_plans.id", ondelete="CASCADE"), index=True)
    
    custom_price: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), default=None)
    custom_billing_day: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    
    start_date: Mapped[datetime.date] = mapped_column(Date, server_default=func.current_date())
    is_active: Mapped[bool] = mapped_column(default=True)


class ScheduleEvent(Base):
    __tablename__ = "schedule_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    client_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("clients.id", ondelete="CASCADE"), index=True)
    service_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("services.id", ondelete="SET NULL"), index=True)
    
    start_time: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True))
    end_time: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True))
    is_completed: Mapped[bool] = mapped_column(default=False)
    price_at_event: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    notes: Mapped[Optional[str]] = mapped_column(Text, default=None)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    client_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("clients.id", ondelete="CASCADE"), index=True)
    service_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("services.id", ondelete="SET NULL"), index=True)
    
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    payment_date: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    status: Mapped[PaymentStatus] = mapped_column(default=PaymentStatus.COMPLETED)
    period_label: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    notes: Mapped[Optional[str]] = mapped_column(Text, default=None)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    client: Mapped["Client"] = relationship(back_populates="payments")