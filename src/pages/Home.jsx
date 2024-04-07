import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards } from "../feachers/card/cardSlice";
import { Button, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import useDeviceSize from "../util/useDeviceSize";
import {
  clearStore,
  getUserCashBalance,
  logout,
} from "../feachers/user/userSlice";
import CashBalanceInfo from "../components/CashBalanceInfo";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((store) => store.user);
  React.useEffect(() => {
    dispatch(getUserCards(user.userId));
    dispatch(getUserCashBalance(user.userId));
  }, []);
  const [w, h] = useDeviceSize();
  if (isLoading) {
    return <Spinner />;
  }
  if (!user.cashBalance) {
    return <Navigate to="/user/cashBalance" />;
  }
  return (
    <>
      {w <= 1300 && (
        <div>
          <Button
            onClick={() => {
              navigate("/transactions");
            }}
          >
            Transaction
          </Button>
          <Button
            onClick={() => {
              navigate("/creditCards");
            }}
          >
            Credit Cards
          </Button>
          <Button
            onClick={() => {
              navigate("/reports");
            }}
          >
            Reports
          </Button>
          <Button variant="danger" onClick={() => dispatch(clearStore("bye"))}>
            Logout
          </Button>
        </div>
      )}
      <CashBalanceInfo />
    </>
  );
};

export default Home;
