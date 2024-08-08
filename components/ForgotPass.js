import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import instance from "../pages/api/api_instance";
import USER_CONTEXT from "./userContext";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader/Loader";
import { toast } from "react-hot-toast";

const ForgotPass = ({ open, setOpen }) => {
  const { isPlaceOrder, setIsPlaceOrder } = useContext(USER_CONTEXT);
  const [host, setHost] = useState("");
  const [mailSendResponse, setMailSendResponse] = useState({});
  useEffect(() => {
    /* const host = location.host;
    if (host === "localhost:3000") {
      setHost("http://localhost:3000");
    } else {
    } */
    setHost(window.location.origin);
  }, [host]);

  useEffect(() => {
    if (mailSendResponse?.data?.status === "success") {
      toast.success("An email has been sent to you email address.");
    }
    if (mailSendResponse?.data?.status === "error") {
      toast.success("Something went wrong!");
    }
  }, [mailSendResponse]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    setOpen(false);
    setIsPlaceOrder(false);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setIsPlaceOrder(false);
  };
  const onSubmit = async (data) => {
    const email = data.email;
    await instance
      .post(
        "/user-password-email-reset-link",
        { email: email, backUri: host },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        setMailSendResponse(result);
      })
      .catch((err) => {});
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleDialogClose()}
        PaperProps={{
          sx: { width: { lg: "30%", xs: "100vw" }, height: "fit-content" },
        }}
      >
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
          <IconButton aria-label="" onClick={() => handleClose()}>
            <MdClose />
          </IconButton>
        </Stack>

        <DialogTitle>
          <Typography
            variant="header1"
            color="initial"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Forgot Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            <Typography variant="subtitl2" color="initial">
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack mt={5} direction={"column"} spacing={1} mb={2.5}>
                <Typography variant="cardHeader12" color="initial">
                  USERNAME OR EMAIL
                </Typography>
                <TextField
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Address is required",
                    },
                  })}
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Username or Email*"
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
              </Stack>

              <Button
                type="submit"
                variant="contained"
                color="background2"
                fullWidth
              >
                reset password
              </Button>

              {/* <input type="submit" /> */}
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPass;
