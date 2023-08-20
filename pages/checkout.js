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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState, useRef, useContext } from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import instance from "./api/api_instance";
import LoginModal from "../components/LoginModal";
import GuestCheckout from "../components/GuestCheckout";
import USER_CONTEXT from "../components/userContext";
import {
  usePostUserOrderMutation,
  usePostGuestOrderMutation,
  useGetShippingChargeQuery,
  useGetUserAddressQuery,
  useGetCountryListWithShippingChargeQuery,
} from "../src/features/api/apiSlice";
import { changeIsCheckout } from "../src/features/checkout/checkoutSlice";
import Link from "next/link";
import AddressLists from "../components/AddressLists";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";
import useCityFetcher from "../src/hooks/useCityFetcher";
const checkout = () => {
  // address popup state start
  const [addressList, setAddressList] = useState(false);
  // address popup state end
  const cart = useSelector((state) => state.cart.cart);
  const [addAddressValue, setAddAddressValue] = useState(0);
  const [distict, setDistict] = useState("Select Country");
  const [distict1, setDistict1] = useState("Select Country");
  const [townBilling, setTownBilling] = useState("Select Town/City");
  const [townBillingSh, setTownBillingSh] = useState("Select Town/City");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [host, setHost] = useState("");
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalPriceOrg = useSelector((state) => state.cart.totalPriceOrg);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalPriceWithTax = useSelector(
    (state) => state.cart.totalPriceWithTax
  );
  const totalPriceWithTaxOrg = useSelector(
    (state) => state.cart.totalPriceWithTaxOrg
  );
  const isGuestCheckout = useSelector(
    (state) => state.checkoutSlice.isGuestCheckout
  );
  const [isDhakaChecked, setIsDhakaChecked] = useState(false);
  const [isOutSideChecked, setIsOutSideChecked] = useState(false);
  const [isFromShowRoomChecked, setIsFromShowRoomChecked] = useState(false);
  const [isSameAddressChecked, setIsSameAddressChecked] = useState(false);
  const [isAgreed, setAgreed] = useState(false);
  const [total, setTotal] = useState(totalPriceWithTax);
  const [error, setError] = useState({ initialState: true });
  const [openLoginModal, setLoginModal] = useState(false);
  const [payment, setPayment] = useState("");
  const [enable, setEnable] = useState(true);
  const [guestCheckoutResponse, setGuestCheckoutResponse] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [billingCountry, setBillingCountry] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [orderInfo, setOrderInfo] = useState({});
  const [orderResponseUser, setOrderResponseUser] = useState({});
  const [orderResponseGuest, setOrderResponseGuest] = useState({});
  const [isAddressListDataBilling, setIsAddressListDataBilling] =
    useState(false);
  const [isAddressListDataShipping, setIsAddressListDataShipping] =
    useState(false);
  const [pathaoShippingCost, setPathaoShippingCost] = useState(0);
  const [eQuerierShippingCost, setEQuerierShippingCost] = useState(0);
  const [dhlShippingCost, setDhlShippingCost] = useState(0);
  const [showRoomShippingCost, setShowRoomShippingCost] = useState(0);
  const { selectedCurrency, convertPrice, currentConversionRate } =
    useCurrencyConversion();
  const {
    selectedCountry: selectedCountryBilling,
    setSelectedCountry: setSelectedCountryBilling,
    cities: billingCities,
    loading: billingCityLoading,
  } = useCityFetcher();
  const {
    selectedCountry: selectedCountryShipping,
    setSelectedCountry: setSelectedCountryShipping,
    cities: shippingCities,
    loading: shippingCityLoading,
  } = useCityFetcher();
  const customStyle = {
    ".mui-style-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
      {
        "-webkit-text-fill-color": "rgb(0 0 0)",
      },
    ".mui-style-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
      {
        "-webkit-text-fill-color": "rgb(0 0 0)",
      },
  };
  const {
    hasToken,
    setHasToken,
    isPlaceOrder,
    setIsPlaceOrder,
    isProceedCheckout,
    setIsProceedCheckout,
  } = useContext(USER_CONTEXT);
  const router = useRouter();
  const [
    userOrder,
    {
      data: userOrderData,
      isLoading: userOrderLoading,
      isError: userOrderError,
      isSuccess: userOrderSuccess,
      error: userOrderErrorData,
    },
  ] = usePostUserOrderMutation();
  const [
    guestOrder,
    {
      data: guestOrderData,
      isLoading: guestOrderLoading,
      isError: guestOrderError,
      isSuccess: guestOrderSuccess,
      error: guestOrderErrorData,
    },
  ] = usePostGuestOrderMutation();
  const tokens = localStorage.getItem("acesstoken");
  const { data: getUserAddress } = useGetUserAddressQuery(tokens);
  const {
    data: countryData,
    isError: countryError,
    isLoading: countryLoading,
  } = useGetCountryListWithShippingChargeQuery(tokens);
  const shippingOptions = [
    {
      id: 1,
      innerText: "Pathao",
      shippingCost: pathaoShippingCost,
    },
    {
      id: 1,
      innerText: "E-Courier",
      shippingCost: eQuerierShippingCost,
    },
    {
      id: 1,
      innerText: "Pickup from showroom",
      shippingCost: 0,
    },
    {
      id: 1,
      innerText: "DHL",
      shippingCost: dhlShippingCost,
    },
  ];
  // code for if user is not logged in and not guest then open the login popup.
  /* useEffect(() => {
    if (isGuestCheckout === false && hasToken === false) {
      setIsProceedCheckout(true);
      setLoginModal(true);
    }
  }, [isGuestCheckout, hasToken, isProceedCheckout]);
  console.log("your log output", isGuestCheckout, hasToken); */
  useEffect(() => {
    if (userOrderError || guestOrderError) {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  }, [userOrderError, guestOrderError]);
  useEffect(() => {
    const host = location.host;
    if (host === "localhost:3000") {
      setHost("http://localhost:3000");
    }
    if (host === "staging.aranya.com.bd") {
      setHost("https://staging.aranya.com.bd");
    }
  }, [host]);
  useEffect(() => {
    if (isPlaceOrder === true) {
      const securePage = async () => {
        const token = localStorage.getItem("acesstoken");
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
    if (
      hasToken === false &&
      isGuestCheckout === true &&
      isPlaceOrder === true &&
      cart?.length > 0
    ) {
      const handleGuestOrder = async () => {
        try {
          const postResponse = await guestOrder({
            data: orderInfo?.data,
            cart: orderInfo?.cart,
            totalPrice: orderInfo?.totalPrice,
            totalPriceOrg: orderInfo?.totalPriceOrg,
            totalPriceWithTax: orderInfo?.totalPriceWithTax,
            totalPriceWithTaxOrg: orderInfo?.totalPriceWithTaxOrg,
            finalPriceOfOrder: orderInfo?.finalPrice,
            currentConversionRate: orderInfo?.currentConversionRate,
            selectedCurrency: orderInfo?.selectedCurrency,
            totalAmount: orderInfo?.totalAmount,
            isSameAddressChecked: orderInfo?.isSameAddress,
            isGuestCheckout: orderInfo?.isGuestCheckout,
            backUri: host,
            token,
          });
          setOrderResponseGuest(postResponse);
        } catch (e) {
          console.log("your log output", e);
        }
      };

      handleGuestOrder();
    }
  }, [
    isPlaceOrder,
    orderInfo,
    isGuestCheckout,
    hasToken,
    guestCheckoutResponse,
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
  const handleAgreed = () => {
    setAgreed(!isAgreed);
  };
  const token = localStorage.getItem("acesstoken");
  const handlePlaceOrder = () => {
    setIsPlaceOrder(true);
  };

  if (token) {
    setHasToken(true);
  }

  const handleAddressStatusBilling = () => {
    setAddressList(true);
    setAddAddressValue(1);
  };
  const handleAddressStatusShipping = () => {
    setAddressList(true);
    setAddAddressValue(2);
  };

  const handleBillingCountry = (country_code) => {
    setTownBilling("Select Town/City");
    setBillingCountry(country_code);
    setIsAddressListDataBilling(false);
    setValue("deliveryMethod", "");
  };
  const handleShippingCountry = (country_code) => {
    setShippingCountry(country_code);
    setIsAddressListDataShipping(false);
    setTownBillingSh("Select Town/City");
    setValue("deliveryMethod", "");
  };

  // Handling React Hook form
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
      orderNote: "",
      isSameAddress: false,
      paymentMethod: "",
      deliveryMethod: "",
    },
  });
  const allFieldsFilled = watch();
  const onSubmit = async (data) => {
    setIsPlaceOrder(true);
    setIsSameAddress(isSameAddressChecked);
    setOrderInfo({
      data: data,
      cart: cart,
      totalPrice: totalPrice,
      totalPriceWithTax: totalPriceWithTax,
      totalPriceOrg: totalPriceOrg,
      totalPriceWithTaxOrg: totalPriceWithTaxOrg,
      finalPrice: Math.round(total),
      currentConversionRate: currentConversionRate,
      selectedCurrency: selectedCurrency,
      totalAmount: totalAmount,
      isSameAddress: isSameAddressChecked,
      isGuestCheckout: true,
    });
    if (hasToken === true && cart?.length > 0) {
      const finalPriceOfOrder = Math.round(total);
      const handleUserOrder = async () => {
        try {
          const postResponse = await userOrder({
            data,
            cart,
            backUri: host,
            totalPrice,
            totalPriceOrg,
            totalPriceWithTax,
            totalPriceWithTaxOrg,
            currentConversionRate: currentConversionRate,
            selectedCurrency: selectedCurrency,
            finalPriceOfOrder,
            totalAmount,
            isSameAddressChecked,
            isGuestCheckout,
            token,
          });
          setOrderResponseUser(postResponse);
        } catch (e) {
          console.log("your log output", e);
        }
      };
      handleUserOrder();
    }
  };
  // console.log("isGuestCheckout", isGuestCheckout);
  // console.log("hasToken", hasToken);
  const handleSelectChange = (event) => {
    setValue("country_billing", event.target.value, { shouldValidate: true });
    setDistict(event.target.value);
  };
  const handleSelectChangeShipping = (event) => {
    setValue("country_shipping", event.target.value, { shouldValidate: true });
    setDistict1(event.target.value);
  };
  const handleSelectChangeTownBilling = (event) => {
    setValue("city_billing", event.target.value, { shouldValidate: true });
    setTownBilling(event.target.value);
  };
  const handleSelectChangeTownShipping = (event) => {
    setValue("city_shipping", event.target.value, { shouldValidate: true });
    if (!isSameAddressChecked) {
      setTownBillingSh(event.target.value);
    }
  };
  useEffect(() => {
    if (isSameAddressChecked) {
      setTownBillingSh(townBilling);
    }
    if (!isSameAddressChecked) {
      setTownBillingSh("Select Town/City");
    }
  }, [isSameAddressChecked]);

  // Delivery System
  const getShippingOptions = () => {
    if (showInputField) {
      if (country === "Bangladesh" || distict === "Bangladesh") {
        return shippingOptions.filter((option) => option.innerText !== "DHL");
      } else if (country === "Select Country" || distict === "Select Country") {
        return;
      } else {
        return shippingOptions.filter((option) => option.innerText === "DHL");
      }
    } else {
      if (countrySh === "Bangladesh" || distict1 === "Bangladesh") {
        return shippingOptions.filter((option) => option.innerText !== "DHL");
      } else if (
        countrySh === "Select Country" ||
        distict1 === "Select Country"
      ) {
        return;
      } else {
        return shippingOptions.filter((option) => option.innerText === "DHL");
      }
    }
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
  const showInputField = useWatch({ control, name: "isSameAddress" });

  const orderNote = useWatch({
    control,
    name: "orderNote",
  });
  useEffect(() => {
    setValue("deliveryMethod", "");
    setIsAddressListDataShipping(false);
  }, [showInputField]);
  // Shipping Amount Calculation
  useEffect(() => {
    if (!showInputField) {
      setShippingCost(0);
      setPathaoShippingCost(0);
      setEQuerierShippingCost(0);
      setDhlShippingCost(0);
      setShowRoomShippingCost(0);
      setTotal(totalPriceWithTax);
      if (countrySh === "Bangladesh" || distict1 === "Bangladesh") {
        if (cityAddressSh) {
          const refinedCity = cityAddressSh.split(" ")[0];
          if (refinedCity === "Dhaka") {
            if (countryData) {
              let pathao, e_courier;
              for (const item of countryData) {
                if (item.shipping_charge.includes("inside_city")) {
                  const shippingChargeObj = JSON.parse(item.shipping_charge);
                  pathao = shippingChargeObj.inside_city.pathao;
                  e_courier = shippingChargeObj.inside_city.e_courier;
                  break;
                }
              }
              setPathaoShippingCost(pathao);
              setEQuerierShippingCost(e_courier);
              if (deliveryMethod === "Pathao") {
                setTotal(totalPriceWithTax + pathaoShippingCost);
                setShippingCost(pathaoShippingCost);
              } else if (deliveryMethod === "E-Courier") {
                setTotal(totalPriceWithTax + eQuerierShippingCost);
                setShippingCost(eQuerierShippingCost);
              } else if (deliveryMethod === "Pickup from showroom") {
                setTotal(totalPriceWithTax + showRoomShippingCost);
                setShippingCost(showRoomShippingCost);
              }
            }
          } else {
            if (countryData) {
              let pathao, e_courier;
              for (const item of countryData) {
                if (item.shipping_charge.includes("outside_city")) {
                  const shippingChargeObj = JSON.parse(item.shipping_charge);
                  pathao = shippingChargeObj.outside_city.pathao;
                  e_courier = shippingChargeObj.outside_city.e_courier;
                  break;
                }
              }
              setPathaoShippingCost(pathao);
              setEQuerierShippingCost(e_courier);
              if (deliveryMethod === "Pathao") {
                setTotal(totalPriceWithTax + pathaoShippingCost);
                setShippingCost(pathaoShippingCost);
              } else if (deliveryMethod === "E-Courier") {
                setTotal(totalPriceWithTax + eQuerierShippingCost);
                setShippingCost(eQuerierShippingCost);
              } else if (deliveryMethod === "Pickup from showroom") {
                setTotal(totalPriceWithTax + showRoomShippingCost);
                setShippingCost(showRoomShippingCost);
              }
            }
          }
        }
      } else {
        if (countryData) {
          let shippingChargeForSelectedCountry;
          for (const item of countryData) {
            if (
              item.country_code === shippingCountry &&
              item.country_code !== "BD"
            ) {
              shippingChargeForSelectedCountry = JSON.parse(
                item.shipping_charge
              )?.amount;
              break;
            }
          }
          setDhlShippingCost(shippingChargeForSelectedCountry);
          if (deliveryMethod === "DHL") {
            setTotal(totalPriceWithTax + dhlShippingCost);
            setShippingCost(dhlShippingCost);
          }
        }
      }
    } else {
      setShippingCost(0);
      setPathaoShippingCost(0);
      setEQuerierShippingCost(0);
      setDhlShippingCost(0);
      setShowRoomShippingCost(0);
      setTotal(totalPriceWithTax);
      if (country === "Bangladesh" || distict === "Bangladesh") {
        if (cityAddress) {
          const refinedCity = cityAddress.split(" ")[0];
          if (refinedCity === "Dhaka") {
            if (countryData) {
              let pathao, e_courier;
              for (const item of countryData) {
                if (item.shipping_charge.includes("inside_city")) {
                  const shippingChargeObj = JSON.parse(item.shipping_charge);
                  pathao = shippingChargeObj.inside_city.pathao;
                  e_courier = shippingChargeObj.inside_city.e_courier;
                  break;
                }
              }
              setPathaoShippingCost(pathao);
              setEQuerierShippingCost(e_courier);
              if (deliveryMethod === "Pathao") {
                setTotal(totalPriceWithTax + pathaoShippingCost);
                setShippingCost(pathaoShippingCost);
              } else if (deliveryMethod === "E-Courier") {
                setTotal(totalPriceWithTax + eQuerierShippingCost);
                setShippingCost(eQuerierShippingCost);
              } else if (deliveryMethod === "Pickup from showroom") {
                setTotal(totalPriceWithTax + showRoomShippingCost);
                setShippingCost(showRoomShippingCost);
              }
            }
          } else {
            if (countryData) {
              let pathao, e_courier;
              for (const item of countryData) {
                if (item.shipping_charge.includes("outside_city")) {
                  const shippingChargeObj = JSON.parse(item.shipping_charge);
                  pathao = shippingChargeObj.outside_city.pathao;
                  e_courier = shippingChargeObj.outside_city.e_courier;
                  break;
                }
              }
              setPathaoShippingCost(pathao);
              setEQuerierShippingCost(e_courier);
              if (deliveryMethod === "Pathao") {
                setTotal(totalPriceWithTax + pathaoShippingCost);
                setShippingCost(pathaoShippingCost);
              } else if (deliveryMethod === "E-Courier") {
                setTotal(totalPriceWithTax + eQuerierShippingCost);
                setShippingCost(eQuerierShippingCost);
              } else if (deliveryMethod === "Pickup from showroom") {
                setTotal(totalPriceWithTax + showRoomShippingCost);
                setShippingCost(showRoomShippingCost);
              }
            }
          }
        }
      } else {
        if (countryData) {
          let shippingChargeForSelectedCountry;
          for (const item of countryData) {
            if (
              item.country_code === billingCountry &&
              item.country_code !== "BD"
            ) {
              shippingChargeForSelectedCountry = JSON.parse(
                item.shipping_charge
              )?.amount;
              break;
            }
          }
          setDhlShippingCost(shippingChargeForSelectedCountry);
          if (deliveryMethod === "DHL") {
            setTotal(totalPriceWithTax + dhlShippingCost);
            setShippingCost(dhlShippingCost);
          }
        }
      }
    }
  }, [
    showInputField,
    townBilling,
    townBillingSh,
    cityAddressSh,
    cityAddress,
    billingCountry,
    billingCities,
    country,
    countrySh,
    distict1,
    deliveryMethod,
  ]);
  useEffect(() => {
    setPayment(paymentMethod);
  }, [payment, paymentMethod]);

  useEffect(() => {
    if (userOrderSuccess) {
      setIsPlaceOrder(false);
      if (orderResponseUser.data?.type == "online") {
        const response = JSON.parse(orderResponseUser?.data?.payment);
        window.location.replace(response?.data);
      }
      if (orderResponseUser?.data?.type == "cash") {
        router.push({
          pathname: "/payment",
          query: {
            payment: "success",
            orderid: orderResponseUser?.data?.order_id,
            type: "cash",
          },
        });
      }
    }
  }, [userOrderSuccess, isPlaceOrder, orderResponseUser]);
  useEffect(() => {
    let host = location.host;

    if (guestOrderSuccess === true) {
      setLoginModal(false);
      setIsPlaceOrder(false);
      if (orderResponseGuest?.data?.status === "success") {
        dispatch(changeIsCheckout(false));
      }
      if (orderResponseGuest?.data?.type == "online") {
        const response = JSON.parse(orderResponseGuest?.data?.payment);
        window.location.replace(response?.data);
      }
      if (orderResponseGuest?.data?.type == "cash") {
        router.push({
          pathname: "/payment",
          query: {
            payment: "success",
            orderid: orderResponseGuest?.data?.order_id,
            type: "cash",
          },
        });
      }
    }
  }, [
    guestOrderSuccess,
    isGuestCheckout,
    orderResponseGuest,
    guestOrderLoading,
  ]);
  useEffect(() => {
    if (showInputField === true) {
      setValue("first_name_shipping", firstName);
      setValue("last_name_shipping", lastName);
      setValue("street_address_shipping", streetAddress);
      setValue("apartment_address_shipping", apartmentAddress);
      setValue("city_shipping", cityAddress);
      setValue("country_shipping", country);
      setValue("post_code_shipping", postBilling);
      setValue("phone_shipping", phoneBilling);
      setValue("email_shipping", emailBilling);
      setDistict1(country);
      setTownBillingSh(cityAddress);
    } else if (
      showInputField === false &&
      isAddressListDataShipping === false
    ) {
      setValue("first_name_shipping", "");
      setValue("last_name_shipping", "");
      setValue("street_address_shipping", "");
      setValue("apartment_address_shipping", "");
      setValue("city_shipping", "");
      setValue("country_shipping", "");
      setValue("post_code_shipping", "");
      setValue("phone_shipping", "");
      setValue("email_shipping", "");
      setDistict1("Select Country");
      setTownBillingSh("Select Town/City");
    }
  }, [
    showInputField,
    country,
    distict,
    townBilling,
    cityAddress,
    firstName,
    lastName,
    streetAddress,
    apartmentAddress,
    cityAddress,
    country,
    postBilling,
    phoneBilling,
    emailBilling,
  ]);

  useEffect(() => {
    setSelectedCountryBilling(billingCountry);
    setSelectedCountryShipping(shippingCountry);
  }, [
    billingCountry,
    shippingCountry,
    shippingCities,
    billingCities,
    billingCountry,
    shippingCountry,
    country,
    countrySh,
  ]);

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
        cityAddress &&
        country &&
        phoneBilling &&
        emailBilling &&
        firstNameSh &&
        lastNameSh &&
        streetAddressSh &&
        cityAddressSh &&
        countrySh &&
        phoneBillingSh &&
        emailBillingSh &&
        deliveryMethod &&
        paymentMethod &&
        termsAndCondition
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
        cityAddress &&
        country &&
        phoneBilling &&
        emailBilling &&
        deliveryMethod &&
        paymentMethod &&
        termsAndCondition
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
    orderNote,
    errors,
    paymentMethod,
    termsAndCondition,
    isPlaceOrder,
    deliveryMethod,
    isAgreed,
  ]);
  if (
    userOrderLoading ||
    guestOrderLoading ||
    userOrderSuccess ||
    guestOrderSuccess ||
    countryLoading
  ) {
    return <Loader></Loader>;
  }
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
                <Stack direction={"row"} spacing={1} mt={3.8}>
                  <Typography
                    variant="cardLocation1"
                    color="#7E7250"
                    onClick={() => handleAddressStatusBilling()}
                    className="SemiBold"
                    sx={{
                      textDecoration: "underline",
                      textUnderlineOffset: ".3rem",
                      color: "initial",
                      cursor: "pointer",
                    }}
                  >
                    Add New or Existing Billing Address
                  </Typography>
                </Stack>

                <Stack direction={"column"} spacing={2} mt={{ lg: 2 }}>
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
                    COUNTRY *
                  </Typography>
                  <Select
                    id="country_billing"
                    {...register("country_billing", {
                      required: {
                        value: true,
                        message: "Country is Required",
                      },
                    })}
                    onClick={() => trigger("country_billing")}
                    error={Boolean(errors.country_billing)}
                    size="small"
                    value={distict}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"Select Country"} disabled>
                      Select Country
                    </MenuItem>
                    {countryData?.map((country, index) => (
                      <MenuItem
                        key={index}
                        value={country.country_name}
                        onClick={() =>
                          handleBillingCountry(country?.country_code)
                        }
                      >
                        {country.country_name}
                      </MenuItem>
                    ))}

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
                    TOWN / CITY *
                  </Typography>

                  {billingCityLoading ? (
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
                      id="city_billing"
                      {...register("city_billing", {
                        required: {
                          value: true,
                          message: "Town/City is Required",
                        },
                      })}
                      onClick={() => trigger("city_billing")}
                      error={Boolean(errors.city_billing)}
                      size="small"
                      value={townBilling}
                      onChange={handleSelectChangeTownBilling}
                    >
                      <MenuItem value={"Select Town/City"} disabled>
                        Select Town/City
                      </MenuItem>
                      {isAddressListDataBilling ? (
                        <MenuItem value={townBilling}>{townBilling}</MenuItem>
                      ) : (
                        billingCities?.map((towns) => (
                          <MenuItem value={towns}>{towns}</MenuItem>
                        ))
                      )}

                      {/* <MenuItem value={"India"}>India</MenuItem> */}
                    </Select>
                  )}

                  {errors.city_billing && (
                    <p style={{ color: "red" }}>
                      {errors.city_billing?.message}
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
                </Stack>

                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    APARTMENT ADDRESS (OPTIONAL)
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    // onChange={}
                    {...register("apartment_address_billing", {
                      required: {
                        value: false,
                        message: "Apartment Address Required",
                      },
                    })}
                    // onSelect={(e) => setBillingTown(e.target.value)}
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
                        message: "Enter Post Code",
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
                <Stack
                  direction={"column"}
                  spacing={2}
                  sx={{ marginTop: "17px" }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent="left"
                    alignItems="center"
                    mt={1}
                    spacing={1}
                  >
                    <input
                      autoComplete="off"
                      type="checkbox"
                      {...register("isSameAddress")}
                      // name="isSameAddress"
                      control={control}
                      id=""
                      onClick={() => handleSameAddressSelected()}
                    />
                    <Typography
                      variant="cardLocation1"
                      className="SemiBold"
                      color="initial"
                    >
                      Same As Billing Address.
                    </Typography>
                    <b>/</b>
                    <Typography
                      variant="cardLocation1"
                      color="#7E7250"
                      onClick={() => handleAddressStatusShipping()}
                      className="SemiBold"
                      sx={{
                        textDecoration: "underline",
                        textUnderlineOffset: ".3rem",
                        color: "initial",
                        cursor: "pointer",
                      }}
                    >
                      Add New or Existing Shipping Address
                    </Typography>
                  </Stack>
                  <Typography variant="cardHeader1" color="initial">
                    FIRST NAME *
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    autoComplete="off"
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
                    sx={customStyle}
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
                    autoComplete="off"
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
                    sx={customStyle}
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
                    COUNTRY *
                  </Typography>

                  <Select
                    autoComplete="off"
                    {...register("country_shipping", {
                      required: {
                        value: isSameAddressChecked === false ? true : false,
                        message: "Country is Required",
                      },
                    })}
                    sx={customStyle}
                    disabled={isSameAddressChecked === false ? false : true}
                    onClick={() => trigger("country_shipping")}
                    error={Boolean(errors.country_shipping)}
                    id="demo-simple-select"
                    size="small"
                    value={isSameAddressChecked === false ? distict1 : distict}
                    onChange={handleSelectChangeShipping}
                  >
                    <MenuItem value={"Select Country"} disabled>
                      Select Country
                    </MenuItem>
                    {countryData?.map((country, index) => (
                      <MenuItem
                        key={index}
                        value={country.country_name}
                        onClick={() =>
                          handleShippingCountry(country?.country_code)
                        }
                      >
                        {country.country_name}
                      </MenuItem>
                    ))}
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
                    TOWN / CITY *
                  </Typography>
                  {shippingCityLoading ? (
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
                      autoComplete="off"
                      {...register("city_shipping", {
                        required: {
                          value: isSameAddressChecked === false ? true : false,
                          message: "Town/City is Required",
                        },
                      })}
                      sx={customStyle}
                      disabled={isSameAddressChecked === false ? false : true}
                      onClick={() => trigger("city_shipping")}
                      error={Boolean(errors.city_shipping)}
                      id="demo-simple-select"
                      size="small"
                      value={townBillingSh}
                      onChange={handleSelectChangeTownShipping}
                    >
                      <MenuItem value={"Select Town/City"} disabled>
                        Select Town/City
                      </MenuItem>
                      {isSameAddressChecked === true ? (
                        <MenuItem value={townBillingSh}>
                          {townBillingSh}
                        </MenuItem>
                      ) : isAddressListDataShipping === true ? (
                        <MenuItem value={townBillingSh}>
                          {townBillingSh}
                        </MenuItem>
                      ) : (
                        shippingCities?.map((towns) => (
                          <MenuItem value={towns}>{towns}</MenuItem>
                        ))
                      )}
                    </Select>
                  )}

                  {errors.city_shipping && isSameAddressChecked === false && (
                    <p style={{ color: "red" }}>
                      {errors.city_shipping?.message}
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
                    autoComplete="off"
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
                    sx={customStyle}
                  />
                  {errors.street_address_shipping &&
                    isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.street_address_shipping?.message}
                      </p>
                    )}
                </Stack>
                <Stack direction={"column"} spacing={2} mt={3}>
                  <Typography variant="cardHeader1" color="initial">
                    APARTMENT ADDRESS (OPTIONAL)
                  </Typography>
                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    autoComplete="off"
                    {...register("apartment_address_shipping", {
                      required: {
                        value: false,
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
                    sx={customStyle}
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
                    POSTCODE / ZIP (OPTIONAL)
                  </Typography>

                  <TextField
                    // id=""
                    // label=""
                    // value={}
                    autoComplete="off"
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
                    sx={customStyle}
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
                    autoComplete="off"
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
                    sx={customStyle}
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
                    autoComplete="off"
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
                    sx={customStyle}
                  />
                  {errors.email_shipping && isSameAddressChecked === false && (
                    <p style={{ color: "red" }}>
                      {errors.email_shipping?.message}
                    </p>
                  )}
                </Stack>

                <Stack
                  direction={"column"}
                  spacing={2}
                  sx={{ display: { xs: "", lg: "none" } }}
                  mt={3}
                >
                  <Typography variant="cardHeader1" color="initial">
                    ORDER NOTES (OPTIONAL)
                  </Typography>

                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    rows={4}
                    autoComplete="off"
                    {...register("orderNote", {
                      required: {
                        value: false,
                        message: "Place your order note here.",
                      },
                    })}
                    onKeyUp={() => trigger("orderNote")}
                    error={Boolean(errors.orderNote)}
                    placeholder="Place your order note here."
                    size="small"
                    sx={customStyle}
                  />
                  {errors.orderNote && (
                    <p style={{ color: "red" }}>{errors.orderNote?.message}</p>
                  )}
                </Stack>
              </Grid>

              {/* Checkout Details sheet */}
              <Grid item lg={3} mt={4} xs={12}>
                <Paper elevation={3} mb={1} sx={{ width: "100%" }}>
                  <Stack
                    sx={{ width: "100%", mx: "auto", p: 2 }}
                    direction={"column"}
                    spacing={2}
                  >
                    <Stack direction={"row"} spacing={4} width="100%">
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
                        {selectedCurrency} {totalPrice}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"column"} spacing={2} mb={5} width="100%">
                      <Controller
                        rules={{
                          required: {
                            value: false,
                            message: "Please Select a Shipping Location",
                          },
                        }}
                        control={control}
                        name="deliveryMethod"
                        render={({ field }) => (
                          <RadioGroup {...field} name="option">
                            {getShippingOptions()?.map((option, index) => (
                              <FormControlLabel
                                value={option.innerText}
                                key={index}
                                control={
                                  <Radio
                                    // checked={isFromShowRoomChecked}
                                    onClick={handleShowRoomSelected}
                                  />
                                }
                                label={
                                  <Typography
                                    variant="cardHeader"
                                    className="bold"
                                    mb={0.6}
                                  >
                                    {option.innerText}{" "}
                                    <Typography
                                      variant="cardHeader"
                                      className="ExterBold"
                                      mb={0.6}
                                    >
                                      ({option.shippingCost} {selectedCurrency})
                                    </Typography>
                                  </Typography>
                                }
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                      <Stack direction={"row"} spacing={5} width="100%">
                        <Typography
                          variant="cardHeader"
                          color="initial"
                          className="bold"
                        >
                          SHIPPING:
                        </Typography>
                        <Typography
                          variant="cardHeader"
                          color="initial"
                          className="bold"
                        >
                          {selectedCurrency} {shippingCost}
                        </Typography>
                      </Stack>
                    </Stack>

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
                        sx={{ marginLeft: "72px!important" }}
                      >
                        {selectedCurrency}{" "}
                        {Math.round(totalPriceWithTax - totalPrice)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} spacing={5} width="100%">
                      <Typography
                        variant="tabText1"
                        color="initial"
                        className="exterBold"
                      >
                        TOTAL :
                      </Typography>
                      <Typography
                        variant="tabText1"
                        color="initial"
                        className="exterBold"
                      >
                        {selectedCurrency} {Math.round(total)}
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
                      <input
                        autoComplete="off"
                        {...register("termsAndConditions", {
                          required: {
                            value: true,
                            message: "Please select an option",
                          },
                        })}
                        control={control}
                        type="checkbox"
                        id=""
                        size="small"
                      />

                      <Typography variant="cardLocation123">
                        I have read and agree to the{" "}
                        <Typography
                          sx={{
                            textDecoration: "underline",
                            color: "gray",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            router.push({ pathname: "/policiespages" })
                          }
                          variant="cardLocation123"
                        >
                          terms and conditions *
                        </Typography>
                      </Typography>
                    </Stack>
                    {errors.termsAndConditions && (
                      <small
                        style={{
                          fontSize: "10px",
                          color: "red",
                          marginLeft: "2px",
                        }}
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

              {/* Order notes */}
              <Grid
                lg={8.5}
                xl={8.37}
                sx={{ display: { xs: "none", lg: "block" } }}
              >
                <Stack direction={"column"} spacing={2}>
                  <Typography variant="cardHeader1" color="initial">
                    ORDER NOTES (OPTIONAL)
                  </Typography>

                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    rows={4}
                    autoComplete="off"
                    {...register("orderNote", {
                      required: {
                        value: false,
                        message: "Place your order note here.",
                      },
                    })}
                    onKeyUp={() => trigger("orderNote")}
                    error={Boolean(errors.orderNote)}
                    placeholder="Place your order note here."
                    size="small"
                    sx={customStyle}
                  />
                  {errors.orderNote && (
                    <p style={{ color: "red" }}>{errors.orderNote?.message}</p>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Box>

      <Footer />
      <AddressLists
        open={addressList}
        setOpen={setAddressList}
        getUserAddress={getUserAddress}
        setValue={setValue}
        setDistict={setDistict}
        setDistict1={setDistict1}
        addAddressValue={addAddressValue}
        setAddAddressValue={setAddAddressValue}
        setTownBilling={setTownBilling}
        setTownBillingSh={setTownBillingSh}
        setIsAddressListDataBilling={setIsAddressListDataBilling}
        setIsAddressListDataShipping={setIsAddressListDataShipping}
        showInputField={showInputField}
      />
      <LoginModal
        open={openLoginModal}
        setOpen={setLoginModal}
        // isGuestCheckout={isGuestCheckout}
        // setIsGuestCheckout={setIsGuestCheckout}
        // setHasToken={setHasToken}
      ></LoginModal>
    </>
  );
};

export default checkout;
