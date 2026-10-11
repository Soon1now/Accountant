import uuid
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Service 
from app.schemas import ServiceCreate, ServiceUpdate

async def create_service(
    db: AsyncSession,  user_id: uuid.UUID, service_in: ServiceCreate
) -> Service:
    db_service = Service(**service_in.model_dump(), user_id=user_id)
    db.add(db_service)
    await db.commit()
    await db.refresh(db_service)
    return db_service


async def get_services_by_user(
    db: AsyncSession, user_id: uuid.UUID
) -> Sequence[Service]:
    stmt = select(Service).where(Service.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_service_by_id(
    db: AsyncSession,user_id: uuid.UUID,service_id: uuid.UUID
) -> Service | None:
    stmt = select(Service).where(
        Service.id == service_id, Service.user_id == user_id
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def update_service(
    db: AsyncSession, db_service: Service, service_in: ServiceUpdate
) -> Service:
    update_data = service_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_service, field, value)

    await db.commit()
    await db.refresh(db_service)
    return db_service


async def delete_service(db: AsyncSession, db_service: Service) -> None:
    await db.delete(db_service)
    await db.commit()