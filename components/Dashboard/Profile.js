import React from "react";
import {
  Box,
  Divider,
  Grid,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography, Button,
} from "@mui/material";

const Profile = () => {
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  return (
    <>
      <Box>
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
            <Stack direction={"row"} sx={{justifyContent:"space-between",alignItems:"center",mb:2}}>
            <Typography variant="cardHeader12" color="initial">
              Personal Information
            </Typography>
            <Button variant="contained" color="background2" size="small">
              edit
            </Button>
            </Stack>
           

            <Divider />
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between" }}
              mt={2}
            >
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardLocation1" color="#807f83">
                  User Name
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  {userjsondata.name}
                </Typography>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardLocation1" color="#807f83">
                  Email Address
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  {userjsondata.email}
                </Typography>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                {/* <Typography variant="cardLocation1" color="initial">
                  First Name
                </Typography>
                <Typography variant="cardLocation1" color="initial">
                  masum
                </Typography> */}
              </Stack>
              <Stack direction={"column"} spacing={1}>
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
    </>
  );
};

export default Profile;
