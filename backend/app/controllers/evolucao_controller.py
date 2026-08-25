from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.evolucao import EvolucaoUsuario
from app.services.evolucao_service import EvolucaoService


router = APIRouter(
    prefix="/evolucao",
    tags=["Evolução"]
)


@router.get(
    "/{usuario_id}",
    response_model=EvolucaoUsuario
)
def obter_evolucao(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    return EvolucaoService.obter_evolucao(
        db,
        usuario_id
    )
    