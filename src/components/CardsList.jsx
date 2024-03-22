import React from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearValues } from "../feachers/card/cardSlice";

const CardsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cards, isLoading } = useSelector((store) => store.card);
  if (isLoading) return <Spinner />;
  return (
    <div>
      {cards.map((card, i) => {
        return (
          <button
            key={i}
            type="button"
            className="member-btn"
            onClick={() => {
              dispatch(clearValues());
              navigate(`/card/${card.cardId ? card.cardId : card.id}/info`);
            }}
          >
            {card.cardName}{" "}
          </button>
        );
      })}
    </div>
  );
};

export default CardsList;
