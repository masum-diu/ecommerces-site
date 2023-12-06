import {
  AppBar,
  Box,
  ClickAwayListener,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import instance from "../pages/api/api_instance";
import {
  useGetCategoryAndSubCatListQuery,
  useGetSearchResultQuery,
} from "../src/features/api/apiSlice";
import Loader from "./Loader/Loader";
import style from "../public/assets/css/HomePageIntro.module.css";

const MegaMenu = ({ open, setOpen }) => {
  const [categoryAndSubCatList, setCatAndSubCatList] = useState([]);

  const {
    data: catAndSubCatList,
    isLoading: isListLoading,
    isError: isCatError,
    isSuccess: isCatSuccess,
    error: catError,
  } = useGetCategoryAndSubCatListQuery();
  useEffect(() => {
    if (catAndSubCatList && isCatSuccess) {
      setCatAndSubCatList(catAndSubCatList);
    }
  }, [catAndSubCatList, isCatSuccess]);

  if (isListLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      {/*  */}
      <Drawer
        transitionDuration={{ enter: 500, exit: 500 }}
        anchor="top"
        open={open}
        onMouseLeave={() => setOpen(false)}
      >
        <Box
          sx={{
            height: { lg: "100%", xs: "fit-content" },
            py: 15,
            width: { lg: "90%", xs: "100%" },
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          {/* <Stack
            direction={"row"}
            flexWrap={"wrap"}
            columnGap={1.5}
            rowGap={1.5}
            justifyContent="center"
            // alignItems={"center"}
            alignItems={"center"}
          >
            <Typography style={{ background: "red" }}>sdasd</Typography>
          </Stack> */}
          <Stack>
            {categoryAndSubCatList.map((category, index) => (
              <Typography key={index} className={style.menu3}>
                <li className={style.menu3}>{category?.category_name}</li>
              </Typography>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default MegaMenu;
