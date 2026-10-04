import uuid
from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Пароль минимум 8 символов")


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime


class ServiceBase(BaseModel):
    name: str = Field(..., max_length=150)
    description: Optional[str] = None
    color: str = Field(default="#000000", max_length=7)
    is_active: bool = True


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    color: Optional[str] = None
    is_active: Optional[bool] = None


class ServiceResponse(ServiceBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime


class PriceType(str, Enum):
    FIXED = "fixed"
    HOURLY = "hourly"


class BillingPeriod(str, Enum):
    MONTHLY = "monthly"
    WEEKLY = "weekly"
    CUSTOM = "custom"


class BillingPlanBase(BaseModel):
    name: str = Field(..., max_length=100)
    price_type: PriceType
    price: Decimal = Field(..., max_digits=10, decimal_places=2, ge=0)
    billing_period: BillingPeriod
    billing_day: Optional[int] = Field(None, ge=1, le=31)
    custom_period_days: Optional[int] = Field(None, ge=1)
    is_active: bool = True


class BillingPlanCreate(BillingPlanBase):
    service_id: uuid.UUID


class BillingPlanUpdate(BaseModel):
    name: Optional[str] = None
    price_type: Optional[PriceType] = None
    price: Optional[Decimal] = None
    billing_period: Optional[BillingPeriod] = None
    billing_day: Optional[int] = None
    custom_period_days: Optional[int] = None
    is_active: Optional[bool] = None


class BillingPlanResponse(BillingPlanBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    service_id: int

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[uuid.UUID] = None