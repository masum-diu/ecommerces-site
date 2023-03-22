import React, { useEffect, useState } from "react";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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

  if (isLoading || isFetching) {
    return <Loader></Loader>
  }
  
  console.log("your log output", info);
  return (
    <>
    <Stack direction={"column"} spacing={2} mt={4} sx={{height:"fit-content"}}>
    <Typography variant="cardHeader1" color="initial" textAlign={"center"}>Order History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {

              info?.map((orderInfo) => <>
                <TableRow> 
                  <TableCell>{orderInfo?.order_id}</TableCell>
                  <TableCell>{orderInfo?.order_date}</TableCell>
                  <TableCell>{orderInfo?.total_price}</TableCell>
                  <TableCell>{(orderInfo?.payment_status?"Paid":"Unpaid")}</TableCell>
                  </TableRow>
              </>)

            }

          </TableBody>
        </Table>
      </TableContainer>
      </Stack>
    </>
  );
};

export default OrderDetails;
