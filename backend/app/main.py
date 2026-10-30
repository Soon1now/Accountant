from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from app.api.services import router as services_router
from app.api.clients import router as clients_router
from app.api.billing_plans import router as billing_plans_router
from app.api.payments import router as payments_router
from app.api.auth import router as auth_router
from app.api.schedule import router as shedule_router
from app.api.client_services import router as client_service_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Accountant App')
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,      
    allow_methods=["*"],    
    allow_headers=["*"],        
)
app.include_router(services_router)
app.include_router(clients_router)
app.include_router(billing_plans_router)
app.include_router(payments_router)
app.include_router(auth_router)
app.include_router(shedule_router)
app.include_router(client_service_router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Accountant API is running"}