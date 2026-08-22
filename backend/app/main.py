from fastapi import FastAPI


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