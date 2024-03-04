import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Intro = () => {
  return (
    <Grid
      container
      px={1}
      sx={{ maxWidth: "1500px", width: "100%" }}
      mt={5}
      mb={5}
      mx={"auto"}
      justifyContent={"space-around"}
      alignItems={"flex-start"}
    >
      {/* Info Section */}
      <Grid item xs={10} md={5}>
        <Stack>
          <img
            style={{ maxWidth: "665px", width: "100%" }}
            src="/assets/sustain_top_img.png"
            alt=""
          />
        </Stack>
      </Grid>

      {/* Send Mail Form Section */}
      <Grid item xs={10} md={5}>
        <Stack direction={"column"} alignItems={"center"} spacing={5}>
          <Stack>
            <Typography variant="login1" color="#1B3148" className="bold">
              Fair Trade
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
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Intro;
