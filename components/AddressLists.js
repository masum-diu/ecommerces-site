import React, { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  IconButton,
  Stack,
  Drawer,
  Typography,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  useGetCountryListWithShippingChargeQuery,
  usePostEditAddressMutation,
} from "../src/features/api/apiSlice";
import Loader from "./Loader/Loader";
import useCityFetcher from "../src/hooks/useCityFetcher";
import { toast } from "react-hot-toast";

const AddressLists = ({
  open,
  setOpen,
  getUserAddress,
  setValue,
  setDistict,
  setDistict1,
  setTownBilling,
  setTownBillingSh,
  setAddAddressValue,
  addAddressValue,
  setIsAddressListDataBilling,
  setIsAddressListDataShipping,
  showInputField,
}) => {
  const [editAddress, { data, isLoading, isError, isSuccess, error }] =
    usePostEditAddressMutation();
  const [updateId, setUpdateId] = useState("");
  const [openList, setOpenList] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const [openList1, setOpenList1] = React.useState(false);
  const [country, setCountry] = useState("Select Country");
  const [town, setTown] = useState("Select Town/City");
  const [arrow1, setArrow1] = useState(false);
  const [address, setAddrss] = useState({});
  const [enable, setEnable] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const { selectedCountry, setSelectedCountry, cities, loading } =
    useCityFetcher();
  const tokens = localStorage.getItem("acesstoken");
  const {
    data: countryData,
    isError: countryError,
    isLoading: countryLoading,
  } = useGetCountryListWithShippingChargeQuery(tokens);

  const handleDataSet = (id) => {
    setUpdateId(id);
  };

  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };

  const handleClick1 = () => {
    setOpenList1((prev) => !prev);
    setArrow1(!arrow1);
  };

  const handleSetNewData = (data) => {
    if (data) {
      if (addAddressValue === 1) {
        setValue("first_name_billing", data?.first_name);
        setValue("last_name_billing", data?.last_name);
        setValue("street_address_billing", data?.street_address);
        setValue("city_billing", data?.city);
        setValue("country_billing", data?.country);
        setValue("post_code_billing", data?.post_code);
        setValue("phone_billing", data?.phone);
        setValue("email_billing", data?.email);
        setValue("apartment_address_billing", data?.apartment);
        setDistict(data?.country);
        setTownBilling(data?.city);
        setIsAddressListDataBilling(true);
      } else if (addAddressValue === 2 && !showInputField) {
        setValue("first_name_shipping", data?.first_name);
        setValue("last_name_shipping", data?.last_name);
        setValue("street_address_shipping", data?.street_address);
        setValue("city_shipping", data?.city);
        setValue("country_shipping", data?.country);
        setValue("post_code_shipping", data?.post_code);
        setValue("phone_shipping", data?.phone);
        setValue("email_shipping", data?.email);
        setValue("apartment_address_shipping", data?.apartment);
        setDistict1(data?.country);
        setTownBillingSh(data?.city);
        setIsAddressListDataShipping(true);
      }
    }
  };

  const handleMenueClose = () => {
    setOpen(false);
    setAddAddressValue(0);
  };
  const handleCountryChange = (event) => {
    setValueNewAddress("country", event.target.value, { shouldValidate: true });
    setCountry(event.target.value);
    setValueNewAddress("town", "Select Town/City", { shouldValidate: true });
    setTown("Select Town/City");
  };
  const handleTownChange = (event) => {
    setValueNewAddress("town", event.target.value, { shouldValidate: true });
    setTown(event.target.value);
  };
  const handleSelectedCountry = (country_code) => {
    setCountryCode(country_code);
    setTown("Select Town/City");
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    reset,
    setValue: setValueNewAddress,
  } = useForm({
    defaultValues: {
      id: updateId,
      first_name: "",
      last_name: "",
      street_address: "",
      town: "",
      country: "",
      post_code: "",
      phone: "",
      email: "",
      apartment: "",
    },
  });

  const firstName = useWatch({ control, name: "first_name" });
  const lastName = useWatch({ control, name: "last_name" });
  const streetAddress = useWatch({ control, name: "street_address" });
  const townName = useWatch({ control, name: "town" });
  const countryName = useWatch({ control, name: "country" });
  const postCode = useWatch({ control, name: "post_code" });
  const phoneNo = useWatch({ control, name: "phone" });
  const emailId = useWatch({ control, name: "email" });
  const apartmentNo = useWatch({ control, name: "apartment" });

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      streetAddress &&
      townName &&
      countryName &&
      phoneNo &&
      emailId
    ) {
      setEnable(false);
    }
  }, [
    firstName,
    lastName,
    streetAddress,
    townName,
    countryName,
    postCode,
    phoneNo,
    emailId,
    apartmentNo,
    country,
    town,
  ]);

  useEffect(() => {
    if (countryData && countryName) {
      const selectedCountryObject = countryData.find(
        (country) => country.country_name === countryName
      );
      if (selectedCountryObject) {
        setCountryCode(selectedCountryObject?.country_code);
      } else {
        setCountryCode("");
      }
    }
  }, [countryName, countryData]);

  useEffect(() => {
    setSelectedCountry(countryCode);
  }, [countryCode, countryName]);
  useEffect(() => {
    if (countryName) {
      setCountry(countryName);
    } else {
      setCountry("Select Country");
    }
    if (townName) {
      setTown(townName);
    } else {
      setTown("Select Town/City");
    }
  }, [countryName, townName]);
  const token = localStorage.getItem("acesstoken");
  const onSubmit = async (data) => {
    try {
      const response = await editAddress({ data, updateId, token });
      if (response?.data?.status === "success") {
        if (updateId) {
          toast.success("Address is updated successfully!");
        } else {
          toast.success("Address is added successfully!");
        }
        setUpdateId("");
        setAddrss(response?.data);
        reset();
        setCountry("Select Country");
        setTown("Select Town/City");
      } else {
        toast.error("Something went wrong");
      }

      // console.log(response)
    } catch (error) {
      console.log("post request failed", error);
    }
  };

  if (isLoading || countryLoading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Drawer
        transitionDuration={{ enter: 500, exit: 500 }}
        anchor="right"
        open={open}
        onClose={() => handleMenueClose()}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "450px", xs: "300px" },
          },
        }}
      >
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "90%", margin: "0 auto" }} spacing={2}>
          <Button
            variant="contained"
            color="background2"
            onClick={handleClick1}
            // className="bold"
            fullWidth
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textTransform: "capitalize",
              // width: "90%",
              // margin: "0 auto"
            }}
            endIcon={
              arrow1 ? (
                <RemoveIcon onClick={() => setArrow1(!arrow1)} />
              ) : (
                <AddIcon onClick={() => setArrow1(!arrow1)} />
              )
            }
          >
            Select Your Address
          </Button>
          {openList1 ? (
            <>
              {getUserAddress?.map((data) => (
                <>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Button
                      variant="outlined"
                      color="background2"
                      fullWidth
                      onClick={() => handleSetNewData(data)}
                    >
                      <Typography
                        variant="cardLocation123"
                        color="#af9368"
                        className="SemiBold"
                        sx={{ textTransform: "capitalize", textAlign: "left" }}
                      >
                        {data?.first_name},
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {data?.last_name},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {data?.street_address},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {" "}
                          {data?.apartment},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {" "}
                          {data?.city},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {" "}
                          {data?.country},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {" "}
                          {data?.post_code},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {" "}
                          {data?.phone},
                        </Typography>
                        <Typography
                          variant="cardLocation123"
                          color="#af9368"
                          className="SemiBold"
                        >
                          {" "}
                          {data?.email}
                        </Typography>
                      </Typography>
                    </Button>
                    <IconButton onClick={() => handleDataSet(data?.id)}>
                      <FiEdit />
                    </IconButton>
                  </Stack>
                </>
              ))}
            </>
          ) : null}
        </Stack>
        <br />

        <Button
          variant="contained"
          color="background2"
          onClick={handleClick}
          // className="bold"
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "capitalize",
            width: "90%",
            margin: "0 auto",
          }}
          endIcon={
            arrow ? (
              <RemoveIcon onClick={() => setArrow(!arrow)} />
            ) : (
              <AddIcon onClick={() => setArrow(!arrow)} />
            )
          }
        >
          {updateId ? "Update Address" : "Add Address"}
        </Button>

        {openList ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            // style={{ width: "100%", margin: "0 auto" }}
          >
            {/* Billing form */}

            <Stack
              sx={{ width: "90%", margin: "0 auto" }}
              spacing={1}
              height={"100vh"}
            >
              <Stack direction={"column"} spacing={1} mt={2}>
                <Typography variant="cardHeader1" color="initial">
                  FIRST NAME *
                </Typography>
                <TextField
                  size="small"
                  // id=""
                  // label=""
                  // value={}
                  {...register("first_name", {
                    required: {
                      value: true,
                      message: "First Name Required",
                    },
                  })}
                  onKeyUp={() => trigger("first_name_billing")}
                  error={Boolean(errors.first_name_billing)}
                  // onChange={}
                  placeholder="First Name *"
                />
                {errors.first_name_billing && (
                  <p style={{ color: "red" }}>
                    {errors.first_name_billing?.message}
                  </p>
                )}
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  LAST NAME *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  {...register("last_name", {
                    required: {
                      value: true,
                      message: "Last Name Required",
                    },
                  })}
                  onKeyUp={() => trigger("last_name")}
                  error={Boolean(errors.last_name_billing)}
                  placeholder="Last Name *"
                  size="small"
                />
                {errors.last_name && (
                  <p style={{ color: "red" }}>{errors.last_name?.message}</p>
                )}
              </Stack>

              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  COUNTRY *
                </Typography>

                <Select
                  id="country"
                  {...register("country", {
                    required: {
                      value: true,
                      message: "Country is Required",
                    },
                  })}
                  autoComplete="off"
                  onClick={() => trigger("country")}
                  error={Boolean(errors.country)}
                  size="small"
                  value={country}
                  onChange={handleCountryChange}
                >
                  <MenuItem value={"Select Country"} disabled>
                    Select Country
                  </MenuItem>
                  {countryData?.map((country, index) => (
                    <MenuItem
                      key={index}
                      value={country.country_name}
                      onClick={() =>
                        handleSelectedCountry(country?.country_code)
                      }
                    >
                      {country.country_name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={"India"}>India</MenuItem> */}
                </Select>
                {errors.country && (
                  <p style={{ color: "red" }}>{errors.country?.message}</p>
                )}
                {/* <Select label="Age"  /> */}
              </Stack>

              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  TOWN / CITY *
                </Typography>
                {loading ? (
                  <Stack
                    border={"1px solid gray"}
                    borderRadius={"5px"}
                    direction={"rwo"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography sx={{ marginLeft: "10px" }}>
                      Collecting Cities
                    </Typography>
                    <CircularProgress
                      sx={{ color: "#3C5676", marginRight: "10px" }}
                    />
                  </Stack>
                ) : (
                  <Select
                    id="town"
                    {...register("town", {
                      required: {
                        value: true,
                        message: "Town/City is Required",
                      },
                    })}
                    autoComplete="off"
                    onClick={() => trigger("town")}
                    error={Boolean(errors.town)}
                    size="small"
                    value={town}
                    onChange={handleTownChange}
                  >
                    <MenuItem value={"Select Town/City"} disabled>
                      Select Town/City
                    </MenuItem>
                    {cities?.map((towns) => (
                      <MenuItem value={towns}>{towns}</MenuItem>
                    ))}
                    {/* <MenuItem value={"India"}>India</MenuItem> */}
                  </Select>
                )}

                {errors.town && (
                  <p style={{ color: "red" }}>{errors.town?.message}</p>
                )}
              </Stack>

              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  STREET ADDRESS *
                </Typography>
                <TextField
                  {...register("street_address", {
                    required: {
                      value: true,
                      message: "House and Street Address Required",
                    },
                  })}
                  onKeyUp={() => trigger("street_address")}
                  error={Boolean(errors.street_address)}
                  placeholder="House Number and street name"
                  size="small"
                />
                {errors.street_address && (
                  <p style={{ color: "red" }}>
                    {errors.street_address?.message}
                  </p>
                )}
              </Stack>

              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  APARTMENT ADDRESS (OPTIONAL)
                </Typography>
                <TextField
                  {...register("apartment", {
                    required: {
                      value: false,
                      message: "Apartment Address Required",
                    },
                  })}
                  error={Boolean(errors.apartment)}
                  placeholder="Apartment suite, unit, etc."
                  size="small"
                />
                {errors.apartment && (
                  <p style={{ color: "red" }}>{errors.apartment?.message}</p>
                )}
              </Stack>

              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  POSTCODE / ZIP (OPTIONAL)
                </Typography>
                <TextField
                  {...register("post_code", {
                    required: {
                      value: false,
                      message: "Enter Post Code",
                    },
                  })}
                  error={Boolean(errors.post_code)}
                  placeholder="Postcode / zip (Optional)"
                  size="small"
                />
                {errors.post_code && (
                  <p style={{ color: "red" }}>{errors.post_code?.message}</p>
                )}
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  PHONE *
                </Typography>
                <TextField
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone Number is Required",
                    },
                  })}
                  onKeyUp={() => trigger("phone")}
                  error={Boolean(errors.phone)}
                  placeholder="Phone *"
                  size="small"
                />
                {errors.phone && (
                  <p style={{ color: "red" }}>{errors.phone?.message}</p>
                )}
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  EMAIL ADDRESS *
                </Typography>
                <TextField
                  {...register("email", {
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
                  onKeyUp={() => trigger("email")}
                  error={Boolean(errors.email)}
                  placeholder="Email Address *"
                  size="small"
                />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                )}
              </Stack>

              <Button
                disabled={enable}
                variant="contained"
                color="background2"
                type="submit"
              >
                {updateId ? "Update" : "save"}
              </Button>
            </Stack>
          </form>
        ) : null}
      </Drawer>
    </>
  );
};

export default AddressLists;