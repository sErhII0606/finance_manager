import React from "react";
import { useSelector } from "react-redux";
import { infoArray } from "./TransactionForm";
import { Button, Spinner } from "react-bootstrap";

import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
const ReportsSumuries = ({ setView, handleSearch, setCategory }) => {
  const { transactions, isLoading, report } = useSelector(
    (store) => store.transaction
  );
  const info = [...infoArray, { data: "custom", total: "$0" }];

  if (isLoading) {
    return <Spinner />;
  }

  /*   return (
    <div>
      {info
        .map((e) => {
          if (report.find((el) => el.category === e.data)) {
            const c = report.find((el) => el.category === e.data);
            return { ...e, total: c.amount };
          } else {
            return e;
          }
        })
        .map((el, i) => {
          return (
            <div key={i}>
              <Button
                variant="link"
                onClick={() => {
                  setView(true);
                  handleSearch(el.data);
                  setCategory(el.data);
                }}
              >
                {el.data}
              </Button>
              <span>{`: $${el.total}`}</span>
            </div>
          );
        })}
    </div>
  ); */
  return (
    <Table
      height={530}
      data={info.map((e) => {
        if (report.find((el) => el.category.includes(e.data))) {
          const c = report.find((el) => el.category.includes(e.data));
          return { ...e, total: `$${c.amount}` };
        } else {
          return e;
        }
      })}
      bordered
      cellBordered
      onSortColumn={(sortColumn, sortType) => {
        console.log(sortColumn, sortType);
      }}
    >
      <Column
        onClick={(e) => {
          console.log(e.target.firstChild.data);
          setView(true);
          handleSearch(e.target.firstChild.data);
          setCategory(e.target.firstChild.data);
        }}
        flexGrow={2}
      >
        <HeaderCell>Category</HeaderCell>
        <Cell dataKey="data" style={{ cursor: "pointer" }}></Cell>
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Total</HeaderCell>
        <Cell dataKey="total" />
      </Column>
    </Table>
  );
};

export default ReportsSumuries;
