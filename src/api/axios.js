import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // Adjust to your backend URL
});

export default instance;
