import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const SignInModal = ({ open, setOpen, signModal }) => {
  const [values,setValues] = useState({
    pass: "",
    // email:"",
    showPass: false,
  });
  const [values1,setValues1] = useState({
    pass: "",
    // email:"",
    showPass1: false,
  });
  const handlepassVisbilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  const handlepassVisbilty1 = () => {
    setValues1({
      ...values1,
      showPass1: !values1.showPass1,
    });
  };
  const handleChange = () => {
    setOpen(false);
    signModal(true);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  console.log(errors);

  

  const onSubmit = (data) => {
    axios
      .post("http://apiaranya.jumriz.com/public/api/auth/register", data, {})
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("acesstoken", result.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction={"column"} spacing={3} mt={2} mb={2}>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    USERNAME
                  </Typography>
                  <TextField
                    {...register("name", { required: "Username is required" })}
                    id=""
                    label=""
                    // value={}
                    // onChange={}
                    size="small"
                    placeholder="Username* "
                  />
                  
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    EMAIL ADDRESS
                  </Typography>
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\s+$/i,
                        message: "This is not a valid email",
                      },
                    })}
                    id=""
                    label=""
                    // value={}
                    // onChange={}
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
                    })}
                    id=""
                    label=""
                    type={values.showPass ? "text" : "password"}
                    // value={}
                    // onChange={}
                    size="small"
                    placeholder="Password*"
                   InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                             <IconButton aria-label="" onClick={handlepassVisbilty}>
                                {
                                  values.showPass?<VisibilityOff></VisibilityOff>:<Visibility></Visibility>
                                }
                             </IconButton>
                      </InputAdornment>

                    )
                   }}
                  />
                  <p style={{ color: "red" }}>{errors.password?.message}</p>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    CONFIRM PASSWORD
                  </Typography>
                  <TextField
                   type={values.showPass1 ? "text" : "password"}
                    {...register("confirm_password", {
                      required: "Confirm Password is required",
                    })}
                    id=""
                    label=""
                    // value={}
                    // onChange={}
                    size="small"
                    placeholder="Confirm Password*"
                    InputProps={{
                      endAdornment:(
                        <InputAdornment position="end">
                               <IconButton aria-label="" onClick={handlepassVisbilty1}>
                                  {
                                    values1.showPass1?<VisibilityOff></VisibilityOff>:<Visibility></Visibility>
                                  }
                               </IconButton>
                        </InputAdornment>
  
                      )
                     }}
                  />
                  <p style={{ color: "red" }}>
                    {errors.confirm_password?.message}
                  </p>
                </Stack>

                <Button variant="contained" color="background2" type="submit">
                  Register
                </Button>
                <Typography
                  variant="cardHeader12"
                  textAlign={"center"}
                  sx={{ cursor: "pointer" }}
                  color="initial"
                  onClick={handleChange}
                >
                  New to Aranya?{" "}
                  <span style={{ color: "#75879D" }}>
                    {" "}
                    Already have an Account
                  </span>
                </Typography>
              </Stack>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInModal;
