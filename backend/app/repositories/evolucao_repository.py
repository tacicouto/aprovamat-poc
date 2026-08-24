from sqlalchemy.orm import Session

from app.models.questao import Questao
from app.models.resposta import Resposta


class EvolucaoRepository:

    @staticmethod
    def listar_respostas_usuario(
        db: Session,
        usuario_id: int
    ):
        return (
            db.query(
                Resposta,
                Questao
            )
            .join(
                Questao,
                Resposta.questao_id == Questao.id
            )
            .filter(
                Resposta.usuario_id == usuario_id
            )
            .all()
        )