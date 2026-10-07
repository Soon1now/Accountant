from fastapi import APIRouter, Depends
from typing import List
import uuid
from app.schemas import ServiceCreate, ServiceResponse, ServiceUpdate
from app.core.database import get_db
from app.crud import service as crud_service
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/services", tags=["Services"])

async def get_current_user_id() -> uuid.UUID:
    return uuid.UUID("3b54b92a-a5af-4d47-9c77-f7a2eddb9d42")

@router.get('/', response_model=List[ServiceResponse])
async def read_services(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return  await crud_service.get_services_by_user(db=db, user_id=user_id)