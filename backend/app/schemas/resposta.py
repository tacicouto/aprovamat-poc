from pydantic import BaseModel, ConfigDict


class RespostaCreate(BaseModel):
    usuarioId: int
    questaoId: int
    alternativaEscolhida: str


class RespostaFeedback(BaseModel):
    correta: bool
    alternativaCorreta: str
    explicacao: str | None = None


class RespostaBanco(BaseModel):
    id: int
    usuario_id: int
    questao_id: int
    acertou: bool

    model_config = ConfigDict(
        from_attributes=True
    )
