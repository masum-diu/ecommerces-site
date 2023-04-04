import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { BiError } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { clearCart } from "../src/features/cart/cartSlice";
const payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const container =
  // window !== undefined ? () => window().document.body : undefined;
  // console.log(router.query?.payment)
  const { payment, orderid, type } = router.query;
  const handleClearButtonClick = () => {
    dispatch(clearCart("cart"));
    router.push("/shop");
  };
  // const {id}

  return (
    <>
      {payment == "success" ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90vw",
              maxWidth: "800px",
              margin: "0 auto",
              height: "100vh",
            }}
          >
            <Paper sx={{ p: 4 }} elevation={3}>
              <Stack
                direction={"column"}
                sx={{ justifyContent: "center", alignItems: "center" }}
                spacing={2}
              >
                <Typography variant="login1" color="initial" className="bold">
                  Your order has been received
                </Typography>
                <BsFillCheckCircleFill
                  style={{ fontSize: "50px", color: "green" }}
                />
                {type == "cash" ? (
                  ""
                ) : (
                  <Typography variant="header1" color="initial">
                    Thank you for your purchase !
                  </Typography>
                )}
                <Typography
                  variant="legend"
                  color="initial"
                  className="SemiBold"
                >
                  Your order ID is : {orderid}
                </Typography>
                <Button
                  variant="contained"
                  color="bandColor"
                  onClick={() => handleClearButtonClick()}
                  size="small"
                >
                  continue shopping
                </Button>
              </Stack>
            </Paper>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90vw",
              maxWidth: "800px",
              margin: "0 auto",
              height: "100vh",
            }}
          >
            <Paper
              sx={{ p: 4, width: "90vw", maxWidth: "800px", margin: "0 auto" }}
              elevation={3}
            >
              <Stack
                direction={"column"}
                sx={{ justifyContent: "center", alignItems: "center" }}
                spacing={2}
              >
                {/* <Typography variant="login1" color="initial" className='bold'>Your order has been received</Typography> */}
                <BiError style={{ fontSize: "50px", color: "red" }} />
                <Typography variant="header1" color="initial">
                  Your payment failed
                </Typography>
                <Typography
                  variant="legend"
                  color="initial"
                  className="SemiBold"
                >
                  Please try failed
                </Typography>
                <Button
                  variant="contained"
                  color="bandColor"
                  onClick={() => router.push("/shop")}
                  size="small"
                >
                  continue shopping
                </Button>
              </Stack>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default payment;
