// useCitySelect.js
import { useState, useEffect } from "react";
import ecourierInstance from "../../pages/api/ecourier_instance";

const useCityFetcherEcourier = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCities = async () => {
      try {
       
        if (selectedCountry === "Bangladesh") {
          setLoading(true);
          const result = ecourierInstance
            .post("/city-list")
            .then((result) => {
              setCities(result.data);
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
  }, [selectedCountry]);
  return {
    selectedCountry,
    setSelectedCountry,
    cities,
    loading,
  };
};

export default useCityFetcherEcourier;
