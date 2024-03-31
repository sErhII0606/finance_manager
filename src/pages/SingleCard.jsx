import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  clearValues,
  deleteCard,
  getCardById,
} from "../feachers/card/cardSlice";
import { Spinner } from "react-bootstrap";
import CardInfo from "../components/CardInfo";
import NeedleChart from "../components/NeedleChart";
import Wrapper from "../wrappers/SingleCardWrapper";
import EditForm from "../components/EditForm";
const SingleCard = () => {
  const [editing, setEditing] = React.useState(false);
  const dispatch = useDispatch();
  const { cardId } = useParams();
  const { singleCard, isLoading, deletedId } = useSelector(
    (store) => store.card
  );
  const { bank, cardName, creditLine, balance } = singleCard;
  React.useEffect(() => {
    dispatch(getCardById(cardId));
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (deletedId === cardId) {
    return <Navigate to="/creditCards" />;
  }
  return (
    <Wrapper>
      <div className="form-display">
        <CardInfo
          singleCard={singleCard}
          isLoading={isLoading}
          setEditing={setEditing}
          editing={editing}
        />

        {editing ? (
          <EditForm
            cardId={cardId}
            setEditing={setEditing}
            singleCard={singleCard}
          />
        ) : (
          <NeedleChart creditLine={creditLine} value={balance} />
        )}
      </div>
    </Wrapper>
  );
};

export default SingleCard;
