import { Box, Input, Stack, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import { VscArrowRight } from "react-icons/vsc";
import USER_CONTEXT from "./userContext";
import { useGetInformationQuery } from "../src/features/api/apiSlice";
import Loader from "./Loader/Loader";
const Footer = () => {
  const { selectItem, setSelectItem } = useContext(USER_CONTEXT);
  const { data, isLoading, isError, isSuccess } = useGetInformationQuery();
  const router = useRouter();
  const handleRedirect = (page, slug) => {
    router.push(page);
    setSelectItem(slug);
  };

  if (isLoading) {
    <Loader></Loader>;
  }

  return (
    <>
      <Box bgcolor={"#3c5676"}>
        <Stack
          direction={"column"}
          sx={{
            p: 4,
            justifyContent: "center",
            alignItems: "center",
            width: "95%",
            margin: "0 auto",
            maxWidth: "1500px",
          }}
          spacing={4}
        >
          <img src="/assets/footerLogo.png" alt="" />
          <Typography
            variant="cardHeader"
            color="#F2F2F2"
            textTransform={"uppercase"}
            fontWeight="600"
          >
            Get updates on our latest collections
          </Typography>
          <Input
            placeholder="Email Address"
            InputProps={{
              classes: {
                input: { color: "red" }, // Apply the custom placeholder color
              },
            }}
            sx={{ color: "#ffff", width: "90vw", maxWidth: "306px", pb: 1 }}
            endAdornment={
              <IconButton>
                <VscArrowRight style={{ color: "#F2F2F2" }} />
              </IconButton>
            }
          />

          <Typography variant="normal" color="#F2F2F2">
            ABOUT
          </Typography>
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
              Sustainability
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Partners
            </Typography>
            <Typography variant="cardHeader2" color="#F2F2F2">
              Blog
            </Typography>
          </Stack>
          <Typography variant="normal" color="#F2F2F2 ">
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
          </Stack>
          <Typography variant="normal" color="#F2F2F2 ">
            SOCIAL MEDIA
          </Typography>
          <Stack direction={"row"} spacing={3}>
            <a
              href={"https://www.facebook.com/aranyacrafts"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="cardHeader2" color="#F2F2F2">
                Facebook
              </Typography>
            </a>
            <a
              href={" https://www.instagram.com/aranya_crafts/"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="cardHeader2" color="#F2F2F2">
                Instagram
              </Typography>
            </a>
            <a
              href={"https://www.youtube.com/@aranyacraftslimited7427"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="cardHeader2" color="#F2F2F2">
                Youtube
              </Typography>
            </a>
            <a
              href={"https://www.linkedin.com/company/aranyacrafts/mycompany/"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="cardHeader2" color="#F2F2F2">
                LinkedIn
              </Typography>
            </a>
          </Stack>
        </Stack>
        <Stack
          flexWrap={"wrap"}
          columnGap={1}
          alignItems="center"
          rowGap={2}
          sx={{
            pb: 5,
            justifyContent: "space-between",
            width: "95%",
            margin: "0 auto",
            maxWidth: "1500px",
          }}
          direction={"row"}
        >
          <Typography variant="cardLocation1" color="#E3E3E3" px={2}>
            © Aranya Crafts Limited 2023
          </Typography>
          <Stack
            direction={"row"}
            columnGap={3}
            rowGap={2}
            px={2}
            alignItems="center"
          >
            {data?.map((content, index) => (
              <Typography
                key={index}
                sx={{ cursor: "pointer" }}
                onClick={() => handleRedirect("/policiespages", content?.slug)}
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
    </>
  );
};

export default Footer;
