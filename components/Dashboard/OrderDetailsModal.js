import React, { useEffect } from "react";
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
import { usePostRefundOrderMutation } from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

const OrderDetailsModal = ({
  open,
  setOpen,
  data,
  token,
  setSelectedProduct,
}) => {
  useEffect(() => {
    setSelectedProduct(data);
  }, [data]);
  const [
    refundRequest,
    {
      data: refundResponse,
      isLoading: refundLoading,
      isError: isRefundError,
      isSuccess: isRefundSuccess,
      error: isRefundErrorData,
    },
  ] = usePostRefundOrderMutation({ refetchOnMountOrArgChange: true });
  const handleClose = () => {
    setOpen(false);
  };
  const handleRefund = async (item_id, order_id, token) => {
    const selectedProduct = data?.order_detail?.find(
      (element) => element.id === item_id
    );
    const response = await refundRequest({ item_id, order_id, token });
    if (response?.data?.status === "success") {
      toast.success("Refund request has been granted!");
    }
    if (response?.error) {
      toast.error("Something went wrong!");
    }
  };

  const dialogCloseHandler = () => {
    setOpen(false);
  };
  if (refundLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={() => dialogCloseHandler()}
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
                  <TableCell align="center">Tax</TableCell>
                  <TableCell align="center">
                    T.Price <small>(With tax)</small>
                  </TableCell>
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
                      {row?.product?.product_name}
                    </TableCell>
                    <TableCell align="center">{row?.selling_price}</TableCell>
                    <TableCell align="center">{row?.quantity}</TableCell>
                    <TableCell align="center">
                      {Math.ceil(row?.vat_amount)}
                    </TableCell>
                    <TableCell align="center">
                      {row?.total_selling_price + Math.ceil(row?.vat_amount)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          handleRefund(row.id, row?.order_id, token)
                        }
                        variant="outlined"
                        size="small"
                        disabled={
                          row.is_claim_refund === 0 &&
                          row.is_refunded === 0 &&
                          data.payment_status === 1
                            ? false
                            : true
                        }
                      >
                        {row.is_claim_refund === 1 && row.is_refunded === 1
                          ? "Refunded"
                          : row.is_claim_refund === 1 && row.is_refunded === 0
                          ? "Pending"
                          : row.is_claim_refund === 1 && row.is_refunded === 2
                          ? "Rejected"
                          : "Refund"}
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
