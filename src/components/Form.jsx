import React from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  addNewCard,
  clearValues,
} from "../feachers/card/cardSlice";

const Form = () => {
  const { cardName, bank, creditLine, balance, isLoading } = useSelector(
    (store) => store.card
  );
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
      <h3>Add Credit Cart</h3>
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
          if (!bank || creditLine <= 0 || balance < 0) {
            toast.error("Fill out all fields please");
            return;
          }
          dispatch(addNewCard({ bank, creditLine, balance, cardName, userId }));
          dispatch(clearValues());
        }}
      >
        Add new card
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

export default Form;
