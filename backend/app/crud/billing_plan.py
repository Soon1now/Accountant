import uuid
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import BillingPlan, Service
from app.schemas import BillingPlanCreate, BillingPlanUpdate


async def create_billing_plan(db: AsyncSession, plan_in: BillingPlanCreate, user_id: uuid.UUID) -> BillingPlan:
    stmt = select(Service).where(Service.id == plan_in.service_id, Service.user_id == user_id)
    result = await db.execute(stmt)
    service = result.scalar_one_or_none()

    if not service:
        raise ValueError("Service not found or access denied")

    db_plan = BillingPlan(**plan_in.model_dump())
    db.add(db_plan)
    await db.commit()
    await db.refresh(db_plan)
    return db_plan


async def get_billing_plans_by_user(db: AsyncSession, user_id: uuid.UUID) -> Sequence[BillingPlan]:
    stmt = (
        select(BillingPlan)
        .join(Service, BillingPlan.service_id == Service.id)
        .where(Service.user_id == user_id)
    )
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_billing_plan_by_id(db: AsyncSession, plan_id: uuid.UUID, user_id: uuid.UUID) -> BillingPlan | None:
    stmt = (
        select(BillingPlan)
        .join(Service, BillingPlan.service_id == Service.id)
        .where(BillingPlan.id == plan_id, Service.user_id == user_id)
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def update_billing_plan(db: AsyncSession, db_plan: BillingPlan, plan_in: BillingPlanUpdate) -> BillingPlan:
    update_data = plan_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_plan, field, value)
    await db.commit()
    await db.refresh(db_plan)
    return db_plan


async def delete_billing_plan(db: AsyncSession, db_plan: BillingPlan) -> None:
    await db.delete(db_plan)
    await db.commit()