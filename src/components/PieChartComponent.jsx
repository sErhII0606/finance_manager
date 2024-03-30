import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const PieChartComponent = () => {
  const { cards, isLoading } = useSelector((store) => store.card);
  const dispatcher = useDispatch();
  let data = cards.map((card) => {
    return {
      id: card.cardId,
      name: card.cardName,
      balance: card.balance,
      availableCredit: card.creditLine - card.balance,
    };
  });
  if (isLoading) return <Spinner />;
  if (data.length > 0) {
    return (
      <>
        <BarChart
          id="d"
          width={800}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={(e) => {
            if (!e.activeLabel) return;
            console.log(e);

            // dispatcher(deleteCard(e.activeLabel));
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="balance" stackId="a" fill="#ef0a0a" />
          <Bar dataKey="availableCredit" stackId="a" fill="#26f706" />
        </BarChart>
      </>
    );
  }

  return <h2>No cards to display</h2>;
};

export default PieChartComponent;
