import { useState } from "react";

import { Calendar, Whisper, Popover, Badge } from "rsuite";
function transactionsList(date, transactionArr) {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return transactionArr
    .filter(
      (t) =>
        new Date(t.createdAt).getMonth() === month &&
        new Date(t.createdAt).getFullYear() === year &&
        new Date(t.createdAt).getDate() === day
    )
    .map((t) => {
      return {
        time: `${new Date(t.createdAt).getHours()}:${new Date(
          t.createdAt
        ).getMinutes()}`,
        title: `${t.info}`,
      };
    });
}
const CalendarW = ({
  transactions,
  setView,
  setDailyTransactions,
  setDate,
}) => {
  function renderCell(date) {
    const list = transactionsList(date, transactions);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return (
    <Calendar
      onSelect={(e) => {
        setDailyTransactions(
          transactions.filter(
            (t) =>
              new Date(t.createdAt).getMonth() === new Date(e).getMonth() &&
              new Date(t.createdAt).getFullYear() ===
                new Date(e).getFullYear() &&
              new Date(t.createdAt).getDate() === new Date(e).getDate()
          )
        );
        setDate(new Date(e).toDateString());
        setView(true);
      }}
      bordered
      renderCell={renderCell}
    />
  );
};

export default CalendarW;
