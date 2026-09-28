from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title='Accountant App')

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Accountant API is running"}