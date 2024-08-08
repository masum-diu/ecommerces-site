import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BiMap } from "react-icons/bi";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Padding } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AES } from "crypto-js";
import moment from "moment";
import { useGetCountryListWithShippingChargeQuery } from "../src/features/api/apiSlice";
var CryptoJS = require("crypto-js");
const FlashPage = ({ title }) => {
  const router = useRouter();
  const [country, setCountry] = useState("Bangladesh");
  const [conversionRates, setConversionRates] = useState(null);
  const [language, setLanguage] = useState(10);
  const {
    data: countryData,
    isError: countryError,
    isLoading: countryLoading,
  } = useGetCountryListWithShippingChargeQuery();

  useEffect(() => {
    if (countryData?.length > 0) {
      // Set the country to the first country's name in the list if it exists
      setCountry(countryData[0]?.country_name);
    }
  }, [countryData]);
  const expiresInKey = "expiresIn";
  const secretKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MDQ2MTg5OSwiaWF0IjoxNjkwNDYxODk5fQ.XpwsAA-b8YVaYW26LBUHLRXIzWU1wgTP6cIrLbs7qEw";
  const currencies = [
    { label: "BDT", year: 1994, value: "BDT" },
    { label: "USD", year: 1972, value: "USD" },
    { label: "EUR", year: 1972, value: "EUR" },
    { label: "GBP", year: 1972, value: "GBP" },
    { label: "AUD", year: 1972, value: "AUD" },
    { label: "JPY", year: 1972, value: "JPY" },
    { label: "SGD", year: 1972, value: "SGD" },
  ];
  const [currency, setCurrency] = useState(currencies[0].label);
  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  // const [currency, setCurrency] = React.useState(10);
  useEffect(() => {
    async function fetchExchangeRates(baseCurrency) {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/BDT`
      );
      const data = await response.json();
      return data.rates;
    }
    if (currency) {
      fetchExchangeRates(currency).then((rates) => setConversionRates(rates));
    }
  }, [currency]);

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {},
  });

  const handleSelectChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const onSubmit = async (data) => {
    localStorage.setItem("currency", data.currency);
    const hasCurrency = localStorage.getItem("currency");
    if (hasCurrency && conversionRates) {
      router.push("/shop");
      const rawRate = conversionRates[currency].toString();
      const rate = AES.encrypt(rawRate, secretKey).toString();
      localStorage.setItem("rate", rate);

      // Set current date and time in local storage
      const currentDateAndTime = moment().toISOString();
      localStorage.setItem(expiresInKey, currentDateAndTime);
    }
  };
  return (
    <>
      <Head>
        <title>{title ? title + "- Aranya" : "Aranya"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundImage:
            "url('https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678608771/aranya-product/boishakh/ZS002030.jpg')",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ boxShadow: "none", backgroundColor: "#fff" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Stack direction={"row"} alignItems="center">
              <img
                src="/assets/headerLogo.png"
                alt=""
                style={{ width: "90vw", maxWidth: "80px" }}
              />
            </Stack>

            {/* <Stack direction={"row"} alignItems="center">
              <IconButton aria-label="">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </IconButton>
              <Typography variant="cardHeader" color="#1B3148">
                BD
              </Typography>
            </Stack> */}
          </Toolbar>
        </AppBar>
        <Box sx={{ pt: { lg: 29, xs: 13 } }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction={"column"}
              alignItems={"center"}
              sx={{
                // width: "100vw",
                maxWidth: { xs: "350px", md: "500px" },
                position: "relative",
                borderRadius: "5px",
                // pt: { lg: 29, xs: 13 },
                mx: { lg: 20, xs: "auto" },
                /* backgroundImage:
                  "url(https://res.cloudinary.com/diyc1dizi/image/upload/fl_preserve_transparency/v1715493963/Aranya%20BG/Aranya-BG.jpg?_s=public-apps)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat", */
              }}
              spacing={1}
            >
              <Stack
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  borderRadius: "5px",
                  width: "100%",
                  // bgcolor: "red",
                  zIndex: 1,
                  backgroundColor: "rgb(231 228 228 / 50%)",
                }}
              ></Stack>
              <Stack
                direction={"column"}
                gap={2}
                sx={{ zIndex: 2, pt: 4, pb: 8, width: "90%" }}
              >
                <Typography
                  variant="homeFlash"
                  color="#1B3148"
                  className="bold"
                  sx={{ color: "#1B3148", fontSize: "20px", zIndex: 2 }}
                >
                  Select your shipping country
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  onChange={handleChange}
                  size="small"
                  sx={{ backgroundColor: "white", color: "#1B3148" }}
                >
                  <MenuItem color="#1B3148" value={""} disabled>
                    <Typography color="#1B3148" className="bold">
                      Select Shipping Country
                    </Typography>
                  </MenuItem>
                  {countryData &&
                    countryData.map((country, index) => (
                      <MenuItem color="#1B3148" value={country.country_name}>
                        <Typography color="#1B3148" className="bold">
                          {country.country_name}
                        </Typography>
                      </MenuItem>
                    ))}
                </Select>
                <Typography
                  variant="homeFlash"
                  color="#1B3148"
                  className="bold"
                >
                  Select your currency
                </Typography>
                <Select
                  id="currency"
                  {...register("currency", {
                    required: {
                      value: true,
                      message: "Select currency*",
                    },
                  })}
                  onClick={() => trigger("currency")}
                  error={Boolean(errors.currency)}
                  size="small"
                  value={currency}
                  sx={{ color: "#1B3148" }}
                  onChange={(e) => handleSelectChangeCurrency(e)}
                >
                  {currencies.map((towns, index) => (
                    <MenuItem key={index} value={towns.value}>
                      <Typography sx={{ color: "#1B3148" }} className="bold">
                        {towns.label}
                      </Typography>
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={"India"}>India</MenuItem> */}
                </Select>
                {/* {errors.currency && (
                <p style={{ color: "red" }}>{errors.currency?.message}</p>
              )} */}
                {/* <Typography
                  variant="homeFlash"
                  color="#1B3148"
                  className="bold"
                >
                  Language
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  onChange={handleLanguage}
                  size="small"
                  sx={{ backgroundColor: "white", color: "#1B3148" }}
                >
                  <MenuItem value={20} disabled>
                    <Typography className="bold"> Select Language </Typography>
                  </MenuItem>
                  <MenuItem value={10} sx>
                    <Typography className="bold">English</Typography>
                  </MenuItem>
                </Select> */}
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              alignItems={"center"}
              sx={{
                // width: "90vw",
                maxWidth: { xs: "350px", md: "500px" },
                mx: { lg: 20, xs: "auto" },
              }}
              mt={3}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1B3148",
                  "&:hover": {
                    bgcolor: "#1B3148",
                  },
                  width: "100%",
                }}
                type="submit"
                // onClick={() => router.push("/shop")}
              >
                continue
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default FlashPage;
