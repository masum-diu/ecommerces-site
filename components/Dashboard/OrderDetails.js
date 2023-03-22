import React from "react";
import { Typography } from "@mui/material";

const OrderDetails = () => {
  return (
    <div style={{widows:"1000px"}}>
      <Typography variant="h6">Order Details</Typography>
      <Typography>Order Number: 123456</Typography>
      <Typography>Date: March 21, 2023</Typography>
      <Typography>Amount: $50.00</Typography>
    </div>
  );
};

export default OrderDetails;
