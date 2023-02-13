import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  ButtonGroup,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import HomePageIntro from "../../components/HomePageIntro";
import { Box } from "@mui/system";
import Footer from "../../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import ProductInnerPage from "../../components/ProductInnerPage";

const PorductDetails = () => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const productId = router.query.productId;
  const path = router.asPath;
  const data = [
    {
      id: 1,
      title: "Demo Product Name",
      price: "5,185",
      image: "assets/saree3.png",
    },
    {
      id: 2,
      title: "Demo Product Name",
      price: "5,185",
      image: "/public/assets/saree3.png",
    },
    {
      id: 3,
      title: "Demo Product Name",
      price: "5,185",
      image: "/public/assets/saree3.png",
    },
  ];
  const marks = [
    {
      value: 0,
      label: "S",
    },
    {
      value: 10,
      label: "M",
    },
    {
      value: 20,
      label: "L",
    },
    {
      value: 30,
      label: "XL",
    },
    {
      value: 40,
      label: "XXL",
    },
  ];
  function valuetext(value) {
    return `${value}`;
  }

  console.log(data);

  return (
    <>
      <HomePageIntro title={"Master Collection Layout "} />
      <Box mt={10} mb={4} sx={{ width: "90%", maxWidth: "1500px", mx: "auto",height:"100%" }}>
        <ProductInnerPage/>
      </Box>
      <Footer />
    </>
  );
};

export default PorductDetails;
