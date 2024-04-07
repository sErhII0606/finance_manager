import React, { useEffect, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import Wrapper from "../wrappers/Reports";
import {
  getTransactionsByCategory,
  getUserTransactions,
} from "../feachers/transactions/tansactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import TransactionsDisplay from "../components/TransactionsDisplay";
import { infoArray } from "../components/TransactionForm";
import CategoryNavbar from "../components/CategoryNavbar";
import { spendingList } from "../components/TransactionCalendar";
import { Spinner } from "react-bootstrap";
const Reports = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [view, setView] = useState(false);
  const [category, setCategory] = useState("");
  const { transactions, isLoading } = useSelector((store) => store.transaction);
  const handleSearch = (category) => {
    dispatch(getTransactionsByCategory({ category, userId: user.userId }));
  };
  const tran = [...transactions];

  React.useEffect(() => {
    dispatch(getUserTransactions(user.userId));
  }, []);
  const renderCell = (date) => {
    const list = spendingList(date, transactions);

    if (isLoading) return <Spinner />;
    if (list.length) {
      const displayList = [list.map((l) => l.amount).reduce((a, c) => a + c)];
      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => {
            return (
              <span key={index}>
                <Badge /> <b>$</b>
                {item}
              </span>
            );
          })}
        </ul>
      );
    }

    return null;
  };
  /*   React.useEffect(() => {
    dispatch(getTransactionsByCategory(category));
  }, [category]); */
  return (
    <Wrapper>
      <div>
        <CategoryNavbar
          categories={infoArray.map((e) => e.data)}
          setView={setView}
          handleSearch={handleSearch}
          setCategory={setCategory}
        />
        <div className="form-display">
          <div>
            <Calendar
              compact
              renderCell={renderCell}
              bordered
              cellClassName={(date) =>
                date.getDay() % 2 ? "bg-gray" : undefined
              }
            />
          </div>
          {view ? (
            <div>
              {category && <h2>{category}</h2>}
              <TransactionsDisplay transactions={tran} />
              <button
                type="button"
                onClick={() => {
                  setView(false);
                  setCategory("");
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <div>fd</div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Reports;
