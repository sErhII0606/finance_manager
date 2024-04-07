export const transactionsList = (date, transactionArr) => {
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
        createdAt: t.createdAt,
      };
    });
};
export const spendingList = (date, transactionArr) => {
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
        amount: +t.amount,
      };
    });
};
