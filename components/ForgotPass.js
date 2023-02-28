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
import React from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";

const ForgotPass = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(
        "http://apiaranya.jumriz.com/public/api/user-password-email-reset-link",
        {
          data: data.mail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(async (result) => {
        console.log("post response", result?.data?.payment);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("reset data", data);
    setOpen(false);
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
                  {...register("mail", {
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
                {errors.mail && <p role="alert">{errors.mail?.message}</p>}
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
