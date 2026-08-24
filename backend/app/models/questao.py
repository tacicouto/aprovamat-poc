from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Questao(Base):
    __tablename__ = "questoes"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    assunto: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    enunciado: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    alternativa_a: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    alternativa_b: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    alternativa_c: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    alternativa_d: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    correta: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )
