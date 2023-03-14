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
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import { useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import { useRef } from "react";
import instance from "./api/api_instance";

const checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [distict, setDistict] = useState("Select Country");
  const [distict1, setDistict1] = useState("Select Country");
  const [loading, setLoading] = useState(true);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const dataFetchedRef = useRef(false);
  const subTotal = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [totalPrice, setSubtotal] = useState(subTotal);
  const [isDhakaChecked, setIsDhakaChecked] = useState(false);
  const [isOutSideChecked, setIsOutSideChecked] = useState(false);
  const [isFromShowRoomChecked, setIsFromShowRoomChecked] = useState(false);
  const [isSameAddressChecked, setIsSameAddressChecked] = useState(false);
  const [total, setTotal] = useState(subTotal);
  const router = useRouter();

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
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const securePage = async () => {
      const token = await localStorage.getItem("acesstoken");
      if (!token) {
        await toast.error("Please Login First");
        await router.push("/addtocart");
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);

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
    console.log("your log output", data);
    setIsSameAddress(data?.isSameAddress);
    instance
      .post(
        "/order",
        {
          data: data,
          cart: cart,
          totalPrice: subTotal,
          totalAmount: totalAmount,
          isSameAddress: isSameAddress,
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
        const response = JSON.parse(result?.data?.payment);
        await window.location.replace(response?.data);
      })
      .catch((err) => {});
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
                <Stack direction={"column"} spacing={2} mt={2}>
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
                    <MenuItem value={"India"}>India</MenuItem>
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
                <Stack direction={"row"} alignItems="center" mt={1}>
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
                </Stack>
              </Grid>
              <Grid item lg={4} sx={{ width: "100%" }}>
                <Typography variant="header1" color="initial">
                  SHIPPING DETAILS
                </Typography>
                <Stack direction={"column"} spacing={2} mt={2}>
                  <Typography variant="cardHeader1" color="initial">
                    FIRST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    {...register("first_name_shipping", {
                      required: "First Name is required",
                    })}
                    // onChange={}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true ? firstName : "First Name *"
                    }
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
                    {...register("last_name_shipping", {
                      required: "Last Name is required",
                    })}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true ? lastName : "Last Name *"
                    }
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
                    {...register("street_address_shipping", {
                      required: "Street Address is required",
                    })}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true
                        ? streetAddress
                        : "House Number and street name"
                    }
                    size="small"
                  />
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true
                        ? apartmentAddress
                        : "Apartment suite, unit, etc (optional)"
                    }
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
                    {...register("city_shipping", {
                      required: "City is required",
                    })}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true
                        ? cityAddress
                        : "Town / City"
                    }
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
                    {...register("country_shipping")}
                    id="demo-simple-select"
                    size="small"
                    disabled={isSameAddressChecked === true ? true : false}
                    value={isSameAddressChecked === true ? distict : distict1}
                    onChange={handleDistict1}
                  >
                    <MenuItem value={"Select Country"}>Select Country</MenuItem>
                    <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                    <MenuItem value={"India"}>India</MenuItem>
                  </Select>
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
                    {...register("post_code_shipping", {
                      required: "Post Code is required",
                    })}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true
                        ? postBilling
                        : "Postcode / zip (Optional)"
                    }
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
                    {...register("phone_shipping", {
                      required: "Phone is required",
                    })}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true ? phoneBilling : "Phone *"
                    }
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
                    {...register("email_shipping", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "This is not a valid email",
                      },
                    })}
                    disabled={isSameAddressChecked === true ? true : false}
                    placeholder={
                      isSameAddressChecked === true
                        ? emailBilling
                        : "Email Address *"
                    }
                    size="small"
                  />
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
                      <Typography variant="cardHeader" color="initial">
                        SUBTOTAL :
                      </Typography>
                      <Typography variant="cardHeader" color="initial">
                        ৳ {subTotal}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} spacing={2} mb={5}>
                      <Typography variant="cardHeader" color="initial" mt={1}>
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
                              label="DHAKA : ৳ 100"
                            />
                            <FormControlLabel
                              value="outSideDhaka"
                              control={
                                <Radio onClick={handleOutSideDhakaSelected} />
                              }
                              label="OUTSIDE DHAKA : ৳ 250"
                            />
                            <FormControlLabel
                              value="pickFromShowroom"
                              control={
                                <Radio onClick={handleShowRoomSelected} />
                              }
                              label="PICK FROM SHOWROOM"
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
                        ৳ 12
                      </Typography>
                    </Stack> */}

                    <Divider />
                    <Stack direction={"row"} spacing={7}>
                      <Typography variant="cardHeader" color="initial">
                        TOTAL :
                      </Typography>
                      <Typography variant="cardHeader" color="initial">
                        ৳ {total}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"column"} spacing={9}>
                      {/* <Typography variant="cardHeader" color="initial">
                      TOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12,160
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
                              label="Online Payment"
                            />
                            <FormControlLabel
                              value="cash"
                              control={<Radio />}
                              label="Cash On Delivery"
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
                      // onClick={() => router.push("/checkout")}
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
    </>
  );
};

export default checkout;
