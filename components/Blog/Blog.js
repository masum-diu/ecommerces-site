import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import style from "./blog.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
const Blog = ({ url, data, imageURL, width, height }) => {
  const router = useRouter();

  return (
    <div>
      <div className={style.uicard}>
        <Link href={url}>
          <img
            src={imageURL}
            style={{ maxWidth: "100%", height: "auto" }}
            width={width}
            height={height}
          />
        </Link>
        <div className={style.description}>
          <Stack direction={"column"} spacing={1}>
            <Stack
              direction={"row"}
              justifyContent="center"
              className={style.size}
              sx={{background: "black",padding:"1.5rem"}}
            >
              <Typography
                // onClick={() => router.push(url)}
                sx={{color: "#fff" }}
                variant="text"
                // color="secondary"
              >
                Aranya Blog
              </Typography>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Blog;
