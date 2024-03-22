import React from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  addNewCard,
  clearValues,
  updateCard,
} from "../feachers/card/cardSlice";

const EditForm = ({ cardId, setEditing, singleCard }) => {
  const { cardName, bank, creditLine, balance } = useSelector(
    (store) => store.card
  );
  console.log(singleCard);
  const { user } = useSelector((store) => store.user);
  const { userId } = user;
  const dispatch = useDispatch();

  const handleCardInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <>
      <h3>Edit Credit Cart</h3>
      <FormRow
        type="text"
        name="bank"
        value={bank}
        handleChange={handleCardInput}
      />
      <FormRow
        type="text"
        name="cardName"
        value={cardName}
        handleChange={handleCardInput}
        labelText="Card Name"
      />

      <FormRow
        type="number"
        name="creditLine"
        value={creditLine}
        handleChange={handleCardInput}
        labelText="Credit Line"
      />
      <FormRow
        type="number"
        name="balance"
        value={balance}
        handleChange={handleCardInput}
      />
      <button
        type="button"
        onClick={() => {
          setEditing(false);

          dispatch(
            updateCard({
              bank: bank ? bank : singleCard.bank,
              creditLine: creditLine ? creditLine : singleCard.creditLine,
              balance: balance ? balance : singleCard.balance,
              cardName: cardName ? cardName : singleCard.cardName,
              cardId,
            })
          );

          dispatch(clearValues());
        }}
      >
        Update card
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(clearValues());
        }}
      >
        Clear inputs
      </button>
    </>
  );
};

export default EditForm;
