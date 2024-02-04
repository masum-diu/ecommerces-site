import { useEffect, useState } from "react";
import { AES } from "crypto-js";
// Define a function to fetch currency exchange rates from an API
import CryptoJS from "crypto-js";
const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MDQ2MTg5OSwiaWF0IjoxNjkwNDYxODk5fQ.XpwsAA-b8YVaYW26LBUHLRXIzWU1wgTP6cIrLbs7qEw";

export function useCurrencyConversion() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [conversionRate, setConversionRate] = useState(null);
  const [currentConversionRate, setCurrentConversionRate] = useState("");
  useEffect(() => {
    const currency = localStorage.getItem("currency");
    // Fetch exchange rates if currency is available
    if (currency) {
      setSelectedCurrency(currency);
    }
  }, []);
  // console.log('your log output',conversionRates)
  useEffect(() => {
    const conversionRate = localStorage.getItem("rate");
    let finalRate;
    if (conversionRate) {
      const rate = AES.decrypt(conversionRate, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      finalRate = parseFloat(rate);
    }

    if (conversionRate && finalRate) {
      setConversionRate(finalRate);
      setCurrentConversionRate(finalRate);
    }
  }, []);

  function convertPrice(price) {
    if (!selectedCurrency) {
      return price;
    }

    // Convert the price to the selected currency
    const preConvertedPrice = price * conversionRate;
    const convertedPrice = parseFloat(preConvertedPrice.toFixed(2));

    return convertedPrice; // Adjust the precision as needed
  }
  // Function to update the selected currency (use it when you want to change the currency in the inside page)
  function updateCurrency(currency) {
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency);
  }
  return {
    selectedCurrency,
    convertPrice,
    updateCurrency,
    currentConversionRate,
  };
}
