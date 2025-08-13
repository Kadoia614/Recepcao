import axios from "axios";

const SERVICE_API = axios.create({
  baseURL: `/api/v1`,
});

export default SERVICE_API;
