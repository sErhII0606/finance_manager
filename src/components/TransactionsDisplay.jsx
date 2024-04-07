import { Spinner } from "react-bootstrap";
import Transactions from "./Transactions";

const TransactionsDisplay = ({ transactions, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (transactions.length === 0) {
    return <h3>No transactions to display</h3>;
  }
  return (
    <div>
      <h3>Transactions</h3>

      <Transactions transactions={transactions} />
    </div>
  );
};

export default TransactionsDisplay;
