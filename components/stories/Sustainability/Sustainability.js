import React from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Intro from "./Intro";
import Principles from "./Principles";
import NaturalDye from "./NaturalDye";
import Certifications from "./Certifications";
import OurBlog from "./OurBlog";

const Sustainability = () => {
  return (
    <Stack
      //   sx={{ pt: { lg: 8, xs: 7 } }}
      mb={4}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack sx={{ width: "100%" }}>
        <Typography
          variant="productName"
          color="#1B3148"
          className="bold"
          //   sx={{ background: "#2C3649",  }}
          textAlign={"center"}
          //   textTransform={"uppercase"}
          fontWeight="500"
        >
          Sustainability
        </Typography>
      </Stack>

      <Intro></Intro>
      <Principles></Principles>
      <NaturalDye></NaturalDye>
      <Certifications></Certifications>
      <OurBlog></OurBlog>
    </Stack>
  );
};

export default Sustainability;
