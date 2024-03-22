import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://sc07z8gg21.execute-api.us-east-2.amazonaws.com/dev",
});

export default customFetch;
