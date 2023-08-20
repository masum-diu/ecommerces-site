import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import {
  customStyleForSquareBtn,
  customStyleForTextBtn,
} from "./customDesighForButtons";
import { useRouter } from "next/router";

const DrawerInner = () => {
  const router = useRouter();
  return (
    <Stack
      sx={{
        backgroundImage:
          "linear-gradient(to bottom, rgb(167 167 167 / 69%), rgb(0 0 0 / 78%)),url('https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678608771/aranya-product/boishakh/ZS002030.jpg')",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        padding: "2rem",
      }}
    >
      <Stack direction={"column"}>
        <Typography
          sx={{ color: "white!important" }}
          variant="header1"
          mb={5}
          textTransform={"uppercase"}
        >
          Our Work in jessore
        </Typography>
        <Typography sx={{ color: "white!important" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quia
          odit, repellat dignissimos officia nihil aperiam impedit dolore ex
          dolor nesciunt sit enim eaque expedita numquam delectus, atque
          reiciendis quo!
        </Typography>
        <Button
          sx={customStyleForTextBtn}
          size="medium"
          onClick={() =>
            router.push(
              {
                pathname: `/story/jessore`,
                /* query: {
                  data: JSON.stringify({
                    cat: sub_cat?.parent_category,
                    sub_cat: sub_cat?.id,
                  }),
                  cat: sub_cat?.parent_category,
                  sub_cat: sub_cat?.id,
                }, */
              },
              `/story/jessore`
            )
          }
        >
          Read more
        </Button>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Button sx={customStyleForSquareBtn} size="large" variant="contained">
            What We Do
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DrawerInner;
