// api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.7:8800",
  // baseURL: "https://identify1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;