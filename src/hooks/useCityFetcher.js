// useCitySelect.js
import { useState, useEffect } from "react";

const API_URL = "https://secure.geonames.org/searchJSON";
const USERNAME = "shamimulhaque"; // Replace with your actual Geonames username
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

const useCityFetcher = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedCountry) {
          setLoading(true);
          const url = new URL(`${API_URL}`);
          url.searchParams.append("country", selectedCountry);
          url.searchParams.append("featureCode", "ADM1");
          url.searchParams.append("maxRows", "1000");
          url.searchParams.append("username", USERNAME);
          const response = await fetch(url.toString());
          const data = await response.json();

          // Assuming the API response data is an array of objects with 'toponymName' property
          const citiesData = data.geonames.map((city) => city?.toponymName);
          setCities(citiesData);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [selectedCountry]);

  return {
    selectedCountry,
    setSelectedCountry,
    cities,
    loading,
  };
};

export default useCityFetcher;
