from sqlalchemy.orm import Session

from app.models.questao import Questao


class QuestaoRepository:

    @staticmethod
    def listar(db: Session):
        return (
            db.query(Questao)
            .order_by(Questao.id)
            .all()
        )

    @staticmethod
    def buscar_por_id(
        db: Session,
        questao_id: int
    ):
        return (
            db.query(Questao)
            .filter(Questao.id == questao_id)
            .first()
        )

    @staticmethod
    def criar(
        db: Session,
        dados
    ):
        questao = Questao(
            assunto=dados.assunto,
            enunciado=dados.enunciado,
            alternativa_a=dados.alternativa_a,
            alternativa_b=dados.alternativa_b,
            alternativa_c=dados.alternativa_c,
            alternativa_d=dados.alternativa_d,
            correta=dados.correta
        )

        db.add(questao)
        db.commit()
        db.refresh(questao)

        return questao

    @staticmethod
    def atualizar(
        db: Session,
        questao_id: int,
        dados
    ):
        questao = (
            db.query(Questao)
            .filter(Questao.id == questao_id)
            .first()
        )

        if not questao:
            return None

        questao.assunto = dados.assunto
        questao.enunciado = dados.enunciado
        questao.alternativa_a = dados.alternativa_a
        questao.alternativa_b = dados.alternativa_b
        questao.alternativa_c = dados.alternativa_c
        questao.alternativa_d = dados.alternativa_d
        questao.correta = dados.correta

        db.commit()
        db.refresh(questao)

        return questao

    @staticmethod
    def excluir(
        db: Session,
        questao_id: int
    ):
        questao = (
            db.query(Questao)
            .filter(Questao.id == questao_id)
            .first()
        )

        if not questao:
            return False

        db.delete(questao)
        db.commit()

        return True