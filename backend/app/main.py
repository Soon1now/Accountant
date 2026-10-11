from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from app.api.services import router as services_router
from app.api.clients import router as clients_router
from app.api.billing_plans import router as billing_plans_router
from app.api.payments import router as payments_router
from app.api.auth import router as auth_router
app = FastAPI(title='Accountant App')

app.include_router(services_router)
app.include_router(clients_router)
app.include_router(billing_plans_router)
app.include_router(payments_router)
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Accountant API is running"}