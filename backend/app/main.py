from fastapi import FastAPI

from app.controllers.questao_controller import router as questao_router
from app.controllers.resposta_controller import router as resposta_router
from app.controllers.evolucao_controller import router as evolucao_router
from app.controllers.evolucao_controller import router as evolucao_router

app = FastAPI(
    title="AprovaMat API",
    description="Backend da Prova de Conceito do AprovaMat",
    version="1.0.0"
)


@app.get("/")
def inicio():
    return {
        "projeto": "AprovaMat",
        "status": "Backend funcionando"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


app.include_router(questao_router)
app.include_router(resposta_router)
app.include_router(evolucao_router)
app.include_router(evolucao_router)