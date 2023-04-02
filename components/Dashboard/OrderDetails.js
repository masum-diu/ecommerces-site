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
  
  return (
    <>
    <Stack direction={"column"} spacing={2} mt={4} sx={{height:"fit-content"}}>
    <Typography variant="cardHeader1" color="initial" className="exterBold" textAlign={"center"}>Order History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell className="bold">Order Id</TableCell>
              <TableCell className="bold">Order Date</TableCell>
              <TableCell className="bold">Price</TableCell>
              <TableCell className="bold">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {

              info?.map((orderInfo) => <>
                <TableRow key={orderInfo}> 
                  <TableCell className="SemiBold">{orderInfo?.order_id}</TableCell>
                  <TableCell className="SemiBold">{orderInfo?.order_date}</TableCell>
                  <TableCell className="SemiBold">{orderInfo?.total_price}</TableCell>
                  <TableCell className="SemiBold">{(orderInfo?.payment_status?"Paid":"Unpaid")}</TableCell>
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
