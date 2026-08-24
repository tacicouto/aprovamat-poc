from sqlalchemy.orm import Session

from app.repositories.evolucao_repository import EvolucaoRepository


class EvolucaoService:

    @staticmethod
    def obter_evolucao(
        db: Session,
        usuario_id: int
    ):

        registros = EvolucaoRepository.listar_respostas_usuario(
            db,
            usuario_id
        )

        total_respondidas = len(registros)

        total_acertos = sum(
            1
            for resposta, questao in registros
            if resposta.acertou
        )

        total_erros = total_respondidas - total_acertos

        percentual_acertos = (
            (total_acertos / total_respondidas) * 100
            if total_respondidas > 0
            else 0
        )

        assuntos = {}

        for resposta, questao in registros:

            assunto = questao.assunto

            if assunto not in assuntos:
                assuntos[assunto] = {
                    "respondidas": 0,
                    "acertos": 0
                }

            assuntos[assunto]["respondidas"] += 1

            if resposta.acertou:
                assuntos[assunto]["acertos"] += 1

        desempenho = []

        for assunto, dados in assuntos.items():

            respondidas = dados["respondidas"]
            acertos = dados["acertos"]
            erros = respondidas - acertos

            percentual = (
                (acertos / respondidas) * 100
                if respondidas > 0
                else 0
            )

            desempenho.append(
                {
                    "assunto": assunto,
                    "respondidas": respondidas,
                    "acertos": acertos,
                    "erros": erros,
                    "percentual": round(percentual, 2)
                }
            )

        return {
            "usuarioId": usuario_id,
            "totalRespondidas": total_respondidas,
            "totalAcertos": total_acertos,
            "totalErros": total_erros,
            "percentualAcertos": round(
                percentual_acertos,
                2
            ),
            "desempenhoPorAssunto": desempenho
        }
        