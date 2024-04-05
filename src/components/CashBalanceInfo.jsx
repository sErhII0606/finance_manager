import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { updateUserCashBalance } from "../feachers/user/userSlice";
const CashBalanceInfo = () => {
  const dispatch = useDispatch();
  const [addMore, setAddMore] = useState(false);
  const [amount, setAmount] = useState(0);
  const { user, isLoading } = useSelector((store) => store.user);
  return (
    <div>
      <h3>{`You Have: $${user.cashBalance} in cash`}</h3>
      {addMore && (
        <div>
          {" "}
          <Form>
            <Row>
              <Col>
                <Form.Label>How Much Cash Are You Adding</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Col>
              <Col>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    dispatch(
                      updateUserCashBalance({
                        userId: user.userId,
                        balance: +user.cashBalance + +amount,
                      })
                    )
                  }
                >
                  SUBMIT
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      )}
      <button type="button" onClick={() => setAddMore(!addMore)}>
        {addMore ? "CANCEL" : "ADD MORE?"}
      </button>
    </div>
  );
};

export default CashBalanceInfo;
