import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { deleteCard } from "../feachers/card/cardSlice";
import EditForm from "./EditForm";
import { Spinner } from "react-bootstrap";

const CardInfo = ({ singleCard, isLoading }) => {
  const [editing, setEditing] = React.useState(false);
  const { bank, cardName, creditLine, balance, cardId } = singleCard;
  const dispatch = useDispatch();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <h2>SingleCard</h2>
      <h3>{`${bank}: ${cardName}`}</h3>
      <p>{`Credit Line: ${creditLine}`}</p>
      <p>{`Balance: ${balance}`}</p>

      <button type="button" onClick={() => dispatch(deleteCard(cardId))}>
        Delete
      </button>
      <button type="button" onClick={() => setEditing(!editing)}>
        Edit
      </button>
      {editing && (
        <EditForm
          cardId={cardId}
          setEditing={setEditing}
          singleCard={singleCard}
        />
      )}
    </div>
  );
};

export default CardInfo;
