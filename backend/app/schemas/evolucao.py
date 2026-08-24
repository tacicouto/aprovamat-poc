from pydantic import BaseModel


class DesempenhoAssunto(BaseModel):
    assunto: str
    respondidas: int
    acertos: int
    erros: int
    percentual: float


class EvolucaoUsuario(BaseModel):
    usuarioId: int
    totalRespondidas: int
    totalAcertos: int
    totalErros: int
    percentualAcertos: float
    desempenhoPorAssunto: list[DesempenhoAssunto]