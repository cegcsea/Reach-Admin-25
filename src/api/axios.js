import axios from "axios";
const ABACUS_BASE_URL = `https://api.abacus.org.in`;

const instance = axios.create({
  baseURL: ABACUS_BASE_URL, // Adjust to your backend URL
});

export default instance;
