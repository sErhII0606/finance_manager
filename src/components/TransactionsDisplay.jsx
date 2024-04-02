import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactions } from "../feachers/transactions/tansactionsSlice";
import { useNavigate } from "react-router-dom";
import Transactions from "./Transactions";

const TransactionsDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions } = useSelector((store) => store.transaction);
  const { user } = useSelector((store) => store.user);
  /*   const sortedTransactions = transactions.sort(
    (a, b) => a.createdAt - b.createdAt
  ); */
  const sortedTransactions = [...transactions];
  useEffect(() => {
    dispatch(getUserTransactions(user.userId));
  }, []);
  if (transactions.length === 0) {
    return <h3>No transactions to display</h3>;
  }
  return (
    <div>
      <h3>TransactionsDisplay</h3>

      <Transactions transactions={sortedTransactions} />
    </div>
  );
};

export default TransactionsDisplay;
