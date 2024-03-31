import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards } from "../feachers/card/cardSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearStore, logout } from "../feachers/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  React.useEffect(() => {
    dispatch(getUserCards(user.userId));
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          navigate("/transactions");
        }}
      >
        transaction
      </Button>
      <Button
        onClick={() => {
          navigate("/creditCards");
        }}
      >
        creditCards
      </Button>
      <Button variant="danger" onClick={() => dispatch(clearStore("bye"))}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
