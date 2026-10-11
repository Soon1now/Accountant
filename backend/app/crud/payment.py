import uuid
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Payment, Client
from app.schemas import PaymentCreate


async def create_payment(db: AsyncSession, payment_in: PaymentCreate, user_id: uuid.UUID) -> Payment:
    stmt = select(Client).where(Client.id == payment_in.client_id, Client.user_id == user_id)
    result = await db.execute(stmt)
    client = result.scalar_one_or_none()

    if not client:
        raise ValueError("Client not found or access denied")

    db_payment = Payment(**payment_in.model_dump(), user_id=user_id)
    db.add(db_payment)
    await db.commit()
    await db.refresh(db_payment)
    return db_payment


async def get_payments_by_user(db: AsyncSession, user_id: uuid.UUID) -> Sequence[Payment]:
    stmt = select(Payment).where(Payment.user_id == user_id).order_by(Payment.payment_date.desc())
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_payment_by_id(db: AsyncSession, payment_id: uuid.UUID, user_id: uuid.UUID) -> Payment | None:
    stmt = select(Payment).where(Payment.id == payment_id, Payment.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()