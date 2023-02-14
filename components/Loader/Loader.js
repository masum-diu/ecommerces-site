import { Stack } from "@mui/system";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <InfinitySpin width="200" color="#3C5676" />
    </Stack>
  );
};

export default Loader;
