import React from "react";
import HomePageIntro from "../components/HomePageIntro";
import {
  Box,
  Button,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Footer from "../components/Footer";
import Agreements from "../components/policies/Agreements";
import { useGetInformationQuery } from "../src/features/api/apiSlice";
import Loader from "../components/Loader/Loader";
import SegmentIcon from "@mui/icons-material/Segment";
import { useContext } from "react";
import USER_CONTEXT from "../components/userContext";
import { MdClose } from "react-icons/md";
import { Email, Phone, Room } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  // const [selectItem, setSelectItem] = useState("terms-conditions");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, touched },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = async (data) => {};
  return (
    <>
      <HomePageIntro title={"PoliciesPages "} />
      <Stack
        sx={{ pt: { lg: 8, xs: 7 } }}
        mb={4}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack sx={{ width: "100%" }}>
          <Typography
            variant="header1"
            color="#ffffff"
            className="bold"
            sx={{ background: "#2C3649", py: 10 }}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontWeight="500"
          >
            Contact Us
          </Typography>
        </Stack>

        <Grid
          container
          spacing={3}
          sx={{ maxWidth: "1500px", width: "100%" }}
          mt={5}
          mb={5}
          justifyContent={"space-around"}
        >
          {/* Info Section */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={{ xs: 2, md: 5 }}>
              {/* Outlet Address */}
              <Grid item xs={12}>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  spacing={3}
                >
                  <img src="/assets/location.svg" alt="" />

                  <Stack direction={"column"} spacing={3} pt={1}>
                    <Stack direction={"column"}>
                      <Typography
                        variant="tabText"
                        className="bold"
                        color="#1B3148"
                      >
                        HQ Address:
                      </Typography>
                      <Typography
                        variant="bolder"
                        className="SemiBold"
                        color="#1B3148"
                      >
                        House-1/A, Road-21, Nikunja-2, Khilkhet, Dhaka 1229.
                      </Typography>
                    </Stack>
                    <Stack direction={"column"}>
                      <Typography
                        variant="tabText"
                        className="bold"
                        color="#1B3148"
                      >
                        Aranya Flagship Showroom Address:
                      </Typography>
                      <Typography
                        variant="bolder"
                        className="SemiBold"
                        color="#1B3148"
                      >
                        Block K, House no: 28, Road No. 20, Dhaka 1213.
                      </Typography>
                    </Stack>
                    <Stack direction={"column"}>
                      <Typography
                        variant="tabText"
                        className="bold"
                        color="#1B3148"
                      >
                        Aranya Dhanmondi Showroom Address:
                      </Typography>
                      <Typography
                        variant="bolder"
                        className="SemiBold"
                        color="#1B3148"
                      >
                        House-33 (316 A Old), Road-16 (27 Old),
                        Dhanmondi, Dhaka 1209.
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              {/* Phone Number */}
              <Grid item xs={12}>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  spacing={3}
                >
                  <img src="/assets/phone.svg" alt="" />
                  <Stack direction={"column"} pt={1}>
                    <Typography
                      variant="tabText"
                      className="bold"
                      color="#1B3148"
                    >
                      Phone Number
                    </Typography>
                    <Typography
                      variant="bolder"
                      className="SemiBold"
                      color="#1B3148"
                    >
                      02-9894303
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  spacing={3}
                >
                  <img src="/assets/mail.svg" alt="" />
                  <Stack direction={"column"} pt={1}>
                    <Typography
                      variant="tabText"
                      className="bold"
                      color="#1B3148"
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="bolder"
                      className="SemiBold"
                      color="#1B3148"
                    >
                      info@aranya.com.bd
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* Send Mail Form Section */}
          <Grid item xs={12} md={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/* Name Input */}
                <Grid item xs={12}>
                  <Stack direction={"column"} spacing={2}>
                    <Typography
                      variant="cardHeader1"
                      color="#1B3148"
                      className="bold"
                    >
                      Name *
                    </Typography>
                    <TextField
                      {...register("name", {
                        required: {
                          value: true,
                          message: "LastName Required",
                        },
                      })}
                      aria-invalid={errors.name ? "true" : "false"}
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                    />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name?.message}</p>
                    )}
                  </Stack>
                </Grid>
                {/* Email Input */}
                <Grid item xs={12}>
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography
                      variant="cardHeader1"
                      color="#1B3148"
                      className="bold"
                    >
                      Email *
                    </Typography>
                    <TextField
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email Required",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "This is not a valid email",
                        },
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                    />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email?.message}</p>
                    )}
                  </Stack>
                </Grid>
                {/* Message Input */}
                <Grid item xs={12}>
                  <Stack direction={"column"} spacing={2} mt={3}>
                    <Typography
                      variant="cardHeader1"
                      color="#1B3148"
                      className="bold"
                    >
                      How can we help? *
                    </Typography>
                    <TextField
                      {...register("message", {
                        required: {
                          value: true,
                          message: "Message Required",
                        },
                      })}
                      aria-invalid={errors.message ? "true" : "false"}
                      fullWidth
                      label="Your Message"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                    {errors.message && (
                      <p style={{ color: "red" }}>{errors.message?.message}</p>
                    )}
                  </Stack>
                </Grid>
                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="background2"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Stack>
      <Footer />
    </>
  );
};

export default ContactUs;
