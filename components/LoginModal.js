import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Stack, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import SignInModal from "./SignInModal";
import { useRouter } from "next/router";
import ForgotPass from "./ForgotPass";

const LoginModal = ({ open, setOpen }) => {
  const [signModal,setSignModal]=useState(false)
  const [forgotModal,setForgotModal]=useState(false)
  const router=useRouter()
  
  const handleChange = () => {
    setOpen(false);
    setSignModal(true);
  };
  const handleChange1 = () => {
    setOpen(false);
    setForgotModal(true);
  };
  const handleRestPass = () => {
    setOpen(false);
    router.push("/forgotPassword")
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { lg: "30%", xs: "100vw" }, height: "fit-content" },
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
          Login
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack direction={"column"} spacing={3} mt={2} mb={2}>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader12" color="initial">
                  USERNAME OR EMAIL ADDRESS
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

              <Typography
                variant="cardHeader12"
                fontWeight={"bold"}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                color="initial"
                onClick={handleChange1}
              >
                Forgot Password?
              </Typography>
              <Button variant="contained" color="background2">
                Login
              </Button>
              <Typography variant="cardHeader12" textAlign={"center"} sx={{cursor:"pointer"}} color="initial" onClick={handleChange}>
                New to Aranya?  <span style={{color:"#75879D"}}>  Create an Account</span> 
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <SignInModal open={signModal} setOpen={setSignModal} signModal={setOpen}/>
      <ForgotPass open={forgotModal} setOpen={setForgotModal}/>
    </>
  );
};

export default LoginModal;
