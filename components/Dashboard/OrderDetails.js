import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetOrderDetailsQuery } from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";
import instance from "../../pages/api/api_instance";

const OrderDetails = () => {
  const [token, setToken] = useState("");
  const [info, setInfo] = useState([]);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetOrderDetailsQuery(token, {
      refetchOnMountOrArgChange: true,
    });
  console.log("order data", data);
  useEffect(() => {
    const token = localStorage.getItem("acesstoken");
    setToken(token);
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      setInfo(data?.data);
    }
  }, [data, isLoading, isFetching, isSuccess, isError, error]);

  if (isLoading || isFetching) {
    return <Loader></Loader>;
  }

  const handleCancel = (order_id) => {
    instance
      .get(`order-cliam-refund/${order_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("acesstoken"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((result) => {
        console.log("your log output", result);
        /* localStorage.setItem("acesstoken", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        Cookies.set("acesstoken", result.data.token);
        Cookies.set("user", JSON.stringify(result.data.user));
        setUserData(result.data);
        reset();
        setOpen(false);
        setHasToken(true); */
      })
      .catch((err) => {
        // setUserData(err);
      });
  };

  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        mt={4}
        sx={{ height: "fit-content" }}
      >
        <Typography
          variant="cardHeader1"
          color="initial"
          className="exterBold"
          textAlign={"center"}
        >
          Order History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bold">Order Id</TableCell>
                <TableCell className="bold">Order Date</TableCell>
                <TableCell className="bold">Price</TableCell>
                <TableCell className="bold">Status</TableCell>
                <TableCell className="bold" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info?.map((orderInfo, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell className="SemiBold">
                      {orderInfo?.order_id}
                    </TableCell>
                    <TableCell className="SemiBold">
                      {orderInfo?.order_date}
                    </TableCell>
                    <TableCell className="SemiBold">
                      {orderInfo?.total_price}
                    </TableCell>
                    <TableCell className="SemiBold">
                      {orderInfo?.payment_status ? "Paid" : "Unpaid"}
                    </TableCell>
                    <TableCell className="SemiBold" align="center">
                      <Button
                        onClick={() => handleCancel(orderInfo?.id)}
                        disabled={
                          orderInfo?.payment_status === 1 &&
                          orderInfo?.order_position === 0
                            ? false
                            : true
                        }
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default OrderDetails;
