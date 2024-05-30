// useCitySelect.js
import { useState, useEffect } from "react";
import ecourierInstance from "../../pages/api/ecourier_instance";

const API_URL = "https://secure.geonames.org/searchJSON";
const USERNAME = "shamimulhaque";
// Replace with your actual Geonames username
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

const usePostCodeFetcherEcourier = (country) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedThana, setSelectedThana] = useState("");
  const [postCode, setPostCode] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (
          selectedCity &&
          selectedThana &&
          selectedCity !== "Select Town/City" &&
          selectedThana !== "Select Thana" &&
          country === "BD"
        ) {
          setLoading(true);
          const result = ecourierInstance
            .post(`/postcode-list?city=${selectedCity}&thana=${selectedThana}`)
            .then((result) => {
              setPostCode(result?.data?.message);
            })
            .catch((err) => {
              console.log(err);
            });

          //   setCities(data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [selectedCity, selectedThana]);

  return {
    setSelectedCity,
    setSelectedThana,
    postCode,
    loading,
  };
};

export default usePostCodeFetcherEcourier;
