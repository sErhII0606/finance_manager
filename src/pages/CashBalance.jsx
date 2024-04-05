import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { addUserCashBalance, setBalance } from "../feachers/user/userSlice";
import { Button, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
const CashBalance = () => {
  const initialState = {
    balance: 0,
  };
  const { user, balance, isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  //const [balance, setBalance] = useState(0);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  if (user.cashBalance) {
    return <Navigate to="/" />;
  }
  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Cash Balance
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            name="balance"
            value={values.balance}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Form.Group>{" "}
      <Button
        variant="primary"
        type="submit"
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            addUserCashBalance({
              userId: user.userId,
              balance: `${values.balance}`,
            })
          );
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default CashBalance;
