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
  useMediaQuery,
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
import { useRouter } from "next/router";
import CategoryImg from "./CategoryImg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useTheme } from "@emotion/react";

const MegaMenu = ({ open, setOpen }) => {
  const [categoryAndSubCatList, setCatAndSubCatList] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [slidesPerView, setSlidePreview] = useState(0);
  const theme = useTheme();
  const router = useRouter();
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

  // Setting SlidePreview
  const isExtraSmallerScreen = useMediaQuery(theme.breakpoints.down("xms"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    if (isExtraSmallerScreen) {
      setSlidePreview(1);
    } else if (isSmallerScreen) {
      setSlidePreview(1);
    } else if (isMediumScreen) {
      setSlidePreview(1);
    } else if (isLargeScreen) {
      setSlidePreview(2);
    } else if (isExtraLargeScreen) {
      setSlidePreview(3);
    } else {
      setSlidePreview(3);
    }
  }, [
    isExtraSmallerScreen,
    isSmallerScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  ]);

  const handleMouseLeaveOperation = () => {
    setHoveredCategory(null);
    setOpen(false);
  };

  const handleRedirectSubCat = (sub_cat) => {
    setOpen(false);
    router.push(
      {
        pathname: `/products/${sub_cat?.slug}`,
        query: {
          data: JSON.stringify({
            cat: sub_cat?.parent_category,
            sub_cat: sub_cat?.id,
          }),
          cat: sub_cat?.parent_category,
          sub_cat: sub_cat?.id,
        },
      },
      `/products/${sub_cat?.slug}?cat=${sub_cat?.parent_category}${
        sub_cat?.id ? `&sub_cat=${sub_cat?.id}` : ""
      }`
    );
  };
  const handleRedirectCat = (category) => {
    setOpen(false);
    const targetUrl = `/products?cat_name=${category?.slug}&cat=${category?.id}`;
    if (router.asPath !== targetUrl) {
      router.push(
        {
          pathname: `/products?cat_name=${category?.slug}&cat=${category?.id}`,
          query: {
            data: JSON.stringify({
              cat: category?.parent_category,
              category: category?.id,
            }),
            cat: category?.parent_category,
            category: category?.id,
          },
        },
        `/products?cat_name=${category?.slug}&cat=${category?.id}`,
        { replace: true }
      );
    }
  };

  if (isListLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <Drawer
        className="shop"
        transitionDuration={{ enter: 900, exit: 900 }}
        anchor="top"
        open={open}
        // open={true}
        onMouseLeave={() => handleMouseLeaveOperation()}
      >
        <Box
          sx={{
            height: { lg: "100%", xs: "fit-content" },
            py: 5,
            width: { lg: "90%", xs: "90%" },
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
            {categoryAndSubCatList.map((category, index) => (
              <Stack
                key={index}
                onMouseEnter={() => setHoveredCategory(category)}
              >
                <Typography
                  sx={{ color: "#1B3148" }}
                  className={style.menu3}
                  onClick={() => handleRedirectCat(category)}
                >
                  <li className={style.menu3}>{category?.category_name}</li>
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Divider />

          <Stack
            direction={"row"}
            pt={5}
            sx={{
              width: "100%",
              maxWidth: "1001px",
              margin: "0 auto",
              justifyContent: "space-between",
              transition: "background 0.3s ease",
            }}
            pb={10}
            spacing={3}
          >
            {/*  */}
            {hoveredCategory ? (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  width: "100%",
                  transition: "background 0.3s ease",
                  height: "300px",
                  transition: "2s ease-in-out ",
                }}
                rowGap={{ xs: 15, sm: 0 }}
                alignItems={{ xs: "center", sm: "start" }}
                justifyContent={"space-between"}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Stack
                  sx={{
                    borderRight: { sm: "2px solid black" },
                    width: { xs: "100%", sm: "50%", lg: "60%" },
                    height: "100%",
                    transition: "2s ease-in-out ",
                  }}
                  direction={"column"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Box sx={{ width: "100%", margin: "0 auto" }}>
                    <Grid container spacing={2}>
                      {hoveredCategory?.children?.map((sub_cat, subIndex) => (
                        <Grid item xs={6} md={4} key={subIndex} width={"100px"}>
                          <Stack
                            sx={{
                              width: { sm: "100%", md: "100%", lg: "60%" },
                            }}
                            onClick={() => handleRedirectSubCat(sub_cat)}
                          >
                            <Typography color="#476181" className={style.menu3}>
                              <li className={style.menu3}>
                                {sub_cat?.category_name}
                              </li>
                            </Typography>
                          </Stack>{" "}
                        </Grid>
                      ))}
                    </Grid>
                    <Stack
                      mt={5}
                      item
                      xs={4}
                      sm={4}
                      sx={{ width: { md: "30%", lg: "20%", xl: "15%" } }}
                    >
                      {" "}
                      <Typography className={style.menu3} color={"red"}>
                        <li className={style.menu3}>What's New</li>
                      </Typography>
                    </Stack>
                  </Box>
                  <Box
                    style={{ width: { xs: "100%", sm: "100%", md: "100%" } }}
                    pt={5}
                  >
                    <Stack>
                      <Button
                        sx={{ color: "#3C5676", border: "1px solid #3C5676" }}
                        variant="outlined"
                        size="large"
                      >
                        Shop all {hoveredCategory?.category_name}
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
                {/* <Divider sx={{ bgcolor: "red" }} /> */}
                {/* <Stack sx={{ width: "25%", transition: "width 0.3s ease" }}>
                  {" "}
                  <img
                    src={hoveredCategory?.category_image_two}
                    alt=""
                    width={"100%"}
                    height={372}
                    style={{ objectFit: "cover" }}
                  />
                </Stack> */}
                <CategoryImg hoveredCategory={hoveredCategory}></CategoryImg>
              </Stack>
            ) : (
              <Swiper
                spaceBetween={20}
                slidesPerView={slidesPerView}
                modules={[Pagination]}
                className="mySwiper"
              >
                {categoryAndSubCatList?.map((category, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ maxWidth: "281px", width: "100%" }}
                  >
                    <Stack
                      style={{
                        backgroundImage: `url(${
                          category?.category_image_two
                            ? category?.category_image_two
                            : "https://res.cloudinary.com/diyc1dizi/image/upload/aranya-product/boishakh/ZS001299.jpg"
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      sx={{
                        /* maxWidth: { xs: "100%", sm: "281px" },
                        width: {
                          xs: "100%",
                          sm: "45%",
                          md: "35%",
                          lg: "30%",
                          xl: "100%",
                        }, */
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
                          textAlign: "center",
                        }}
                      >
                        {category?.category_name}
                      </Typography>
                    </Stack>
                    {/* <CategoryImg
                      key={index}
                      hoveredCategory={category}
                    ></CategoryImg> */}
                  </SwiperSlide>

                  //  <img
                  //   src={category?.category_image_two}
                  //   alt=""
                  //   width={317}
                  //   height={372}
                  //   style={{
                  //     objectFit: "cover",
                  //     transition: "background 0.3s ease",
                  //   }}
                  // />

                  // <Typography key={index} className={style.menu3}>
                  //   <li className={style.menu3}>{category?.category_name}</li>
                  // </Typography>
                ))}
              </Swiper>
              // <SubCatDetails hoveredCategory={hoveredCategory}></SubCatDetails>
            )}
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};

export default MegaMenu;
