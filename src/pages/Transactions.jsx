import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsDisplay from "../components/TransactionsDisplay";
import Wrapper from "../wrappers/TransactionWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactions } from "../feachers/transactions/tansactionsSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const { transactions } = useSelector((store) => store.transaction);

  const sortedTransactions = [...transactions];
  React.useEffect(() => {
    dispatch(getUserTransactions(user.userId));
  }, []);
  return (
    <Wrapper>
      <div className="form-display">
        <div className="add-transaction-form">
          <h1>Add a Transaction</h1>
          <TransactionForm />
        </div>
        <div>
          <h1>Transactions</h1>
          <TransactionsDisplay transactions={sortedTransactions} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Transactions;
