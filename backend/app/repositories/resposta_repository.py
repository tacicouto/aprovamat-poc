from sqlalchemy.orm import Session

from app.models.resposta import Resposta


class RespostaRepository:

    @staticmethod
    def criar(
        db: Session,
        usuario_id: int,
        questao_id: int,
        acertou: bool
    ) -> Resposta:

        resposta = Resposta(
            usuario_id=usuario_id,
            questao_id=questao_id,
            acertou=acertou
        )

        db.add(resposta)
        db.commit()
        db.refresh(resposta)

        return resposta


    @staticmethod
    def listar_por_usuario(
        db: Session,
        usuario_id: int
    ):

        return (
            db.query(Resposta)
            .filter(Resposta.usuario_id == usuario_id)
            .all()
        )
