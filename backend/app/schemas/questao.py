from pydantic import BaseModel, ConfigDict


class QuestaoDiagnostico(BaseModel):
    id: int
    assunto: str
    enunciado: str
    alternativas: list[str]


class QuestaoCriar(BaseModel):
    assunto: str
    enunciado: str
    alternativa_a: str
    alternativa_b: str
    alternativa_c: str
    alternativa_d: str
    correta: str


class QuestaoAtualizar(BaseModel):
    assunto: str
    enunciado: str
    alternativa_a: str
    alternativa_b: str
    alternativa_c: str
    alternativa_d: str
    correta: str


class QuestaoBanco(BaseModel):
    id: int
    assunto: str
    enunciado: str
    alternativa_a: str
    alternativa_b: str
    alternativa_c: str
    alternativa_d: str
    correta: str

    model_config = ConfigDict(
        from_attributes=True
    )