import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsDisplay from "../components/TransactionsDisplay";
import Wrapper from "../wrappers/TransactionWrapper";

const Transactions = () => {
  return (
    <Wrapper>
      <div className="form-display">
        <div>
          <h1>Add a Transaction</h1>
          <TransactionForm />
        </div>
        <div>
          <h1>Transactions</h1>
          <TransactionsDisplay />
        </div>
      </div>
    </Wrapper>
  );
};

export default Transactions;
