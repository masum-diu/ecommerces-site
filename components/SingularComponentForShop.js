import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

import Link from "next/link";
import Head from "next/head";
import style from "../public/assets/css/HomePageIntro.module.css";

const SingularComponentForShop = ({ homedata }) => {
  console.log("homedata", homedata);
  const sectionBanner = JSON.parse(homedata.banner);

  const sectionFileType = sectionBanner[0]?.file_type;
  console.log("sectionBanner", sectionBanner);
  const handleFirstBanner = () => {
    if (homedata?.use_for === "category") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "sub_cat") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "campaign") {
      return sectionBanner[0]?.back_link;
    }
  };

  return (
    <>
      {sectionFileType === "video" ? (
        <Stack
          mb={5}
          dangerouslySetInnerHTML={{
            __html: `<video className="app__backgroundVideo" autoplay="true" muted="true" preload="auto" loop playsinline="" data-wf-ignore="true" data-object-fit="cover" >
              <source src=${sectionBanner[0]?.banner_uri} type="video/mp4" data-wf-ignore="true" />
              Your browser does not support the video tag.
              </video>`,
          }}
        />
      ) : sectionFileType === "image" ? (
        <Stack sx={{ position: "relative" }} mb={5}>
          {sectionBanner[0]?.back_link &&
          sectionBanner[0]?.back_link !== null ? (
            <Link href={`${handleFirstBanner()}`}>
              <a style={{ lineHeight: 0 }}>
                <img
                  src={`${sectionBanner[0]?.banner_uri
                    ?.split("/")
                    .slice(0, 6)
                    .join(
                      "/"
                    )}/c_lfill,g_auto,h_900,w_1920/${sectionBanner[0]?.banner_uri
                    ?.split("/")
                    .slice(6)
                    .join("/")}`}
                  alt=""
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </a>
            </Link>
          ) : (
            <img
              src={`${sectionBanner[0]?.banner_uri
                ?.split("/")
                .slice(0, 6)
                .join(
                  "/"
                )}/c_lfill,g_auto,h_900,w_1920/${sectionBanner[0]?.banner_uri
                ?.split("/")
                .slice(6)
                .join("/")}`}
              alt=""
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={style.menu3}
              // variant="occasionHeader"
              // color="white"
              textAlign={"center"}
              fontWeight={"900"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `/new-collections`,
                })
              }
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                // pt: 4,
                // fontFamily:"cursive",
                cursor: "pointer",
                px: 4,
                color: "#ffffff",
                fontSize: { xs: "2rem", xms: "3rem", sm: "3rem", md: "5rem", lg: "5rem", xl: "5rem" },
              }}
            >
              {sectionBanner[0]?.name}
              {/* <li>
                {homedata?.back_url_two?.includes("campaign")
                  ? homedata?.back_url_two
                    ? /cat_name=([^&]+)/.exec(homedata?.back_url_two)[1]
                    : ""
                  : homedata?.back_url_two
                  ? /^(.*?)\?/.exec(homedata?.back_url_two)[1]
                  : ""}
                  {sectionBanner[0]?.name}
              </li> */}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
};

export default SingularComponentForShop;
