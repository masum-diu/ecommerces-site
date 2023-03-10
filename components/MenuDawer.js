import {
  Drawer,
  IconButton,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
import Menu1 from "./Menu1";

const MenuDawer = ({
  open,
  setOpen,
  fabrics,
  products,
  setFilteredData,
  setFabricName,
}) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "400px", xs: "300px" },
          },
        }}
      >
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={2}
          justifyContent="flex-end"
        >
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>
        <Stack direction={"column"}>
          <ListItemButton
            sx={{ cursor: "pointer" }}
            onClick={() => setFabricName("all")}
          >
            All Product
          </ListItemButton>
          {fabrics.map((fabric) => (
            <ListItemButton
              sx={{ cursor: "pointer" }}
              onClick={() => setFabricName(fabric?.fabric_name)}
            >{`${fabric?.fabric_name}`}</ListItemButton>
          ))}
          {/* <ListItemButton>
            <Menu1 title={"Cotton Saree"} />
          </ListItemButton>
          <ListItemButton>
            <Menu1 title={"Silk Saree"} />
          </ListItemButton>
          <ListItemButton>
            <Menu1 title={"Nakshikantha Saree"} />
          </ListItemButton>
          <ListItemButton>
            <Menu1 title={"Jamdani Saree"} />
          </ListItemButton> */}
        </Stack>
      </Drawer>
    </>
  );
};

export default MenuDawer;
