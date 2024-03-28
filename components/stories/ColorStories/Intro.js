import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  Hidden,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Intro = () => {
  return (
    <Grid
      container
      // mt={5}
      mb={5}
      justifyContent={{xs:"center",md:"space-between"}}
      alignItems={"flex-start"}
    >
      <Hidden only={["xs", "xms", "sm"]}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
          pb={5}
        >
          <Stack sx={{ maxWidth: { xs: "100%", md: "143px" }, width: "100%" }}>
            <img
              style={{ objectFit: "cover" }}
              src="/assets/color_intro-svg.svg"
              alt=""
            />
          </Stack>
        </Grid>
      </Hidden>

      {/* Info Section */}
      <Grid item xs={10} md={5} xl={6}>
        <Stack sx={{ maxWidth: { xs: "100%", md: "609px" }, width: "100%" }}>
          <img
            style={{ objectFit: "cover" }}
            src="/assets/community_first.png"
            alt=""
          />
        </Stack>
      </Grid>

      {/* Send Mail Form Section */}
      <Grid item xs={10} md={5} xl={6}>
        <Stack direction={"column"} spacing={5}>
          <Hidden only={["lmd", "md", "lg", "xl"]}>
            <Stack direction={"row"} justifyContent={"flex-end"}>
              <Stack
                sx={{
                  maxWidth: "143px",
                  width: "100%",
                }}
                mt={10}
              >
                <img
                  style={{ objectFit: "cover" }}
                  src="/assets/color_intro-svg.svg"
                  alt=""
                />
              </Stack>
            </Stack>
          </Hidden>
          <Stack>
            <Typography variant="login1" color={"#1B3148"} className="bold">
              Indigo (Indigofera Tinctoria)
            </Typography>
          </Stack>
          <Stack>
            <Typography color={"#1B3148"} className="SemiBold">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              tenetur optio vero a cupiditate alias dolorum nulla error nobis
              rerum, adipisci repellendus eius rem molestias tempora sunt
              accusamus nisi soluta molestiae corporis qui officiis quisquam
              eos! Dolore, ex! Suscipit, beatae?Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis, adipisci obcaecati. Facilis
              quae fugiat cum dignissimos sint, quidem accusantium laudantium?
            </Typography>
          </Stack>
          <Stack direction={"column"}>
            <Stack className="bold" color={"#1B3148"}>
              Mission
            </Stack>
            <Stack className="SemiBold" color={"#1B3148"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum vero
              adipisci ipsam et nisi. Blanditiis facere in voluptate
              dignissimos, nisi modi, praesentium temporibus repellendus dolorum
              asperiores eligendi facilis quam inventore!
            </Stack>
          </Stack>
          <Stack direction={"column"}>
            <Stack className="bold" color={"#1B3148"}>
              Vision
            </Stack>
            <Stack className="SemiBold" color={"#1B3148"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum vero
              adipisci ipsam et nisi. Blanditiis facere in voluptate
              dignissimos, nisi modi, praesentium temporibus repellendus dolorum
              asperiores eligendi facilis quam inventore!
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Intro;