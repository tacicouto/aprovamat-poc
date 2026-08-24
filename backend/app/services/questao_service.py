from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.questao_repository import QuestaoRepository


class QuestaoService:

    @staticmethod
    def listar_diagnostico(db: Session):

        questoes = QuestaoRepository.listar(db)

        resultado = []

        for questao in questoes:

            resultado.append(
                {
                    "id": questao.id,
                    "assunto": questao.assunto,
                    "enunciado": questao.enunciado,
                    "alternativas": [
                        questao.alternativa_a,
                        questao.alternativa_b,
                        questao.alternativa_c,
                        questao.alternativa_d
                    ]
                }
            )

        return {
            "questoes": resultado
        }

    @staticmethod
    def listar(db: Session):
        return QuestaoRepository.listar(db)

    @staticmethod
    def criar(
        db: Session,
        dados
    ):
        return QuestaoRepository.criar(
            db,
            dados
        )

    @staticmethod
    def atualizar(
        db: Session,
        questao_id: int,
        dados
    ):
        questao = QuestaoRepository.atualizar(
            db,
            questao_id,
            dados
        )

        if not questao:
            raise HTTPException(
                status_code=404,
                detail="Questão não encontrada"
            )

        return questao

    @staticmethod
    def excluir(
        db: Session,
        questao_id: int
    ):
        excluiu = QuestaoRepository.excluir(
            db,
            questao_id
        )

        if not excluiu:
            raise HTTPException(
                status_code=404,
                detail="Questão não encontrada"
            )

        return {
            "mensagem": "Questão excluída com sucesso"
        }

    @staticmethod
    def buscar_por_id(
        db: Session,
        questao_id: int
    ):

        questao = QuestaoRepository.buscar_por_id(
            db,
            questao_id
        )

        if not questao:
            raise HTTPException(
                status_code=404,
                detail="Questão não encontrada"
            )

        return questao