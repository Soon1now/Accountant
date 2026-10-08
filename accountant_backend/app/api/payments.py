from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
import uuid
from app.schemas import P, PaymentResponse
from app.core.database import get_db
from app.crud import payment as crud_payment
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/payments", tags=["Payments"])

async def get_current_user_id() -> uuid.UUID:
    return uuid.UUID("3b54b92a-a5af-4d47-9c77-f7a2eddb9d42")

@router.get('/', response_model=List[PaymentResponse])
async def read_payments(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return await crud_payment.get_payments_by_user(db=db, user_id=user_id)

@router.post('/', response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def create_payment(
    payment_in: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    return await crud_payment.create_payment(db=db, payment_in=payment_in, user_id=user_id)

@router.get('/{payment_id}', response_model=PaymentResponse)
async def read_payment(
    payment_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    payment = await crud_payment.get_payment_by_id(db=db, payment_id=payment_id, user_id=user_id) 

    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment