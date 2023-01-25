import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";

const forgotPassword = () => {
  return (
    <>
      <HomePageIntro />
      <Box sx={{ height: {lg:"100vh",xs:"70vh"}, py: 10 }}>
        <Stack
          sx={{
            width: "90vw",
            maxWidth: "600px",
            mx: "auto",
            height: "60vh",
            justifyContent: "center",
          }}
        >
          <Paper sx={{ p: 4 }} elevation={4}>
            <Typography variant="subtitl2" color="initial">
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </Typography>

            <Stack mt={5} direction={"column"} spacing={1} mb={2.5}>
              <Typography variant="cardHeader12" color="initial">
                USERNAME OR EMAIL
              </Typography>
              <TextField
                  id=""
                  label=""
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Username or Email*"
                />
            </Stack>
            <Button variant="contained" color="background2" fullWidth>
                reset password
              </Button>
          </Paper>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default forgotPassword;
