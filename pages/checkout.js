import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState, useRef, useContext } from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import { useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import instance from "./api/api_instance";
import LoginModal from "../components/LoginModal";
import GuestCheckout from "../components/GuestCheckout";
import USER_CONTEXT from "../components/userContext";

const checkout = ({ someProp }) => {
  const cart = useSelector((state) => state.cart.cart);
  const [distict, setDistict] = useState("Select Country");
  const [distict1, setDistict1] = useState("Select Country");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const isInitialMount = useRef(true);
  const subTotal = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalPriceWithTax = useSelector(
    (state) => state.cart.totalPriceWithTax
  );
  const [totalPrice, setSubtotal] = useState(subTotal);
  const [isDhakaChecked, setIsDhakaChecked] = useState(false);
  const [isOutSideChecked, setIsOutSideChecked] = useState(false);
  const [isFromShowRoomChecked, setIsFromShowRoomChecked] = useState(false);
  const [isSameAddressChecked, setIsSameAddressChecked] = useState(false);
  const [total, setTotal] = useState(totalPriceWithTax);
  const [error, setError] = useState({ initialState: true });
  const [openLoginModal, setLoginModal] = useState(false);
  const [payment, setPayment] = useState("");
  const [enable, setEnable] = useState(true);
  // const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  // const [hasToken, setHasToken] = useState(false);
  const { hasToken, setHasToken, isPlaceOrder, setIsPlaceOrder } =
    useContext(USER_CONTEXT);
  const router = useRouter();
  useEffect(() => {
    if (isDhakaChecked === true) {
      setTotal(totalPriceWithTax + 100);
    }
    if (isOutSideChecked === true) {
      setTotal(totalPriceWithTax + 250);
    }
    if (isFromShowRoomChecked === true) {
      setTotal(totalPriceWithTax + 0);
    }
  }, [isDhakaChecked, isOutSideChecked, isFromShowRoomChecked]);

  useEffect(() => {
    if (isPlaceOrder === true) {
      const securePage = async () => {
        const token = localStorage.getItem("acesstoken");
        console.log("error status", error);
        if (!token) {
          setLoginModal(true);
        }
        if (token) {
          setHasToken(true);
        }
      };
      securePage();
    }
  }, [isPlaceOrder, hasToken, error]);

  useEffect(() => {
    if (hasToken === false && isGuestCheckout === true && cart?.length > 0) {
      instance
        .post("/guest-order", orderInfo, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(async (result) => {
          if (result?.data?.type == "online") {
            const response = JSON.parse(result?.data?.payment);
            await window.location.replace(response?.data);
          }
          if (result?.data?.type == "cash") {
            // const response = JSON.parse(result?.data);
            // await window.location.replace(response?.data);
            // console.log(result)
            // router.push("/payment")
            router.push({
              pathname: "/payment",
              query: {
                payment: "success",
                orderid: result?.data?.order_id,
                type: "cash",
              },
            });
          }
        })
        .catch((err) => {});
      setIsGuestCheckout(false);
    }
  }, [
    isPlaceOrder,
    orderInfo,
    isGuestCheckout,
    hasToken,
    isSameAddressChecked,
  ]);

  // handling Different Form Events
  const handleDistict = (event) => {
    setDistict(event.target.value);
  };
  const handleDistict1 = (event) => {
    setDistict1(event.target.value);
  };

  const handleDhakaSelected = () => {
    setIsDhakaChecked(!isDhakaChecked);
    setIsOutSideChecked(false);
    setIsFromShowRoomChecked(false);
  };
  const handleOutSideDhakaSelected = () => {
    setIsOutSideChecked(!isOutSideChecked);
    setIsDhakaChecked(false);
    setIsFromShowRoomChecked(false);
  };
  const handleShowRoomSelected = () => {
    setIsFromShowRoomChecked(!isFromShowRoomChecked);
    setIsDhakaChecked(false);
    setIsOutSideChecked(false);
  };

  const handleSameAddressSelected = () => {
    setIsSameAddressChecked(!isSameAddressChecked);
  };
  const token = localStorage.getItem("acesstoken");
  const handlePlaceOrder = () => {
    setIsPlaceOrder(true);
  };

  if (token) {
    setHasToken(true);
  }

  // Handling React Hook Rorm
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      first_name_billing: "",
      last_name_billing: "",
      street_address_billing: "",
      city_billing: "",
      country_billing: "",
      post_code_billing: "",
      phone_billing: "",
      email_billing: "",
      first_name_shipping: "",
      last_name_shipping: "",
      street_address_shipping: "",
      apartment_address_billing: "",
      apartment_address_shipping: "",
      city_shipping: "",
      country_shipping: "",
      post_code_shipping: "",
      phone_shipping: "",
      email_shipping: "",
      isSameAddress: false,
      paymentMethod: "",
      deliveryMethod: "",
    },
  });
  const allFieldsFilled = watch();
  /* useEffect(() => {
    console.log("no errors", errors);
    if (errors.length < 0) {
      setError(false);
    }
  }, [error, errors]); */
  const onSubmit = async (data) => {
    setIsPlaceOrder(true);
    setIsSameAddress(isSameAddressChecked);
    setOrderInfo({
      data: data,
      cart: cart,
      totalPrice: subTotal,
      totalPriceWithTax: totalPriceWithTax,
      finalPrice: Math.ceil(total),
      totalAmount: totalAmount,
      isSameAddress: isSameAddressChecked,
      isGuestCheckout: true,
    });
    if (hasToken === true && cart?.length > 0) {
      instance
        .post(
          "/order",
          {
            data: data,
            cart: cart,
            totalPrice: subTotal,
            totalPriceWithTax: totalPriceWithTax,
            finalPrice: Math.ceil(total),
            totalAmount: totalAmount,
            isSameAddress: isSameAddressChecked,
            isGuestCheckout: isGuestCheckout,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("acesstoken"),
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(async (result) => {
          setIsPlaceOrder(false);
          if (result?.data?.type == "online") {
            const response = JSON.parse(result?.data?.payment);
            await window.location.replace(response?.data);
          }
          if (result?.data?.type == "cash") {
            //  const response = JSON.parse(result?.data);
            //  await window.location.replace(response?.data);
            // console.log(result)

            router.push({
              pathname: "/payment",
              query: {
                payment: "success",
                orderid: result?.data?.order_id,
                type: "cash",
              },
            });
          }
          // const response = JSON.parse(result?.data?.payment);
          // await window.location.replace(response?.data);
        })
        .catch((err) => {});
    }

    // console.log("geust checkout output", isGuestCheckout);
  };
  const handleSelectChange = (event) => {
    setValue("country_billing", event.target.value, { shouldValidate: true });
    setDistict(event.target.value);
  };
  const handleSelectChangeShipping = (event) => {
    setValue("country_shipping", event.target.value, { shouldValidate: true });
    setDistict1(event.target.value);
  };
  // Getting Billing Realtime Data
  const watchSelectInput = watch("country_shipping");
  const firstName = useWatch({ control, name: "first_name_billing" });
  const lastName = useWatch({ control, name: "last_name_billing" });
  const streetAddress = useWatch({ control, name: "street_address_billing" });
  const apartmentAddress = useWatch({
    control,
    name: "apartment_address_billing",
  });
  const cityAddress = useWatch({ control, name: "city_billing" });
  const country = useWatch({ control, name: "country_billing" });
  const postBilling = useWatch({ control, name: "post_code_billing" });
  const phoneBilling = useWatch({ control, name: "phone_billing" });
  const emailBilling = useWatch({ control, name: "email_billing" });

  const firstNameSh = useWatch({ control, name: "first_name_shipping" });
  const lastNameSh = useWatch({ control, name: "last_name_shipping" });
  const streetAddressSh = useWatch({
    control,
    name: "street_address_shipping",
  });
  const apartmentAddressSh = useWatch({
    control,
    name: "apartment_address_shipping",
  });
  const cityAddressSh = useWatch({ control, name: "city_shipping" });
  const countrySh = useWatch({ control, name: "country_shipping" });
  const postBillingSh = useWatch({ control, name: "post_code_shipping" });
  const phoneBillingSh = useWatch({ control, name: "phone_shipping" });
  const emailBillingSh = useWatch({ control, name: "email_shipping" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const deliveryMethod = useWatch({ control, name: "deliveryMethod" });
  const termsAndCondition = useWatch({ control, name: "termsAndConditions" });
  const showInputField = watch("isSameAddress");
  useEffect(() => {
    setPayment(paymentMethod);
  }, [payment, paymentMethod]);

  const errorObject = Object.keys(errors).length;

  useEffect(() => {
    if (errorObject > 0) {
      setError(errors);
    }
  }, [error, errorObject]);
  useEffect(() => {
    if (isSameAddressChecked === false) {
      setEnable(true);
      if (
        firstName &&
        lastName &&
        streetAddress &&
        apartmentAddress &&
        cityAddress &&
        country &&
        postBilling &&
        phoneBilling &&
        emailBilling &&
        firstNameSh &&
        lastNameSh &&
        streetAddressSh &&
        apartmentAddressSh &&
        cityAddressSh &&
        countrySh &&
        phoneBillingSh &&
        emailBillingSh &&
        Object.keys(errors).length === 0
      ) {
        setEnable(false);
      }
    }
    if (isSameAddressChecked === true) {
      setEnable(true);
      if (
        firstName &&
        lastName &&
        streetAddress &&
        apartmentAddress &&
        cityAddress &&
        country &&
        postBilling &&
        phoneBilling &&
        emailBilling &&
        Object.keys(errors).length === 0
      ) {
        setEnable(false);
      }
    }
  }, [
    isSameAddressChecked,
    firstName,
    lastName,
    streetAddress,
    apartmentAddress,
    cityAddress,
    country,
    postBilling,
    phoneBilling,
    emailBilling,
    firstNameSh,
    lastNameSh,
    streetAddressSh,
    apartmentAddressSh,
    cityAddressSh,
    countrySh,
    phoneBillingSh,
    emailBillingSh,
    errors,
    isPlaceOrder,
  ]);
  return (
    <>
      <HomePageIntro title={"Checkout "} />
      <Box
        sx={{
          py: 15,
          width: { lg: "90%", xs: "100%" },
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="header1"
            color="initial"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Checkout
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", margin: "0 auto" }}
          >
            <Grid
              container
              pt={5}
              xs={12}
              columnGap={5}
              rowGap={4}
              sx={{ width: "90%", mx: "auto" }}
            >
              {/* Billing form */}
              <Grid item lg={4} sx={{ width: "100%" }}>
                <Typography variant="header1" color="initial">
                  BILLING DETAILS
                </Typography>
                <Stack direction={"column"} spacing={2} mt={{ lg: 7.5 }}>
                  <Typography variant="cardHeader1" color="initial">
                    FIRST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("first_name_billing", {
                      required: {
                        value: true,
                        message: "First Name Required",
                      },
                    })}
                    onKeyUp={() => trigger("first_name_billing")}
                    error={Boolean(errors.first_name_billing)}
                    // onChange={}
                    placeholder="First Name *"
                    size="small"
                  />
                  {errors.first_name_billing && (
                    <p style={{ color: "red" }}>
                      {errors.first_name_billing?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    LAST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("last_name_billing", {
                      required: {
                        value: true,
                        message: "Last Name Required",
                      },
                    })}
                    onKeyUp={() => trigger("last_name_billing")}
                    error={Boolean(errors.last_name_billing)}
                    placeholder="Last Name *"
                    size="small"
                  />
                  {errors.last_name_billing && (
                    <p style={{ color: "red" }}>
                      {errors.last_name_billing?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    STREET ADDRESS *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("street_address_billing", {
                      required: {
                        value: true,
                        message: "House and Street Address Required",
                      },
                    })}
                    onKeyUp={() => trigger("street_address_billing")}
                    error={Boolean(errors.street_address_billing)}
                    placeholder="House Number and street name"
                    size="small"
                  />
                  {errors.street_address_billing && (
                    <p style={{ color: "red" }}>
                      {errors.street_address_billing?.message}
                    </p>
                  )}
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("apartment_address_billing", {
                      required: {
                        value: true,
                        message: "Apartment Address Required",
                      },
                    })}
                    onKeyUp={() => trigger("apartment_address_billing")}
                    error={Boolean(errors.apartment_address_billing)}
                    placeholder="Apartment suite, unit, etc."
                    size="small"
                  />
                  {errors.apartment_address_billing && (
                    <p style={{ color: "red" }}>
                      {errors.apartment_address_billing?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    TOWN / CITY *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("city_billing", {
                      required: {
                        value: true,
                        message: "Town/City is Required",
                      },
                    })}
                    onKeyUp={() => trigger("city_billing")}
                    error={Boolean(errors.city_billing)}
                    placeholder="Town / City"
                    size="small"
                  />
                  {errors.city_billing && (
                    <p style={{ color: "red" }}>
                      {errors.city_billing?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    COUNTRY *
                  </Typography>
                  {/* <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Company Name (Optional)"
                  size="small"
                /> */}

                  <Select
                    id="country_billing"
                    {...register("country_billing", {
                      required: {
                        value: true,
                        message: "Country is Required",
                      },
                    })}
                    onMouseLeave={() => trigger("country_billing")}
                    error={Boolean(errors.country_billing)}
                    size="small"
                    value={distict}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"Select Country"} disabled>
                      Select Country
                    </MenuItem>
                    <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                    {/* <MenuItem value={"India"}>India</MenuItem> */}
                  </Select>
                  {errors.country_billing && (
                    <p style={{ color: "red" }}>
                      {errors.country_billing?.message}
                    </p>
                  )}
                  {/* <Select label="Age"  /> */}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    POSTCODE / ZIP (OPTIONAL)
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("post_code_billing", {
                      required: {
                        value: false,
                        message: "Country is Required",
                      },
                    })}
                    error={Boolean(errors.post_code_billing)}
                    placeholder="Postcode / zip (Optional)"
                    size="small"
                  />
                  {errors.post_code_billing && (
                    <p style={{ color: "red" }}>
                      {errors.post_code_billing?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    PHONE *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("phone_billing", {
                      required: {
                        value: true,
                        message: "Phone Number is Required",
                      },
                    })}
                    onKeyUp={() => trigger("phone_billing")}
                    error={Boolean(errors.phone_billing)}
                    placeholder="Phone *"
                    size="small"
                  />
                  {errors.phone_billing && (
                    <p style={{ color: "red" }}>
                      {errors.phone_billing?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    EMAIL ADDRESS *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("email_billing", {
                      required: {
                        value: true,
                        message: "Email Address is Required",
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "This is not a valid email",
                      },
                    })}
                    onKeyUp={() => trigger("email_billing")}
                    error={Boolean(errors.email_billing)}
                    placeholder="Email Address *"
                    size="small"
                  />
                  {errors.email_billing && (
                    <p style={{ color: "red" }}>
                      {errors.email_billing?.message}
                    </p>
                  )}
                </Stack>
              </Grid>

              {/* Shipping Form */}
              <Grid item lg={4} sx={{ width: "100%" }}>
                <Typography variant="header1" color="initial">
                  SHIPPING DETAILS
                </Typography>
                <Stack direction={"column"} spacing={2} sx={{marginTop:"17px"}}>
                  <Stack
                    direction={"row"}
                    justifyContent="left"
                    alignItems="center"
                    mt={1}
                    spacing={1}
                  >
                    <input
                      type="checkbox"
                      {...register("isSameAddress")}
                      // name="isSameAddress"
                      control={control}
                      id=""
                      onClick={() => handleSameAddressSelected()}
                    />
                    <Typography variant="cardLocation1" color="initial">
                      Same As Billing Address.
                    </Typography>
                  </Stack>
                  <Typography variant="cardHeader1" color="initial">
                    FIRST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("first_name_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "First Name Required",
                      },
                    })}
                    onKeyUp={() => trigger("first_name_shipping")}
                    error={Boolean(errors.first_name_shipping)}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false
                        ? "First Name *"
                        : firstName
                    }
                    size="small"
                  />

                  {errors.first_name_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.first_name_shipping?.message}
                      </p>
                    )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    LAST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("last_name_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Last Name Required",
                      },
                    })}
                    onKeyUp={() => trigger("last_name_shipping")}
                    error={Boolean(errors.last_name_shipping)}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false ? "Last Name *" : lastName
                    }
                    size="small"
                  />
                  {errors.last_name_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.last_name_shipping?.message}
                      </p>
                    )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    STREET ADDRESS *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("street_address_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "House and Street Address Required",
                      },
                    })}
                    onKeyUp={() => trigger("street_address_shipping")}
                    error={Boolean(errors.street_address_shipping)}
                    // onChange={}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false
                        ? "House Number and street name"
                        : streetAddress
                    }
                    // placeholder="House Number and street name"
                    size="small"
                  />
                  {errors.street_address_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.street_address_shipping?.message}
                      </p>
                    )}
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("apartment_address_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Apartment Address Required",
                      },
                    })}
                    onKeyUp={() => trigger("apartment_address_shipping")}
                    error={Boolean(errors.apartment_address_shipping)}
                    // onChange={}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false
                        ? "Apartment suite, unit, etc."
                        : apartmentAddress
                    }
                    // placeholder="Apartment suite, unit, etc."
                    size="small"
                  />
                  {errors.apartment_address_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.apartment_address_shipping?.message}
                      </p>
                    )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    TOWN / CITY *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("city_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Town/City is Required",
                      },
                    })}
                    onKeyUp={() => trigger("city_shipping")}
                    error={Boolean(errors.city_shipping)}
                    // onChange={}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false
                        ? "Town / City"
                        : cityAddress
                    }
                    // placeholder="Town / City"
                    size="small"
                  />
                  {errors.city_shipping && isSameAddressChecked === false && (
                    <p style={{ color: "red" }}>
                      {errors.city_shipping?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    COUNTRY *
                  </Typography>

                  <Select
                    {...register("country_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Country is Required",
                      },
                    })}
                    disabled={isSameAddressChecked === false ? false : true}
                    onMouseLeave={() => trigger("country_shipping")}
                    error={Boolean(errors.country_shipping)}
                    id="demo-simple-select"
                    size="small"
                    value={isSameAddressChecked === false ? distict1 : distict}
                    onChange={handleSelectChangeShipping}
                  >
                    <MenuItem value={"Select Country"} disabled>
                      Select Country
                    </MenuItem>
                    <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                  </Select>
                  {errors.country_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.country_shipping?.message}
                      </p>
                    )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    POSTCODE / ZIP (OPTIONAL)
                  </Typography>

                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("post_code_shipping", {
                      required: {
                        value: false,
                        message: "Post Code Required",
                      },
                    })}
                    error={Boolean(errors.post_code_shipping)}
                    // onChange={}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false
                        ? "Postcode / zip (Optional)"
                        : postBilling
                    }
                    // placeholder="Postcode / zip (Optional)"
                    size="small"
                  />
                  {errors.post_code_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.post_code_shipping?.message}
                      </p>
                    )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    PHONE *
                  </Typography>

                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("phone_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Phone Number is Required",
                      },
                    })}
                    onKeyUp={() => trigger("phone_shipping")}
                    error={Boolean(errors.phone_shipping)}
                    // onChange={}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false ? "Phone *" : phoneBilling
                    }
                    // placeholder="Phone *"
                    size="small"
                  />
                  {errors.phone_shipping && isSameAddressChecked === false && (
                    <p style={{ color: "red" }}>
                      {errors.phone_shipping?.message}
                    </p>
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    EMAIL ADDRESS *
                  </Typography>

                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("email_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Email Address is Required",
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "This is not a valid email",
                      },
                    })}
                    onKeyUp={() => trigger("email_shipping")}
                    error={Boolean(errors.email_shipping)}
                    // onChange={}
                    disabled={isSameAddressChecked === false ? false : true}
                    placeholder={
                      isSameAddressChecked === false
                        ? "Email Address *"
                        : emailBilling
                    }
                    // placeholder="Email Address *"
                    size="small"
                  />
                  {errors.email_shipping && isSameAddressChecked === false && (
                    <p style={{ color: "red" }}>
                      {errors.email_shipping?.message}
                    </p>
                  )}
                </Stack>
              </Grid>

              <Grid item lg={3} mt={4} xs={12}>
                <Paper elevation={3} mb={1} sx={{ width: "100%" }}>
                  <Stack
                    sx={{ width: "100%", mx: "auto", p: 2 }}
                    direction={"column"}
                    spacing={2}
                  >
                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        className="bold"
                      >
                        SUBTOTAL :
                      </Typography>
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        className="bold"
                      >
                        BDT {subTotal}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} spacing={2} mb={5} width="100%">
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        mt={1}
                        className="bold"
                      >
                        SHIPPING
                      </Typography>
                      <Controller
                        rules={{
                          required: {
                            value: true,
                            message: "Please Select a Shipping Location",
                          },
                        }}
                        control={control}
                        name="deliveryMethod"
                        // onKeyUp={() => trigger("deliveryMethod")}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            <FormControlLabel
                              value="insideDhaka"
                              control={<Radio onClick={handleDhakaSelected} />}
                              label={
                                <Typography
                                  variant="cardHeader"
                                  className="bold"
                                  mb={0.6}
                                >
                                  DHAKA : BDT 100
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="outSideDhaka"
                              control={
                                <Radio onClick={handleOutSideDhakaSelected} />
                              }
                              label={
                                <Typography
                                  variant="cardHeader"
                                  className="bold"
                                  mb={0.6}
                                >
                                  OUTSIDE DHAKA : BDT 250
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="pickFromShowroom"
                              control={
                                <Radio onClick={handleShowRoomSelected} />
                              }
                              label={
                                <Typography
                                  variant="cardHeader"
                                  className="bold"
                                  mb={0.6}
                                >
                                  PICK FROM SHOWROOM
                                </Typography>
                              }
                            />
                          </RadioGroup>
                        )}
                      />
                    </Stack>
                    <br />
                    <br />
                    {errors.deliveryMethod && (
                      <p style={{ color: "red" }}>
                        {errors.deliveryMethod?.message}
                      </p>
                    )}

                    <Divider />
                    <Stack direction={"row"} spacing={7} width="100%">
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        className="bold"
                      >
                        TAX :
                      </Typography>
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        className="bold"
                        sx={{marginLeft:"72px!important"}}
                      >
                        BDT {Math.ceil(totalPriceWithTax - subTotal)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} spacing={7} width="100%">
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        className="bold"
                      >
                        TOTAL :
                      </Typography>
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        className="bold"
                      >
                        BDT {Math.ceil(total)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"column"} spacing={9} width="100%">
                      <Controller
                        rules={{
                          required: {
                            value: true,
                            message: "Please Select a Payment Method",
                          },
                        }}
                        control={control}
                        name="paymentMethod"
                        // onKeyUp={() => trigger("paymentMethod")}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            <FormControlLabel
                              value="online"
                              control={<Radio />}
                              label={
                                <Typography
                                  variant="cardHeader"
                                  className="bold"
                                  mb={0.6}
                                >
                                  Online Payment
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="cash"
                              control={<Radio />}
                              label={
                                <Typography
                                  variant="cardHeader"
                                  className="bold"
                                  mb={0.6}
                                >
                                  Cash On Delivery
                                </Typography>
                              }
                            />
                          </RadioGroup>
                        )}
                      />
                    </Stack>
                    {errors.paymentMethod && (
                      <p style={{ color: "red" }}>
                        {errors.paymentMethod?.message}
                      </p>
                    )}
                    <Stack
                      direction={"row"}
                      width="100%"
                      alignItems={"center"}
                      spacing={1}
                    >
                      <Controller
                        name="termsAndConditions"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Please select an option" }}
                        render={({ field }) => (
                          <>
                            <input
                              name="termsAndConditions"
                              type="checkbox"
                              id=""
                              size="small"
                              {...field}
                              error={Boolean(errors.mySelect)}
                              // onKeyUp={() => trigger("termsAndConditions")}
                            />
                          </>
                        )}
                      />

                      <Typography variant="cardLocation123">
                        I have read and agree to the terms and conditions *
                      </Typography>
                    </Stack>
                    {errors.termsAndConditions && (
                      <small
                        style={{
                          fontSize: "10px",
                          color: "red",
                          marginLeft: "2px",
                        }}
                        error
                      >
                        {errors.termsAndConditions.message}
                      </small>
                    )}
                    <Button
                      disabled={enable}
                      variant="contained"
                      color="background2"
                      type="submit"
                      onClick={() => setIsPlaceOrder(true)}
                    >
                      place order
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Box>

      <Footer />
      <LoginModal
        open={openLoginModal}
        setOpen={setLoginModal}
        isGuestCheckout={isGuestCheckout}
        setIsGuestCheckout={setIsGuestCheckout}
        setHasToken={setHasToken}
        // isPlaceOrder={isPlaceOrder}
        // setIsPlaceOrder={setIsPlaceOrder}
      ></LoginModal>
      {/* <GuestCheckout
        isGuestCheckout={isGuestCheckout}
        setIsGuestCheckout={setIsGuestCheckout}
      ></GuestCheckout> */}
    </>
  );
};

export default checkout;
