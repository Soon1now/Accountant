import uuid
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from accountant_backend.app.models import Client
from accountant_backend.app.schemas import ClientCreate, ClientUpdate


async def create_client(db: AsyncSession, client_in: ClientCreate, user_id: uuid.UUID) -> Client:
    db_client = Client(**client_in.model_dump(), user_id=user_id)
    db.add(db_client)
    await db.commit()
    await db.refresh(db_client)
    return db_client


async def get_clients_by_user(db: AsyncSession, user_id: uuid.UUID) -> Sequence[Client]:
    stmt = select(Client).where(Client.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_client_by_id(db: AsyncSession, client_id: uuid.UUID, user_id: uuid.UUID) -> Client | None:
    stmt = select(Client).where(Client.id == client_id, Client.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def update_client(db: AsyncSession, db_client: Client, client_in: ClientUpdate) -> Client:
    update_data = client_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_client, field, value)
    await db.commit()
    await db.refresh(db_client)
    return db_client


async def delete_client(db: AsyncSession, db_client: Client) -> None:
    await db.delete(db_client)
    await db.commit()