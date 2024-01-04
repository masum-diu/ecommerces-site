import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ecourierInstance = axios.create({
  baseURL: "https://backoffice.ecourier.com.bd/api",
  // baseURL: "https://apiaranya.jumriz.com/public/api",
  headers: {
    "Content-Type": "application/json",
    "API-KEY": "frz3",
    "API-SECRET": "4vqsZ",
    "USER-ID": "H7546",
  },
});

export default ecourierInstance;
