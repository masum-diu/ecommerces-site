import { Stack } from "@mui/material";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const SmallLoader = () => {
  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "center", alignItems: "center", height: "10vh" }}
    >
      <InfinitySpin width="200" color="#ffffff" />
    </Stack>
  );
};

export default SmallLoader;
