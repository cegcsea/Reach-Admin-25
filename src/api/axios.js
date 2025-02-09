import axios from "axios";
const REACH_BASE_URL = `https://api2.abacus.org.in`

const instance = axios.create({
  baseURL: REACH_BASE_URL, // Adjust to your backend URL
});

export default instance;
