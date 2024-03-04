import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Blog from "../../Blog/Blog";
const Blogs = () => {
  const products = [
    "/assets/community_process.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
  ];
  return (
    <Grid
      container
      px={{ xs: 5, md: 3, lmd: 2, lg: 2, xl: 7.5 }}
      sx={{
        width: "95%",
        maxWidth: "1500px",
        margin: "0 auto",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={12}>
        <Stack>
          <Typography
            textAlign={"center"}
            variant="productName"
            color="#1B3148"
            className="bold"
            pb={10}
          >
            Blog
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack>
          <Typography
            // textAlign={"center"}
            pl={1}
            variant="CategoryName"
            color="#1B3148"
            className="bold"
          >
            Our Blog
          </Typography>
        </Stack>
      </Grid>
      {products.map((data, index) => (
        <Grid item xs={12} xms={12} sm={6} md={4} lg={4} xl={3}>
          <Stack spacing={10} ml={1} mr={1} mt={2}>
            <Blog data={data} imageURL={data}></Blog>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blogs;
