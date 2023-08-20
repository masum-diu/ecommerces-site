import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import DivisionMap from "./map";

const Sustainability = () => {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        sx={{
          width: "90%",
          maxWidth: "1500px",
          margin: "0 auto",
          marginTop: "1rem",
        }}
      >
        {/* First component for with text */}
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="login2">Committed To Sustainability</Typography>
          <Typography
            sx={{
              width: { xs: "90%", md: "60%" },
              maxWidth: "1500px",
              margin: "0 auto",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Aranya is a member of WFTO and World Craft Council and is committed
            to ensuring that the supply chain is up to international trade
            standards
          </Typography>
        </Stack>

        {/* Second component icons */}
        <Stack
          pt={10}
          direction="row"
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <img
            style={{ width: "10%", height: "fit-content" }}
            src="../assets/recycle.png"
            alt=""
          />
          <img
            style={{ width: "10%", height: "fit-content" }}
            src="../assets/carbon-neutral.png"
            alt=""
          />
          <img
            style={{ width: "10%", height: "fit-content" }}
            src="../assets/handshake.png"
            alt=""
          />
        </Stack>
        {/* Third component for image text */}
        <Stack
          pt={10}
          direction={{ sm: "column", md: "column", lg: "row" }}
          justifyContent={"space-around"}
        >
          <Stack
            alignItems={{
              xs: "center",
              xms: "center",
              sm: "center",
              md: "flex-start",
            }}
            width={{ sm: "100%", md: "100%", lg: "45%" }}
          >
            <img
              style={{ width: "80%", height: "fit-content" }}
              src="../assets/tfdd.png"
              alt=""
            />
          </Stack>
          <Stack
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              xms: "center",
              sm: "center",
              md: "flex-end",
            }}
            width={{ sm: "100%", md: "100%", lg: "45%" }}
            textAlign={"left"}
          >
            <Stack>
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                voluptates suscipit modi nesciunt enim, necessitatibus assumenda
                repellendus! Maxime, ea cupiditate?
              </Typography>
              <Typography>Lorem.</Typography>
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                voluptates suscipit modi nesciunt enim, necessitatibus assumenda
                repellendus! Maxime, ea cupiditate?
              </Typography>
              <Typography>Lorem.</Typography>
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                voluptates suscipit modi nesciunt enim, necessitatibus assumenda
                repellendus! Maxime, ea cupiditate?
              </Typography>
              <Typography>Lorem.</Typography>
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                voluptates suscipit modi nesciunt enim, necessitatibus assumenda
                repellendus! Maxime, ea cupiditate?
              </Typography>
              <Typography>Lorem.</Typography>
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                voluptates suscipit modi nesciunt enim, necessitatibus assumenda
                repellendus! Maxime, ea cupiditate?
              </Typography>
              <Typography>Lorem.</Typography>
              <Typography>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
                voluptates suscipit modi nesciunt enim, necessitatibus assumenda
                repellendus! Maxime, ea cupiditate?
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Fourth component text image */}
        <Stack
          pt={10}
          direction={{
            xs: "column-reverse",
            xms: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Stack
            justifyContent={"center"}
            width={{ sm: "100%", md: "100%", lg: "45%" }}
          >
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates suscipit modi nesciunt enim, necessitatibus assumenda
              repellendus! Maxime, ea cupiditate?
            </Typography>
            <Typography>Lorem.</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates suscipit modi nesciunt enim, necessitatibus assumenda
              repellendus! Maxime, ea cupiditate?
            </Typography>
            <Typography>Lorem.</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates suscipit modi nesciunt enim, necessitatibus assumenda
              repellendus! Maxime, ea cupiditate?
            </Typography>
            <Typography>Lorem.</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates suscipit modi nesciunt enim, necessitatibus assumenda
              repellendus! Maxime, ea cupiditate?
            </Typography>
            <Typography>Lorem.</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates suscipit modi nesciunt enim, necessitatibus assumenda
              repellendus! Maxime, ea cupiditate?
            </Typography>
            <Typography>Lorem.</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates suscipit modi nesciunt enim, necessitatibus assumenda
              repellendus! Maxime, ea cupiditate?
            </Typography>
          </Stack>
          <Stack
            alignItems={{
              xs: "center",
              xms: "center",
              sm: "center",
              md: "flex-end",
            }}
            width={{ sm: "100%", md: "100%", lg: "45%" }}
          >
            <img
              style={{ width: "80%", height: "fit-content" }}
              src="../assets/jf.png"
              alt=""
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          margin: "0 auto",
          marginTop: "1rem",
        }}
      >
        {/* Fifth component map and image */}
        <Stack
          pt={10}
          width={"100%"}
          direction={{ sm: "column", md: "row", lg: "row" }}
          justifyContent={"space-between"}
        >
          <DivisionMap></DivisionMap>
          <Stack
            alignItems={{
              xs: "center",
              xms: "center",
              sm: "center",
              md: "flex-end",
            }}
            width={{ sm: "100%", md: "100%", lg: "45%" }}
            sx={{ position: "relative" }}
          >
            <img
              style={{ width: "100%", height: "fit-content" }}
              src="../assets/ss.png"
              alt=""
            />
            <Typography
              variant="header1"
              sx={{
                position: "absolute",
                top: "10%",
                left: "15%",
                color: "white!important",
              }}
            >
              Where We Work
            </Typography>
          </Stack>
        </Stack>
        {/* Sixth component color image */}
        <Stack sx={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "fit-content" }}
            src="../assets/bit.png"
            alt=""
          />
          <Stack
            sx={{
              position: "absolute",
              bottom: "5%",
              left: { xs: "25%", xms: "30%", sm: "37%", md: "41%", lg: "45%" },
            }}
          >
            <Button sx={{ color: "white!important" }} size="small">
              Read Our Color Stories
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default Sustainability;
