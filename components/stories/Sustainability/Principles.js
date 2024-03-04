import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Principles = () => {
  const Principles = [
    "/assets/Group-100.jpg",
    "/assets/Group-101.jpg",
    "/assets/Group-102.jpg",
    "/assets/Group-103.jpg",
    "/assets/Group-104.jpg",
    "/assets/Group-105.jpg",
    "/assets/Group-107.jpg",
    "/assets/Group-108.jpg",
    "/assets/Group-109.jpg",
    "/assets/Group-110.jpg",
  ];
  return (
    <Grid
      container
      spacing={1}
      sx={{
        maxWidth: "1500px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      mt={5}
      mb={5}
      mx={"auto"}
    >
      <Grid
        item
        xs={10}
        // md={10}
        sx={{
          // maxWidth: "1200px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 1, lg: 1.5, xl: 2.5 }}
          justifyContent={"center"}
        >
          {" "}
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={{ xs: 0, md: 2,lg:3 }}
            >
              <Typography
                color="#1B3148"
                className="bold"
                variant="login1"
              >
                10 Principles of Fair Trade
              </Typography>
              <Stack sx={{ maxWidth: "100px", width: "100%" }}>
                <img
                  src="/assets/world-fair-trade-organization-wfto-logo-vector 1.png"
                  alt=""
                />
              </Stack>
            </Stack>
          </Grid>
          {Principles.map((principle, index) => (
            <Grid item xs={6} sm={4} md={2.3} lg={2.3}>
              <Stack
                sx={{
                  maxWidth: {
                    xs: "100%",
                    sm: "90%",
                    md: "95%",
                    lg: "95%",
                    xl: "100%",
                  },
                }}
              >
                <img src={principle} alt="" />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Principles;
