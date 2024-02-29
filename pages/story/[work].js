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
import HomePageIntro from "../../components/HomePageIntro";
import AboutAranya from "../../components/stories/AboutAranya";
import Community from "../../components/stories/Community";
import ColorStories from "../../components/stories/ColorStories";
import Sustainability from "../../components/stories/Sustainability";
import { useState } from "react";
import Footer from "../../components/Footer";
import WorkInner from "../../components/stories/WorkInner/WorkInner";

const Work = () => {
  const [selectedMenu, setSelectedMenu] = useState("Sustainability");
  const [open, setOpen] = useState(false);
  const customStyle = {
    ".mui-style-heg063-MuiTabs-flexContainer": {
      display: "flex",
      "justify-content": "space-around",
    },
    width: { md: "70%", lg: "60%" },
    mx: "auto",
  };
  const storyNavItem = [
    "About Aranya",
    "Community",
    "Color Stories",
    "Sustainability",
  ];
  const renderMenuContent = () => {
    switch (selectedMenu) {
      case "About Aranya":
        return <AboutAranya></AboutAranya>;
      case "Community":
        return <Community></Community>;
      case "Color Stories":
        return <ColorStories />;
      case "Sustainability":
        return <Sustainability />;
      default:
        return null;
    }
  };
  const handleChange = (event, newValue) => {
    setValues(newValue);
  };
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
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
        <Box
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mx={"auto"}
          px={5}
          sx={{ maxWidth: "1500px", width: "100%" }}
        >
          <WorkInner></WorkInner>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Work;
