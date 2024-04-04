import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
const Transactions = ({ transactions }) => {
  return (
    <ListGroup as="ol" style={{ overflow: "auto", height: "500px" }}>
      {transactions
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((t, i) => {
          const event = new Date(t.createdAt);
          return (
            <ListGroup.Item
              key={i}
              as="li"
              className="d-flex justify-content-between align-items-start"
              style={{
                width: "50% ",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "10px",
                alignItems: "center",
              }}
            >
              <div className="ms-2 me-auto">
                <Link to={`/transaction/${t.transactionId}/info`}>
                  {" "}
                  {t.info ? `${t.info}` : `transaction`}
                </Link>
                <p> {event.toDateString()}</p>
              </div>
              <Image roundedCircle src={t.img} className="icon-img" />{" "}
              <Badge bg="primary" pill>
                {`$${t.amount}`}
              </Badge>
            </ListGroup.Item>
          );
        })}
      {/*   {sortedTransactions
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((t, i) => {
          const event = new Date(t.createdAt);
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => {
                  console.log(t);
                  navigate(`/transaction/${t.transactionId}/info`);
                }}
              >
                {t.info
                  ? `${t.info}--${event.toDateString()}`
                  : `transaction--${event.toDateString()}`}
              </button>
            </div>
          );
        })} */}
    </ListGroup>
  );
};

export default Transactions;
