import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  addNewCard,
  clearValues,
  updateCard,
} from "../feachers/card/cardSlice";
import Col from "react-bootstrap/Col";
import FormBootstrap from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

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
    <div>
      <h3>Edit Credit Cart</h3>
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
    </div>
  );
};

export default EditForm;
