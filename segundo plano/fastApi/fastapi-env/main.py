from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
app = FastAPI()



class Libro(BaseModel):
    titulo: str
    autor: str
    paginas: int
    editorial: str

#http://127.0.0.1:8000

@app.get("/")
def index():
    return {"message":"Hola, pythonianos"}

@app.get("/libros/{id}")

def mostrar_libro(id:int):
    return{ "data": id}
