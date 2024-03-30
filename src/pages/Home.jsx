import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards } from "../feachers/card/cardSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  React.useEffect(() => {
    dispatch(getUserCards(user.userId));
  }, []);
  return <div>Home</div>;
};

export default Home;
