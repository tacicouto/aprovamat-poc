from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.resposta_repository import RespostaRepository
from app.repositories.questao_repository import QuestaoRepository
from app.schemas.resposta import RespostaCreate


class RespostaService:

    @staticmethod
    def responder(
        db: Session,
        dados: RespostaCreate
    ):

        questao = QuestaoRepository.buscar_por_id(
            db,
            dados.questaoId
        )

        if not questao:
            raise HTTPException(
                status_code=404,
                detail="Questão não encontrada"
            )

        acertou = (
            dados.alternativaEscolhida.strip()
            == questao.correta.strip()
        )

        RespostaRepository.criar(
            db=db,
            usuario_id=dados.usuarioId,
            questao_id=dados.questaoId,
            acertou=acertou
        )

        return {
            "correta": acertou,
            "alternativaCorreta": questao.correta,
            "explicacao": None
        }
