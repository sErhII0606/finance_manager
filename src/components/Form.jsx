import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  addNewCard,
  clearValues,
} from "../feachers/card/cardSlice";
import Col from "react-bootstrap/Col";
import FormBootstrap from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

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
      <FormBootstrap>
        <Row className="mb-3">
          <Col>
            <FormBootstrap.Label>Bank</FormBootstrap.Label>
            <FormBootstrap.Control
              placeholder="Bank"
              name="bank"
              value={bank}
              onChange={(e) => handleCardInput(e)}
            />
          </Col>
          <Col>
            <FormBootstrap.Label>Card Name</FormBootstrap.Label>
            <FormBootstrap.Control
              placeholder="Card Name"
              name="cardName"
              value={cardName}
              onChange={(e) => handleCardInput(e)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FormBootstrap.Label>Credit Line</FormBootstrap.Label>
            <FormBootstrap.Control
              type="number"
              name="creditLine"
              value={creditLine}
              placeholder="Credit Line"
              onChange={(e) => handleCardInput(e)}
            />
          </Col>
          <Col>
            <FormBootstrap.Label>Balance</FormBootstrap.Label>
            <FormBootstrap.Control
              type="number"
              placeholder="Balance"
              name="balance"
              value={balance}
              onChange={(e) => handleCardInput(e)}
            />
          </Col>
        </Row>
      </FormBootstrap>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          if (!bank || creditLine <= 0 || balance < 0) {
            toast.error("Fill out all fields please");
            return;
          }
          //  console.log({ bank, creditLine, balance, cardName, userId });
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
