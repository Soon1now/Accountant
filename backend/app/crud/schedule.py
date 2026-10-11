import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.models import ScheduleEvent
from app.schemas import ScheduleEventCreate, ScheduleEventUpdate

async def get_schedule_events_by_user(db: AsyncSession, user_id: uuid.UUID) -> list[ScheduleEvent]:
    result = await db.execute(
        select(ScheduleEvent).where(ScheduleEvent.user_id == user_id)
    )
    return list(result.scalars().all())

async def get_schedule_event_by_id(db: AsyncSession, event_id: uuid.UUID, user_id: uuid.UUID) -> ScheduleEvent | None:
    result = await db.execute(
        select(ScheduleEvent).where(ScheduleEvent.id == event_id, ScheduleEvent.user_id == user_id)
    )
    return result.scalar_one_or_none()

async def create_schedule_event(db: AsyncSession, event_in: ScheduleEventCreate, user_id: uuid.UUID) -> ScheduleEvent:
    db_obj = ScheduleEvent(**event_in.model_dump(), user_id=user_id)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_schedule_event(db: AsyncSession, db_event: ScheduleEvent, event_in: ScheduleEventUpdate) -> ScheduleEvent:
    update_data = event_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_event, field, value)
    db.add(db_event)
    await db.commit()
    await db.refresh(db_event)
    return db_event

async def delete_schedule_event(db: AsyncSession, db_event: ScheduleEvent) -> None:
    await db.delete(db_event)
    await db.commit()