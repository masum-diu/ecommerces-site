import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";

const userProfile = () => {
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  console.log(userjsondata);
  //
  return (
    <>
      <HomePageIntro title={"UserProfile "} />
      <Box mt={10} mb={4}>
        <Stack>
          <Typography
            variant="header1"
            color="#7E7250"
            sx={{ background: "#2C3649", py: 10 }}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            welcome, {userjsondata.name}
          </Typography>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default userProfile;
