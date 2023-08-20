import React from "react";
import DrawerInner from "./DrawerInner";
import { Drawer } from "@mui/material";

const DrawerForMap = ({ open, setOpen }) => {
  return (
    <Drawer
      transitionDuration={{ enter: 500, exit: 500 }}
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          width: "100vw",
          maxWidth: { lg: "47%", xs: "90%" },
        },
      }}
    >
      <DrawerInner></DrawerInner>
    </Drawer>
  );
};

export default DrawerForMap;
