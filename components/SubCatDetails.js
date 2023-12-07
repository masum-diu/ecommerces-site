import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import style from "../public/assets/css/HomePageIntro.module.css";

const SubCatDetails = ({ hoveredCategory }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        background: "red",
        transition: "background 0.3s ease",
      }}
      alignItems={"start"}
    >
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        sx={{
          width: "70%",
          columnGap: 4,
          rowGap: 3,
          columnCount: 2,
          transition: "width 0.3s ease",
        }}
      >
        {hoveredCategory.children.map((item, subIndex) => (
          <Stack direction={"row"} flexWrap={"wrap"}>
            {" "}
            <Typography key={subIndex} className={style.menu3}>
             sdfs <li className={style.menu3}>{item?.category_name}</li>
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ bgcolor: "red" }} />
      <Stack sx={{ width: "30%", transition: "width 0.3s ease" }}>
        {" "}
        <img
          src={hoveredCategory?.category_image_two}
          alt=""
          width={317}
          height={372}
          style={{ objectFit: "cover" }}
        />
      </Stack>
    </Stack>
  );
};

export default SubCatDetails;
