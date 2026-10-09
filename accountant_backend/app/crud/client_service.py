import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import ClientService, Client, BillingPlan
from app.schemas import ClientServiceCreate, ClientServiceUpdate

async def get_client_services_by_user(db: AsyncSession, user_id: uuid.UUID) -> list[ClientService]:

    result = await db.execute(
        select(ClientService)
        .join(Client, ClientService.client_id == Client.id)
        .where(Client.user_id == user_id)
    )
    return list(result.scalars().all())

async def get_client_service_by_id(db: AsyncSession, link_id: uuid.UUID, user_id: uuid.UUID) -> ClientService | None:
    result = await db.execute(
        select(ClientService)
        .join(Client, ClientService.client_id == Client.id)
        .where(ClientService.id == link_id, Client.user_id == user_id)
    )
    return result.scalar_one_or_none()

async def create_client_service(db: AsyncSession, link_in: ClientServiceCreate, user_id: uuid.UUID) -> ClientService:

    db_obj = ClientService(**link_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_client_service(db: AsyncSession, db_link: ClientService, link_in: ClientServiceUpdate) -> ClientService:
    update_data = link_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_link, field, value)
    db.add(db_link)
    await db.commit()
    await db.refresh(db_link)
    return db_link

async def delete_client_service(db: AsyncSession, db_link: ClientService) -> None:
    await db.delete(db_link)
    await db.commit()