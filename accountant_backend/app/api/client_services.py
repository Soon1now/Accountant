from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
import uuid
from app.schemas import ClientServiceCreate, ClientServiceUpdate, ClientServiceResponse
from app.core.database import get_db
from app.crud import client_service as crud_client_service
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.dependencies import get_current_user_id

router = APIRouter(prefix="/client-services", tags=["Client Services"])

@router.get('/', response_model=List[ClientServiceResponse])
async def read_client_services(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return await crud_client_service.get_client_services_by_user(db=db, user_id=user_id)

@router.post('/', response_model=ClientServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_client_service(
    link_in: ClientServiceCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    return await crud_client_service.create_client_service(db=db, link_in=link_in, user_id=user_id)

@router.get('/{link_id}', response_model=ClientServiceResponse)
async def read_client_service(
    link_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    link = await crud_client_service.get_client_service_by_id(db=db, link_id=link_id, user_id=user_id) 
    if not link:
        raise HTTPException(status_code=404, detail="Client service link not found")
    return link

@router.patch('/{link_id}', response_model=ClientServiceResponse)
async def update_client_service(
    link_id: uuid.UUID,
    link_in: ClientServiceUpdate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    link = await crud_client_service.get_client_service_by_id(db=db, link_id=link_id, user_id=user_id) 
    if not link:
        raise HTTPException(status_code=404, detail="Client service link not found")
    return await crud_client_service.update_client_service(db=db, db_link=link, link_in=link_in)

@router.delete('/{link_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_client_service(
    link_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    link = await crud_client_service.get_client_service_by_id(db=db, link_id=link_id, user_id=user_id) 
    if not link:
        raise HTTPException(status_code=404, detail="Client service link not found")
    return await crud_client_service.delete_client_service(db=db, db_link=link)