import { Box, Input, Stack, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import { VscArrowRight } from "react-icons/vsc";
import USER_CONTEXT from "./userContext";
import {
  useGetInformationQuery,
  useSubscribeCreationMutation,
} from "../src/features/api/apiSlice";
import Loader from "./Loader/Loader";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { FiInstagram } from "react-icons/fi";
import { Style } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import SmallLoader from "./Loader/SmallLoader";
import { toast } from "react-hot-toast";
const Footer = () => {
  const { selectItem, setSelectItem } = useContext(USER_CONTEXT);
  const { data, isLoading, isError, isSuccess } = useGetInformationQuery();
  const [
    subscriptionCreation,
    {
      data: subscribeData,
      isLoading: subscribeLoading,
      isError: subscribeError,
      isSuccess: scribeSuccess,
    },
  ] = useSubscribeCreationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const handleRedirect = (page, slug) => {
    router.push(page);
    setSelectItem(slug);
  };
  const custom_input_style = `
      input#email::placeholder{
        color:#F2F2F2;
      },
  `;

  const onSubmit = async (data) => {
    try {
      const subscriptionResponse = await subscriptionCreation({
        email: data.email,
      });
      if (subscriptionResponse?.data?.status === true) {
        toast.success("Subscription successful!");
      } else {
        toast.error("Subscription Failed!");
      }
    } catch (error) {
      toast.error("Subscription Failed!");
    }
    // for example
  };

  if (isLoading) {
    <Loader></Loader>;
  }

  return (
    <>
      <style>{custom_input_style}</style>
      <Box bgcolor={"#1B3148"}>
        <Stack
          direction={"column"}
          sx={{
            p: 1,
            pt: "3vh",
            justifyContent: "center",
            alignItems: "center",
            width: "95%",
            margin: "0 auto",
            maxWidth: "1500px",
          }}
          spacing={{ lg: 4, xs: 2 }}
        >
          <Stack style={{ cursor: "pointer" }}>
            <Link href="/shop">
              <img src="/assets/footerLogo.png" alt="" />
            </Link>
          </Stack>
          <Typography
            variant="cardHeader"
            color="#F2F2F2"
            textTransform={"uppercase"}
            fontWeight="600"
          >
            Get updates on our latest collections
          </Typography>
          <Stack
            sx={{
              borderBottom: "2px solid #38486F",
              width: {
                xs: "80%",
                xms: "60%",
                sm: "50%",
                md: "35%",
                lg: "30%",
                lg: "20%",
              },
            }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <input
                  type="email"
                  placeholder="Email Address"
                  autoComplete="off"
                  id="email"
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address!",
                    },
                  })}
                  style={{
                    width: "80%",
                    borderBottom: "none",
                    fontSize: "16px",
                    outline: "none", // To remove the default outline when focused
                    borderLeft: "none", // To remove left border
                    borderRight: "none", // To remove right border
                    borderTop: "none", // To remove top border
                    padding: "8px 8px 8px 0", // Add padding for better aesthetics
                    backgroundColor: "#1b3148",
                    textAlign: "left",
                    color: "white", // Text color
                    caretColor: "white",
                  }}
                />
                <Stack
                  style={{ width: "20%" }}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <IconButton type="submit">
                    <VscArrowRight style={{ color: "#F2F2F2" }} />
                  </IconButton>
                </Stack>
              </Stack>
            </form>
          </Stack>
          {errors.email && (
            <Typography sx={{ color: "red", marginTop: "0px" }}>
              {errors.email.message}
            </Typography>
          )}
          {subscribeLoading && <SmallLoader></SmallLoader>}

          {/* <Typography variant="normal" color="#F2F2F2">
            ABOUT
          </Typography> */}
          <Stack direction={"row"} flexWrap={"wrap"} columnGap={4} rowGap={2}>
            <Typography variant="cardHeader2" color="#F2F2F2">
              About
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Community
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Colors
            </Typography>

            <Typography variant="cardHeader2" color="#F2F2F2">
              Partners
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Sustainability
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Blog
            </Typography>
            <Link href={"/contact-us"}>
              <a style={{ textDecoration: "none" }}>
                <Typography
                  variant="cardHeader2"
                  color="#F2F2F2"
                  // onClick={() => router.push("/contact-us")}
                >
                  Contact Us
                </Typography>
              </a>
            </Link>
          </Stack>
          {/* <Typography variant="normal" color="#F2F2F2 ">
            BUSINESS
          </Typography>
          <Stack direction={"row"} spacing={3}>
            <Typography variant="cardHeader2" color="#F2F2F2">
              B2B Export
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Career
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Contact
            </Typography>
          </Stack> */}
          {/* <Typography variant="normal" color="#F2F2F2 ">
            SOCIAL MEDIA
          </Typography> */}
          <Stack direction={"row"} spacing={3}>
            <a
              href={"https://www.facebook.com/aranyacrafts"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {/* <Typography variant="cardHeader2" color="#F2F2F2">
                Facebook
              </Typography> */}
              <img src="/assets/facebook.svg" alt="" />
            </a>
            <a
              href={" https://www.instagram.com/aranya_crafts/"}
              target="_blank"
            >
              {/*  <Typography variant="cardHeader2" color="#F2F2F2">
                Instagram
              </Typography> */}
              <img src="/assets/instagram.svg" alt="" />
            </a>
            <a
              href={"https://www.youtube.com/@aranyacraftslimited7427"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {/* <Typography variant="cardHeader2" color="#F2F2F2">
                Youtube
              </Typography> */}
              <img src="/assets/youtube.svg" alt="" />
            </a>
            <a
              href={"https://www.linkedin.com/company/aranyacrafts/mycompany/"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {/* <Typography variant="cardHeader2" color="#F2F2F2">
                LinkedIn
              </Typography> */}
              <img src="/assets/linkedin.svg" alt="" />
              {/* <FacebookOutlinedIcon
                style={{ color: "white", fontSize: "3rem" }}
              ></FacebookOutlinedIcon> */}
            </a>
          </Stack>
        </Stack>
        <Box
          sx={{
            background: "#476182",
            height: { xs: "10vh", lg: "5vh" },
            display: "flex",
            alignItems: "center",
            mt: "3vh",
          }}
        >
          <Stack
            flexWrap={"wrap"}
            columnGap={1}
            alignItems="center"
            rowGap={2}
            sx={{
              // pb: 5
              justifyContent: "space-between",
              alignItems: "center",
              width: "95%",
              margin: "0 auto",
              maxWidth: "1500px",
              flexDirection: { lg: "row" },
            }}
            direction={"row"}
          >
            <Typography variant="cardLocation1" color="#E3E3E3" px={2}>
              © Aranya Crafts Limited 2024
            </Typography>
            <Stack
              direction={"row"}
              columnGap={2}
              rowGap={2}
              px={2}
              flexWrap={"wrap"}
              alignItems="center"
            >
              {data?.map((content, index) => (
                <Typography
                  key={index}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    handleRedirect("/policiespages", content?.slug)
                  }
                  variant="cardLocation1"
                  color="#E3E3E3"
                >
                  {content.title}
                </Typography>
              ))}
              {/* <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => handleRedirect("/policiespages")}
              variant="cardLocation1"
              color="#E3E3E3"
            >
              Terms & Conditions
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => handleRedirect("/policiespages")}
              variant="cardLocation1"
              color="#E3E3E3"
            >
              Privacy Policies
            </Typography>
            <Typography variant="cardLocation1" color="#E3E3E3">
              Return
            </Typography> */}
              <Typography variant="cardLocation1" color="#E3E3E3">
                International
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
