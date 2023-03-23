import React, { useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import {
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

const SizeModal = ({ open, setOpen, subCat, cat }) => {
  const [row, setRow] = useState([]);
  const router = useRouter();
  // const productName = router?.query?.product?.toUpperCase();
  const productName =
    router?.query?.product?.charAt(0).toUpperCase() +
    router?.query?.product?.slice(1);
  console.log("selected subCat", router);
  function createDataW(name, chest, length) {
    return { name, chest, length };
  }

  const rowsWomen = [
    createDataW("S", 38, 33),
    createDataW("M", 40, 36),
    createDataW("L", 42, 40),
    createDataW("XL", 44, 42),
    createDataW("XXL", 46, 44),
  ];

  function createDataPanjabi(name, chest, length) {
    return { name, chest, length };
  }

  const rowsPanjabi = [
    createDataPanjabi(38, 44, 41),
    createDataPanjabi(40, 46, 42),
    createDataPanjabi(42, 48, 43),
    createDataPanjabi(44, 50, 44),
    createDataPanjabi(46, 52, 45),
  ];
  function createDataTShirt(name, chest, length) {
    return { name, chest, length };
  }

  const rowsTShirt = [
    createDataTShirt("S", "18inc", "28inc"),
    createDataTShirt("M", "20inc", "29inc"),
    createDataTShirt("L", "22inc", "30inc"),
    createDataTShirt("XL", "24inc", "31inc"),
  ];

  useEffect(() => {
    if (cat === 1) {
      setRow(rowsWomen);
    }
    if (cat === 2 && subCat === 13) {
      setRow(rowsPanjabi);
    }
    if (cat === 2 && subCat === 15) {
      setRow(rowsTShirt);
    }
  }, [cat, subCat]);

  console.log("your row", row);

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
            Size Guide For {productName}
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
                  <TableCell align="left">Size</TableCell>
                  <TableCell align="center">Chest</TableCell>
                  <TableCell align="right">
                    {cat === 1 ? "Waist" : "Length"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.chest}</TableCell>
                    <TableCell align="right">{row.length}</TableCell>
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
