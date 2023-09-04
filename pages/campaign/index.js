import React from "react";
import HomePageIntro from "../../components/HomePageIntro";
import Footer from "../../components/Footer";
import { Stack, Typography } from "@mui/material";

const CampaignIndex = () => {
  return (
    <>
      <HomePageIntro></HomePageIntro>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ pt: { lg: 8, xs: 7 }, height: "50vh" }}
      >
        <Typography variant="login2" textAlign={"center"}>
          Coming Soon
        </Typography>
      </Stack>
      <Footer></Footer>
    </>
  );
};

export default CampaignIndex;
