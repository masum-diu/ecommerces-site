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

const SizeModal = ({ open, setOpen, subCat, cat, sizes, categoryName }) => {
  const [row, setRow] = useState([]);
  const router = useRouter();
  // const productName = router?.query?.product?.toUpperCase();
  const productName =
    router?.query?.product?.charAt(0).toUpperCase() +
    router?.query?.product?.slice(1);
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
    createDataTShirt("S", "18 inch", "28 inch"),
    createDataTShirt("M", "20 inch", "29 inch"),
    createDataTShirt("L", "22 inch", "30 inch"),
    createDataTShirt("XL", "24 inch", "31 inch"),
  ];

  useEffect(() => {
    function checkAndSetRowType(sizes) {
      // Initialize a variable to track the row type
      let rowType = null;

      // Iterate through the array of objects
      for (const item of sizes) {
        const slug = item.slug;

        // Check if the slug can be parsed as a number
        if (!isNaN(parseFloat(slug))) {
          // If the slug is numeric, set the row type to "Number"
          rowType = "Number";
        } else {
          // If the slug is not numeric, set the row type to "String"
          rowType = "String";
          // No need to check further if we find a non-numeric slug
          break;
        }
      }

      if (
        rowType === "Number" &&
        categoryName !== "men" &&
        categoryName !== "women"
      ) {
        setRow(rowsPanjabi);
        // return "Number";
      } else if (
        rowType === "String" &&
        categoryName !== "men" &&
        categoryName !== "women"
      ) {
        setRow([...rowsPanjabi, ...rowsWomen]);
        // return "Number";
      } else if (rowType === "Number" && categoryName === "men") {
        setRow(rowsPanjabi);
        // return "Number";
      } else if (rowType === "String" && categoryName === "men") {
        setRow(rowsTShirt);
        // return "String";
      } else if (rowType === "String" && categoryName === "women") {
        setRow(rowsWomen);
        // return "String";
      }
    }

    checkAndSetRowType(sizes);
  }, [cat, subCat]);

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
          sx: { width: { lg: "50%", xs: "100%" }},
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
