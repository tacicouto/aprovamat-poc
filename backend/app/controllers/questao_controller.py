from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.questao_service import QuestaoService
from app.schemas.questao import (
    QuestaoBanco,
    QuestaoCriar,
    QuestaoAtualizar
)


router = APIRouter(
    tags=["Questões"]
)


@router.get("/diagnostico")
def listar_diagnostico(
    db: Session = Depends(get_db)
):
    return QuestaoService.listar_diagnostico(db)


@router.get(
    "/questoes",
    response_model=list[QuestaoBanco]
)
def listar_questoes(
    db: Session = Depends(get_db)
):
    return QuestaoService.listar(db)


@router.post(
    "/questoes",
    response_model=QuestaoBanco,
    status_code=201
)
def criar_questao(
    dados: QuestaoCriar,
    db: Session = Depends(get_db)
):
    return QuestaoService.criar(
        db,
        dados
    )


@router.get(
    "/questoes/{questao_id}",
    response_model=QuestaoBanco
)
def buscar_questao(
    questao_id: int,
    db: Session = Depends(get_db)
):
    return QuestaoService.buscar_por_id(
        db,
        questao_id
    )


@router.put(
    "/questoes/{questao_id}",
    response_model=QuestaoBanco
)
def atualizar_questao(
    questao_id: int,
    dados: QuestaoAtualizar,
    db: Session = Depends(get_db)
):
    return QuestaoService.atualizar(
        db,
        questao_id,
        dados
    )


@router.delete(
    "/questoes/{questao_id}"
)
def excluir_questao(
    questao_id: int,
    db: Session = Depends(get_db)
):
    return QuestaoService.excluir(
        db,
        questao_id
    )