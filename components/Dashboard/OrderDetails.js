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
  usePostRefundOrderMutation,
} from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";
import instance from "../../pages/api/api_instance";
import OrderDetailsModal from "./OrderDetailsModal";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const [token, setToken] = useState("");
  const [info, setInfo] = useState([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [response, setCancelResponse] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState({});
  const [openDetailsModal, setDetailsModal] = useState(false);
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetOrderDetailsQuery(token, {
      refetchOnMountOrArgChange: true,
    });
  const [
    cancelOrder,
    {
      data: cancelResponse,
      result: result,
      isLoading: cancelLoading,
      isError: cancelError,
      isSuccess: isCancelSuccess,
      error: isCancelError,
    },
  ] = useCancelOrderMutation();
  useEffect(() => {
    const token = localStorage.getItem("acesstoken");
    setToken(token);
  }, [token]);
  useEffect(() => {
    const selectedOrder = info?.find(
      (element) => element?.order_id === selectedOrderId
    );
    setSelectedProduct(selectedOrder);
  }, [info, selectedOrderId]);
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
  const handleCancel = async (order_id, token) => {
    const response = await cancelOrder({ order_id, token });
    if (response?.data?.status === "success") {
      toast.success(response?.data?.message);
      setIsCanceled(true);
    }
    if (response?.data?.status === "error") {
      toast.error(response?.data?.message);
    }
  };
  const handleViewOrder = (data, order_id) => {
    setSelectedOrderId(order_id);
    setSelectedProduct(data);
    setDetailsModal(true);
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
          color="#1B3148"
          className="exterBold"
          textAlign={"center"}
        >
          Order History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#1B3148" }} className="bold">
                  Order Id
                </TableCell>
                <TableCell sx={{ color: "#1B3148" }} className="bold">
                  Order Date
                </TableCell>
                <TableCell sx={{ color: "#1B3148" }} className="bold">
                  Price
                </TableCell>
                <TableCell sx={{ color: "#1B3148" }} className="bold">
                  Status
                </TableCell>
                {/* <TableCell className="bold" align="center">
                  Cancel
                </TableCell>
                <TableCell className="bold" align="center">
                  Refund
                </TableCell> */}
                <TableCell sx={{ color: "#1B3148" }} className="bold" align="center">
                  Order Cancel
                </TableCell>
                <TableCell sx={{ color: "#1B3148" }} className="bold" align="center">
                  Order Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info?.map((orderInfo, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell sx={{ color: "#1B3148" }} className="SemiBold">{orderInfo?.id}</TableCell>
                    <TableCell sx={{ color: "#1B3148" }} className="SemiBold">
                      {orderInfo?.order_date}
                    </TableCell>
                    <TableCell sx={{ color: "#1B3148" }} className="SemiBold">
                      {orderInfo?.total_price}
                    </TableCell>
                    <TableCell sx={{ color: "#1B3148" }} className="SemiBold">
                      {orderInfo?.payment_status ? "Paid" : "Unpaid"}
                    </TableCell>
                    <TableCell sx={{ color: "#1B3148" }} className="SemiBold" align="center">
                      <Button
                        onClick={() => handleCancel(orderInfo?.id, token)}
                        disabled={orderInfo?.status === 0 ? true : false}
                        variant="outlined"
                        size="small"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                    {/* <TableCell className="SemiBold" align="center">
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
                    </TableCell> */}
                    <TableCell sx={{ color: "#1B3148" }} className="SemiBold" align="center">
                      <Button
                        onClick={() =>
                          handleViewOrder(orderInfo, orderInfo?.order_id)
                        }
                        variant="outlined"
                        size="small"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <OrderDetailsModal
        open={openDetailsModal}
        setOpen={setDetailsModal}
        token={token}
        data={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        isCanceled={isCanceled}
      ></OrderDetailsModal>
    </>
  );
};

export default OrderDetails;
