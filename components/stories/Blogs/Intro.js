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
      // mt={5}
      mb={5}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems={"flex-start"}
    >
      {/* <Grid
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
      </Grid> */}
      <Grid item xs={12} mb={10}>
        <Stack>
          <Typography
            textAlign={"center"}
            variant="productName"
            color="#1B3148"
            className="bold"
          >
            Blog
          </Typography>
        </Stack>
      </Grid>
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
          <Stack>
            <Typography
              variant="productName"
              color={"#1B3148"}
              className="bold"
            >
              Indigo (Indigofera Tinctoria)
            </Typography>
          </Stack>
          <Stack>
            <Typography
              variant={"homeFlash"}
              color={"#1B3148"}
              className="SemiBold"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              tenetur optio vero a cupiditate alias dolorum nulla error nobis
              rerum, adipisci repellendus eius rem molestias tempora sunt
              accusamus nisi soluta molestiae corporis qui officiis quisquam
              eos! Dolore, ex! Suscipit, beatae?Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis, adipisci obcaecati. Facilis
              quae fugiat cum dignissimos sint, quidem accusantium laudantium?
              <br />
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
      <Grid item xs={12} mt={10}>
        <Stack direction={"column"} spacing={5}>
          <Stack>
            <Typography
              variant={"homeFlash"}
              color={"#1B3148"}
              className="SemiBold"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              tenetur optio vero a cupiditate alias dolorum nulla error nobis
              rerum, adipisci repellendus eius rem molestias tempora sunt
              accusamus nisi soluta molestiae corporis qui officiis quisquam
              eos! Dolore, ex! Suscipit, beatae?Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis, adipisci obcaecati. Facilis
              quae fugiat cum dignissimos sint, quidem accusantium laudantium?
              <br />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              tenetur optio vero a cupiditate alias dolorum nulla error nobis
              rerum, adipisci repellendus eius rem molestias tempora sunt
              accusamus nisi soluta molestiae corporis qui officiis quisquam
              eos! Dolore, ex! Suscipit, beatae?Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis, adipisci obcaecati. Facilis
              quae fugiat cum dignissimos sint, quidem accusantium laudantium?
            </Typography>
            <Typography variant={"homeFlash"} className="SemiBold">
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate architecto explicabo corporis dolor asperiores sed
                  commodi quasi exercitationem dicta consequuntur.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate architecto explicabo corporis dolor asperiores sed
                  commodi quasi exercitationem dicta consequuntur.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate architecto explicabo corporis dolor asperiores sed
                  commodi quasi exercitationem dicta consequuntur.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate architecto explicabo corporis dolor asperiores sed
                  commodi quasi exercitationem dicta consequuntur.
                </li>
              </ul>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Intro;
