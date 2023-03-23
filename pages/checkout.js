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
  const [totalPrice, setSubtotal] = useState(subTotal);
  const [isDhakaChecked, setIsDhakaChecked] = useState(false);
  const [isOutSideChecked, setIsOutSideChecked] = useState(false);
  const [isFromShowRoomChecked, setIsFromShowRoomChecked] = useState(false);
  const [isSameAddressChecked, setIsSameAddressChecked] = useState(false);
  const [total, setTotal] = useState(subTotal);
  const [openLoginModal, setLoginModal] = useState(false);
  const [payment, setPayment] = useState("");
  // const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  // const [hasToken, setHasToken] = useState(false);
  const { hasToken, setHasToken, isPlaceOrder, setIsPlaceOrder } =
    useContext(USER_CONTEXT);
  const router = useRouter();

  /* useEffect(() => {
    const token = localStorage.getItem("acesstoken");
    if (isInitialMount.current) {
      // Perform initial mount actions here
      isInitialMount.current = false;
    } else {
      // Perform actions on subsequent renders here
      if (!token) {
        setHasToken(false);
      }
    }
  }, [hasToken, localStorage.getItem("acesstoken"),isInitialMount.current,someProp]); */

  useEffect(() => {
    if (isDhakaChecked === true) {
      setTotal(subTotal + 100);
    }
    if (isOutSideChecked === true) {
      setTotal(subTotal + 250);
    }
    if (isFromShowRoomChecked === true) {
      setTotal(subTotal + 0);
    }
  }, [isDhakaChecked, isOutSideChecked, isFromShowRoomChecked]);

  useEffect(() => {
    if (isPlaceOrder === true) {
      const securePage = async () => {
        const token = localStorage.getItem("acesstoken");
        if (!token) {
          setLoginModal(true);
          // await toast.error("Please Login First");
          setHasToken(false);
          // await router.push("/addtocart");
          setIsPlaceOrder(false);
        }
        if (token) {
          setHasToken(true);
          // router.push("/checkout");
        }
      };
      securePage();
    }
  }, [isPlaceOrder, hasToken]);

  useEffect(() => {
    if (
      hasToken === false &&
      isGuestCheckout === true &&
      payment === "online"
    ) {
      instance
        .post("/guest-order", orderInfo, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(async (result) => {
          const response = JSON.parse(result?.data?.payment);
          await window.location.replace(response?.data);
        })
        .catch((err) => {});
    }
    setIsGuestCheckout(false);
  }, [isPlaceOrder, orderInfo, isGuestCheckout, hasToken]);

  /* useEffect(()=>{
    if (openLoginModal === false) {
          setGuestCheckoutModalOpen(true);
        }
  },[]) */
  // console.log("geust checkout output", isGuestCheckout);
  /*   useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const securePage = async () => {
      const token = await localStorage.getItem("acesstoken");
      if (!token) {
        setLoginModal(true);
        await toast.error("Please Login First");
        await router.push("/addtocart");
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []); */

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
  if (token) {
    setHasToken(true);
  }
  if (!token) {
    setHasToken(false);
  }

  // Handling React Hook Rorm
  const { register, handleSubmit, control } = useForm({
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

  const onSubmit = async (data) => {
    setIsPlaceOrder(true);
    setIsSameAddress(isSameAddressChecked);
    setOrderInfo({
      data: data,
      cart: cart,
      totalPrice: subTotal,
      totalAmount: totalAmount,
      isSameAddress: isSameAddressChecked,
      isGuestCheckout: true,
    });
    console.log("token", hasToken);
    if (hasToken === true && payment === "online") {
      instance
        .post(
          "/order",
          {
            data: data,
            cart: cart,
            totalPrice: subTotal,
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
          const response = JSON.parse(result?.data?.payment);
          await window.location.replace(response?.data);
        })
        .catch((err) => {});
    }

    // console.log("geust checkout output", isGuestCheckout);
  };

  // Getting Billing Realtime Data
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
  const method = useWatch({ control, name: "paymentMethod" });
  useEffect(() => {
    setPayment(method);
  }, [payment, method]);
  console.log("your log output", payment);
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
              <Grid item lg={4} sx={{ width: "100%" }}>
                <Typography variant="header1" color="initial">
                  BILLING DETAILS
                </Typography>
                <Stack direction={"column"} spacing={2} mt={{ lg: 10.3 }}>
                  <Typography variant="cardHeader1" color="initial">
                    FIRST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("first_name_billing", {
                      required: "First Name is required",
                    })}
                    // onChange={}
                    placeholder="First Name *"
                    size="small"
                  />
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
                      required: "Last Name is required",
                    })}
                    placeholder="Last Name *"
                    size="small"
                  />
                </Stack>
                {/* <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  COMPANY NAME (OPTIONAL)
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Company Name (Optional)"
                  size="small"
                />
              </Stack> */}
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
                      required: "Street Address is required",
                    })}
                    placeholder="House Number and street name"
                    size="small"
                  />
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("apartment_address_billing", {
                      required: "Apartment Address is required",
                    })}
                    placeholder="Apartment suite, unit, etc (optional)"
                    size="small"
                  />
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
                      required: "City is required",
                    })}
                    placeholder="Town / City"
                    size="small"
                  />
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
                    id="demo-simple-select"
                    {...register("country_billing")}
                    size="small"
                    value={distict}
                    onChange={handleDistict}
                  >
                    <MenuItem value={"Select Country"} disabled>
                      Select Country
                    </MenuItem>
                    <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                    {/* <MenuItem value={"India"}>India</MenuItem> */}
                  </Select>
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
                      required: "Post Code is required",
                    })}
                    placeholder="Postcode / zip (Optional)"
                    size="small"
                  />
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
                      required: "Phone is required",
                    })}
                    placeholder="Phone *"
                    size="small"
                  />
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
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "This is not a valid email",
                      },
                    })}
                    placeholder="Email Address *"
                    size="small"
                  />
                </Stack>
                {/* <Stack direction={"row"} alignItems="center" mt={1}>
                  <Controller
                    name="isSameAddress"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onClick={handleSameAddressSelected}
                        {...field}
                      />
                    )}
                  />
                  <Typography variant="cardLocation1" color="initial">
                    Same As Billing Address.
                  </Typography>
                </Stack> */}
              </Grid>
              <Grid item lg={4} sx={{ width: "100%" }}>
                <Typography variant="header1" color="initial">
                  SHIPPING DETAILS
                </Typography>
                <Stack direction={"column"} spacing={2} mt={2}>
                  <Stack
                    direction={"row"}
                    justifyContent="left"
                    alignItems="center"
                    mt={1}
                  >
                    <Controller
                      name="isSameAddress"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          onClick={() => handleSameAddressSelected()}
                          {...field}
                        />
                      )}
                    />
                    <Typography variant="cardLocation1" color="initial">
                      Same As Billing Address.
                    </Typography>
                  </Stack>
                  <Typography variant="cardHeader1" color="initial">
                    FIRST NAME *
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("first_name_shipping")}
                      // onChange={}
                      value={firstName}
                      disabled
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("first_name_shipping")}
                      // onChange={}
                      placeholder="First Name *"
                      size="small"
                    />
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    LAST NAME *
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("last_name_shipping")}
                      // onChange={}
                      value={lastName}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("last_name_shipping")}
                      // onChange={}
                      placeholder="Last Name *"
                      size="small"
                    />
                  )}
                </Stack>
                {/* <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  COMPANY NAME (OPTIONAL)
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Company Name (Optional)"
                  size="small"
                />
              </Stack> */}
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    STREET ADDRESS *
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("street_address_shipping")}
                      // onChange={}
                      value={streetAddress}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("street_address_shipping")}
                      // onChange={}
                      placeholder="House Number and street name"
                      size="small"
                    />
                  )}
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("apartment_address_shipping")}
                      // onChange={}
                      value={apartmentAddress}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("apartment_address_shipping")}
                      // onChange={}
                      placeholder="Apartment suite, unit, etc (optional)"
                      size="small"
                    />
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    TOWN / CITY *
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("city_shipping")}
                      // onChange={}
                      value={cityAddress}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("city_shipping")}
                      // onChange={}
                      placeholder="Town / City"
                      size="small"
                    />
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
                    {...register("country_shipping")}
                    id="demo-simple-select"
                    size="small"
                    disabled={isSameAddressChecked === true ? true : false}
                    value={isSameAddressChecked === true ? distict : distict1}
                    onChange={handleDistict1}
                  >
                    <MenuItem value={"Select Country"} disabled>Select Country</MenuItem>
                    <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                    {/* <MenuItem value={"India"}>India</MenuItem> */}
                  </Select>
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    POSTCODE / ZIP (OPTIONAL)
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("post_code_shipping")}
                      // onChange={}
                      value={postBilling}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("post_code_shipping")}
                      // onChange={}
                      placeholder="Postcode / zip (Optional)"
                      size="small"
                    />
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    PHONE *
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("phone_shipping")}
                      // onChange={}
                      value={phoneBilling}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("phone_shipping")}
                      // onChange={}
                      placeholder="Phone *"
                      size="small"
                    />
                  )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    EMAIL ADDRESS *
                  </Typography>
                  {isSameAddressChecked === true ? (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("email_shipping")}
                      // onChange={}
                      value={emailBilling}
                      disabled
                      readOnly
                      size="small"
                    />
                  ) : (
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("email_shipping", {
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "This is not a valid email",
                        },
                      })}
                      // onChange={}
                      placeholder="Email Address *"
                      size="small"
                    />
                  )}
                </Stack>
              </Grid>

              <Grid item lg={3} mt={4} xs={12}>
                <Paper elevation={3} mb={1} sx={{ width: "100%" }}>
                  <Stack
                    sx={{ width: "100%", mx: "auto", py: 2, px: 1.2 }}
                    direction={"column"}
                    spacing={2}
                  >
                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent="space-between"
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
                    <Stack direction={"row"} spacing={2} mb={5}>
                      <Typography
                        variant="cardHeader"
                        color="initial"
                        mt={1}
                        className="bold"
                      >
                        SHIPPING
                      </Typography>
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="deliveryMethod"
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
                    {/* <Stack direction={"row"} spacing={9}>
                      <Typography variant="cardHeader" color="initial">
                        TAX :
                      </Typography>
                      <Typography variant="cardHeader" color="initial">
                        BDT 12
                      </Typography>
                    </Stack> */}

                    <Divider />
                    <Stack direction={"row"} spacing={7}>
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
                        BDT {total}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"column"} spacing={9}>
                      {/* <Typography variant="cardHeader" color="initial">
                      TOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      BDT 12,160
                    </Typography> */}

                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="paymentMethod"
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
                    <Stack direction={"row"} width="100%" alignItems={"center"}>
                      <Controller
                        name="termsAndConditions"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Checkbox {...field} />}
                      />
                      <Typography variant="cardLocation1" color="initial">
                        I have read and agree to the terms and conditions *
                      </Typography>
                    </Stack>

                    <Button
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
