import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const OurProcess = ({ products }) => {
  return (
    <Box mt={4}>
      <Stack mb={4}>
        <Typography color="#1B3148" className="bold" variant="CategoryName">
          Our Process
        </Typography>
      </Stack>

      <Grid
        container
        // spacing={1}
        justifyContent={{
          xs: "center",
          xms: "center",
          sm: "center",
          md: "space-between",
          lg: "space-between",
          xl: "space-between",
        }}
        // sx={{ border: "1px solid red" }}
      >
        {products?.slice(0, 3).map((data, index) => (
          <Grid
            item
            mt={1}
            xs={12}
            xms={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            key={index}
          >
            <Stack
              direction={"column"}
              sx={{
                maxWidth: { xs: "100%", lg: "fit-content" },
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
    </Box>
  );
};

export default OurProcess;
