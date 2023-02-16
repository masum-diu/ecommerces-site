import { Typography } from "@mui/material";
import React from "react";
import style from "./HovarImage.module.css";

const HovarImage = ({ imageURL, width, height }) => {
  return (
    <div>
      <div class={style.uicard}>
        <img
          src={imageURL}
          style={{ maxWidth: "100%", height: "fit-content" }}
          width={width}
          height={height}
        />
        <div class={style.description}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod.
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default HovarImage;
