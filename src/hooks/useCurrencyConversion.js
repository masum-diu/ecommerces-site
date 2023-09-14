import { useEffect, useState } from "react";

// Define a function to fetch currency exchange rates from an API
async function fetchExchangeRates(baseCurrency) {
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/BDT`
  );
  const data = await response.json();
  return data.rates;
}

// Custom hook for currency conversion
export function useCurrencyConversion() {
  const [conversionRates, setConversionRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currentConversionRate, setCurrentConversionRate] = useState("");
  useEffect(() => {
    // Retrieve the currency from local storage
    const currency = localStorage.getItem("currency");

    // Fetch exchange rates if currency is available
    if (currency) {
      setSelectedCurrency(currency);
      fetchExchangeRates(currency).then((rates) => setConversionRates(rates));
    }
  }, []);
  useEffect(() => {
    // Current Conversion Rate
    if (conversionRates) {
      setCurrentConversionRate(conversionRates[selectedCurrency]);
    }
  }, [conversionRates]);
  // console.log("your log output", currentConversionRate);
  // Function to convert a price to the selected currency
  function convertPrice(price) {
    if (!conversionRates || !selectedCurrency) {
      // Return the original price if conversion rates are not available
      return price;
    }

    // Convert the price to the selected currency
    const preConvertedPrice = price * conversionRates[selectedCurrency];
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
