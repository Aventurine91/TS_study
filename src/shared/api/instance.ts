import axios from "axios";

const baseURL = "https://study-forest-be.onrender.com";
// const baseURL = "http://localhost:8000";
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
