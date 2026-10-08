from fastapi import APIRouter, Depends, status, HTTPException
from typing import List
import uuid
from app.schemas import BillingPlanCreate, BillingPlanResponse, BillingPlanUpdate
from app.core.database import get_db
from app.crud import billing_plan as crud_billing_plan
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/billing_plans", tags=["BillingsPlans"])

async def get_current_user_id() -> uuid.UUID:
    return uuid.UUID("3b54b92a-a5af-4d47-9c77-f7a2eddb9d42")

@router.get('/', response_model=List[BillingPlanResponse])
async def read_plans(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    return await crud_billing_plan.get_billing_plans_by_user(db=db, user_id=user_id)

@router.post('/', response_model=BillingPlanResponse, status_code=status.HTTP_201_CREATED)
async def create_plan(
    plan_in: BillingPlanCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
    
):
    return await crud_billing_plan.create_billing_plan(db=db, plan_in=plan_in, user_id=user_id)

@router.get('/{plan_id}', response_model=BillingPlanResponse)
async def read_plan(
    plan_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
): 
    plan = await crud_billing_plan.get_billing_plan_by_id(db=db, plan_id=plan_id, user_id=user_id) 

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return plan

@router.patch('/{plan_id}', response_model=BillingPlanResponse, status_code=status.HTTP_200_OK)
async def update_plan(
    plan_id: uuid.UUID,
    plan_in: BillingPlanUpdate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    plan = await crud_billing_plan.get_billing_plan_by_id(db=db, plan_id=plan_id, user_id=user_id) 

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    return await crud_billing_plan.update_billing_plan(db=db, db_plan=plan, plan_in=plan_in)

@router.delete('/{plan_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_plan(
    plan_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    plan = await crud_billing_plan.get_billing_plan_by_id(db=db, plan_id=plan_id, user_id=user_id) 

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    return await crud_billing_plan.delete_billing_plan(db=db, db_plan=plan)