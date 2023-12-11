import { Stack, Typography } from "@mui/material";
import React from "react";

const CategoryImg = ({ hoveredCategory }) => {
  return (
    <Stack
      style={{
        backgroundImage: `url(${hoveredCategory?.category_image_two})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      sx={{
        maxWidth: { xs: "100%", sm: "281px" },
        width: { xs: "100%", sm: "45%", md: "35%", lg: "30%", xl: "25%" },
        height: "300px",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      pb={2}
    >
      <Typography
        variant="CategoryName"
        sx={{
          color: "white",
        }}
      >
        {hoveredCategory?.category_name}
      </Typography>
    </Stack>
  );
};

export default CategoryImg;
