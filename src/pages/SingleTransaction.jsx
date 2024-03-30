import React from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteTransaction,
  getTransactionById,
} from "../feachers/transactions/tansactionsSlice";
import TransactionInfo from "../components/TransactionInfo";
const SingleTransaction = () => {
  const dispatch = useDispatch();
  const { transactionId } = useParams();
  const { isLoading, singleTransaction, deletedId } = useSelector(
    (store) => store.transaction
  );
  React.useEffect(() => {
    dispatch(getTransactionById(transactionId));
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (deletedId === transactionId) {
    return <Navigate to="/transactions" />;
  }
  return <TransactionInfo singleTransaction={singleTransaction} />;
};

export default SingleTransaction;
