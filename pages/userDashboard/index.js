import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Button,
  Hidden,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import HomePageIntro from "../../components/HomePageIntro";
import Footer from "../../components/Footer";
import Profile from "../../components/Dashboard/Profile";
import OrderDetails from "../../components/Dashboard/OrderDetails";
import Wishlists from "../../components/Dashboard/Wishlists";
import SortIcon from "@mui/icons-material/Sort";
import SegmentIcon from "@mui/icons-material/Segment";
import AddressBooks from "../../components/Dashboard/AddressBooks";

const userDashboard = () => {
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  const [selectedMenu, setSelectedMenu] = React.useState("Account Information");
  const [open, setOpen] = useState(false);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderMenuContent = () => {
    switch (selectedMenu) {
      case "Account Information":
        return <Profile></Profile>;
      case "Order History":
        return <OrderDetails></OrderDetails>;
      case "Wishlist":
        return <Wishlists />;
      case "Address Book":
        return <AddressBooks />;
      default:
        return null;
    }
  };
  return (
    <>
      <HomePageIntro title={"UserProfile "} />
      <Box sx={{ pt: { lg: 8, xs: 7 } }} mb={4} height={"fit-content"}>
        <Stack>
          <Typography
            variant="header1"
            color="#ffffff"
            className="bold"
            sx={{ background: "#2C3649", py: 10 }}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontWeight="500"
          >
            welcome, {userjsondata?.name}
          </Typography>
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
            <Hidden only={["xl", "lg"]}>
              <SegmentIcon />
            </Hidden>
          </IconButton>
        </Stack>

        <Grid
          container
          // spacing={2}
          sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", mt: 2 }}
        >
          <Hidden only={["sm", "xs", "xms", "md","lmd"]}>
            <Grid item lg={3} sx={{ height: "600px" }}>
              <List>
                {[
                  "Account Information",
                  "Order History",
                  "Wishlist",
                  "Address Book",
                ].map((text, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => handleMenuClick(text)}>
                      {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="cardHeader1"
                              className="bold"
                              color="#1B3148"
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
            </Grid>
          </Hidden>
          <Grid item lg={9} sm={12} xs={12}>
            <Typography paragraph>{renderMenuContent()}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Footer />
      {/* mobile views */}

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
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <IconButton
            aria-label=""
            onClick={() => {
              setOpen(false);
            }}
          >
            {/* <MdClose /> */}
            <img src="/assets/close_sidebar.svg" alt="" />
          </IconButton>
        </Stack>
        <List>
          {[
            "Account Information",
            "Order History",
            "Wishlist",
            "Address Book",
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(text)}>
                {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
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

export default userDashboard;
