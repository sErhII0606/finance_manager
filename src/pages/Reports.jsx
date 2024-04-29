import React, { useEffect, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import Wrapper from "../wrappers/Reports";
import {
  getTransactionsByCategory,
  getUserTransactions,
  getUserTransactionsReport,
} from "../feachers/transactions/tansactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import TransactionsDisplay from "../components/TransactionsDisplay";
import { infoArray } from "../components/TransactionForm";
import CategoryNavbar from "../components/CategoryNavbar";
import DateNavbar from "../components/DateNavbar";
import { spendingList } from "../components/TransactionCalendar";
import { Spinner } from "react-bootstrap";
import ReportsSumuries from "../components/ReportsSumuries";
import EmailConfirmation from "../components/EmailConfirmation";
const Reports = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [view, setView] = useState(false);
  const [emailConf, setEmailConf] = useState(false);
  const [category, setCategory] = useState("");
  const { transactions, isLoading } = useSelector((store) => store.transaction);
  const { year, month, date } = useSelector((store) => store.report);
  const [dates, setDates] = useState([
    new Date(Date.UTC(year, month, date, 6, 0, 0)),
    new Date(Date.UTC(year, month + 1, date, 6, 0, 0)),
  ]);
  //console.log(year, month, date, new Date(Date.UTC(96, 1, 2)));
  const handleSearch = (category) => {
    dispatch(
      getTransactionsByCategory({
        category,
        userId: user.userId,
        year,
        month,
      })
    );
  };
  const tran = [...transactions];
  React.useEffect(() => {
    dispatch(getUserTransactionsReport({ userId: user.userId, month, year }));
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
        {emailConf ? (
          <EmailConfirmation setEmailConf={setEmailConf} dates={dates} />
        ) : (
          <DateNavbar
            setDates={setDates}
            dates={dates}
            setEmailConf={setEmailConf}
          />
        )}
        {/*  <CategoryNavbar
          categories={infoArray.map((e) => e.data)}
          setView={setView}
          handleSearch={handleSearch}
          setCategory={setCategory}
        /> */}

        <div className="form-display">
          <div>
            <Calendar
              compact
              renderCell={renderCell}
              bordered
              value={new Date(Date.UTC(year, month, date + 1))}
              onSelect={(e) => console.log(e)}
              cellClassName={(date) =>
                date.getDay() % 2 ? "bg-gray calendar-cell" : "calendar-cell"
              }
            />
          </div>
          {view ? (
            <div>
              <h3>{`${dates[0].toDateString()}-${dates[1].toDateString()}`}</h3>
              {category && <h2>{category}</h2>}
              {isLoading ? (
                <Spinner />
              ) : (
                <TransactionsDisplay
                  transactions={tran}
                  isLoading={isLoading}
                />
              )}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setView(false);
                  setCategory("");

                  dispatch(
                    getUserTransactionsReport({
                      userId: user.userId,
                      month,
                      year,
                    })
                  );
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <h3>{`${dates[0].toDateString()}-${dates[1].toDateString()}`}</h3>
              <ReportsSumuries
                setView={setView}
                handleSearch={handleSearch}
                setCategory={setCategory}
              />{" "}
              {/*     <TransactionsDisplay transactions={tran} isLoading={isLoading} /> */}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Reports;
