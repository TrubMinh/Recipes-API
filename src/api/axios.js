import axios from "axios";
import { BASE_URL } from "./apiConstants";

const instance = axios.create({
  baseURL: BASE_URL,
});

function fetchData(endpoint, params = {}) {
  // Convert params object to URLSearchParams
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  return instance.get(url);
}

export default fetchData;
