import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL, // Adjust to your backend URL
});

export default instance;
