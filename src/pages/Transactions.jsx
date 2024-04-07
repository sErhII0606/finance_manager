import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsDisplay from "../components/TransactionsDisplay";
import Wrapper from "../wrappers/TransactionWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactions } from "../feachers/transactions/tansactionsSlice";
import { transactionsList } from "../components/TransactionCalendar";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import { Spinner } from "react-bootstrap";

const Transactions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [addTransaction, setAddTransaction] = useState(false);
  const { transactions, isLoading } = useSelector((store) => store.transaction);
  const renderCell = (date) => {
    const list = transactionsList(date, transactions);
    const displayList = list.filter((item, index) => index < 1);
    if (isLoading) return <Spinner />;
    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((item, index) => (
                    <p key={index}>
                      <b>{item.time}</b> - {item.title}
                    </p>
                  ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  };
  const [view, setView] = useState(false);
  const [date, setDate] = useState("");
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const sortedTransactions = [...transactions];
  const handleSelect = (e) => {
    setDailyTransactions(
      transactions.filter(
        (t) =>
          new Date(t.createdAt).getMonth() === new Date(e).getMonth() &&
          new Date(t.createdAt).getFullYear() === new Date(e).getFullYear() &&
          new Date(t.createdAt).getDate() === new Date(e).getDate()
      )
    );
    setDate(new Date(e).toDateString());
    setView(true);
  };
  React.useEffect(() => {
    dispatch(getUserTransactions(user.userId));
  }, []);
  return (
    <Wrapper>
      <button type="button" onClick={() => setAddTransaction(!addTransaction)}>
        {addTransaction ? "CANCEL" : "ADD NEW TRANSACTION"}
      </button>
      <div className="form-display">
        {addTransaction ? (
          <div className="add-transaction-form">
            <h1>Add a Transaction</h1>
            <TransactionForm setAddTransaction={setAddTransaction} />
          </div>
        ) : (
          <div>
            <Calendar
              bordered
              onSelect={handleSelect}
              renderCell={renderCell}
            />
          </div>
        )}
        <div>
          {date ? <h2>{date}</h2> : <h2>All Dates</h2>}
          {date ? (
            <div>
              {" "}
              <TransactionsDisplay
                transactions={dailyTransactions}
                isLoading={isLoading}
              />{" "}
              <button
                type="button"
                onClick={() => {
                  setView(false);
                  setDailyTransactions([]);
                  setDate("");
                }}
              >
                VIEW ALL TRANSACTIONS
              </button>
            </div>
          ) : (
            <TransactionsDisplay
              transactions={sortedTransactions}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Transactions;
