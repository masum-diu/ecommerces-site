// useCitySelect.js
import { useState, useEffect } from "react";
import ecourierInstance from "../../pages/api/ecourier_instance";

const useThanaFetcherEcourier = (country) => {
  console.log("amar country", country);
  const [selectedCity, setSelectedCity] = useState("");
  const [thanas, setThanas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (
          selectedCity &&
          selectedCity !== "Select Town/City" &&
          selectedCity !== "" &&
          country === "BD"
        ) {
          setLoading(true);
          const result = ecourierInstance
            .post(`/thana-list?city=${selectedCity}`)
            .then((result) => {
              setThanas(result?.data?.message);
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
  }, [selectedCity]);

  return {
    selectedCity,
    setSelectedCity,
    thanas,
    loading,
  };
};

export default useThanaFetcherEcourier;
