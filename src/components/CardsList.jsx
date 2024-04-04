import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearValues } from "../feachers/card/cardSlice";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
const CardsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styleCard = (val, cl) => {
    if (val <= cl / 2) {
      return "Success";
    }
    if (val > cl / 2 && val < (cl * 3) / 4) {
      return "Warning";
    }
    if (val > (cl * 3) / 4) {
      return "Danger";
    }
  };
  const { cards, isLoading } = useSelector((store) => store.card);
  if (isLoading) return <Spinner />;
  return (
    <div className="cards-list-container">
      <h4 className="title">Your Credit Cards</h4>
      {cards.map((card, i) => {
        // console.log(card);
        return (
          <div key={i}>
            <Card
              bg={styleCard(card.balance, card.creditLine).toLowerCase()}
              key={styleCard(card.balance, card.creditLine)}
              text={
                styleCard(card.balance, card.creditLine).toLowerCase() ===
                "light"
                  ? "dark"
                  : "white"
              }
              style={{ width: "19rem", height: "12rem" }}
              className="mb-2"
            >
              <Card.Header>
                {card.bank}:{card.cardName}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  Card Status: {styleCard(card.balance, card.creditLine)}{" "}
                </Card.Title>

                <ProgressBar>
                  <ProgressBar
                    striped
                    animated
                    variant="danger"
                    label={`$${card.balance}`}
                    now={card.balance}
                    key={3}
                  />
                  <ProgressBar
                    striped
                    animated
                    variant="success"
                    label={`$${card.creditLine - card.balance}`}
                    now={card.creditLine - card.balance}
                    key={1}
                  />
                  {/*   <ProgressBar striped variant="warning" now={20} key={2} /> */}
                </ProgressBar>
                <Button
                  variant="info"
                  style={{ margin: "15px", height: "20px" }}
                  className="member-btn"
                  onClick={() => {
                    dispatch(clearValues());
                    navigate(
                      `/card/${card.cardId ? card.cardId : card.id}/info`
                    );
                  }}
                >
                  <span style={{}}> View Details</span>
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CardsList;
