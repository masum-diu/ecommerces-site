import React from "react";
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
import SegmentIcon from "@mui/icons-material/Segment";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { Email, Phone, Room } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useGetAboutStoryDataQuery } from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";
import Image from "next/image";

const AboutAranya = () => {
  const {
    data: aboutData,
    isError: aboutError,
    isLoading: aboutLoading,
  } = useGetAboutStoryDataQuery();
  if (aboutLoading) {
    <Loader></Loader>;
  }
  return (
    <Stack
      //   sx={{ pt: { lg: 8, xs: 7 } }}
      mb={4}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack sx={{ width: "100%" }}>
        <Typography
          variant="productName"
          color="#1B3148"
          className="bold"
          //   sx={{ background: "#2C3649",  }}
          textAlign={"center"}
          //   textTransform={"uppercase"}
          fontWeight="500"
        >
          {aboutData?.title}
        </Typography>
      </Stack>

      <Grid
        container
        px={{ md: 1, lg: 2 }}
        sx={{ maxWidth: "1500px", width: "100%" }}
        mt={5}
        mb={5}
        justifyContent={"space-around"}
        alignItems={"flex-start"}
      >
        {/* Info Section */}
        <Grid item xs={10} md={5}>
          <Stack>
            {/* <img
              style={{ maxWidth: "665px", width: "100%" }}
              src="/assets/aranya_about.png"
              alt=""
            /> */}
            <Image
              height={705}
              width={612}
              layout="responsive"
              objectFit="cover"
              src={aboutData?.feature_image}
            ></Image>
          </Stack>
        </Grid>

        {/* Send Mail Form Section */}
        <Grid item xs={10} md={5}>
          <Stack direction={"column"} spacing={5}>
            <Stack>
              <img
                style={{ width: "225px" }}
                src="/assets/aranya_about_logo.png"
                alt=""
              />
              {/* <Image
                height={705}
                width={612}
                layout="responsive"
                src={aboutData?.feature_image}
              ></Image> */}
            </Stack>
            <Stack>
              <Typography
                color={"#1B3148"}
                className="SemiBold"
                dangerouslySetInnerHTML={{ __html: aboutData?.description }}
              ></Typography>
            </Stack>
            {/* <Stack direction={"column"}>
              <Stack className="bold" color={"#1B3148"}>
                Mission
              </Stack>
              <Stack className="SemiBold" color={"#1B3148"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                vero adipisci ipsam et nisi. Blanditiis facere in voluptate
                dignissimos, nisi modi, praesentium temporibus repellendus
                dolorum asperiores eligendi facilis quam inventore!
              </Stack>
            </Stack>
            <Stack direction={"column"}>
              <Stack className="bold" color={"#1B3148"}>
                Vision
              </Stack>
              <Stack className="SemiBold" color={"#1B3148"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                vero adipisci ipsam et nisi. Blanditiis facere in voluptate
                dignissimos, nisi modi, praesentium temporibus repellendus
                dolorum asperiores eligendi facilis quam inventore!
              </Stack>
            </Stack> */}
            <Stack direction={"row"} justifyContent={"flex-end"}>
              <Button className="bold" variant="text">
                <Typography className="bold" color={"#1B3148"}>
                  Read more ...
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AboutAranya;
