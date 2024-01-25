// useCitySelect.js
import { useState, useEffect } from "react";
import ecourierInstance from "../../pages/api/ecourier_instance";

const useAreaFetcherEcourier = () => {
  const [selectedPostCode, setSelectedPostCode] = useState("");
  const [area, setArea] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (
          selectedPostCode &&
          selectedPostCode !== "Select POSTCODE / ZIP" &&
          selectedPostCode !== ""
        ) {
          setLoading(true);
          const result = ecourierInstance
            .post(`/area-list?postcode=${selectedPostCode}`)
            .then((result) => {
              setArea(result?.data?.message);
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
  }, [selectedPostCode]);

  return {
    selectedPostCode,
    setSelectedPostCode,
    area,
    loading,
  };
};

export default useAreaFetcherEcourier;
