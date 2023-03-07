import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  ImageListItem,
  InputLabel,
  MenuItem,
  Stack,
  Select,
  Typography,
  TextField,
  Slider,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
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
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Filter from "../../../components/Filter";
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
  const [filter, setFilter] = useState(false);
  const [lists, setLists] = useState(false);
  const [lists1, setLists1] = useState(false);
  const [products, setProducts] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [staticData, setStaticData] = useState([]);
  const [fabrics, setFabric] = useState([]);
  const [fabricSelect, setFabricSelect] = useState([]);
  const [fabricName, setFabricName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [rangeValue, setValue] = useState([min, max]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [page, setPage] = useState(1);
  const cat = router?.query?.cat;
  const sub_cat = router?.query?.sub_cat;

  // Getting product data with subCategory
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoryAndSubWiseProductsQuery(
      { cat, sub_cat, page },
      { refetchOnMountOrArgChange: true }
    );

  // Getting product data with only category
  const {
    data: catetoryData,
    isLoading: categoryLoading,
    isSuccess: categoryisSuccess,
  } = useGetCategoryWiseProductsQuery(
    { cat, page },
    { refetchOnMountOrArgChange: true }
  );

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

  //handling minimum and maximum value

  useEffect(() => {
    if (products) {
      const min = Math.min(...products?.map((item) => item?.p_sale_price));
      const max = Math.max(...products?.map((item) => item?.p_sale_price));
      setMin(min);
      setMax(max);
    }
  }, [products]);

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
          await setFabric(attirbutesDatasCat);
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

  // Filtering the products using fabric
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
    if (fabricName === "high") {
      let sortedbyPriceDsc = [...products];
      sortedbyPriceDsc = sortedbyPriceDsc?.sort(
        (a, b) => parseFloat(b.p_sale_price) - parseFloat(a.p_sale_price)
      );
      setFilteredData(sortedbyPriceDsc);
    }
    if (fabricName === "low") {
      let sortedbyPriceAsc = [...products];
      sortedbyPriceAsc = sortedbyPriceAsc?.sort(
        (a, b) => parseFloat(a.p_sale_price) - parseFloat(b.p_sale_price)
      );
      setFilteredData(sortedbyPriceAsc);
    }
  }, [fabricName]);

  // Filtering data by colors
  useEffect(() => {
    const handleFilterUsingColor = () => {
      const content = products.filter((product) =>
        product?.p_colours.some(
          (color) =>
            color?.color_name === selectedColor[0] && color?.color_name !== null
        )
      );
      setFilteredData(content);
    };
    handleFilterUsingColor();
  }, [selectedColor]);

  // Filtering the products using fabric
  useEffect(() => {
    if (rangeValue[0] !== Infinity && rangeValue[1] !== -Infinity) {
      const handelFilterGalleryRangeWise = async () => {
        const content = products.filter(
          (product) =>
            rangeValue[0] <= product?.p_sale_price &&
            rangeValue[1] >= product?.p_sale_price
        );
        setFilteredData(content);
      };
      handelFilterGalleryRangeWise();
    }
  }, [rangeValue]);

  //handling unique colors
  useEffect(() => {
    const colorWiseFilter = products
      ?.map((item) =>
        item?.p_colours?.map((item) =>
          item.color_name ? { name: item.color_name, id: item.id } : null
        )
      )
      .filter((value, index, self) => self.indexOf(value) === index);
    let unified = [...new Set(colorWiseFilter.flat(1))];

    const uniqueColor = [
      ...new Map(unified.map((item) => [item["name"], item])).values(),
    ];
    setUniqueColors(uniqueColor);
  }, [products]);

  // handling fabric change state
  const handleFabricChange = (data) => {
    setFabricName(data);
    setFabricSelect(data);
  };

  // handling lazy loading
  /* useEffect(() => {
    window.addEventListener("scroll", handelInfinitScroll);
    return () => window.removeEventListener("scroll", handelInfinitScroll);
  }, []);
  const handelInfinitScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoadings(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  // Handling the loading state
  if (isLoading || loading) {
    return <Loader></Loader>;
  }
  if (attirbutesloading || attirbutesloadingCat) {
    return <Loader></Loader>;
  }

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
          {/* <IconButton onClick={() => setLists1(true)}>
            <Hidden only={["xl", "lg"]}>
              <SegmentIcon />
            </Hidden>
          </IconButton> */}
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
                alignItems: "center",
              }}
            >
              <Stack direction={"row"} spacing={4} alignItems={"center"}>
                <Typography
                  variant="homeFlash"
                  style={
                    fabricSelect === "all"
                      ? {
                          borderBottom: "2px solid gray",
                        }
                      : {}
                  }
                  sx={{
                    cursor: "pointer",
                    padding: "5px",
                  }}
                  onClick={() => handleFabricChange("all")}
                >
                  All Product
                </Typography>
                {fabrics?.map((fabric) => (
                  <Typography
                    variant="homeFlash"
                    style={
                      fabricSelect === fabric?.fabric_name
                        ? {
                            borderBottom: "2px solid gray",
                          }
                        : {}
                    }
                    sx={{
                      cursor: "pointer",
                      padding: "5px",
                    }}
                    onClick={() => handleFabricChange(fabric?.fabric_name)}
                  >{`${fabric?.fabric_name}`}</Typography>
                ))}

                {/* <Menu1 title={"Nakshikantha Saree"} />
                  <Menu1 title={"Jamdani Saree"} /> */}
              </Stack>
              <Typography
                variant="homeFlash"
                color="initial"
                sx={{ cursor: "pointer" }}
                onClick={() => setFilter(true)}
              >
                Filters
              </Typography>
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
      <Filter
        open={filter}
        setOpen={setFilter}
        uniqueColors={uniqueColors}
        max={max}
        min={min}
        setValue={setValue}
        rangeValue={rangeValue}
        setSelectedColor={setSelectedColor}
      />
    </>
  );
};

export default masterCollectionLayout;
