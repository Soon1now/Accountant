from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
import uuid
from app.schemas import ScheduleEventCreate, ScheduleEventUpdate, ScheduleEventResponse
from app.core.database import get_db
from app.crud import schedule as crud_schedule
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.dependencies import get_current_user_id

router = APIRouter(prefix="/schedule", tags=["Schedule"])

@router.get('/', response_model=List[ScheduleEventResponse])
async def read_schedule_events(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return await crud_schedule.get_schedule_events_by_user(db=db, user_id=user_id)

@router.post('/', response_model=ScheduleEventResponse, status_code=status.HTTP_201_CREATED)
async def create_schedule_event(
    event_in: ScheduleEventCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    return await crud_schedule.create_schedule_event(db=db, event_in=event_in, user_id=user_id)

@router.get('/{event_id}', response_model=ScheduleEventResponse)
async def read_schedule_event(
    event_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    event = await crud_schedule.get_schedule_event_by_id(db=db, event_id=event_id, user_id=user_id) 
    if not event:
        raise HTTPException(status_code=404, detail="Schedule event not found")
    return event

@router.patch('/{event_id}', response_model=ScheduleEventResponse)
async def update_schedule_event(
    event_id: uuid.UUID,
    event_in: ScheduleEventUpdate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    event = await crud_schedule.get_schedule_event_by_id(db=db, event_id=event_id, user_id=user_id) 
    if not event:
        raise HTTPException(status_code=404, detail="Schedule event not found")
    return await crud_schedule.update_schedule_event(db=db, db_event=event, event_in=event_in)

@router.delete('/{event_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_schedule_event(
    event_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    event = await crud_schedule.get_schedule_event_by_id(db=db, event_id=event_id, user_id=user_id) 
    if not event:
        raise HTTPException(status_code=404, detail="Schedule event not found")
    return await crud_schedule.delete_schedule_event(db=db, db_event=event)