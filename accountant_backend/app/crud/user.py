import uuid
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


from app.models import User 
from app.schemas import UserCreate

async def create_user(
    db: AsyncSession,
    user_in: UserCreate
) -> User:
    db_user = User(**user_in.model_dump(exclude({"password"})), password_hash = user_in.password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def get_user_by_email(
    db: AsyncSession,
    email: str
) -> User | None:
    stmt = select(User).where(User.email == email)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

async def get_user_by_id(
    db: AsyncSession,
    user_id: uuid.UUID
) -> User | None:
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()