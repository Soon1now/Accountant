from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
import uuid
from app.schemas import ClientCreate, ClientUpdate, ClientResponse
from app.core.database import get_db
from app.crud import client as crud_client
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/clients", tags=["Clients"])

async def get_current_user_id() -> uuid.UUID:
    return uuid.UUID("3b54b92a-a5af-4d47-9c77-f7a2eddb9d42")

@router.get('/', response_model=List[ClientResponse])
async def read_clients(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return await crud_client.get_clients_by_user(db=db, user_id=user_id)

@router.post('/', response_model=ClientResponse, status_code=status.HTTP_201_CREATED)
async def create_client(
    client_in: ClientCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
    
):
    return await crud_client.create_client(db=db, client_in=client_in, user_id=user_id)

@router.get('/{client_id}', response_model=ClientResponse)
async def read_services(
    client_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    client = await crud_client.get_client_by_id(db=db, client_id=client_id, user_id=user_id) 

    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.patch('/{client_id}', response_model=ClientResponse, status_code=status.HTTP_200_OK)
async def update_service(
    client_id: uuid.UUID,
    client_in: ClientUpdate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    client = await crud_client.get_client_by_id(db=db, client_id=client_id, user_id=user_id) 

    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    return await crud_client.update_client(db=db, db_client=client, client_in=client_in)

@router.delete('/{client_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_client(
    client_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    client = await crud_client.get_client_by_id(db=db, client_id=client_id, user_id=user_id) 

    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    return await crud_client.delete_client(db=db, db_client=client)