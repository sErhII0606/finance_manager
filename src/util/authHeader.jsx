export const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `${thunkAPI.getState().user.user.idToken}`,
    },
  };
};
