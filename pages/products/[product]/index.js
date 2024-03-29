import {
  Box,
  Button,
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
import HomePageIntro from "../../../components/HomePageIntro";
import Menu1 from "../../../components/Menu1";
import Menu from "../../../components/Menu";
import Footer from "../../../components/Footer";
import MenuDawer from "../../../components/MenuDawer";
import Menu1Dawer from "../../../components/Menu1Dawer";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  useGetAttributesOfProductsQuery,
  useGetCategoryAndSubWiseProductsQuery,
  useGetCategoryWiseProductsQuery,
  useGetSubWiseProductsQuery,
} from "../../../src/features/api/apiSlice";
import Loader from "../../../components/Loader/Loader";
import HovarImage from "../../../components/HovarableImage/HovarImage";
const masterCollectionLayout = () => {
  const router = useRouter();
  const path =
    router.pathname.replace("/", "").charAt(0).toUpperCase() +
    router.pathname.replace("/", "").slice(1);
  const currentPath =
    router?.query?.product?.charAt(0).toUpperCase() +
    router?.query?.product?.slice(1);
  const productName = router?.query?.product?.toUpperCase();

  const dispatch = useDispatch();
  const [lists, setLists] = useState(false);
  const [lists1, setLists1] = useState(false);
  const [products, setProducts] = useState([]);
  const [staticData, setStaticData] = useState([]);
  const [fabrics, setFabric] = useState([]);
  const [fabricName, setFabricName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const cat = router?.query?.cat;
  const sub_cat = router?.query?.sub_cat;

  // Getting product data with subCategory
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoryAndSubWiseProductsQuery(
      { cat, sub_cat },
      { refetchOnMountOrArgChange: true }
    );

  // Getting product data with only category
  const {
    data: catetoryData,
    isLoading: categoryLoading,
    isSuccess: categoryisSuccess,
  } = useGetCategoryWiseProductsQuery(cat);

  // Getting static data with subCategory
  const {
    data: staticDatas,
    isLoading: loading,
    isSuccess: success,
    isError: errorstate,
    error: errormessage,
  } = useGetSubWiseProductsQuery(sub_cat, { refetchOnMountOrArgChange: true });

  // Getting static data with Category
  const {
    data: staticDatasCat,
    isLoading: loadingCat,
    isSuccess: successCat,
    isError: errorstateCat,
    error: errormessageCat,
  } = useGetSubWiseProductsQuery(cat);

  // Getting attributes of Product with subCategory
  const {
    data: attirbutesDatas,
    isLoading: attirbutesloading,
    isSuccess: attirbutessuccess,
    isError: attirbuteserrorstate,
    error: attirbuteserrormessage,
  } = useGetAttributesOfProductsQuery(sub_cat, {
    refetchOnMountOrArgChange: true,
  });

  // Getting attributes of Product with Category
  const {
    data: attirbutesDatasCat,
    isLoading: attirbutesloadingCat,
    isSuccess: attirbutessuccessCat,
    isError: attirbuteserrorstateCat,
    error: attirbuteserrormessageCat,
  } = useGetAttributesOfProductsQuery(cat);

  // Setting product in a state
  useEffect(() => {
    if (isSuccess || categoryisSuccess) {
      const handleSuccess = async () => {
        if (sub_cat) {
          await setProducts(data?.data);
          await setFilteredData(data?.data);
        } else {
          await setProducts(catetoryData?.data);
          await setFilteredData(catetoryData?.data);
        }
      };
      handleSuccess();
    }
  }, [
    data,
    isSuccess,
    isLoading,
    catetoryData,
    categoryisSuccess,
    categoryLoading,
  ]);

  // Setting static data of products in a state
  useEffect(() => {
    if (success || successCat) {
      const handleSuccess = async () => {
        if (sub_cat) {
          await setStaticData(staticDatas?.data);
        } else {
          setStaticData(staticDatasCat?.data);
        }
      };
      handleSuccess();
    }
  }, [staticDatas, loading, success, staticDatasCat, loadingCat, successCat]);

  // Setting attributes of products in a state
  useEffect(() => {
    if (attirbutessuccess || attirbutessuccessCat) {
      const handleSuccess = async () => {
        if (sub_cat) {
          await setFabric(attirbutesDatas);
        } else {
          await setFabric(attirbutesDatas);
        }
      };
      handleSuccess();
    }
  }, [
    attirbutesDatas,
    attirbutesloading,
    attirbutessuccess,
    attirbutesDatasCat,
    attirbutesloadingCat,
    attirbutessuccessCat,
  ]);

  // Filtering the products
  useEffect(() => {
    const handelFilterGallery = async () => {
      const content = products.filter(
        (product) => fabricName == product?.p_fabric[0]?.fabric_name
      );
      setFilteredData(content);
    };
    handelFilterGallery();

    if (fabricName === "all") {
      setFilteredData(products);
    }
  }, [fabricName]);

  // Handling the loading state
  if (isLoading || loading) {
    return <Loader></Loader>;
  }
  if (attirbutesloading) {
    return <Loader></Loader>;
  }
  console.log("some of worf", filteredData);
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
              onClick={() => router.push("/shop")}
            >
              Home
            </Typography>
            <MdOutlineKeyboardArrowRight />
            <Typography
              variant="cardHeader2"
              sx={{ cursor: "pointer" }}
              color="initial"
            >
              {currentPath}
            </Typography>
          </Stack>
          <Typography variant="cardHeader1" color="initial">
            {productName} COLLECTION
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
              <Stack direction={"row"} spacing={4} alignItems={"center"}>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => setFabricName("all")}
                >
                  All Product
                </Typography>
                {fabrics?.map((fabric) => (
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => setFabricName(fabric?.fabric_name)}
                  >{`${fabric?.fabric_name}`}</Typography>
                ))}

                {/* <Menu1 title={"Nakshikantha Saree"} />
                  <Menu1 title={"Jamdani Saree"} /> */}
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
          {filteredData?.slice(0, 1).map((dataList) => (
            <>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${dataList?.id}`}
                data={dataList}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_565,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
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
                  BDT {dataList?.p_sale_price} ৳
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
          {filteredData?.slice(1, 4).map((dataList) => (
            <>
              <Grid item lg={4} sm={6} key={dataList?.id}>
                {/* <img
                      src={dataList?.feature_image}
                      width={568}
                      height={827}
                      style={{ maxWidth: "100%", height: "fit-content" }}
                    /> */}
                <HovarImage
                  url={`${router?.asPath?.split("?")[0]}/${dataList?.id}`}
                  data={dataList}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
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
                    BDT {dataList?.p_sale_price} ৳
                  </Typography>
                </Stack>
              </Grid>
            </>
          ))}
        </Grid>
        <Stack direction={"row"} sx={{ width: "100%" }} mt={4}>
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_828,w_720/v1676527368/aranya/${staticData?.cat_img_two?.substring(
              staticData?.cat_img_two?.lastIndexOf("/") + 1
            )}`}
            alt=""
            width={"50%"}
          />
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_828,w_720/v1676527368/aranya/${staticData?.cat_img_three?.substring(
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
          {filteredData?.slice(2, 5).map((dataList) => (
            <>
              <Grid
                item
                lg={4}
                sm={6}
                justifyContent="center"
                key={dataList?.id}
              >
                <HovarImage
                  url={`${router?.asPath?.split("?")[0]}/${dataList?.id}`}
                  data={dataList}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
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
                    BDT {dataList?.p_sale_price} ৳
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
          {filteredData?.slice(1, 2).map((dataList) => (
            <>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${dataList?.id}`}
                data={dataList}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/v1676527368/aranya/${dataList?.feature_image?.substring(
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
                  BDT {dataList?.p_sale_price} ৳
                </Typography>
              </Stack>
            </>
          ))}
        </Stack>
      </Box>
      <Footer />
      <MenuDawer
        products={products}
        fabrics={fabrics}
        open={lists}
        setOpen={setLists}
        setFilteredData={setFilteredData}
        setFabricName={setFabricName}
      />
      <Menu1Dawer open={lists1} setOpen={setLists1} />
    </>
  );
};

export default masterCollectionLayout;
