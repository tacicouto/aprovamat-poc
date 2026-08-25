from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.usuario import Usuario


class Resposta(Base):
    __tablename__ = "respostas"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id"),
        nullable=False
    )

    questao_id: Mapped[int] = mapped_column(
        ForeignKey("questoes.id"),
        nullable=False
    )

    acertou: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False
    )

    data_resposta: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.now
    )