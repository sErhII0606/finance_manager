import React from "react";
import { Image, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteTransaction,
  getTransactionById,
} from "../feachers/transactions/tansactionsSlice";

const TransactionInfo = ({ singleTransaction }) => {
  const dispatch = useDispatch();

  const { info, cardId, amount, transactionId, img, createdAt } =
    singleTransaction;
  const event = new Date(createdAt);
  return (
    <div>
      <h3>{`${event.toString()}--${info}`}</h3>
      <Image src={img} thumbnail />
      <h4>{`Amount: ${amount}`}</h4>
      <button
        type="button"
        onClick={() => {
          console.log("delete");
          dispatch(deleteTransaction(transactionId));
        }}
      >
        delete
      </button>
    </div>
  );
};

export default TransactionInfo;
