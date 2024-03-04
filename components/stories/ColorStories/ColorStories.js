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
import colorData from "../../../public/assets/data/colorData.json";
import { useRouter } from "next/router";

const ColorStories = () => {
  const router = useRouter();
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
          pb={5}
        >
          Our Color Stories
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAFAFA",
          position: "sticky",
          top: { lg: 64, xs: 55 },
          zIndex: 1,
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          pl={10}
          sx={{
            width: "100%",
            maxWidth: "1500px",
            margin: "0 auto",
            height: "61px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            direction={"row"}
            // spacing={4}

            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{ width: { xs: "80%", sm: "90%" } }}
          >
            {" "}
            <Typography
              variant="homeFlash"
              color="#1B3148"
              className="bold"
              sx={{
                cursor: "pointer",
                padding: "5px",
                letterSpacing: 1.5,
              }}
            >
              All Ingredients
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Grid
        container
        px={2}
        sx={{ maxWidth: "1500px", width: "100%" }}
        mt={5}
        mb={5}
        mx={"auto"}
        justifyContent={"space-around"}
        alignItems={"flex-start"}
      >
        {colorData.map((colorData, index) => (
          <Grid item xs={10} md={5}  key={index} mb={10}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <Stack sx={{ width: { xs: "233px", md: "100px", lg: "233px" } }}>
                <img src={colorData.img} alt="" />
              </Stack>
              <Stack direction={"column"} spacing={5}>
                <Stack direction={"column"} spacing={3}>
                  <Stack>
                    <Typography
                      className="bold"
                      color={"#1B3148"}
                      variant="wishlistPPrice"
                    >
                      {colorData.title}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      color={"#1B3148"}
                      variant="legend"
                      className="SemiBold"
                    >
                      {colorData.description.substring(0, 200) + " ..."}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={"flex-start"}>
                  <Button
                    className="bold"
                    variant="text"
                    style={{ padding: 0 }}
                    onClick={() => router.push("/story/color-stories")}
                  >
                    <Typography
                      textTransform={"none"}
                      className="bold"
                      color={"#1B3148"}
                    >
                      Read More
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ColorStories;
