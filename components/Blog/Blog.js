import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import style from "./blog.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
const Blog = ({ url, data, imageURL, width, height }) => {
  const router = useRouter();

  return (
    <Box>
      <Stack>
        <Link href={"/"}>
          <img
            src={imageURL}
            style={{ maxWidth: "100%", height: "auto" }}
            // width={width}
            // height={height}
          />
        </Link>
        <Stack>
          <Stack direction={"column"}>
            <Stack
              direction={"row"}
              justifyContent="center"
              sx={{ background: "#1B3148", padding: "1.5rem" }}
            >
              <Typography
                // onClick={() => router.push(url)}
                sx={{ color: "#fff" }}
                variant="text"
                className="SemiBold"
                c
              >
                Lorem ipsum dolor sit.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Blog;
