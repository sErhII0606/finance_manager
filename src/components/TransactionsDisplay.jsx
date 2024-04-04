import Transactions from "./Transactions";

const TransactionsDisplay = ({ transactions }) => {
  if (transactions.length === 0) {
    return <h3>No transactions to display</h3>;
  }
  return (
    <div>
      <h3>TransactionsDisplay</h3>

      <Transactions transactions={transactions} />
    </div>
  );
};

export default TransactionsDisplay;
