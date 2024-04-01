import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

const Transactions = ({ transactions }) => {
  return (
    <ListGroup as="ol">
      {transactions
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((t, i) => {
          const event = new Date(t.createdAt);
          return (
            <ListGroup.Item
              key={i}
              as="li"
              className="d-flex justify-content-between align-items-start"
              style={{ width: "25rem" }}
            >
              <div className="ms-2 me-auto">
                <img
                  src={t.img}
                  style={{ height: "25px", position: "absolute", left: "0" }}
                />
                <div className="fw-bold">
                  {" "}
                  {t.info ? `${t.info}` : `transaction`}
                </div>
                {event.toDateString()}
              </div>
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
