from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
import uuid
from app.schemas import ServiceCreate, ServiceResponse, ServiceUpdate
from app.core.database import get_db
from app.crud import service as crud_service
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.dependencies import get_current_user_id

router = APIRouter(prefix="/services", tags=["Services"])

@router.get('/', response_model=List[ServiceResponse])
async def read_services(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return await crud_service.get_services_by_user(db=db, user_id=user_id)

@router.post('/', response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_service(
    service_in: ServiceCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
    
):
    return await crud_service.create_service(db=db, user_id=user_id, service_in=service_in)

@router.get('/{service_id}', response_model=ServiceResponse)
async def read_service(
    service_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    service = await crud_service.get_service_by_id(db=db, user_id=user_id, service_id=service_id) 

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.patch('/{service_id}', response_model=ServiceResponse, status_code=status.HTTP_200_OK)
async def update_service(
    service_id: uuid.UUID,
    service_in: ServiceUpdate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    service = await crud_service.get_service_by_id(db=db, user_id=user_id, service_id=service_id) 

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return await crud_service.update_service(db=db, db_service=service, service_in=service_in)


@router.delete('/{service_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(
    service_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    service = await crud_service.get_service_by_id(db=db, user_id=user_id, service_id=service_id) 

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return await crud_service.delete_service(db=db, db_service=service)
