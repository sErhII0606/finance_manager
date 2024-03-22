export const getDataFromLocalStorage = (dataName, alternative) => {
  const result = localStorage.getItem(dataName);
  const user = result ? JSON.parse(result) : alternative;
  return user;
};
export const addDataToLocalStorage = (dataName, data) => {
  localStorage.setItem(dataName, JSON.stringify(data));
};

export const removeDataFromLocalStorage = (dataName) => {
  localStorage.removeItem(dataName);
};
