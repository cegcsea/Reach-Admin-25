import axios from "axios";
const REACH_BASE_URL = `https://api.abacus.org.in`
// const REACH_BASE_URL = `http://localhost:3001`
const instance = axios.create({
  baseURL: REACH_BASE_URL, // Adjust to your backend URL
});

export default instance;
