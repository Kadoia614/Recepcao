import axios from "axios";

const HOST =
  process.env.REACT_APP_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:3001";

const SERVICE_API = axios.create({
  baseURL: `${HOST}/api/v1`,
});

export default SERVICE_API;
