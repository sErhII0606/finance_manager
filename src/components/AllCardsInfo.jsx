import React from "react";
import { useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
const AllCardsInfo = () => {
  const { cards } = useSelector((state) => state.card);
  console.log(cards);
  let i = 0;
  let j = 0;
  const totalBalance = cards.map((card) => (i = i + +card.balance))[
    cards.length - 1
  ];
  const totalCreditLine = cards.map((card) => (j = j + +card.creditLine))[
    cards.length - 1
  ];
  return (
    <>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          label={`$${totalCreditLine - totalBalance}`}
          now={totalCreditLine - totalBalance}
          key={1}
        />

        <ProgressBar
          striped
          variant="danger"
          label={`$${totalBalance}`}
          now={totalBalance}
          key={3}
        />
      </ProgressBar>
      <span>{`Total Credit Line: $${totalCreditLine}`}</span>
    </>
  );
};

export default AllCardsInfo;
