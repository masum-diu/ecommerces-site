import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
  baseURL: "http://apiaranya.jumriz.com/public/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;
