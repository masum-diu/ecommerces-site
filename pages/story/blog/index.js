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
import HomePageIntro from "../../../components/HomePageIntro";
import Footer from "../../../components/Footer";
import BlogInner from "../../../components/stories/Blogs/BlogInner";

const BlogInnerPage = () => {
  return (
    <>
      <HomePageIntro title={"Saree "} />

      <Box sx={{ pt: { lg: 8, xs: 7 } }} height={"fit-content"}>
        <Stack direction={"row"} alignItems="center">
          <img
            src={`../assets/f1.png`}
            // src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678530353/aranya-product/boishakh/ZS001671.jpg`}
            width={1900}
            style={{ width: "100%", height: "auto" }}
            // height={700}
          />
        </Stack>
        {/* <StoryTab></StoryTab> */}
        <Box
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mx={"auto"}
          px={5}
          sx={{ maxWidth: "1500px", width: "100%" }}
        >
          {/* <ColorStoryInner></ColorStoryInner> */}
          <BlogInner></BlogInner>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default BlogInnerPage;
