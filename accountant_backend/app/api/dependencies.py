from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
import jwt
import uuid

from app.core.database import get_db
from app.core.config import settings
from app.models import User
from app.crud import user as crud_user

oauth_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def get_current_user_id(
    token: str = Depends(oauth_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

        user_id_str: str = payload.get("sub")

        if user_id_str is None:
            raise credentials_exception
        
        user_id = uuid.UUID(user_id_str)
        
    except (jwt.PyJWTError, ValueError):
        raise credentials_exception
        
    return user_id