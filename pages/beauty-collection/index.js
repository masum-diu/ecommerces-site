import {
    Box,
    Grid,
    Hidden,
    IconButton,
    ImageListItem,
    Stack,
    Typography,
  } from "@mui/material";
  import Image from "next/image";
  import React, { useEffect } from "react";
  import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
  } from "react-icons/md";
  import { useRouter } from "next/router";
  import SegmentIcon from "@mui/icons-material/Segment";
  import SortIcon from "@mui/icons-material/Sort";
  import { useState } from "react";
  import HomePageIntro from "../../components/HomePageIntro";
  import Menu1 from "../../components/Menu1";
  import Menu from "../../components/Menu";
  import Footer from "../../components/Footer";
  import MenuDawer from "../../components/MenuDawer";
  import Menu1Dawer from "../../components/Menu1Dawer";
  import Link from "next/link";
  import {
    useGetCategoryAndSubWiseProductsQuery,
    useGetProductsQuery,
    useGetSubWiseProductsQuery,
    useGetCategoryWiseProductsQuery,
  } from "../../src/features/api/apiSlice";
  import Loader from "../../components/Loader/Loader";
  import HovarImage from "../../components/HovarableImage/HovarImage";
  const masterCollectionLayout = () => {
    const router = useRouter();
    const path = router.pathname.replace('/','').charAt(0).toUpperCase() + router.pathname.replace('/','').slice(1);
    // console.log("sdsdf", router);
    const [lists, setLists] = useState(false);
    const [lists1, setLists1] = useState(false);
    const [products, setProducts] = useState([]);
    const [staticData, setStaticData] = useState([]);
    const cat = router.query.cat;
    const sub_cat = parseInt(router?.query?.sub_cat);
    const { data, isLoading, isSuccess, isError, error } =
      useGetCategoryWiseProductsQuery(cat);
    const {
      data: staticDatas,
      isLoading: loading,
      isSuccess: success,
      isError: errorstate,
      error: errormessage,
    } = useGetSubWiseProductsQuery(cat);
  
    useEffect(() => {
      if (isSuccess) {
        const handleSuccess = async () => {
          await setProducts(data?.data);
        };
        handleSuccess();
      }
    }, [data, isSuccess, isLoading]);
    useEffect(() => {
      if (success) {
        const handleSuccess = async () => {
          await setStaticData(staticDatas?.data);
        };
        handleSuccess();
      }
    }, [staticDatas, loading, success]);
  
    if (isLoading || loading) {
      return <Loader></Loader>;
    }
  
    // const products = data?.data;
    // console.log("from shopsdfs", products);
    // console.log("from shop", sub_cat);
  
    return (
      <>
        <HomePageIntro title={"Saree "} />
        <Box mt={10} mb={4}>
          <Stack direction={"row"} alignItems="center">
            <img
              src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_700,w_1920/v1676527368/aranya/${staticData?.cat_img_one?.substring(
                staticData?.cat_img_one?.lastIndexOf("/") + 1
              )}`}
              width={1900}
              style={{ width: "100%", height: "fit-content" }}
              height={700}
            />
          </Stack>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center", py: 4 }}
          >
            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Typography
                variant="cardHeader2"
                color="initial"
                sx={{ cursor: "pointer" }}
                onClick={() => router.push("/")}
              >
                Home
              </Typography>
              <MdOutlineKeyboardArrowRight />
              <Typography
                variant="cardHeader2"
                sx={{ cursor: "pointer" }}
                color="initial"
              >
                {path}
              </Typography>
            </Stack>
            <Typography variant="cardHeader1" color="initial">
              WOMEN SHIRT COLLECTION
            </Typography>
          </Stack>
  
          <Stack
            direction={"row"}
            sx={{
              width: "95%",
              maxWidth: "1500px",
              margin: "0 auto",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => setLists(true)}>
              <Hidden only={["xl", "lg"]}>
                <SortIcon />
              </Hidden>
            </IconButton>
            <IconButton onClick={() => setLists1(true)}>
              <Hidden only={["xl", "lg"]}>
                <SegmentIcon />
              </Hidden>
            </IconButton>
          </Stack>
  
          <Box sx={{ backgroundColor: "#FAFAFA" }}>
            <Hidden only={["xs", "xms", "sm"]}>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  width: "100%",
                  maxWidth: "1500px",
                  margin: "0 auto",
                  height: "61px",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction={"row"} spacing={4}>
                  <Menu1 title={"Cotton Saree"} />
                  <Menu1 title={"Silk Saree"} />
                  <Menu1 title={"Nakshikantha Saree"} />
                  <Menu1 title={"Jamdani Saree"} />
                </Stack>
                <Stack direction={"row"} spacing={4}>
                  <Menu title={"Category"} />
                  <Menu title={"Color"} />
                  <Menu title={"Fabric"} />
                  <Menu title={"Price"} />
                  <Menu title={"Size"} />
                </Stack>
              </Stack>
            </Hidden>
          </Box>
  
          <Stack
            direction={"column"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 1, lg: 2 },
            }}
          >
            {products?.slice(0, 1).map((dataList) => (
              <>
                <HovarImage
                  url={`/${router.pathname}/${dataList?.id}`}
                  data={dataList}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_565,w_586/c_fit,h_565,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
                    dataList?.feature_image?.lastIndexOf("/") + 1
                  )}`}
                  width={568}
                  height={827}
                ></HovarImage>
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    maxWidth: "565px",
                    mt: 2,
                  }}
                >
                  <Typography variant="cardHeader3" color="initial">
                    {dataList?.p_name}
                  </Typography>
                  <Typography variant="cardHeader3" color="initial">
                    BDT {dataList?.p_sale_price}
                  </Typography>
                </Stack>
              </>
            ))}
          </Stack>
  
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{
              width: "90%",
              maxWidth: "1500px",
              margin: "0 auto",
              marginTop: "3rem",
            }}
          >
            {products?.slice(1, 4).map((dataList) => (
              <>
                <Grid item lg={4} sm={6} key={dataList?.id}>
                  {/* <img
                        src={dataList?.feature_image}
                        width={568}
                        height={827}
                        style={{ maxWidth: "100%", height: "fit-content" }}
                      /> */}
                  <HovarImage
                    url={`/${router.pathname}/${dataList?.id}`}
                    data={dataList}
                    imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_855,w_586/c_fit,h_855,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
                      dataList?.feature_image?.lastIndexOf("/") + 1
                    )}`}
                    width={568}
                    height={827}
                  ></HovarImage>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="cardHeader3" color="initial">
                      {dataList?.p_name}
                    </Typography>
                    <Typography variant="cardHeader3" color="initial">
                      BDT {dataList?.p_sale_price}
                    </Typography>
                  </Stack>
                </Grid>
              </>
            ))}
          </Grid>
          <Stack direction={"row"} sx={{ width: "100%" }} mt={4}>
            <img
              src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_828,w_720/v1676527368/aranya/${staticData?.cat_img_one?.substring(
                staticData?.cat_img_two?.lastIndexOf("/") + 1
              )}`}
              alt=""
              width={"50%"}
            />
            <img
              src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_828,w_720/v1676527368/aranya/${staticData?.cat_img_one?.substring(
                staticData?.cat_img_three?.lastIndexOf("/") + 1
              )}`}
              alt=""
              width={"50%"}
            />
          </Stack>
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{
              width: "90%",
              maxWidth: "1500px",
              margin: "0 auto",
              marginTop: "3rem",
            }}
          >
            {products?.slice(2, 5).map((dataList) => (
              <>
                <Grid
                  item
                  lg={4}
                  sm={6}
                  justifyContent="center"
                  key={dataList?.id}
                >
                  <HovarImage
                    url={`/${router.pathname}/${dataList?.id}`}
                    data={dataList}
                    imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_855,w_586/c_fit,h_855,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
                      dataList?.feature_image?.lastIndexOf("/") + 1
                    )}`}
                    width={568}
                    height={827}
                  ></HovarImage>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="cardHeader3" color="initial">
                      {dataList?.p_name}
                    </Typography>
                    <Typography variant="cardHeader3" color="initial">
                      BDT {dataList?.p_sale_price}
                    </Typography>
                  </Stack>
                </Grid>
              </>
            ))}
          </Grid>
          <Stack
            direction={"column"}
            sx={{ justifyContent: "center", alignItems: "center", mt: 5 }}
          >
            {products?.slice(1, 2).map((dataList) => (
              <>
                <HovarImage
                  url={`/${router.pathname}/${dataList?.id}`}
                  data={dataList}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_565,w_586/c_fit,h_565,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
                    dataList?.feature_image?.lastIndexOf("/") + 1
                  )}`}
                  width={568}
                  height={827}
                ></HovarImage>
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    maxWidth: "565px",
                    mt: 2,
                  }}
                >
                  <Typography variant="cardHeader3" color="initial">
                    {dataList?.p_name}
                  </Typography>
                  <Typography variant="cardHeader3" color="initial">
                    BDT {dataList?.p_sale_price}
                  </Typography>
                </Stack>
              </>
            ))}
          </Stack>
        </Box>
        <Footer />
        <MenuDawer open={lists} setOpen={setLists} />
        <Menu1Dawer open={lists1} setOpen={setLists1} />
      </>
    );
  };
  
  export default masterCollectionLayout;
  