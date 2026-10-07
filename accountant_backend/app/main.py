from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from app.api.services import router as service_router
app = FastAPI(title='Accountant App')

app.include_router(service_router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Accountant API is running"}