import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import SignInModal from "./SignInModal";
import { useRouter } from "next/router";
import ForgotPass from "./ForgotPass";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import instance from "../pages/api/api_instance";
import GuestCheckout from "./GuestCheckout";
import USER_CONTEXT from "./userContext";

const SizeModal = ({ open, setOpen }) => {
  function createDataW(name, chest, waist) {
    return { name, chest, waist };
  }

  const rowsWomen = [
    createDataW("S", 38, 33),
    createDataW("M", 40, 36),
    createDataW("L", 42, 40),
    createDataW("XL", 44, 42),
    createDataW("XXL", 46, 44),
  ];


  function createData(size, chest, length) {
    return { size, chest, length };
  }

  const rowsPanjabi = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  function createData(size, chest, length) {
    return { size, chest, length };
  }

  const rowsTeeShirt = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const router = useRouter();

  const handleclearuser = () => {
    setUserData("");
  };
  const handleChange = () => {
    setOpen(false);
    setSignModal(true);
  };
  const handleChange1 = () => {
    setOpen(false);
    setForgotModal(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = useState({
    pass: "",
    // email:"",
    showPass: false,
  });
  const handlepassVisbilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
            Size Guide
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: { lg: 550, xs: "80%" } }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="center">Chest</TableCell>
                  <TableCell align="right">Waist</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsWomen.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.chest}</TableCell>
                    <TableCell align="right">{row.waist}</TableCell>
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

export default SizeModal;
