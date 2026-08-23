from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.resposta import (
    RespostaCreate,
    RespostaFeedback
)
from app.services.resposta_service import RespostaService


router = APIRouter(
    prefix="/diagnostico",
    tags=["Diagnóstico"]
)


@router.post(
    "/responder",
    response_model=RespostaFeedback
)
def responder_questao(
    dados: RespostaCreate,
    db: Session = Depends(get_db)
):

    return RespostaService.responder(
        db,
        dados
    )
