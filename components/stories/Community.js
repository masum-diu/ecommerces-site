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
import style from "./map.module.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Link from "next/link";

const Community = () => {
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
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
          variant="header1"
          color="#1B3148"
          className="bold"
          //   sx={{ background: "#2C3649",  }}
          textAlign={"center"}
          //   textTransform={"uppercase"}
          fontWeight="500"
        >
          About Aranya
        </Typography>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{ maxWidth: "1500px", width: "100%" }}
        mt={5}
        mb={5}
        justifyContent={"space-around"}
        alignItems={"flex-start"}
      >
        {/* Info Section */}
        <Grid item xs={10} md={5}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={{ sm: "100%", md: "100%", lg: "100%" }}
            className={style.map_container}
          >
            <img
              style={{ width: "100%", height: "fit-content" }}
              src="../assets/Group.png"
              alt="Bangladesh Map"
            />
            <Stack className={style.division_buttons}>
              <FmdGoodIcon
                onClick={() => setIsHoveredRight((prev) => !prev)}
                className={style.division_button}
                data-division="division1"
                variant="primary"
              ></FmdGoodIcon>
              <FmdGoodIcon
                onClick={() => setIsHoveredRight((prev) => !prev)}
                className={style.division_button}
                data-division="division2"
              ></FmdGoodIcon>
              {/* Add more buttons for other divisions */}
            </Stack>
          </Stack>
        </Grid>

        {/* Send Mail Form Section */}
        <Grid item xs={10} md={5}>
          <Stack
            sx={{
              position: "relative",
              overflow: "hidden",
            }}
            // onMouseEnter={() => setIsHoveredRight(true)}
            // onMouseLeave={() => setIsHoveredRight(false)}
          >
            <Link href={`/`}>
              <a style={{ lineHeight: 0 }}>
                <Stack
                  style={{
                    position: "absolute",
                    right: isHoveredRight ? 0 : "-100%", // Adjust to '0' for right to left effect
                    top: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.8s ease-in-out", // Adjust the duration and easing as needed
                    transform: isHoveredRight
                      ? "translateX(0)"
                      : "translateX(100%)",
                  }}
                >
                  {/* Add your content inside this box */}
                  {/* <p style={{ color: "#fff" }}>Your Content Here</p> */}
                  <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    columnGap={5}
                    rowGap={5}
                  >
                    <Typography
                      variant="CategoryName"
                      sx={{
                        color: "white",
                        textAlign: "center",
                      }}
                      textTransform="uppercase"
                    >
                      {/* {sectionBanner[1]?.name} */}
                    </Typography>

                    <Button
                      style={{
                        backgroundColor: "#1B3148",
                        padding: ".5rem",
                        width: {
                          xs: "8rem",
                          xms: "10rem",
                          sm: "15rem",
                          md: "15rem",
                        },
                      }}
                      variant="contained"
                      size="large"
                      //   onClick={() =>
                      //     handleSecondBanner(sectionBanner[1]?.back_link)
                      //   }
                    >
                      <Typography variant="tabText">
                        Shop all {/* {sectionBanner[1]?.name} */}
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>
              </a>
            </Link>
            <img
              src="/assets/aranya_about.png"
              style={{ cursor: "pointer", objectFit: "cover" }}
              alt=""
              width={"100%"}
              height={" 100%"}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Community;
