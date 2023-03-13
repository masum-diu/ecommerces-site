import {
  Box,
  Divider,
  Grid,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";

const userProfile = () => {
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  //
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
        <Stack
          direction={"column"}
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
        >
          <Typography variant="cardHeader1" color="initial">
            ACCOUNT INFORMATION
          </Typography>
          <Typography variant="cardLocation1" color="initial">
            This section contains your address information
          </Typography>
          <br />
          <Paper
            sx={{ p: 2, width: "90%", maxWidth: "800px", marginTop: "30px" }}
            elevation={2}
          >
            <Typography variant="cardHeader12" color="initial">
              Personal Information
            </Typography>
           
            <Divider />
            <Stack direction={"row"} sx={{justifyContent:"space-between"}} mt={2}>
              <Stack direction={"column"} spacing={1} >
                <Typography variant="cardLocation1" color="#807f83">
                  User Name
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  {userjsondata.name}
                </Typography>
              </Stack>
              <Stack direction={"column"}  spacing={1}>
                <Typography variant="cardLocation1" color="#807f83">
                Email Address
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  {userjsondata.email}
                </Typography>
              </Stack>
              <Stack direction={"column"}  spacing={1}>
                {/* <Typography variant="cardLocation1" color="initial">
                  First Name
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  masum
                </Typography> */}
              </Stack>
              <Stack direction={"column"}  spacing={1}>
                {/* <Typography variant="cardLocation1" color="initial">
                  First Name
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  masum
                </Typography> */}
              </Stack>
            </Stack>
            
          </Paper>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default userProfile;
