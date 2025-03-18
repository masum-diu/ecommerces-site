import {
  Box,
  Button,
  Grid,
  Hidden,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import SegmentIcon from "@mui/icons-material/Segment";
import HomePageIntro from "../../../components/HomePageIntro";
import AboutAranya from "../../../components/stories/AboutAranya";
import Community from "../../../components/stories/Community/Community";
import { useState } from "react";
import Footer from "../../../components/Footer";
import ColorStories from "../../../components/stories/ColorStories/ColorStories";
import CommunityInner from "../../../components/stories/Community/CommunityInner";
import { useGetCommunityProductByIdQuery } from "../../../src/features/api/apiSlice";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader/Loader";

const CommunityInnerPage = () => {
  return (
    <>
      <HomePageIntro title={"Saree "} />
      <Box sx={{ pt: { lg: 8, xs: 7 } }} height={"fit-content"}>
        <Stack direction={"row"} alignItems="center">
          <img
            src={`/../assets/f1.png`}
            // src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678530353/aranya-product/boishakh/ZS001671.jpg`}
            width={1900}
            style={{ width: "100%", height: "auto" }}
            // height={700}
          />
        </Stack>
        <Box
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mx={"auto"}
          px={5}
          sx={{ maxWidth: "1500px", width: "100%" }}
        >
          <CommunityInner></CommunityInner>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CommunityInnerPage;
