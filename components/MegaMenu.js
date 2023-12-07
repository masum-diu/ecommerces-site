import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Drawer,
  Grid,
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
import SubCatDetails from "./SubcatDetails";

const MegaMenu = ({ open, setOpen }) => {
  const [categoryAndSubCatList, setCatAndSubCatList] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  console.log("your log output", hoveredCategory);
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
        open={true}
        onMouseLeave={() => setOpen(false)}
      >
        <Box
          sx={{
            height: { lg: "100%", xs: "fit-content" },
            py: 5,
            width: { lg: "90%", xs: "100%" },
            maxWidth: "1500px",
            margin: "0 auto",
            // border: "1px solid red",
            // height: "40vh",
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
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
          <Stack
            sx={{
              height: "fit-content",
              /* border: "1px solid black", */
              maxWidth: "1500px",
              margin: "0 auto",
            }}
            pb={5}
            direction={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            alignItems={"center"}
            columnGap={5}
            rowGap={1}
          >
            {/* {categoryAndSubCatList.map((category, index) => (
              <Stack key={index}>
                <Typography className={style.menu3}>
                  <li className={style.menu3}>{category?.category_name}</li>
                </Typography>
                <Typography className={style.menu3}>{
                  category.children.map((item)=><li className={style.menu3}>{item?.category_name}</li>)
                }
                  
                </Typography>
                
              </Stack>
            ))} */}
            {categoryAndSubCatList.map((category, index) => (
              <Stack
                key={index}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Typography className={style.menu3}>
                  <li className={style.menu3}>{category?.category_name}</li>
                </Typography>
              </Stack>
            ))}
            {/* <Stack  style={{background:"gray"}}>
                <Typography className={style.menu3}>
                  <li className={style.menu3}>dfgdsfg</li>
                </Typography>
              </Stack><Stack  style={{background:"gray"}}>
                <Typography className={style.menu3}>
                  <li className={style.menu3}>dfgdsfg</li>
                </Typography>
              </Stack>
            <Stack  style={{background:"gray"}}>
                <Typography className={style.menu3}>
                  <li className={style.menu3}>dfgdsfg</li>
                </Typography>
              </Stack><Stack  style={{background:"gray"}}>
                <Typography className={style.menu3}>
                  <li className={style.menu3}>dfgdsfg</li>
                </Typography>
              </Stack> */}
          </Stack>
          <Divider />

          <Stack
            direction={"row"}
            pt={5}
            sx={{
              width: "100%",
              maxWidth: "1021px",
              margin: "0 auto",
              justifyContent: "space-between",
              transition: "background 0.3s ease",
            }}
            spacing={3}
          >
            {/*  */}
            {hoveredCategory ? (
              <Stack
                direction={"row"}
                sx={{
                  width: "100%",
                  transition: "background 0.3s ease",
                  border:"1px solid black"
                }}
                alignItems={"start"}
                justifyContent={"space-between"}
              >
                <Stack sx={{borderRight:"2px solid black",width:"80%"}} direction={"column"} justifyContent={"center"} alignItems={"center"}>
                  <Box sx={{ width: "100%", margin: "0 auto", }}>
                    <Grid container spacing={2}>
                      {hoveredCategory.children.map((item, subIndex) => (
                        <Grid item xs={4} sm={4} key={subIndex}>
                          {" "}
                          <Typography className={style.menu3}>
                            <li className={style.menu3}>
                              {item?.category_name}
                            </li>
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                    <Stack mt={5} item xs={4} sm={4}>
                      {" "}
                      <Typography className={style.menu3} color={"red"}>
                        <li className={style.menu3}>What's New</li>
                      </Typography>
                    </Stack>
                  </Box>
                  <Box style={{ width: "30%" }}>
                    <Stack>
                      <Button variant="outlined" size="large">
                        Shop all {hoveredCategory?.category_name}
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
                {/* <Divider sx={{ bgcolor: "red" }} /> */}
                <Stack sx={{ width: "10%", transition: "width 0.3s ease" }}>
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
            ) : (
              // <SubCatDetails hoveredCategory={hoveredCategory}></SubCatDetails>
              categoryAndSubCatList.slice(0, 3).map((category, index) => (
                <img
                  src={category?.category_image_two}
                  alt=""
                  width={317}
                  height={372}
                  style={{ objectFit: "cover" }}
                />

                // <Typography key={index} className={style.menu3}>
                //   <li className={style.menu3}>{category?.category_name}</li>
                // </Typography>
              ))
            )}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default MegaMenu;
