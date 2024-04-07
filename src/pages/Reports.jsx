import React, { useEffect, useState } from "react";
import CalendarW from "../components/Calendar";
import Wrapper from "../wrappers/Reports";
import { getUserTransactions } from "../feachers/transactions/tansactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import TransactionsDisplay from "../components/TransactionsDisplay";
const Reports = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [view, setView] = useState(false);
  const [date, setDate] = useState("");
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const { transactions } = useSelector((store) => store.transaction);
  const tran = [...transactions];
  React.useEffect(() => {
    dispatch(getUserTransactions(user.userId));
  }, []);
  return (
    <Wrapper>
      <div className="form-display">
        <div>
          <CalendarW
            transactions={transactions}
            setView={setView}
            setDate={setDate}
            setDailyTransactions={setDailyTransactions}
          />
        </div>
        {view ? (
          <div>
            {date && <h2>{date}</h2>}
            <TransactionsDisplay transactions={dailyTransactions} />
            <button
              type="button"
              onClick={() => {
                setView(false);
                setDailyTransactions([]);
                setDate("");
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Wrapper>
  );
};

export default Reports;
