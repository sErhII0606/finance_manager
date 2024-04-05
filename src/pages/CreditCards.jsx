import React, { useState } from "react";
import Form from "../components/Form";
import PieChartComponent from "../components/PieChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards } from "../feachers/card/cardSlice";
import CardsList from "../components/CardsList";
import Wrapper from "../wrappers/CreditCardsWrapper";
import useDeviceSize from "../util/useDeviceSize";
import { VscAdd } from "react-icons/vsc";
import AllCardsInfo from "../components/AllCardsInfo";
const CreditCards = () => {
  const dispatch = useDispatch();
  const [addNewCard, setAddNewCard] = useState(false);
  const handleAddNewCard = () => setAddNewCard(true);
  const { user } = useSelector((store) => store.user);
  const [w, h] = useDeviceSize();
  React.useEffect(() => {
    dispatch(getUserCards(user.userId));
  }, []);
  if (w <= 1300) {
    return (
      <Wrapper>
        <main className="form-display">
          <div className="form-display-mini">
            <PieChartComponent />
            {addNewCard ? (
              <div>
                {" "}
                <Form setAddNewCard={setAddNewCard} />
              </div>
            ) : (
              <div>
                <AllCardsInfo />
                <div>
                  <button
                    className="add-new-card-btn"
                    type="button"
                    onClick={handleAddNewCard}
                  >
                    <VscAdd onClick={handleAddNewCard} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <CardsList />
          </div>
        </main>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <main className="form-display">
        <div>
          <CardsList />
        </div>
        <div>
          {" "}
          {addNewCard ? (
            <Form setAddNewCard={setAddNewCard} />
          ) : (
            <div className="add-new-card-btn-container">
              {" "}
              <AllCardsInfo />
              <div>
                <button type="button" onClick={handleAddNewCard}>
                  Add new Card
                </button>
              </div>{" "}
            </div>
          )}
          <PieChartComponent />
        </div>
      </main>
    </Wrapper>
  );
};

export default CreditCards;
