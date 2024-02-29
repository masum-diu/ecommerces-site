import {
  Box,
  Grid,
  Hidden,
  Stack,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import SegmentIcon from "@mui/icons-material/Segment";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HomePageIntro from "../../components/HomePageIntro";
import Footer from "../../components/Footer";
import Filter from "../../components/Filter";
import Head from "next/head";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AboutAranya from "../../components/stories/AboutAranya";
import Community from "../../components/stories/Community";
import ColorStories from "../../components/stories/ColorStories";
import Sustainability from "../../components/stories/Sustainability";
import Blogs from "../../components/stories/Blogs/Blogs";

const story = () => {
  const [selectedMenu, setSelectedMenu] = useState("About Aranya");
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(0);
  const customStyle = {
    ".mui-style-heg063-MuiTabs-flexContainer": {
      display: "flex",
      "justify-content": "space-around",
    },
    indicator: {
      backgroundColor: "#1B3148",
    },
    width: { md: "70%", lg: "60%" },
    mx: "auto",
  };
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  const handleChange = (event, newValue) => {
    setValues(newValue);
    console.log("your log output", newValue);
  };

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
      case "Blogs":
        return <Blogs />;
      default:
        return null;
    }
  };
  const storyNavItem = [
    "About Aranya",
    "Community",
    "Color Stories",
    "Sustainability",
    "Blogs",
  ];

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        />
        <meta name="keywords" content="Aranya online shop" />
        <meta name="sitemap_link" content="sitemap.com" />
        <meta property="og:site_name" content="aranya.com.bd" />

        <meta name="twitter:card" content="Category" />
        {/* <meta name="twitter:title" content={"Aranya | " + productName} /> */}
        <meta name="twitter:site" content="@my_twitter" />
        <meta name="twitter:creator" content="@my_twitter" />

        {/* <meta property="og:title" content={"Aranya | " + productName} /> */}
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={currentPath} /> */}
        {/* <meta property="og:image" content={staticData?.cat_img_one} /> */}
        <meta
          property="og:description"
          // content={"Find all product  in " + productName + "category"}
        />
      </Head>
      <HomePageIntro title={"Story "} />
      <Box sx={{ pt: { lg: 8, xs: 7 } }} height={"fit-content"}>
        <Box>
          <Stack direction={"row"} alignItems="center">
            <img
              src={`../assets/f1.png`}
              // src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678530353/aranya-product/boishakh/ZS001671.jpg`}
              width={1900}
              style={{ width: "100%", height: "fit-content" }}
              // height={700}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "flex-end",
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            <IconButton onClick={() => setOpen(true)}>
              <Hidden only={["xl", "lg", "md"]}>
                <SegmentIcon />
              </Hidden>
            </IconButton>
          </Stack>
          <Hidden only={["sm", "xs", "xms"]}>
            <Tabs
              indicatorColor="none"
              textColor="none"
              sx={customStyle}
              value={values}
              style={{ marginTop: "2rem" }}
              onChange={handleChange}
            >
              {storyNavItem.map((text, index) => (
                <Tab
                  className="bold"
                  sx={{
                    color: values === index ? "#ffffff" : "#1B3148",
                    border: "1px solid #1B3148",
                    backgroundColor:
                      values === index ? "#1B3148" : "transparent",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "#1B3148",
                      color: "#ffffff",
                      transition: "ease-in-out .2s",
                    },
                  }}
                  onClick={() => handleMenuClick(text)}
                  label={text}
                ></Tab>
              ))}
            </Tabs>
          </Hidden>
          <Grid item mt={10} lg={6} sm={12} xs={12}>
            {renderMenuContent()}
          </Grid>
        </Box>
      </Box>
      <Footer />
      <Drawer
        transitionDuration={{ enter: 500, exit: 500 }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "433px", xs: "300px" },
          },
        }}
      >
        <List>
          {storyNavItem.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(text)}>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="cardHeader1"
                        className="bold"
                        color="initial"
                      >
                        {text}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ pt: { lg: 8, xs: 7 }, height: "50vh" }}
      >
        <Typography variant="login2" textAlign={"center"}>
          Coming Soon
        </Typography>
      </Stack> */}
      {/* <MenuDawer /> */}
      {/* <Filter /> */}
    </>
  );
};

export default story;
