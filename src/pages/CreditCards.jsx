import React from "react";
import Form from "../components/Form";
import PieChartComponent from "../components/PieChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards } from "../feachers/card/cardSlice";
import CardsList from "../components/CardsList";

const CreditCards = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  React.useEffect(() => {
    dispatch(getUserCards(user.userId));
  }, []);

  return (
    <main>
      <Form />
      <PieChartComponent />
      <CardsList />
    </main>
  );
};

export default CreditCards;
