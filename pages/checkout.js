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
  useGetECourierShippingChargeQuery,
} from "../src/features/api/apiSlice";
import { changeIsCheckout } from "../src/features/checkout/checkoutSlice";
import Link from "next/link";
import AddressLists from "../components/AddressLists";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";
import useCityFetcher from "../src/hooks/useCityFetcher";
import {
  eCourierCharge,
  fixedCharge,
} from "../public/assets/data/eCourier_charges";
import { useConvertCartData } from "../src/hooks/useConvertCartData";
import * as fbq from "../lib/fpixel";
import useCityFetcherEcourier from "../src/hooks/useCityFetcherEcourier";
import useThanaFetcherEcourier from "../src/hooks/useThanaFetcherEcourier";
import usePostCodeFetcherEcourier from "../src/hooks/usePostCodeFetcherEcourier";
import useAreaFetcherEcourier from "../src/hooks/useAreaFetcherEcourier";

const checkout = () => {
  // address popup state start
  const [addressList, setAddressList] = useState(false);
  const { convertCartData } = useConvertCartData();
  const carts = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cart);
  const hasFragile = cartItems.some((product) => product.isFragile);
  const convertedCart = convertCartData(carts);
  // address popup state end
  const cart = convertedCart.cart;

  // console.log("your log output", convertedCart);
  // const cart = useSelector((state) => state.cart.cart);
  const [addAddressValue, setAddAddressValue] = useState(0);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [totalFragileCharge, setTotalFragileCharge] = useState(0);
  const [host, setHost] = useState("");
  const [showCashOnDelivery, setShowCashOnDelivery] = useState();
  const dispatch = useDispatch();
  // const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalProductWeight = useSelector(
    (state) => state.cart.totalProductWeight
  );
  const isGuestCheckout = useSelector(
    (state) => state.checkoutSlice.isGuestCheckout
  );
  const totalPrice = convertedCart.totalPrice;
  const totalPriceOrg = convertedCart.totalPriceOrg;
  const totalPriceWithoutFragile = convertedCart.totalPriceWithoutFragileCharge;
  const totalFragileChargeOrg = convertedCart.totalFragileChargeOrg;
  const totalPriceWithTax = convertedCart.totalPriceWithTax;
  const totalPriceWithTaxOrg = convertedCart.totalPriceWithTaxOrg;
  // taking discount cart data
  const totalPrice_after_discount = convertedCart.totalPrice_after_discount;
  const totalPriceOrg_after_discount =
    convertedCart.totalPriceOrg_after_discount;
  const totalPriceWithoutFragile_after_discount =
    convertedCart.totalPriceWithoutFragileCharge_after_discount;
  const totalFragileChargeOrg_after_discount =
    convertedCart.totalFragileChargeOrg_after_discount;
  const totalPriceWithTax_after_discount =
    convertedCart.totalPriceWithTax_after_discount;
  const totalPriceWithTaxOrg_after_discount =
    convertedCart.totalPriceWithTaxOrg_after_discount;

  const [isSameAddressChecked, setIsSameAddressChecked] = useState(false);
  const [isAgreed, setAgreed] = useState(false);
  const [total, setTotal] = useState(totalPriceWithoutFragile_after_discount);
  const [error, setError] = useState({ initialState: true });
  const [openLoginModal, setLoginModal] = useState(false);
  const [payment, setPayment] = useState("");
  const [enable, setEnable] = useState(true);
  const [guestCheckoutResponse, setGuestCheckoutResponse] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingCostOrg, setShippingCostOrg] = useState(0);
  const [billingCountry, setBillingCountry] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [orderInfo, setOrderInfo] = useState({});
  const [eCourierResponse, setECourierResponse] = useState([]);
  const [orderResponseUser, setOrderResponseUser] = useState({});
  const [orderResponseGuest, setOrderResponseGuest] = useState({});
  const [isAddressListDataBilling, setIsAddressListDataBilling] =
    useState(false);
  const [isAddressListDataShipping, setIsAddressListDataShipping] =
    useState(false);
  const [pathaoShippingCost, setPathaoShippingCost] = useState(0);
  const [eQuerierShippingCost, setEQuerierShippingCost] = useState(0);
  const [eQuerierShippingCostOrg, setEQuerierShippingCostOrg] = useState(0);
  const [eQuerierPackagesCode, setEQuerierPackagesCode] = useState("");
  const [dhlShippingCost, setDhlShippingCost] = useState(0);
  const [showRoomShippingCost, setShowRoomShippingCost] = useState(0);
  const [countryBillingCode, setBillingCountryCode] = useState("");
  const [countryShippingCode, setShippingCountryCode] = useState("");
  const [allShippingCities, setAllShippingCities] = useState([]);
  const [allBillingCities, setAllBillingCities] = useState([]);
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
  const {
    selectedCountry: selectedCountryShippingEcourier,
    setSelectedCountry: setSelectedCountryShippingEcourier,
    cities: shippingCitiesEcourier,
    loading: shippingCityLoadingEcourier,
  } = useCityFetcherEcourier();

  const {
    selectedCountry: selectedCountryBillingEcourier,
    setSelectedCountry: setSelectedCountryBillingEcourier,
    cities: billingCitiesEcourier,
    loading: billingCityLoadingEcourier,
  } = useCityFetcherEcourier();
  const {
    selectedCity: selectedCityShippingEcourier,
    setSelectedCity: setSelectedCityShippingEcourier,
    thanas: shippingThanasEcourier,
    loading: shippingThanaLoadingEcourier,
  } = useThanaFetcherEcourier();
  const {
    selectedCity: selectedCityBillingEcourier,
    setSelectedCity: setSelectedCityBillingEcourier,
    thanas: billingThanasEcourier,
    loading: billingThanaLoadingEcourier,
  } = useThanaFetcherEcourier();
  const {
    setSelectedCity: setSelectedCityForPostCodeShippingEcourier,
    setSelectedThana: setSelectedThanaForPostCodeShippingEcourier,
    postCode: shippingPostCodeEcourier,
    loading: shippingPostCodeLoadingEcourier,
  } = usePostCodeFetcherEcourier();
  const {
    setSelectedCity: setSelectedCityForPostCodeBillingEcourier,
    setSelectedThana: setSelectedThanaForPostCodeBillingEcourier,
    postCode: billingPostCodeEcourier,
    loading: billingPostCodeLoadingEcourier,
  } = usePostCodeFetcherEcourier();
  const {
    selectedPostCode: selectedPostCodeShippingEcourier,
    setSelectedPostCode: setSelectedPostCodeShippingEcourier,
    area: shippingAreaEcourier,
    loading: shippingAreaLoadingEcourier,
  } = useAreaFetcherEcourier();
  const {
    selectedPostCode: selectedPostCodeBillingEcourier,
    setSelectedPostCode: setSelectedPostCodeBillingEcourier,
    area: billingAreaEcourier,
    loading: billingAreaLoadingEcourier,
  } = useAreaFetcherEcourier();

  const customStyle = {
    ".mui-style-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
      {
        "-webkit-text-fill-color": "rgb(0 0 0)",
      },
    ".mui-style-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
      {
        "-webkit-text-fill-color": "rgb(0 0 0)",
      },
    ".mui-style-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
      {
        background: "red!important",
      },
  };

  const customStyle2 = {
    "& .mui-style-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
      {
        background: "red!important",
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
  const {
    data: eCourierData,
    isLoading: eCourierLoading,
    isError: eCourierError,
    error: eCourierErrorData,
  } = useGetECourierShippingChargeQuery();
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
    /* {
      id: 1,
      innerText: "Pathao",
      shippingCost: pathaoShippingCost,
    }, */
    {
      id: 1,
      innerText: "E-Courier",
      shippingCost: eQuerierShippingCost,
    },
    {
      id: 1,
      innerText: "Pickup_from_showroom",
      shippingCost: 0,
    },
    {
      id: 1,
      innerText: "DHL",
      shippingCost: dhlShippingCost,
    },
  ];

  useEffect(() => {
    if (userOrderError || guestOrderError) {
      toast.error("Oops! Something went wrong. Please try again later.");
    }
  }, [userOrderError, guestOrderError]);

  useEffect(() => {
    if (hasFragile === true) {
      setTotalFragileCharge(25);
    }
    if (hasFragile === false) {
      setTotalFragileCharge(0);
    }
  }, [hasFragile, totalFragileCharge]);

  useEffect(() => {
    if (eCourierData) {
      const eCourierJsonData = JSON.parse(eCourierData?.response);
      // console.log('eC',eCourierJsonData)
      setECourierResponse(eCourierJsonData);
    }
  }, [eCourierData]);
  // console.log("your log output", cart);
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

  // User Checkout Section
  const onSubmit = async (data) => {
    setIsPlaceOrder(true);
    setIsSameAddress(isSameAddressChecked);
    setOrderInfo({
      data: data,
      cart: cart,
      totalPrice: totalPrice,
      totalPrice_after_discount: totalPrice_after_discount,
      totalPriceWithTax: totalPriceWithTax,
      totalPriceWithTax_after_discount: totalPriceWithTax_after_discount,
      totalPriceOrg: totalPriceOrg,
      totalPriceOrg_after_discount: totalPriceOrg_after_discount,
      totalPriceWithTaxOrg: totalPriceWithTaxOrg,
      totalPriceWithTaxOrg_after_discount: totalPriceWithTaxOrg_after_discount,
      totalFragileCharge: totalFragileCharge,
      totalFragileChargeOrg: totalFragileChargeOrg,
      totalFragileChargeOrg_after_discount:
        totalFragileChargeOrg_after_discount,
      shippingCost: shippingCost,
      shippingCostOrg: shippingCostOrg,
      eQuerierPackagesCode: eQuerierPackagesCode,
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
            totalPrice_after_discount,
            totalPriceOrg,
            totalPriceOrg_after_discount,
            totalPriceWithTax,
            totalPriceWithTax_after_discount,
            totalPriceWithTaxOrg,
            totalPriceWithTaxOrg_after_discount,
            totalFragileCharge,
            totalFragileChargeOrg,
            totalFragileChargeOrg_after_discount,
            eQuerierPackagesCode,
            shippingCost,
            shippingCostOrg,
            currentConversionRate: currentConversionRate,
            selectedCurrency: selectedCurrency,
            finalPriceOfOrder,
            totalAmount,
            isSameAddressChecked,
            isGuestCheckout,
            token,
          });
          setOrderResponseUser(postResponse);
          fbq.event("Purchase", {
            currency: selectedCurrency,
            value: totalPriceWithTax_after_discount,
          });
        } catch (e) {
          console.log("your log output", e);
        }
      };
      handleUserOrder();
    }
  };

  // Guest Checkout Section
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
            totalPrice_after_discount: orderInfo?.totalPrice_after_discount,
            totalPriceOrg: orderInfo?.totalPriceOrg,
            totalPriceOrg_after_discount:
              orderInfo?.totalPriceOrg_after_discount,
            totalPriceWithTax: orderInfo?.totalPriceWithTax,
            totalPriceWithTax_after_discount:
              orderInfo?.totalPriceWithTax_after_discount,
            totalPriceWithTaxOrg: orderInfo?.totalPriceWithTaxOrg,
            totalPriceWithTaxOrg_after_discount:
              orderInfo?.totalPriceWithTaxOrg_after_discount,
            totalFragileCharge: orderInfo?.totalFragileCharge,
            totalFragileChargeOrg: orderInfo?.totalFragileChargeOrg,
            totalFragileChargeOrg_after_discount:
              orderInfo?.totalFragileChargeOrg_after_discount,
            shippingCost: orderInfo.shippingCost,
            shippingCostOrg: orderInfo.shippingCostOrg,
            eQuerierPackagesCode: orderInfo.eQuerierPackagesCode,
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
          fbq.event("Purchase", {
            currency: orderInfo?.selectedCurrency,
            value: orderInfo?.totalPriceWithTax_after_discount,
          });
        } catch (e) {
          console.log("your log output", e);
        }
      };

      handleGuestOrder();
    }
  }, [isPlaceOrder, orderInfo, isGuestCheckout, hasToken]);
  // handling Different Form Events

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
  const handleAddressStatusShipping = () => {
    setAddressList(true);
    setAddAddressValue(1);
  };
  const handleAddressStatusBilling = () => {
    setAddressList(true);
    setAddAddressValue(2);
  };

  const handleBillingCountry = (country_code) => {
    setBillingCountry(country_code);
    setIsAddressListDataBilling(false);
    setValue("deliveryMethod", "");
    setValue("city_billing", "Select Town/City");
  };
  const handleShippingCountry = (country_code) => {
    setShippingCountry(country_code);
    setIsAddressListDataShipping(false);
    setValue("deliveryMethod", "");
    setValue("city_shipping", "Select Town/City");
    setPathaoShippingCost(0);
    setEQuerierShippingCost(0);
    setEQuerierShippingCostOrg(0);
    setDhlShippingCost(0);
    setShowRoomShippingCost(0);
  };

  // Handling React Hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, touched },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      first_name_billing: "",
      last_name_billing: "",
      country_billing: "Select Country",
      city_billing: "Select Town/City",
      thana_billing: "Select Thana",
      post_code_billing: "Select POSTCODE / ZIP",
      area_billing: "Select Area",
      street_address_billing: "",
      apartment_address_billing: "",
      phone_billing: "",
      email_billing: "",

      first_name_shipping: "",
      last_name_shipping: "",
      country_shipping: "Select Country",
      city_shipping: "Select Town/City",
      thana_shipping: "Select Thana",
      post_code_shipping: "Select POSTCODE / ZIP",
      area_shipping: "Select Area",
      street_address_shipping: "",
      apartment_address_shipping: "",
      phone_shipping: "",
      email_shipping: "",

      orderNote: "",
      isSameAddress: false,
      paymentMethod: "",
      deliveryMethod: "",
    },
  });
  // formate pricing
  const formatPrice = (amount) => {
    // Assuming amount is a number representing the price
    const currency = localStorage.getItem("currency");
    // Use toLocaleString to format the number with commas and appropriate currency symbol
    if (currency) {
      const formattedPrice = amount.toLocaleString("en-US", {
        // style: "currency",
        currency: currency, // Change the currency code as needed
        minimumFractionDigits: 2,
      });

      return formattedPrice;
    } else {
      return amount;
    }
  };
  const handleSelectChangeBilling = (event) => {
    setValue("country_billing", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangeShipping = (event) => {
    setValue("country_shipping", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangeTownBilling = (event) => {
    setValue("city_billing", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangeTownShipping = (event) => {
    setValue("city_shipping", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangeThanaShipping = (event) => {
    setValue("thana_shipping", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangeThanaBilling = (event) => {
    setValue("thana_billing", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangePostCodeShipping = (event) => {
    setValue("post_code_shipping", event.target.value, {
      shouldValidate: true,
    });
  };
  const handleSelectChangePostCodeBilling = (event) => {
    setValue("post_code_billing", event.target.value, { shouldValidate: true });
  };
  const handleSelectChangeAreaShipping = (event) => {
    setValue("area_shipping", event.target.value, {
      shouldValidate: true,
    });
  };
  const handleSelectChangeAreaBilling = (event) => {
    setValue("area_billing", event.target.value, { shouldValidate: true });
  };

  // Delivery System
  const handleOptionChanged = () => {
    if (deliveryMethod === "Pickup_from_showroom") {
      setValue("city_shipping", "Select Town/City");
    }
  };
  // Getting Billing Realtime Data
  const firstName = useWatch({ control, name: "first_name_billing" });
  const lastName = useWatch({ control, name: "last_name_billing" });
  const country = useWatch({ control, name: "country_billing" });
  const cityAddress = useWatch({ control, name: "city_billing" });
  const thanaAddress = useWatch({ control, name: "thana_billing" });
  const postBilling = useWatch({ control, name: "post_code_billing" });
  const areaAddress = useWatch({ control, name: "area_billing" });
  const streetAddress = useWatch({ control, name: "street_address_billing" });
  const apartmentAddress = useWatch({
    control,
    name: "apartment_address_billing",
  });
  const phoneBilling = useWatch({ control, name: "phone_billing" });
  const emailBilling = useWatch({ control, name: "email_billing" });

  const firstNameSh = useWatch({ control, name: "first_name_shipping" });
  const lastNameSh = useWatch({ control, name: "last_name_shipping" });
  const countrySh = useWatch({ control, name: "country_shipping" });
  const cityAddressSh = useWatch({ control, name: "city_shipping" });
  const thanaAddressSh = useWatch({ control, name: "thana_shipping" });
  const postBillingSh = useWatch({ control, name: "post_code_shipping" });
  const areaAddressSh = useWatch({ control, name: "area_shipping" });
  const streetAddressSh = useWatch({
    control,
    name: "street_address_shipping",
  });
  const apartmentAddressSh = useWatch({
    control,
    name: "apartment_address_shipping",
  });
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

  const getShippingOptions = () => {
    if (showInputField) {
      if (country === "Bangladesh") {
        return shippingOptions.filter((option) => option.innerText !== "DHL");
      } else if (country === "Select Country") {
        return;
      } else {
        return shippingOptions.filter((option) => option.innerText === "DHL");
      }
    } else {
      if (countrySh === "Bangladesh") {
        return shippingOptions.filter((option) => option.innerText !== "DHL");
      } else if (countrySh === "Select Country") {
        return;
      } else {
        return shippingOptions.filter((option) => option.innerText === "DHL");
      }
    }
  };

  useEffect(() => {
    if (countrySh === "Bangladesh") {
      // setValue("city_shipping","Select Town/City")
      if (deliveryMethod === "E-Courier" || deliveryMethod === "") {
        setAllShippingCities(shippingCitiesEcourier);
      } else if (deliveryMethod === "Pickup_from_showroom") {
        setAllShippingCities(shippingCities);
      }
    }
    if (country === "Bangladesh") {
      // setValue("city_billing","Select Town/City")
      if (deliveryMethod === "E-Courier" || deliveryMethod === "") {
        setAllBillingCities(billingCitiesEcourier);
      } else if (deliveryMethod === "Pickup_from_showroom") {
        setAllBillingCities(billingCities);
      }
    }
    if (countrySh !== "Bangladesh") {
      // setValue("city_shipping","Select Town/City")
      setAllShippingCities(shippingCities);
    }
    if (country !== "Bangladesh") {
      // setValue("city_billing","Select Town/City")
      setAllBillingCities(billingCities);
    }
  }, [
    countrySh,
    country,
    deliveryMethod,
    shippingCitiesEcourier,
    shippingCities,
    billingCitiesEcourier,
    billingCities,
  ]);

  useEffect(() => {
    // setValue("deliveryMethod", "");
    setIsAddressListDataShipping(false);
  }, [showInputField]);

  // Shipping Amount Calculation
  useEffect(() => {
    setShippingCost(0);
    setShippingCostOrg(0);
    setPathaoShippingCost(0);
    setEQuerierShippingCost(0);
    setEQuerierShippingCostOrg(0);
    setDhlShippingCost(0);
    setShowRoomShippingCost(0);
    if (deliveryMethod === "E-Courier") {
      setTotal(
        parseFloat(
          (totalPriceWithTax_after_discount + totalFragileCharge).toFixed(2)
        )
      );
    } else {
      setTotal(parseFloat(totalPriceWithTax_after_discount.toFixed(2)));
    }
    if (countrySh === "Bangladesh") {
      if (cityAddressSh) {
        const refinedCity = cityAddressSh.split(" ")[0];
        if (refinedCity === "Dhaka") {
          if (countryData) {
            let pathao, e_courier;
            const targetCoverage = "Inside Dhaka";
            const applicablePackages = eCourierCharge.filter(
              (item) => item.coverage_id === targetCoverage
            );
            let applicablePackage = null;

            for (const pkg of applicablePackages) {
              const [minWeight, maxWeight] = pkg.weightrange
                .split("-")
                .map(Number);
              if (
                totalProductWeight >= minWeight &&
                totalProductWeight <= maxWeight
              ) {
                applicablePackage = pkg;
                break;
              }
            }
            if (applicablePackage) {
              setEQuerierShippingCost(
                convertPrice(applicablePackage.shipping_charge)
              );
              setEQuerierShippingCostOrg(applicablePackage.shipping_charge);
              setEQuerierPackagesCode(applicablePackage?.package_code);
            } else {
              const maxWeightPackage = applicablePackages.reduce(
                (prev, curr) => {
                  return curr.shipping_charge > prev.shipping_charge
                    ? curr
                    : prev;
                }
              );

              const extraWeight = Math.ceil(
                (totalProductWeight -
                  maxWeightPackage.weightrange.split("-")[1]) /
                  1000
              );
              const additionalCharge = extraWeight * fixedCharge;

              setEQuerierShippingCost(
                convertPrice(
                  maxWeightPackage.shipping_charge + additionalCharge
                )
              );
              setEQuerierShippingCostOrg(
                maxWeightPackage.shipping_charge + additionalCharge
              );
              setEQuerierPackagesCode(maxWeightPackage?.package_code);
            }

            setPathaoShippingCost(pathao);

            if (deliveryMethod === "Pathao") {
              setTotal(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount + pathaoShippingCost
                  ).toFixed(2)
                )
              );
              setShippingCost(pathaoShippingCost);
              setShippingCostOrg(pathaoShippingCost);
            } else if (deliveryMethod === "E-Courier") {
              setTotal(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount +
                    totalFragileCharge +
                    eQuerierShippingCost
                  ).toFixed(2)
                )
              );
              setShippingCost(eQuerierShippingCost);
              setShippingCostOrg(eQuerierShippingCostOrg);
            } else if (deliveryMethod === "Pickup_from_showroom") {
              setTotal(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount + showRoomShippingCost
                  ).toFixed(2)
                )
              );
              setShippingCost(showRoomShippingCost);
              setShippingCostOrg(showRoomShippingCost);
            }
          }
        } else {
          if (countryData) {
            let pathao, e_courier;
            const targetCoverage = "Outside Dhaka";
            const applicablePackages = eCourierCharge.filter(
              (item) => item.coverage_id === targetCoverage
            );
            let applicablePackage = null;

            for (const pkg of applicablePackages) {
              const [minWeight, maxWeight] = pkg.weightrange
                .split("-")
                .map(Number);

              if (
                totalProductWeight >= minWeight &&
                totalProductWeight <= maxWeight
              ) {
                applicablePackage = pkg;
                break;
              }
            }
            if (applicablePackage) {
              setEQuerierShippingCost(
                convertPrice(applicablePackage.shipping_charge)
              );
              setEQuerierShippingCostOrg(applicablePackage.shipping_charge);
              setEQuerierPackagesCode(applicablePackage?.package_code);
            } else {
              const maxWeightPackage = applicablePackages.reduce(
                (prev, curr) => {
                  return curr.shipping_charge > prev.shipping_charge
                    ? curr
                    : prev;
                }
              );

              const extraWeight = Math.ceil(
                (totalProductWeight -
                  maxWeightPackage.weightrange.split("-")[1]) /
                  1000
              );
              const additionalCharge = extraWeight * fixedCharge;

              setEQuerierShippingCost(
                convertPrice(
                  maxWeightPackage.shipping_charge + additionalCharge
                )
              );
              setEQuerierShippingCostOrg(
                maxWeightPackage.shipping_charge + additionalCharge
              );
              setEQuerierPackagesCode(maxWeightPackage?.package_code);
            }
            setPathaoShippingCost(pathao);
            // setEQuerierShippingCost(e_courier);
            if (deliveryMethod === "Pathao") {
              setTotal(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount + pathaoShippingCost
                  ).toFixed(2)
                )
              );
              setShippingCost(pathaoShippingCost);
              setShippingCostOrg(pathaoShippingCost);
            } else if (deliveryMethod === "E-Courier") {
              setTotal(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount +
                    totalFragileCharge +
                    eQuerierShippingCost
                  ).toFixed(2)
                )
              );
              setShippingCost(eQuerierShippingCost);
              setShippingCostOrg(eQuerierShippingCostOrg);
            } else if (deliveryMethod === "Pickup_from_showroom") {
              setTotal(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount + showRoomShippingCost
                  ).toFixed(2)
                )
              );
              setShippingCost(showRoomShippingCost);
              setShippingCostOrg(showRoomShippingCost);
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
        setDhlShippingCost(convertPrice(shippingChargeForSelectedCountry));
        if (deliveryMethod === "DHL") {
          setTotal(
            parseFloat(
              (
                totalPriceWithTax_after_discount +
                totalFragileCharge +
                dhlShippingCost
              ).toFixed(2)
            )
          );
          setShippingCost(dhlShippingCost);
          setShippingCostOrg(dhlShippingCost);
        }
      }
    }
  }, [
    showInputField,
    cityAddressSh,
    cityAddress,
    billingCountry,
    billingCities,
    country,
    countrySh,
    deliveryMethod,
    eQuerierShippingCost,
    dhlShippingCost,
    pathaoShippingCost,
    convertedCart,
  ]);
  // console.log("your log output", eQuerierPackagesCode);

  useEffect(() => {
    setPayment(paymentMethod);
  }, [payment, paymentMethod]);

  // fetching billing cities whenever the country name changes
  useEffect(() => {
    if (isAddressListDataBilling === false) {
      if (countryData && country) {
        const selectedCountryObject = countryData.find(
          (countryData) => countryData.country_name === country
        );
        if (selectedCountryObject) {
          setBillingCountryCode(selectedCountryObject?.country_code);
        } else {
          setBillingCountryCode("");
        }
      }
    }
  }, [country, countryData, isAddressListDataBilling]);

  useEffect(() => {
    if (isAddressListDataBilling === false) {
      setSelectedCountryBilling(countryBillingCode);
    }
  }, [countryBillingCode, country, isAddressListDataBilling]);

  // fetching shipping cities whenever the country name changes
  useEffect(() => {
    if (isAddressListDataShipping === false) {
      if (countryData && countrySh) {
        const selectedCountryObject = countryData.find(
          (countryData) => countryData.country_name === countrySh
        );
        if (selectedCountryObject) {
          setShippingCountryCode(selectedCountryObject?.country_code);
        } else {
          setShippingCountryCode("");
        }
      }
    }
  }, [countrySh, countryData, isAddressListDataShipping]);

  useEffect(() => {
    if (isAddressListDataShipping === false) {
      setSelectedCountryShipping(countryShippingCode);
      setSelectedCountryShippingEcourier(countrySh);
    }
  }, [countryShippingCode, countrySh, isAddressListDataShipping]);

  // setting whether user wants to pay online or cash
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

  // redirecting users to where they came from
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
    if (showInputField === true || paymentMethod === "cash") {
      setValue("first_name_billing", firstNameSh);
      setValue("last_name_billing", lastNameSh);
      setValue("street_address_billing", streetAddressSh);
      setValue("apartment_address_billing", apartmentAddressSh);
      setValue("city_billing", cityAddressSh);
      setValue("country_billing", countrySh);
      setValue("post_code_billing", postBillingSh);
      setValue("area_billing", areaAddressSh);
      setValue("thana_billing", thanaAddressSh);
      setValue("phone_billing", phoneBillingSh);
      setValue("email_billing", emailBillingSh);
    } else if (
      showInputField === false &&
      isAddressListDataShipping === false
    ) {
      setValue("first_name_billing", "");
      setValue("last_name_billing", "");
      setValue("street_address_billing", "");
      setValue("apartment_address_billing", "");
      setValue("city_billing", "Select Town/City");
      setValue("country_billing", "Select Country");
      setValue("post_code_billing", "Select POSTCODE / ZIP");
      setValue("area_billing", "Select Area");
      setValue("thana_billing", "Select Thana");
      setValue("phone_billing", "");
      setValue("email_billing", "");
    }
  }, [
    showInputField,
    cityAddressSh,
    firstNameSh,
    lastNameSh,
    streetAddressSh,
    apartmentAddressSh,
    cityAddressSh,
    countrySh,
    postBillingSh,
    phoneBillingSh,
    emailBillingSh,
    paymentMethod,
    isSameAddressChecked,
    deliveryMethod,
  ]);

  // fetch cities
  useEffect(() => {
    setSelectedCountryBilling(billingCountry);
    setSelectedCountryShipping(shippingCountry);
    setSelectedCountryShippingEcourier(countrySh);
    setSelectedCountryBillingEcourier(country);
  }, [billingCountry, shippingCountry, country, countrySh]);

  // fetch thana
  useEffect(() => {
    setSelectedCityShippingEcourier(cityAddressSh);
    setSelectedCityBillingEcourier(cityAddress);
  }, [cityAddressSh, cityAddress]);
  // fetch post code
  useEffect(() => {
    setSelectedCityForPostCodeShippingEcourier(cityAddressSh);
    setSelectedThanaForPostCodeShippingEcourier(thanaAddressSh);
    setSelectedCityForPostCodeBillingEcourier(cityAddress);
    setSelectedThanaForPostCodeBillingEcourier(thanaAddress);
  }, [cityAddressSh, thanaAddressSh, cityAddress, thanaAddress]);
  // fetch area
  useEffect(() => {
    setSelectedPostCodeShippingEcourier(postBillingSh);
    setSelectedPostCodeBillingEcourier(postBilling);
  }, [postBillingSh, postBilling]);

  useEffect(() => {
    if (showInputField === true) {
      setShowCashOnDelivery(country);
    }
    if (showInputField === false) {
      setShowCashOnDelivery(countrySh);
    }
  }, [showInputField, country, countrySh]);
  // console.log("showCashOnDelivery", showCashOnDelivery);
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
        firstNameSh &&
        lastNameSh &&
        streetAddressSh &&
        cityAddressSh !== "Select Town/City" &&
        cityAddressSh !== "" &&
        countrySh !== "Select Country" &&
        countrySh !== "" &&
        thanaAddressSh !== "Select Thana" &&
        thanaAddressSh !== "" &&
        postBillingSh !== "Select POSTCODE / ZIP" &&
        postBillingSh !== "" &&
        areaAddressSh !== "Select Area" &&
        areaAddressSh !== "" &&
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
        firstNameSh &&
        lastNameSh &&
        streetAddressSh &&
        cityAddressSh !== "Select Town/City" &&
        cityAddressSh !== "" &&
        countrySh !== "Select Country" &&
        countrySh !== "" &&
        thanaAddressSh !== "Select Thana" &&
        thanaAddressSh !== "" &&
        postBillingSh !== "Select POSTCODE / ZIP" &&
        postBillingSh !== "" &&
        areaAddressSh !== "Select Area" &&
        areaAddressSh !== "" &&
        phoneBillingSh &&
        emailBillingSh &&
        deliveryMethod &&
        paymentMethod &&
        termsAndCondition
      ) {
        setEnable(false);
      }
    }

    if (isSameAddressChecked === false && paymentMethod === "online") {
      setEnable(true);
      if (
        firstName &&
        lastName &&
        streetAddress &&
        cityAddress !== "Select Town/City" &&
        cityAddress !== "" &&
        country !== "Select Country" &&
        country !== "" &&
        thanaAddress !== "Select Thana" &&
        thanaAddress !== "" &&
        postBilling !== "Select POSTCODE / ZIP" &&
        postBilling !== "" &&
        areaAddress !== "Select Area" &&
        areaAddress !== "" &&
        phoneBilling &&
        emailBilling &&
        firstNameSh &&
        lastNameSh &&
        streetAddressSh &&
        cityAddressSh !== "Select Town/City" &&
        cityAddressSh !== "" &&
        countrySh !== "Select Country" &&
        countrySh !== "" &&
        thanaAddressSh !== "Select Thana" &&
        thanaAddressSh !== "" &&
        postBillingSh !== "Select POSTCODE / ZIP" &&
        postBillingSh !== "" &&
        areaAddressSh !== "Select Area" &&
        areaAddressSh !== "" &&
        phoneBillingSh &&
        emailBillingSh &&
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
    cityAddress,
    country,
    streetAddress,
    apartmentAddress,
    postBilling,
    phoneBilling,
    emailBilling,
    firstNameSh,
    lastNameSh,
    cityAddressSh,
    countrySh,
    streetAddressSh,
    apartmentAddressSh,
    postBillingSh,
    phoneBillingSh,
    emailBillingSh,
    orderNote,
    errors,
    thanaAddress,
    postBilling,
    areaAddress,
    thanaAddressSh,
    postBillingSh,
    areaAddressSh,
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
    countryLoading ||
    eCourierLoading
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
            color="#1B3148"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Checkout
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "94%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Grid
              container
              pt={5}
              xs={12}
              columnGap={5}
              rowGap={4}
              sx={{ width: "100%", mx: "auto" }}
              justifyContent={"center"}
            >
              <Grid item lg={7} sx={{ width: "100%" }}>
                {/* Shipping form */}
                <Grid item lg={12} sx={{ width: "100%" }}>
                  <Typography variant="header1" color="#1B3148">
                    SHIPPING DETAILS
                  </Typography>
                  <Stack direction={"row"} spacing={1} mt={3.8}>
                    <Typography
                      variant="cardLocation123"
                      color="#1B3148"
                      onClick={() => handleAddressStatusBilling()}
                      className="SemiBold"
                      sx={{
                        textDecoration: "underline",
                        textUnderlineOffset: ".3rem",
                        // color: "initial",
                        cursor: "pointer",
                      }}
                    >
                      Add New or Existing Billing Address
                    </Typography>
                  </Stack>
                  {/* first name */}
                  <Stack mt={5}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      FIRST NAME *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      autoComplete="off"
                      {...register("first_name_shipping", {
                        required: {
                          value: true,
                          message: "First Name Required",
                        },
                      })}
                      onKeyUp={() => trigger("first_name_shipping")}
                      error={Boolean(errors.first_name_shipping)}
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

                  {/* last name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      LAST NAME *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      autoComplete="off"
                      {...register("last_name_shipping", {
                        required: {
                          value: true,
                          message: "Last Name Required",
                        },
                      })}
                      onKeyUp={() => trigger("last_name_shipping")}
                      error={Boolean(errors.last_name_shipping)}
                      placeholder={
                        isSameAddressChecked === false
                          ? "Last Name *"
                          : lastName
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

                  {/* country name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      COUNTRY *
                    </Typography>

                    <Select
                      autoComplete="off"
                      {...register("country_shipping", {
                        required: {
                          value: true,
                          message: "Country is Required",
                        },
                      })}
                      sx={customStyle}
                      onClick={() => trigger("country_shipping")}
                      error={Boolean(errors.country_shipping)}
                      id="country_shipping"
                      size="small"
                      value={countrySh}
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

                  {/* town/city name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      TOWN / CITY *
                    </Typography>
                    {shippingCityLoadingEcourier ? (
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
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        countrySh === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("city_shipping", {
                              required: {
                                value: true,
                                message: "Town/City is Required",
                              },
                            })}
                            sx={customStyle}
                            onBlur={() => trigger("city_shipping")}
                            error={Boolean(errors.city_shipping)}
                            id="city_shipping"
                            size="small"
                            value={cityAddressSh}
                            onChange={handleSelectChangeTownShipping}
                          >
                            <MenuItem value={"Select Town/City"} disabled>
                              Select Town/City
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={cityAddressSh}>
                                {cityAddressSh}
                              </MenuItem>
                            ) : allShippingCities ? (
                              allShippingCities.map((towns) => (
                                <MenuItem value={towns?.value}>
                                  {towns?.value}
                                </MenuItem>
                              ))
                            ) : (
                              ""
                            )}
                          </Select>
                        ) : (
                          <Select
                            autoComplete="off"
                            {...register("city_shipping", {
                              required: {
                                value: true,
                                message: "Town/City is Required",
                              },
                            })}
                            sx={customStyle}
                            onBlur={() => trigger("city_shipping")}
                            error={Boolean(errors.city_shipping)}
                            id="city_shipping"
                            size="small"
                            placeholder="Select Town/City"
                            value={cityAddressSh}
                            onChange={handleSelectChangeTownShipping}
                          >
                            <MenuItem value={"Select Town/City"} disabled>
                              Select Town/City
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={cityAddressSh}>
                                {cityAddressSh}
                              </MenuItem>
                            ) : allShippingCities ? (
                              allShippingCities?.map((towns) => (
                                <MenuItem value={towns}>{towns}</MenuItem>
                              ))
                            ) : (
                              ""
                            )}
                          </Select>
                        )}
                      </>
                    )}

                    {errors.city_shipping && isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.city_shipping?.message}
                      </p>
                    )}
                  </Stack>

                  {/* thana name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      THANA *
                    </Typography>
                    {shippingThanaLoadingEcourier ? (
                      <Stack
                        border={"1px solid gray"}
                        borderRadius={"5px"}
                        direction={"rwo"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginLeft: "10px" }}>
                          Collecting Thana
                        </Typography>
                        <CircularProgress
                          sx={{ color: "#3C5676", marginRight: "10px" }}
                        />
                      </Stack>
                    ) : (
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        countrySh === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("thana_shipping", {
                              required: {
                                value: true,
                                message: "Thana is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("thana_shipping")}
                            error={Boolean(errors.thana_shipping)}
                            id="thana_shipping"
                            size="small"
                            value={thanaAddressSh}
                            onChange={handleSelectChangeThanaShipping}
                          >
                            <MenuItem value={"Select Thana"} disabled>
                              Select Thana
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={thanaAddressSh}>
                                {thanaAddressSh}
                              </MenuItem>
                            ) : (
                              shippingThanasEcourier?.map((thana) => (
                                <MenuItem value={thana?.value}>
                                  {thana?.value}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <TextField
                            autoComplete="off"
                            {...register("thana_shipping", {
                              required: {
                                value: true,
                                message: "Thana Address Required",
                              },
                            })}
                            onKeyUp={() => trigger("thana_shipping")}
                            error={Boolean(errors.thana_shipping)}
                            // onChange={}

                            placeholder={
                              isSameAddressChecked === false
                                ? "Enter Thana"
                                : streetAddress
                            }
                            // placeholder="House Number and street name"
                            size="small"
                            sx={customStyle}
                          />
                        )}
                      </>
                    )}

                    {errors.thana_shipping &&
                      isSameAddressChecked === false && (
                        <p style={{ color: "red" }}>
                          {errors.thana_shipping?.message}
                        </p>
                      )}
                  </Stack>

                  {/* post code name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      POSTCODE / ZIP (OPTIONAL)
                    </Typography>
                    {shippingPostCodeLoadingEcourier ? (
                      <Stack
                        border={"1px solid gray"}
                        borderRadius={"5px"}
                        direction={"rwo"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginLeft: "10px" }}>
                          Collecting POSTCODE / ZIP
                        </Typography>
                        <CircularProgress
                          sx={{ color: "#3C5676", marginRight: "10px" }}
                        />
                      </Stack>
                    ) : (
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        countrySh === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("post_code_shipping", {
                              required: {
                                value: true,
                                message: "PostCode / ZIP is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("post_code_shipping")}
                            error={Boolean(errors.post_code_shipping)}
                            id="post_code_shipping"
                            size="small"
                            value={postBillingSh}
                            onChange={handleSelectChangePostCodeShipping}
                          >
                            <MenuItem value={"Select POSTCODE / ZIP"} disabled>
                              Select POSTCODE / ZIP
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={postBillingSh}>
                                {postBillingSh}
                              </MenuItem>
                            ) : (
                              shippingPostCodeEcourier?.map((postCode) => (
                                <MenuItem value={postCode.value}>
                                  {postCode.name}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <TextField
                            autoComplete="off"
                            {...register("post_code_shipping", {
                              required: {
                                value: true,
                                message: "Post/ZIP Code is Required",
                              },
                            })}
                            onKeyUp={() => trigger("post_code_shipping")}
                            error={Boolean(errors.post_code_shipping)}
                            // onChange={}

                            placeholder={
                              isSameAddressChecked === false
                                ? "Enter Post/ZIP Code"
                                : streetAddress
                            }
                            // placeholder="House Number and street name"
                            size="small"
                            sx={customStyle}
                          />
                        )}
                      </>
                    )}

                    {errors.post_code_shipping &&
                      isSameAddressChecked === false && (
                        <p style={{ color: "red" }}>
                          {errors.post_code_shipping?.message}
                        </p>
                      )}
                  </Stack>

                  {/* area code name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      AREA *
                    </Typography>
                    {shippingAreaLoadingEcourier ? (
                      <Stack
                        border={"1px solid gray"}
                        borderRadius={"5px"}
                        direction={"rwo"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginLeft: "10px" }}>
                          Collecting Areas
                        </Typography>
                        <CircularProgress
                          sx={{ color: "#3C5676", marginRight: "10px" }}
                        />
                      </Stack>
                    ) : (
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        countrySh === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("area_shipping", {
                              required: {
                                value: true,
                                message: "Area is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("area_shipping")}
                            error={Boolean(errors.area_shipping)}
                            id="area_shipping"
                            size="small"
                            value={areaAddressSh}
                            onChange={handleSelectChangeAreaShipping}
                          >
                            <MenuItem value={"Select Area"} disabled>
                              Select Area
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={areaAddressSh}>
                                {areaAddressSh}
                              </MenuItem>
                            ) : (
                              shippingAreaEcourier?.map((area) => (
                                <MenuItem value={area.value}>
                                  {area.name}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <TextField
                            autoComplete="off"
                            {...register("area_shipping", {
                              required: {
                                value: true,
                                message: "Area is Required",
                              },
                            })}
                            onKeyUp={() => trigger("area_shipping")}
                            error={Boolean(errors.area_shipping)}
                            // onChange={}

                            placeholder={
                              isSameAddressChecked === false
                                ? "Enter Area Name"
                                : streetAddress
                            }
                            // placeholder="House Number and street name"
                            size="small"
                            sx={customStyle}
                          />
                        )}
                      </>
                    )}

                    {errors.area_shipping && isSameAddressChecked === false && (
                      <p style={{ color: "red" }}>
                        {errors.area_shipping?.message}
                      </p>
                    )}
                  </Stack>

                  {/* street name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      STREET ADDRESS *
                    </Typography>
                    <TextField
                      autoComplete="off"
                      {...register("street_address_shipping", {
                        required: {
                          value: true,
                          message: "House and Street Address Required",
                        },
                      })}
                      onKeyUp={() => trigger("street_address_shipping")}
                      error={Boolean(errors.street_address_shipping)}
                      // onChange={}

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

                  {/* apartment name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
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

                  {/* phone name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      PHONE *
                    </Typography>

                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      autoComplete="off"
                      {...register("phone_shipping", {
                        required: {
                          value: true,
                          message: "Phone Number is Required",
                        },
                      })}
                      onKeyUp={() => trigger("phone_shipping")}
                      error={Boolean(errors.phone_shipping)}
                      // onChange={}

                      placeholder={
                        isSameAddressChecked === false
                          ? "Phone *"
                          : phoneBilling
                      }
                      // placeholder="Phone *"
                      size="small"
                      sx={customStyle}
                    />
                    {errors.phone_shipping &&
                      isSameAddressChecked === false && (
                        <p style={{ color: "red" }}>
                          {errors.phone_shipping?.message}
                        </p>
                      )}
                  </Stack>

                  {/* email name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      EMAIL ADDRESS *
                    </Typography>

                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      autoComplete="off"
                      {...register("email_shipping", {
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
                      onKeyUp={() => trigger("email_shipping")}
                      error={Boolean(errors.email_shipping)}
                      // onChange={}

                      placeholder={
                        isSameAddressChecked === false
                          ? "Email Address *"
                          : emailBilling
                      }
                      // placeholder="Email Address *"
                      size="small"
                      sx={customStyle}
                    />
                    {errors.email_shipping &&
                      isSameAddressChecked === false && (
                        <p style={{ color: "red" }}>
                          {errors.email_shipping?.message}
                        </p>
                      )}
                  </Stack>
                </Grid>

                {/* Billing Form */}
                <Grid
                  item
                  mt={5}
                  lg={12}
                  sx={{
                    width: "100%",
                    display: `${paymentMethod === "online" ? "block" : "none"}`,
                  }}
                >
                  <Typography variant="header1" color="#1B3148">
                    BILLING DETAILS
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
                        variant="cardLocation123"
                        className="SemiBold"
                        color="#1B3148"
                      >
                        Same As Shipping Address.
                      </Typography>
                      <b>/</b>
                      <Typography
                        variant="cardLocation123"
                        color="#1B3148"
                        onClick={() => handleAddressStatusShipping()}
                        className="SemiBold"
                        sx={{
                          textDecoration: "underline",
                          textUnderlineOffset: ".3rem",
                          // color: "initial",
                          cursor: "pointer",
                        }}
                      >
                        Add New or Existing Shipping Address
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* first name */}
                  <Stack direction={"column"} spacing={2} mt={{ lg: 2.5 }}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      FIRST NAME *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      {...register("first_name_billing", {
                        required: {
                          value:
                            isSameAddressChecked === false &&
                            paymentMethod === "online"
                              ? true
                              : false,
                          message: "First Name Required",
                        },
                      })}
                      onKeyUp={() => trigger("first_name_billing")}
                      error={Boolean(errors.first_name_billing)}
                      disabled={isSameAddressChecked === false ? false : true}
                      placeholder={
                        isSameAddressChecked === false
                          ? "First Name *"
                          : firstNameSh
                      }
                      size="small"
                    />
                    {errors.first_name_billing && (
                      <p style={{ color: "red" }}>
                        {errors.first_name_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* last name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      LAST NAME *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      // onChange={}
                      {...register("last_name_billing", {
                        required: {
                          value:
                            isSameAddressChecked === false &&
                            paymentMethod === "online"
                              ? true
                              : false,
                          message: "Last Name Required",
                        },
                      })}
                      disabled={isSameAddressChecked === false ? false : true}
                      onKeyUp={() => trigger("last_name_billing")}
                      error={Boolean(errors.last_name_billing)}
                      placeholder={
                        isSameAddressChecked === false
                          ? "Last Name *"
                          : lastNameSh
                      }
                      size="small"
                    />
                    {errors.last_name_billing && (
                      <p style={{ color: "red" }}>
                        {errors.last_name_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* country name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      COUNTRY *
                    </Typography>
                    <Select
                      id="country_billing"
                      {...register("country_billing", {
                        required: {
                          value:
                            isSameAddressChecked === false &&
                            paymentMethod === "online"
                              ? true
                              : false,
                          message: "Country is Required",
                        },
                      })}
                      disabled={isSameAddressChecked === false ? false : true}
                      className="custom"
                      onClick={() => trigger("country_billing")}
                      error={Boolean(errors.country_billing)}
                      size="small"
                      value={
                        isSameAddressChecked === false ? country : countrySh
                      }
                      onChange={handleSelectChangeBilling}
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

                  {/* town/city name */}
                  <Stack
                    direction={"column"}
                    spacing={2}
                    mt={3}
                    className="custom"
                    sx={customStyle2}
                  >
                    <Typography variant="cardHeader1" color="#1B3148">
                      TOWN / CITY *
                    </Typography>

                    {billingCityLoadingEcourier ? (
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
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        country === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("city_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Town/City is Required",
                              },
                            })}
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            sx={customStyle}
                            onClick={() => trigger("city_billing")}
                            error={Boolean(errors.city_billing)}
                            id="city_billing"
                            size="small"
                            value={
                              isSameAddressChecked === false
                                ? cityAddress
                                : cityAddressSh
                            }
                            onChange={handleSelectChangeTownBilling}
                          >
                            <MenuItem value={"Select Town/City"} disabled>
                              Select Town/City
                            </MenuItem>
                            {isAddressListDataBilling === true ? (
                              <MenuItem value={cityAddress}>
                                {cityAddress}
                              </MenuItem>
                            ) : allBillingCities ? (
                              allBillingCities.map((towns) => (
                                <MenuItem value={towns?.value}>
                                  {towns?.value}
                                </MenuItem>
                              ))
                            ) : (
                              ""
                            )}
                          </Select>
                        ) : (
                          <Select
                            autoComplete="off"
                            {...register("city_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Town/City is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("city_billing")}
                            error={Boolean(errors.city_billing)}
                            id="city_billing"
                            size="small"
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            value={
                              isSameAddressChecked === false
                                ? cityAddress
                                : cityAddressSh
                            }
                            onChange={handleSelectChangeTownBilling}
                          >
                            <MenuItem value={"Select Town/City"} disabled>
                              Select Town/City
                            </MenuItem>
                            {isAddressListDataBilling === true ? (
                              <MenuItem value={cityAddress}>
                                {cityAddress}
                              </MenuItem>
                            ) : allBillingCities ? (
                              allBillingCities?.map((towns) => (
                                <MenuItem value={towns}>{towns}</MenuItem>
                              ))
                            ) : (
                              ""
                            )}
                          </Select>
                        )}
                      </>
                    )}

                    {errors.city_billing && (
                      <p style={{ color: "red" }}>
                        {errors.city_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* thana name */}
                  <Stack
                    direction={"column"}
                    spacing={2}
                    mt={3}
                    className="custom"
                    sx={customStyle2}
                  >
                    <Typography variant="cardHeader1" color="#1B3148">
                      THANA *
                    </Typography>

                    {billingThanaLoadingEcourier ? (
                      <Stack
                        border={"1px solid gray"}
                        borderRadius={"5px"}
                        direction={"rwo"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginLeft: "10px" }}>
                          Collecting Thana
                        </Typography>
                        <CircularProgress
                          sx={{ color: "#3C5676", marginRight: "10px" }}
                        />
                      </Stack>
                    ) : (
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        country === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("thana_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Thana is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("thana_billing")}
                            error={Boolean(errors.thana_billing)}
                            id="thana_billing"
                            size="small"
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            value={
                              isSameAddressChecked === false
                                ? thanaAddress
                                : thanaAddressSh
                            }
                            onChange={handleSelectChangeThanaBilling}
                          >
                            <MenuItem value={"Select Thana"} disabled>
                              Select Thana
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={thanaAddress}>
                                {thanaAddress}
                              </MenuItem>
                            ) : (
                              billingThanasEcourier?.map((thana) => (
                                <MenuItem value={thana?.value}>
                                  {thana?.value}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <TextField
                            autoComplete="off"
                            {...register("thana_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Thana Address Required",
                              },
                            })}
                            onKeyUp={() => trigger("thana_billing")}
                            error={Boolean(errors.thana_billing)}
                            // onChange={}
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            placeholder={
                              isSameAddressChecked === false
                                ? "Enter Thana"
                                : thanaAddress
                            }
                            // placeholder="House Number and street name"
                            size="small"
                            sx={customStyle}
                          />
                        )}
                      </>
                    )}

                    {errors.thana_billing && (
                      <p style={{ color: "red" }}>
                        {errors.thana_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* post code name */}
                  <Stack
                    direction={"column"}
                    spacing={2}
                    mt={3}
                    className="custom"
                    sx={customStyle2}
                  >
                    <Typography variant="cardHeader1" color="#1B3148">
                      POSTCODE / ZIP (OPTIONAL)
                    </Typography>

                    {billingPostCodeLoadingEcourier ? (
                      <Stack
                        border={"1px solid gray"}
                        borderRadius={"5px"}
                        direction={"rwo"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginLeft: "10px" }}>
                          Collecting POSTCODE / ZIP
                        </Typography>
                        <CircularProgress
                          sx={{ color: "#3C5676", marginRight: "10px" }}
                        />
                      </Stack>
                    ) : (
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        country === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("post_code_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "PostCode / ZIP is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("post_code_billing")}
                            error={Boolean(errors.post_code_billing)}
                            id="post_code_billing"
                            size="small"
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            value={
                              isSameAddressChecked === false
                                ? postBilling
                                : postBillingSh
                            }
                            onChange={handleSelectChangePostCodeBilling}
                          >
                            <MenuItem value={"Select POSTCODE / ZIP"} disabled>
                              Select POSTCODE / ZIP
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={postBilling}>
                                {postBilling}
                              </MenuItem>
                            ) : (
                              billingPostCodeEcourier?.map((postCode) => (
                                <MenuItem value={postCode.value}>
                                  {postCode.name}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <TextField
                            autoComplete="off"
                            {...register("post_code_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Post/ZIP Code is Required",
                              },
                            })}
                            onKeyUp={() => trigger("post_code_billing")}
                            error={Boolean(errors.post_code_billing)}
                            // onChange={}

                            placeholder={
                              isSameAddressChecked === false
                                ? "Enter Post/ZIP Code"
                                : postBilling
                            }
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            size="small"
                            sx={customStyle}
                          />
                        )}
                      </>
                    )}

                    {errors.post_code_billing && (
                      <p style={{ color: "red" }}>
                        {errors.post_code_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* area code name */}
                  <Stack
                    direction={"column"}
                    spacing={2}
                    mt={3}
                    className="custom"
                    sx={customStyle2}
                  >
                    <Typography variant="cardHeader1" color="#1B3148">
                      AREA *
                    </Typography>

                    {billingAreaLoadingEcourier ? (
                      <Stack
                        border={"1px solid gray"}
                        borderRadius={"5px"}
                        direction={"rwo"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography sx={{ marginLeft: "10px" }}>
                          Collecting Areas
                        </Typography>
                        <CircularProgress
                          sx={{ color: "#3C5676", marginRight: "10px" }}
                        />
                      </Stack>
                    ) : (
                      <>
                        {(deliveryMethod === "" ||
                          deliveryMethod === "E-Courier") &&
                        country === "Bangladesh" ? (
                          <Select
                            autoComplete="off"
                            {...register("area_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Area is Required",
                              },
                            })}
                            sx={customStyle}
                            onClick={() => trigger("area_billing")}
                            error={Boolean(errors.area_billing)}
                            id="area_billing"
                            size="small"
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            value={
                              isSameAddressChecked === false
                                ? areaAddress
                                : areaAddressSh
                            }
                            onChange={handleSelectChangeAreaBilling}
                          >
                            <MenuItem value={"Select Area"} disabled>
                              Select Area
                            </MenuItem>
                            {isAddressListDataShipping === true ? (
                              <MenuItem value={areaAddress}>
                                {areaAddress}
                              </MenuItem>
                            ) : (
                              billingAreaEcourier?.map((area) => (
                                <MenuItem value={area.value}>
                                  {area.name}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <TextField
                            autoComplete="off"
                            {...register("area_billing", {
                              required: {
                                value:
                                  isSameAddressChecked === false &&
                                  paymentMethod === "online"
                                    ? true
                                    : false,
                                message: "Area is Required",
                              },
                            })}
                            onKeyUp={() => trigger("area_billing")}
                            error={Boolean(errors.area_billing)}
                            disabled={
                              isSameAddressChecked === false ? false : true
                            }
                            placeholder={
                              isSameAddressChecked === false
                                ? "Enter Area Name"
                                : areaAddress
                            }
                            // placeholder="House Number and street name"
                            size="small"
                            sx={customStyle}
                          />
                        )}
                      </>
                    )}

                    {errors.area_billing && (
                      <p style={{ color: "red" }}>
                        {errors.area_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* street name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      STREET ADDRESS *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      // onChange={}
                      {...register("street_address_billing", {
                        required: {
                          value:
                            isSameAddressChecked === false &&
                            paymentMethod === "online"
                              ? true
                              : false,
                          message: "House and Street Address Required",
                        },
                      })}
                      disabled={isSameAddressChecked === false ? false : true}
                      onKeyUp={() => trigger("street_address_billing")}
                      error={Boolean(errors.street_address_billing)}
                      placeholder={
                        isSameAddressChecked === false
                          ? "House Number and street name"
                          : streetAddressSh
                      }
                      size="small"
                    />
                    {errors.street_address_billing && (
                      <p style={{ color: "red" }}>
                        {errors.street_address_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* apartment name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
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
                      disabled={isSameAddressChecked === false ? false : true}
                      onKeyUp={() => trigger("apartment_address_billing")}
                      error={Boolean(errors.apartment_address_billing)}
                      placeholder={
                        isSameAddressChecked === false
                          ? "Apartment suite, unit, etc."
                          : apartmentAddressSh
                      }
                      size="small"
                    />
                    {errors.apartment_address_billing && (
                      <p style={{ color: "red" }}>
                        {errors.apartment_address_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* phone name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      PHONE *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      // onChange={}
                      {...register("phone_billing", {
                        required: {
                          value:
                            isSameAddressChecked === false &&
                            paymentMethod === "online"
                              ? true
                              : false,
                          message: "Phone Number is Required",
                        },
                      })}
                      disabled={isSameAddressChecked === false ? false : true}
                      onKeyUp={() => trigger("phone_billing")}
                      error={Boolean(errors.phone_billing)}
                      placeholder={
                        isSameAddressChecked === false
                          ? "Phone *"
                          : phoneBilling
                      }
                      size="small"
                    />
                    {errors.phone_billing && (
                      <p style={{ color: "red" }}>
                        {errors.phone_billing?.message}
                      </p>
                    )}
                  </Stack>

                  {/* email name */}
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography variant="cardHeader1" color="#1B3148">
                      EMAIL ADDRESS *
                    </Typography>
                    <TextField
                      // id=""
                      // label=""
                      // value={}
                      // onChange={}
                      {...register("email_billing", {
                        required: {
                          value:
                            isSameAddressChecked === false &&
                            paymentMethod === "online"
                              ? true
                              : false,
                          message: "Email Address is Required",
                        },
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "This is not a valid email",
                        },
                      })}
                      disabled={isSameAddressChecked === false ? false : true}
                      onKeyUp={() => trigger("email_billing")}
                      error={Boolean(errors.email_billing)}
                      placeholder={
                        isSameAddressChecked === false
                          ? "Email Address *"
                          : emailBilling
                      }
                      size="small"
                    />
                    {errors.email_billing && (
                      <p style={{ color: "red" }}>
                        {errors.email_billing?.message}
                      </p>
                    )}
                  </Stack>
                </Grid>

                {/* Order Notes */}
                <Grid item mt={5} lg={12}>
                  <Stack direction={"column"} spacing={2}>
                    <Typography variant="cardHeader1" color="#1B3148">
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
                      <p style={{ color: "red" }}>
                        {errors.orderNote?.message}
                      </p>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              {/* Checkout Details sheet */}
              <Grid item lg={3} mt={4} xs={12} sx={{ width: "100%" }}>
                <Paper elevation={3} mb={1} sx={{ width: "100%" }}>
                  <Stack
                    sx={{ width: "100%", mx: "auto", p: 2 }}
                    direction={"column"}
                    spacing={2}
                  >
                    <Stack
                      direction={"row"}
                      spacing={{ xs: 1, lg: 0, xl: 1 }}
                      width="100%"
                      justifyContent={"space-between"}
                    >
                      <Typography
                        variant="cardHeader"
                        color="#1B3148"
                        className="bold"
                      >
                        PRODUCT
                      </Typography>
                      <Typography
                        variant="cardHeader"
                        color="#1B3148"
                        className="bold"
                      >
                        SUBTOTAL
                        {/* {selectedCurrency} {totalPriceWithoutFragile} */}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack direction={"column"} spacing={1}>
                      {convertedCart?.cart?.map((item, index) => (
                        <>
                          <Stack
                            key={index}
                            direction={"row"}
                            spacing={{ xs: 1, lg: 0, xl: 1 }}
                            width="100%"
                            justifyContent={"space-between"}
                          >
                            <Stack direction={"column"}>
                              <Typography
                                variant="cardHeader"
                                color="#1B3148"
                                className="bold"
                              >
                                {item?.name}
                              </Typography>
                              <Typography
                                variant="cardLocation1"
                                color="#8799B1"
                                className="bold"
                              >
                                Quantity: {item?.amount}
                              </Typography>
                            </Stack>

                            {/* <Typography
                              variant="cardHeader"
                              color="#1B3148"
                              className="bold"
                            >
                              
                            </Typography> */}
                            <Typography
                              variant="cardHeader"
                              color="#1B3148"
                              className="bold"
                            >
                              {selectedCurrency}{" "}
                              {formatPrice(item?.totalPrice_after_discount)}
                              {/* {selectedCurrency} {totalPriceWithoutFragile} */}
                            </Typography>
                          </Stack>
                          <Divider />
                        </>
                      ))}
                    </Stack>

                    <Stack
                      direction={"row"}
                      spacing={{ xs: 1, lg: 0, xl: 1 }}
                      width="100%"
                    >
                      <Typography
                        variant="cardHeader"
                        color="#1B3148"
                        className="bold"
                        sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
                      >
                        SUBTOTAL :
                      </Typography>
                      <Typography
                        variant="cardHeader"
                        color="#1B3148"
                        className="bold"
                        textAlign={"right"}
                        sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
                      >
                        {selectedCurrency}{" "}
                        {formatPrice(totalPriceWithoutFragile_after_discount)}
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

                                  // onClick={handleOptionChanged}
                                  />
                                }
                                label={
                                  <Typography
                                    variant="cardHeader"
                                    color="#1B3148"
                                    className="bold"
                                    mb={0.6}
                                  >
                                    {option.innerText}{" "}
                                    <Typography
                                      variant="cardHeader"
                                      color="#1B3148"
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
                      <Stack
                        direction={"row"}
                        spacing={{ xs: 1, lg: 0, xl: 1 }}
                        width="100%"
                      >
                        <Typography
                          variant="cardHeader"
                          color="#1B3148"
                          className="bold"
                          sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
                        >
                          SHIPPING COST :
                        </Typography>
                        <Typography
                          variant="cardHeader"
                          textAlign={"right"}
                          color="#1B3148"
                          className="bold"
                          sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
                        >
                          {selectedCurrency} {formatPrice(shippingCost)}
                        </Typography>
                      </Stack>
                      {deliveryMethod === "E-Courier" ? (
                        <>
                          <Divider />
                          <Stack
                            direction={"row"}
                            spacing={{ xs: 1, lg: 0, xl: 1 }}
                            width="100%"
                          >
                            <Typography
                              variant="cardHeader"
                              color="#1B3148"
                              className="bold"
                              sx={{
                                width: { xs: "50%", lg: "60%", xl: "50%" },
                              }}
                              // width={"50%"}
                            >
                              FRAGILE CHARGE :
                            </Typography>
                            <Typography
                              variant="cardHeader"
                              color="#1B3148"
                              className="bold"
                              sx={{
                                width: { xs: "50%", lg: "40%", xl: "50%" },
                              }}
                              // width={"50%"}
                            >
                              {selectedCurrency} {formatPrice(totalFragileCharge)}
                            </Typography>
                          </Stack>
                        </>
                      ) : (
                        ""
                      )}
                    </Stack>

                    {errors.deliveryMethod && (
                      <p style={{ color: "red" }}>
                        {errors.deliveryMethod?.message}
                      </p>
                    )}

                    <Divider />
                    <Stack
                      direction={"row"}
                      spacing={{ xs: 1, lg: 0, xl: 1 }}
                      width="100%"
                    >
                      <Typography
                        variant="cardHeader"
                        color="#1B3148"
                        className="bold"
                        sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
                      >
                        TAX :
                      </Typography>
                      <Typography
                        variant="cardHeader"
                        color="#1B3148"
                        className="bold"
                        textAlign="right"
                        sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}

                        // sx={{ marginLeft: "72px!important" }}
                      >
                        {selectedCurrency}{" "}
                        {formatPrice(parseFloat(
                          (
                            totalPriceWithTax_after_discount -
                            totalPrice_after_discount
                          ).toFixed(2)
                        ))}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction={"row"}
                      spacing={{ xs: 1, lg: 0, xl: 1 }}
                      width="100%"
                    >
                      <Typography
                        variant="tabText1"
                        color="#1B3148"
                        className="exterBold"
                        sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
                      >
                        TOTAL :
                      </Typography>
                      <Typography
                        variant="tabText1"
                        color="#1B3148"
                        className="exterBold"
                        sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
                      >
                        {selectedCurrency} {`${formatPrice(Math.round(total))}`}
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
                                  color="#1B3148"
                                >
                                  Online Payment
                                </Typography>
                              }
                            />
                            {/* <FormControlLabel
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
                            /> */}
                            {showCashOnDelivery === "Bangladesh" ? (
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
                            ) : (
                              ""
                            )}
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
                      sx={{
                        bgcolor: "#1B3148",
                        "&:hover": {
                          bgcolor: "#1B3148",
                        },
                      }}
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
      <AddressLists
        open={addressList}
        setOpen={setAddressList}
        getUserAddress={getUserAddress}
        setValue={setValue}
        addAddressValue={addAddressValue}
        setAddAddressValue={setAddAddressValue}
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
