import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Stack, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";

const SignInModal = ({ open, setOpen,signModal }) => {
  const handleChange = () => {
    setOpen(false);
    signModal(true);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { lg: "30%", xs: "100%" }, height: "fit-content" },
        }}
      >
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>

        <DialogTitle>
          <Typography
            variant="header1"
            color="initial"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Register
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack direction={"column"} spacing={3} mt={2} mb={2}>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader12" color="initial">
                EMAIL ADDRESS 
                </Typography>
                <TextField
                  id=""
                  label=""
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Username or Email Address* "
                />
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader12" color="initial">
                  PASSWORD
                </Typography>
                <TextField
                  id=""
                  label=""
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Password*"
                />
              </Stack>

              
              <Button variant="contained" color="background2">
                Register
              </Button>
              <Typography variant="cardHeader12" textAlign={"center"} sx={{cursor:"pointer"}} color="initial" onClick={handleChange}>
                New to Aranya?  <span style={{color:"#75879D"}}>  Already have an Account</span> 
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
   
    </>
  );
};

export default SignInModal;
