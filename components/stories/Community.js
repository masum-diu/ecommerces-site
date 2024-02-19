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
  Radio,
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
  const [showRdBtn, setShowRdBtn] = useState(false);
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
          Community
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
        {/* Map Section */}
        <Grid item xs={10} md={5}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={{
              sm: "100%",
              md: "100%",
              lg: "100%",
            }}
            sx={{ maxHeight: "941px", height: "100%" }}
            className={style.map_container}
          >
            <Stack>
              <img
                style={{ height: "100%", width: "100%" }}
                src="../assets/Map.png"
                alt="Bangladesh Map"
              />
            </Stack>

            <Stack className={style.division_buttons}>
              <Stack
                className={style.division_button}
                data-division="division1"
              >
                <Typography
                  className="bold"
                  color={"#1B3148"}
                  onMouseEnter={() => setShowRdBtn(true)}
                  onMouseLeave={() => setShowRdBtn(false)}
                  mb={2}
                >
                  Jashor
                </Typography>
                <Radio
                  style={{
                    transform: "translateY(-50%)",
                    visibility: showRdBtn ? "visible" : "hidden",
                    transition: "visibility 0.5s ease-in",
                  }}
                  checked={true}
                  onMouseEnter={() => setShowRdBtn(true)}
                  onMouseLeave={() => setShowRdBtn(false)}
                  onClick={() => setIsHoveredRight((prev) => !prev)}
                />
              </Stack>
              <Stack
                className={style.division_button}
                data-division="division2"
              >
                <Typography
                  className="bold"
                  color={"#1B3148"}
                  onMouseEnter={() => setShowRdBtn(true)}
                  onMouseLeave={() => setShowRdBtn(false)}
                  mb={2}
                >
                  Jashor
                </Typography>
                <Radio
                  style={{
                    transform: "translateY(-50%)",
                    visibility: showRdBtn ? "visible" : "hidden",
                    transition: "visibility 0.5s ease-in",
                  }}
                  checked={true}
                  onMouseEnter={() => setShowRdBtn(true)}
                  onMouseLeave={() => setShowRdBtn(false)}
                  onClick={() => setIsHoveredRight((prev) => !prev)}
                />
              </Stack>

{/*               <FmdGoodIcon
                onClick={() => setIsHoveredRight((prev) => !prev)}
                className={style.division_button}
                data-division="division2"
              ></FmdGoodIcon> */}
              {/* Add more buttons for other divisions */}
            </Stack>
          </Stack>
        </Grid>

        {/* Details Section */}
        <Grid item xs={10} md={5}>
          <Stack
            sx={{
              position: "relative",
              overflow: "hidden",
              maxHeight: "941px",
              height: "100%",
            }}
          >
            <Stack
              style={{
                position: "absolute",
                right: isHoveredRight ? 0 : "-100%", // Adjust to '0' for right to left effect
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                backgroundImage:
                  "url('../assets/aranya_community_side_drawer.png')", // Replace with the path to your image
                backgroundSize: "cover", // You can adjust the background size as needed
                backgroundPosition: "center", // You can adjust the background position as needed
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.8s ease-in-out", // Adjust the duration and easing as needed
                transform: isHoveredRight
                  ? "translateX(0)"
                  : "translateX(100%)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for the desired transparency
                }}
              />
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                columnGap={5}
                rowGap={5}
                height={"100%"}
                p={5}
                sx={{ border: "1px solid red" }}
              >
                <Typography
                  variant="CategoryName"
                  sx={{
                    color: "#ffffff",
                    textAlign: "center",
                    zIndex: 1,
                  }}
                  textTransform="uppercase"
                >
                  Our work in jashor
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffff",
                    zIndex: 1,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam eum dolorum recusandae molestiae quaerat distinctio
                  corporis modi esse earum quam, cumque optio molestias.
                  Aperiam, quaerat nulla illo ipsa veritatis totam placeat atque
                  ad necessitatibus optio itaque sint recusandae natus cumque.
                </Typography>

                <Button
                  style={{
                    padding: "0",
                    width: {
                      xs: "8rem",
                      xms: "10rem",
                      sm: "15rem",
                      md: "15rem",
                    },
                  }}
                  variant="text"
                  size="large"
                  //   onClick={() =>
                  //     handleSecondBanner(sectionBanner[1]?.back_link)
                  //   }
                >
                  <Typography textTransform={"none"} color="#ffffff">
                    Read More ...
                  </Typography>
                </Button>
              </Stack>
            </Stack>

            <img
              src="/assets/aranya_about.png"
              style={{
                cursor: "pointer",
                objectFit: "cover",
                maxHeight: "941px",
                height: "100%",
              }}
              alt=""
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Community;
