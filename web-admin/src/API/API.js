import axios from "axios";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const SERVICE_API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
});

export default SERVICE_API;
