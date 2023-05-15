import React, { useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import { useGetRefundOrderMutation } from "../../src/features/api/apiSlice";

const OrderDetailsModal = ({ open, setOpen, data, token }) => {
  // console.log("your log output", data);
  const [row, setRow] = useState([]);
  const router = useRouter();
  const [
    refundRequest,
    {
      data: refundResponse,
      result:result,
      isLoading: refundLoading,
      isError: isRefundError,
      isSuccess: isRefundSuccess,
    },
  ] = useGetRefundOrderMutation();
  console.log("your log outputsdfsdf", result);
  const handleClose = () => {
    setOpen(false);
  };
  const handleRefund = (item_id, order_id, token) => {
    refundRequest({ item_id, order_id, token });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: { width: { lg: "50%", xs: "100vw" }, height: "fit-content" },
        }}
      >
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
          <IconButton aria-label="" onClick={() => handleClose()}>
            <MdClose />
          </IconButton>
        </Stack>

        <DialogTitle>
          <Typography
            variant="header1"
            color="initial"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Order Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: { lg: 550, xs: "80%" } }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">S/L</TableCell>
                  <TableCell align="left">Products</TableCell>
                  <TableCell align="center">U.Price</TableCell>
                  <TableCell align="center">QTY</TableCell>
                  <TableCell align="center">T.Price</TableCell>
                  <TableCell align="center">Refund</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.order_detail?.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">
                      {row.product.product_name}
                    </TableCell>
                    <TableCell align="center">{row.buying_price}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      {row.total_buying_price}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleRefund(row.id, row?.order_id)}
                        variant="outlined"
                        size="small"
                      >
                        Refund
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDetailsModal;
