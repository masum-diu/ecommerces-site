import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const Certifications = () => {
  const products = [
    "/assets/certifications_1.jpg",
    "/assets/certifications_2.jpg",
    "/assets/certifications_3.jpg",
  ];
  return (
    <Grid
      container
      // spacing={3}
      sx={{ maxWidth: "1500px", width: "100%" }}
      mt={10}
      mb={5}
      mx={"auto"}
      justifyContent={"space-around"}
      alignItems={"flex-start"}
      px={8}
    >
      <Grid item mt={1} xs={12}>
        <Stack direction={"column"} justifyContent={"center"}>
          <Typography
            variant="productName"
            color="#1B3148"
            className="bold"
            px={3}
          >
            Certifications
          </Typography>
        </Stack>
      </Grid>
      {/* Info Section */}
      {products?.slice(0, 3).map((data, index) => (
        <Grid
          item
          mt={1}
          xs={12}
          xms={12}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          key={index}
          // px={1}
        >
          <Stack
            direction={"column"}
            sx={{
              maxWidth: { xs: "100%", sm: "95%", lg: "95%", xl: "95%" },
            }}
            justifyContent={"center"}
          >
            <img
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              src={data}
              alt=""
            />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Certifications;
