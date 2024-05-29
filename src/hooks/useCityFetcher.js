// useCitySelect.js
import { useState, useEffect } from "react";

const API_URL = "https://secure.geonames.org/searchJSON";
const USERNAME = "shamimulhaque"; // Replace with your actual Geonames username
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

const useCityFetcher = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [postCodes, setPostCodes] = useState([]);
  const [loading, setLoading] = useState(false);


  // geonames.org feature code and their return description

  // ADM1: First-order administrative division (such as a state or province).
  // ADM2: Second-order administrative division (such as a county or district).
  // ADM3: Third-order administrative division.
  // ADM4: Fourth-order administrative division.
  // AIRP: Airport.
  // CAVE: Cave(s).
  // CITY: Capital of a political entity, generally a country but sometimes a first-level administrative division.
  // CONT: Continent.
  // CRDR: Drainage channel (stream, creek, etc.).
  // FORD: Shallow part of a stream which can be crossed on foot or by land vehicle.
  // GLCR: Glacier(s).
  // HBR: Harbor(s).
  // ISL: Island.
  // LKE: Lake.
  // MT: Mountain.
  // PPL: Populated place (a city, town, village, or other agglomeration of buildings where people live and work).
  // R: Road.
  // SPNG: Spring(s).
  // WLL: Well(s).

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedCountry) {
          // Fetch cities
          setLoading(true);
          const url = new URL(`${API_URL}`);
          url.searchParams.append("country", selectedCountry);
          url.searchParams.append("featureCode", "PPL");
          url.searchParams.append("maxRows", "1000");
          url.searchParams.append("username", USERNAME);
          const response = await fetch(url.toString());
          const data = await response.json();

          // Assuming the API response data is an array of objects with 'toponymName' property
          let locationContainer = [];
          const citiesData = data.geonames.map((city) => city?.toponymName?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
          setCities(citiesData);

          // Fetch states
          // const stateUrl = new URL(`${API_URL}`);
          // stateUrl.searchParams.append("country", selectedCountry);
          // stateUrl.searchParams.append("featureCode", "ADM1");
          // stateUrl.searchParams.append("maxRows", "1000");
          // stateUrl.searchParams.append("username", USERNAME);
          // const stateResponse = await fetch(stateUrl.toString());
          // const stateData = await stateResponse.json();
          // const statesData = stateData.geonames.map(
          //   (state) => state?.toponymName
          // );
          // setStates(statesData);

          // Fetch postal codes
          // const postCodeUrl = new URL(`${API_URL}`);
          // postCodeUrl.searchParams.append("country", selectedCountry);
          // postCodeUrl.searchParams.append("featureCode", "PPLA");
          // postCodeUrl.searchParams.append("maxRows", "1000");
          // postCodeUrl.searchParams.append("username", USERNAME);
          // const postCodeResponse = await fetch(postCodeUrl.toString());
          // const postCodeData = await postCodeResponse.json();
          // const citiesDatas = postCodeData.geonames.map((city) =>
          //   locationContainer.push(city)
          // );
          // console.log("locationContainer", locationContainer);
          // const postCodesData = postCodeData.geonames.map(
          //   (postCode) => postCode?.postalCode
          // );
          // setPostCodes(postCodesData);
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
    // postCodes,
    // states,
    loading,
  };
};

export default useCityFetcher;
