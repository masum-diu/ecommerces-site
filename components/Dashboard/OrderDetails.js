import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useGetOrderDetailsQuery } from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";

const OrderDetails = () => {
  const [token, setToken] = useState("");
  const [info, setInfo] = useState([]);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetOrderDetailsQuery(token, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    const token = localStorage.getItem("acesstoken");
    setToken(token);
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      setInfo(data?.data);
    }
  }, [data, isLoading, isFetching, isSuccess, isError, error]);

  if(isLoading|| isFetching){
    return <Loader></Loader>
  }
  console.log("your log output", info);
  return (
    <div style={{ widows: "1000px" }}>
      <Typography variant="h6">Order Details</Typography>
      <Typography>Order Number: 123456</Typography>
      <Typography>Date: March 21, 2023</Typography>
      <Typography>Amount: $50.00</Typography>
    </div>
  );
};

export default OrderDetails;
