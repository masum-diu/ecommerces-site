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
import Community from "../../components/stories/Community/Community";
import Sustainability from "../../components/stories/Sustainability/Sustainability";
import Blogs from "../../components/stories/Blogs/Blogs";
import ColorStories from "../../components/stories/ColorStories/ColorStories";
const StoryTab = ({
  setOpen,
  handleMenuClick,
  handleChange,
  open,
  values,
  selectedMenu,
  setSelectedMenu,
  storyNavItem,
}) => {
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

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "flex-end",
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <Hidden only={["xl", "lg", "md", "lmd"]}>
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
          style={{ marginTop: "2rem", maxWidth: "1500px", width: "100%" }}
          onChange={handleChange}
        >
          {storyNavItem.map((text, index) => (
            <Tab
              className="bold"
              sx={{
                color: values === index ? "#ffffff" : "#1B3148",
                border: "1px solid #1B3148",
                backgroundColor: values === index ? "#1B3148" : "transparent",
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
      {/* <Grid item mt={10} lg={6} sm={12} xs={12}>
        {renderMenuContent()}
      </Grid> */}
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
    </>
  );
};

export default StoryTab;
