import React from "react";
import { useSelector } from "react-redux";
import { infoArray } from "./TransactionForm";
import { Button, Spinner } from "react-bootstrap";

import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
const ReportsSumuries = ({ setView, handleSearch, setCategory }) => {
  const { transactions, isLoading } = useSelector((store) => store.transaction);
  const info = [...infoArray, { data: "custom", total: "$0" }];
  const arrrrr = info
    .map((e) => e.data)
    .map((category) => {
      //console.log(category);
      return transactions.filter((t) => {
        // console.log(t.info.includes(category), category, t);
        return t.info.includes(category);
      });
    })
    .filter((t) => {
      //   console.log(t);
      return t.length;
    })
    .map((t) => {
      // console.log(t);
      return {
        amount: t
          .map((y) => y.amount)
          .reduce(
            (accumulator, currentValue) => +accumulator + +currentValue,
            0
          ),
        category: t[0].info,
      };
    });
  console.log(arrrrr);
  /* 
    ; */
  if (isLoading) {
    return <Spinner />;
  }

  /*   return (
    <div>
      {info
        .map((e) => {
          if (arrrrr.find((el) => el.category === e.data)) {
            const c = arrrrr.find((el) => el.category === e.data);
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
        if (arrrrr.find((el) => el.category.includes(e.data))) {
          const c = arrrrr.find((el) => el.category.includes(e.data));
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
