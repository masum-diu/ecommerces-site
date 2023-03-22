import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import OrderDetails from "../components/Dashboard/OrderDetails";
import UserProfile from "../components/Dashboard/Profile";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Profile from "../components/Dashboard/Profile";

const userProfile = () => {
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  const [selectedMenu, setSelectedMenu] = React.useState("User Profile");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderMenuContent = () => {
    switch (selectedMenu) {
      case "User Profile":
        return <Profile></Profile>;
      case "Order":
        return <OrderDetails></OrderDetails>;
      default:
        return null;
    }
  };
  return (
    <>
      <HomePageIntro title={"UserProfile "} />
      <Box mt={10} mb={4} height={"100vh"}>
        <Stack>
          <Typography
            variant="header1"
            color="#7E7250"
            sx={{ background: "#2C3649", py: 10 }}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontWeight="500"
          >
            welcome, {userjsondata.name}
          </Typography>
        </Stack>

        <Grid container spacing={2} sx={{width:"90%",maxWidth:"1500px",margin:"0 auto",mt:2}}>
          <Grid item lg={3}>
            <List>
              {[
                "User Profile",
                "Order",
                "Send email",
                "Drafts",
                "All mail",
                "Trash",
                "Spam",
              ].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(text)}>
                    {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item lg={6}>
          <Typography paragraph>
          {renderMenuContent()}
          </Typography>
          </Grid>
        </Grid>

      </Box>
      <Footer />
    </>
  );
};

export default userProfile;
