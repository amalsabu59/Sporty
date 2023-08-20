import axios from "axios";

const instance = axios.create({
  //loacl host
  // baseURL: "http://192.168.1.7:8800",

  //aws ec2 instance
  baseURL: "http://18.209.36.210:8800",

  //render instance
  // baseURL: "https://sporty-hpve.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
