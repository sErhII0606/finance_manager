import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTransaction,
  handleChange,
  clearValuesTransactions,
  setBank,
  setInfo,
  setImg,
  setCardName,
  setCardId,
} from "../feachers/transactions/tansactionsSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  updateCard,
  updateCreditCardBalance,
} from "../feachers/card/cardSlice";
import { updateUserCashBalance } from "../feachers/user/userSlice";
export const infoArray = [
  {
    data: "Groceries",
    total: "$0",
    img: "https://th.bing.com/th/id/OIP.ST_EuSVQtgSgQOT2_LBduQHaFD?w=251&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    data: "Cigarettes",
    total: "$0",
    img: "https://th.bing.com/th/id/OIP.R1TX4l0TxzX-HRo7qKz_8gAAAA?w=204&h=240&c=7&r=0&o=5&pid=1.7",
  },
  {
    data: "Weed",
    total: "$0",
    img: "https://th.bing.com/th/id/OIP.ukz85MiDlJ38bWCAxGiwIwHaE8?w=270&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    data: "Gas",
    total: "$0",
    img: "https://tse4.mm.bing.net/th?id=OIP.qw11gwSTd-5jcxsyb6ArGgHaE8&pid=Api&P=0&h=180",
  },
  {
    data: "Lunch",
    total: "$0",
    img: "https://tse4.mm.bing.net/th?id=OIP.Mk_JY9WdOhiX93IjaF9lIQHaJQ&pid=Api&P=0&h=180",
  },
  {
    data: "Amazon",
    total: "$0",
    img: "https://tse3.mm.bing.net/th?id=OIP.BhAvqPlnLGi436N6VGFwZQHaHa&pid=Api&P=0&h=180",
  },
  {
    data: "Grilling",
    total: "$0",
    img: "https://tse4.mm.bing.net/th?id=OIP.aAahtDus9N7w6l5U3rDLQwHaHa&pid=Api&P=0&h=180",
  },
  {
    data: "Tax",
    total: "$0",
    img: "https://tse1.mm.bing.net/th?id=OIF.lHuYMqJLVG6s%2b%2fQDDzrN2A&pid=Api&P=0&h=180",
  },
  {
    data: "Car payment",
    total: "$0",
    img: "https://tse1.mm.bing.net/th?id=OIP.M8Q3HBoMRbDVIN09L5IHvwHaCp&pid=Api&P=0&h=180",
  },
  {
    data: "Insurance",
    total: "$0",
    img: "https://tse1.mm.bing.net/th?id=OIP.XUfYw2UdnqoV7xNc9Pq6_AAAAA&pid=Api&P=0&h=180",
  },
  {
    data: "Card payment",
    total: "$0",
    img: "https://tse4.mm.bing.net/th?id=OIP.3w5ft1iEuyHcgLRuHWaAGAHaD4&pid=Api&P=0&h=180",
  },
  {
    data: "Testosterone",
    total: "$0",
    img: "https://tse3.mm.bing.net/th?id=OIP.RllkMCHGjWFjgJwIHuvIGwHaH7&pid=Api&P=0&h=180",
  },
  {
    data: "Doctor/labs",
    total: "$0",
    img: "https://www.villagemedical.com/hubfs/images/Village-medical-vertical-color.svg",
  },
  {
    data: "Home",
    total: "$0",
    img: "https://tse1.mm.bing.net/th?id=OIP.CcLnxiHn1P-D_2gsa1p1HgHaE8&pid=Api&P=0&h=180",
  },
  {
    data: "Rent",
    total: "$0",
    img: "https://tse3.mm.bing.net/th?id=OIP.pkUFumnNLbqTlKfvJGt5DwHaEq&pid=Api&P=0&h=180",
  },
  {
    data: "Coffee",
    total: "$0",
    img: "https://tse2.mm.bing.net/th?id=OIP.bnI206rBNel1etVbUjIScQHaJ-&pid=Api&P=0&h=180",
  },
  {
    data: "Jym",
    total: "$0",
    img: "https://tse1.mm.bing.net/th?id=OIF.Jp2%2bU8dyIB91GOB7bHJwuw&pid=Api&P=0&h=180",
  },
  {
    data: "Tolls",
    total: "$0",
    img: "https://tse1.mm.bing.net/th?id=OIP.Vl9OSqwgLlv6xHxMgZEukAAAAA&pid=Api&P=0&h=180",
  },
];
const TransactionForm = ({ setAddTransaction }) => {
  const [customInfo, setCustomInfo] = useState(false);
  const { info, cardId, amount, img, isLoading } = useSelector(
    (store) => store.transaction
  );
  const { user } = useSelector((store) => store.user);
  const { cards } = useSelector((store) => store.card);
  const { userId, cashBalance } = user;

  const dispatch = useDispatch();
  const handleCardInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <Form>
      <Row className="mb-3">
        {customInfo ? (
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Info</Form.Label>
            <Form.Control
              name="info"
              value={info}
              onChange={(e) => handleCardInput(e)}
            />
          </Form.Group>
        ) : (
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Info</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              onChange={(e) => {
                if (e.target.value === "Choose...") return;

                if (e.target.value === "Custom") {
                  setCustomInfo(true);
                  dispatch(
                    setImg(
                      "https://www.smartsign.com/img/lg/K/your-wording-custom-sign-k-3428-all.png"
                    )
                  );
                  return;
                }
                dispatch(
                  setImg(
                    infoArray.filter((el) => el.data === e.target.value)[0].img
                  )
                );
                dispatch(
                  setInfo(
                    infoArray.filter((el) => el.data === e.target.value)[0].data
                  )
                );
              }}
            >
              <option>Choose...</option>
              <option>Custom</option>
              {infoArray.map((el, i) => (
                <option key={i}>{el.data}</option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Card/Cash</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            onChange={(e) => {
              if (e.target.value === "Choose...") return;

              if (e.target.value === "Cash") {
                dispatch(setCardId("CASH"));
                return;
              }
              dispatch(setCardId(e.target.value));
              console.log(e.target.value);
            }}
          >
            <option>Choose...</option>
            <option>Cash</option>
            {cards.map((c, i) => {
              return (
                <option
                  key={i}
                  value={c.cardId}
                >{`${c.bank}: ${c.cardName}`}</option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="amount"
            value={amount}
            onChange={(e) => handleCardInput(e)}
          />
        </Form.Group>
      </Row>{" "}
      <button
        variant="primary"
        type="submit"
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          // console.log({ cardName, bank, info, amount, userId, img });
          if (!cardId || !info || !amount) {
            toast.warn("Please fill out all fields");
            return;
          }
          if (cardId === "CASH") {
            dispatch(
              updateUserCashBalance({ userId, balance: +cashBalance - +amount })
            );
          } else {
            // const card = cards.find((c) => c.cardId === cardId);
            //console.log({ ...card, balance: +card.balance + +amount });
            dispatch(updateCreditCardBalance({ cardId, amount }));
          }
          let infoR = customInfo ? `custom:${info}` : info;
          // console.log({ cardId, info: infoR, amount, userId, img });
          dispatch(
            addNewTransaction({ cardId, info: infoR, amount, userId, img })
          );
          dispatch(clearValuesTransactions());
          setAddTransaction(false);
          setCustomInfo(false);
        }}
      >
        Submit
      </button>
    </Form>
  );
};

export default TransactionForm;
