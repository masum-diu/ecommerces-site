import React, { useState } from "react";
import Button from "@mui/material/Button";
import style from "./map.module.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import DrawerForMap from "./Drawer/DrawerForMap";

const DivisionMap = () => {
  const [selectedMenu, setSelectedMenu] = useState("Sustainability");
  const [open, setOpen] = useState(false);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        width={{ sm: "100%", md: "100%", lg: "45%" }}
        className={style.map_container}
      >
        <img
          style={{ width: "60%", height: "fit-content" }}
          src="../assets/Group.png"
          alt="Bangladesh Map"
        />
        <Stack className={style.division_buttons}>
          <FmdGoodIcon
            onClick={() => setOpen(true)}
            className={style.division_button}
            data-division="division1"
            variant="primary"
          ></FmdGoodIcon>
          <FmdGoodIcon
            onClick={() => setOpen(true)}
            className={style.division_button}
            data-division="division2"
          ></FmdGoodIcon>
          {/* Add more buttons for other divisions */}
        </Stack>
      </Stack>
      <DrawerForMap open={open} setOpen={setOpen}></DrawerForMap>
    </>
  );
};

export default DivisionMap;
