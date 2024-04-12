import React from "react";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { SelectPicker } from "rsuite";
import { getYear } from "rsuite/esm/utils/dateUtils";
import { handleChange } from "../feachers/reports/reportSlice";
import { getUserMonthTransactions } from "../feachers/transactions/tansactionsSlice";
const DateNavbar = ({ setDates }) => {
  const dispatcher = useDispatch();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = ["2024", "2025", "2026", "2027"];
  const data = years.map((item) => ({ label: item, value: item }));
  const { year, month, date } = useSelector((store) => store.report);
  const { isLoading } = useSelector((store) => store.transaction);
  const { user } = useSelector((store) => store.user);
  return (
    <Nav variant="tabs">
      <Nav.Item key={months.length} onClick={() => {}}>
        <SelectPicker
          searchable={false}
          data={data}
          value={year}
          onChange={(e) => dispatcher(handleChange({ name: "year", value: e }))}
          placeholder={year}
          style={{ width: 100, paddingTop: 2 }}
        />
      </Nav.Item>
      {months.map((m, i) => {
        return (
          <Nav.Item
            key={i}
            onClick={() => {
              dispatcher(handleChange({ name: "month", value: i }));
              dispatcher(handleChange({ name: "date", value: 1 }));
            }}
          >
            <Nav.Link>{m}</Nav.Link>
          </Nav.Item>
        );
      })}
      <Nav.Item key={months.length + 1}>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            /*   console.log(
              year,
              month,
              date,
              `dateEnd:${new Date(
                Date.UTC(year, month + 1, date, 6, 0, 0)
              )}, dateStart:${new Date(Date.UTC(year, month, date, 6, 0, 0))}`
            ); */
            setDates([
              new Date(Date.UTC(year, month, date, 6, 0, 0)),
              new Date(Date.UTC(year, month + 1, date, 6, 0, 0)),
            ]);
            dispatcher(
              getUserMonthTransactions({
                userId: user.userId,
                dateStart: new Date(
                  Date.UTC(year, month, date, 6, 0, 0)
                ).valueOf(),
                dateEnd: new Date(
                  Date.UTC(year, month + 1, date, 6, 0, 0)
                ).valueOf(),
              })
            );
          }}
        >
          Show Report
        </button>
      </Nav.Item>
    </Nav>
  );
};

export default DateNavbar;
