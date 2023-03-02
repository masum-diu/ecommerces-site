import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import SignInModal from "./SignInModal";
import { useRouter } from "next/router";
import ForgotPass from "./ForgotPass";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import USER_CONTEXT from "./userContext";
import Cookies from "js-cookie";
import instance from "../pages/api/api_instance";

const LoginModal = ({ open, setOpen }) => {
  const { userdata, setUserData } = useContext(USER_CONTEXT);
  const {errormessage, setErrormessage} = useState("")
  const [signModal, setSignModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const router = useRouter();

  const handleclearuser = () => {
    setUserData("")
  };
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
    router.push("/forgotPassword");
  };
  const [values, setValues] = useState({
    pass: "",
    // email:"",
    showPass: false,
  });
  const handlepassVisbilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const password = useWatch({ control, name: "password" });
  const onSubmit = (data) => {
    instance
      .post("/auth/login", data, {})
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("acesstoken", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        Cookies.set("acesstoken", result.data.token);
        Cookies.set("user", JSON.stringify(result.data.user));
        setUserData(result.data);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err);
        setUserData(err);
      });
  };
  console.log("hellos", userdata);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction={"column"} spacing={3} mt={2} mb={2}>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    USERNAME OR EMAIL ADDRESS
                  </Typography>
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "This is not a valid email",
                      },
                    })}
                    id=""
                    label=""
                    // value={}
                    // onChange={}
                    name="email"
                    size="small"
                    placeholder="Email Address* "
                  />
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    PASSWORD
                  </Typography>
                  <TextField
                    {...register("password", {
                      required: "Password is required",
                     
                      minLength: {
                        value: 8,
                        message: `Password must be more the 8 characters`,
                      },
                      
                    
                    })}
                    onKeyUp={()=>handleclearuser()}
                    name="password"
                    id=""
                    label=""
                    type={values.showPass ? "text" : "password"}
                    // value={}
                    // onChange={}
                    size="small"
                    placeholder="Password*"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label=""
                            onClick={handlepassVisbilty}
                          >
                            {values.showPass ? (
                              <VisibilityOff></VisibilityOff>
                            ) : (
                              <Visibility></Visibility>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <p style={{ color: "red" }}>{errors?.password?errors.password?.message:(userdata?.response?.status == 401? userdata?.response?.data?.message:"")}</p>
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
                <Button variant="contained" color="background2" type="submit">
                  Login
                </Button>
                <Typography
                  variant="cardHeader12"
                  textAlign={"center"}
                  sx={{ cursor: "pointer" }}
                  color="initial"
                  onClick={handleChange}
                >
                  New to Aranya?{" "}
                  <span style={{ color: "#75879D" }}> Create an Account</span>
                </Typography>
              </Stack>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <SignInModal
        open={signModal}
        setOpen={setSignModal}
        signModal={setOpen}
      />
      <ForgotPass open={forgotModal} setOpen={setForgotModal} />
    </>
  );
};

export default LoginModal;
