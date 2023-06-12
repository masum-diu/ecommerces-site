import React from "react";
import Footer from "../../components/Footer";
import HomePageIntro from "../../components/HomePageIntro";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usePasswordResetRequestMutation } from "../../src/features/api/apiSlice";
import { useEffect } from "react";

const resetPassword = () => {
  const router = useRouter();
  const [passwordResetRequest, { data, isLoading, isSuccess, isError, error }] =
    usePasswordResetRequestMutation();
  const { errormessage, setErrormessage } = useState("");
  const [newPassValues, setNewPassValues] = useState({
    pass: "",
    // email:"",
    showPass: false,
  });
  const [confirmPassValues, setConfirmPassValues] = useState({
    pass: "",
    // email:"",
    showPass: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const newPassword = watch("new_password");
  const handleNewPassVisibility = () => {
    setNewPassValues({
      ...newPassValues,
      showPass: !newPassValues.showPass,
    });
  };
  const handleConfirmPassVisibility = () => {
    setConfirmPassValues({
      ...confirmPassValues,
      showPass: !confirmPassValues.showPass,
    });
  };
  const token = router?.query?.token;
  console.log('our token',token)
  const onSubmit = async (data) => {
    console.log(data.new_password);
    const password = data.new_password;
    try {
      const response = passwordResetRequest({
        password,
        token,
      });
      console.log("your log output", response);
    } catch (error) {
      console.log("post request failed", error);
    }
  };
  return (
    <>
      <Head>
        <meta name="keywords" content="Aranya online shop" />
        <meta name="twitter:card" content="Shop" />
        <meta
          name="twitter:title"
          content="Aranya Bangladesh- Sustainable and Ethical Fashion and Lifestyle Brand"
        />
        <meta
          name="description"
          content="Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        ></meta>
        <meta name="twitter:site" content="@webable_digital" />
        <meta name="twitter:creator" content="@webable_digital" />
        <meta
          name="twitter:description"
          content=" Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        />

        <meta
          property="og:title"
          content="Aranya Bangladesh- Sustainable and Ethical Fashion and Lifestyle Brand"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.pathname} />
        <meta
          property="og:description"
          content="Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        />
      </Head>
      <HomePageIntro title={"Shop "} />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          mb: 4,
          pt: { lg: 8, xs: 7 },
          mt: { lg: 10, xs: 5 },
          mb: { lg: 10, xs: 5 },
        }}
      >
        <Typography
          variant="cardHeader1"
          color="initial"
          className="SemiBold"
          sx={{ mb: { lg: 5, xs: 3 } }}
        >
          ACCOUNT INFORMATION
        </Typography>
        <Paper sx={{ p: 2, width: "90%", maxWidth: "800px" }} elevation={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} spacing={2}>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader12" color="initial">
                  NEW PASSWORD
                </Typography>
                <TextField
                  {...register("new_password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },

                    minLength: {
                      value: 8,
                      message: `Password must be more the 8 characters`,
                    },
                  })}
                  name="new_password"
                  id=""
                  label=""
                  type={newPassValues.showPass ? "text" : "password"}
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Password*"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label=""
                          onClick={handleNewPassVisibility}
                        >
                          {newPassValues.showPass ? (
                            <VisibilityOff></VisibilityOff>
                          ) : (
                            <Visibility></Visibility>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <p style={{ color: "red" }}>
                  {
                    /* errors?.new_password
                    ?  */ errors.new_password?.message
                    /* : : userdata?.response?.status == 401
                    ? userdata?.response?.data?.message
                      "" */
                  }
                </p>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Typography variant="cardHeader12" color="initial">
                  CONFIRM PASSWORD
                </Typography>
                <TextField
                  {...register("confirm_password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",

                    minLength: {
                      value: 8,
                      message: `Password must be more the 8 characters`,
                    },
                  })}
                  name="confirm_password"
                  id=""
                  label=""
                  type={confirmPassValues.showPass ? "text" : "password"}
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Password*"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label=""
                          onClick={handleConfirmPassVisibility}
                        >
                          {confirmPassValues.showPass ? (
                            <VisibilityOff></VisibilityOff>
                          ) : (
                            <Visibility></Visibility>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <p style={{ color: "red" }}>
                  {
                    /* errors?.confirm_password
                    ?  */ errors.confirm_password?.message
                    /* : : userdata?.response?.status == 401
                    ? userdata?.response?.data?.message
                      "" */
                  }
                </p>
              </Stack>
              <Button variant="contained" color="background2" type="submit">
                SUBMIT
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
      <Footer></Footer>
    </>
  );
};

export default resetPassword;
