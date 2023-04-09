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
import {
  useCancelOrderMutation,
  useGetOrderDetailsQuery,
  useGetRefundOrderMutation,
  useGetRefundOrderQuery,
} from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";
import instance from "../../pages/api/api_instance";

const OrderDetails = () => {
  const [token, setToken] = useState("");
  const [info, setInfo] = useState([]);
  const [response, setCancelResponse] = useState([]);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetOrderDetailsQuery(token, {
      refetchOnMountOrArgChange: true,
    });
    console.log("your log output", data);
  const [
    cancelOrder,
    {
      data: cancelResponse,
      isLoading: cancelLoading,
      isError: cancelError,
      isSuccess: isCancelSuccess,
    },
  ] = useCancelOrderMutation();
  const [
    refundRequest,
    {
      data: refundResponse,
      isLoading: refundLoading,
      isError: isRefundError,
      isSuccess: isRefundSuccess,
    },
  ] = useGetRefundOrderMutation();
  console.log("your log output", refundResponse);
  useEffect(() => {
    const token = localStorage.getItem("acesstoken");
    setToken(token);
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      setInfo(data?.data);
    }
  }, [data, isLoading, isFetching, isSuccess, isError, error]);

  useEffect(() => {
    if (isCancelSuccess) {
      setCancelResponse(cancelResponse?.data);
    }
  }, [isCancelSuccess]);

  if (cancelLoading) {
    return <Loader></Loader>;
  }
  if (isLoading || isFetching) {
    return <Loader></Loader>;
  }
  const handleCancel = (order_id, token) => {
    /* instance
      .post(
        `order/cancel`,
        { order_id: order_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("acesstoken"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((result) => {
        console.log("your log output", result);
      })
      .catch((err) => {}); */

    cancelOrder({ order_id, token });
  };
  const handleRefund = (order_id, token) => {
    /* instance
      .post(
        `order/cancel`,
        { order_id: order_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("acesstoken"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((result) => {
        console.log("your log output", result);
      })
      .catch((err) => {}); */

    refundRequest({ order_id, token });
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
                  Cancel
                </TableCell>
                <TableCell className="bold" align="center">
                  Refund
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
                        onClick={() => handleCancel(orderInfo?.id, token)}
                        disabled={orderInfo?.status === 0 ? true : false}
                        variant="outlined"
                        size="small"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                    <TableCell className="SemiBold" align="center">
                      <Button
                        onClick={() => handleRefund(orderInfo?.id, token)}
                        disabled={
                          orderInfo?.status === 0 &&
                          orderInfo?.payment_status === 1 &&
                          orderInfo?.order_position === 0
                            ? false
                            : true
                        }
                        variant="outlined"
                        size="small"
                      >
                        Refund
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
