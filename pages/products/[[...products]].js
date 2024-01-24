import { Box, Hidden, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import HomePageIntro from "../../components/HomePageIntro";
import Footer from "../../components/Footer";
import MenuDawer from "../../components/MenuDawer";
import { useDispatch } from "react-redux";
import {
  useGetAttributesOfProductsQuery,
  useGetCategoryAndSubWiseProductsQuery,
  useGetCategoryWiseProductsQuery,
  useGetSubWiseProductsQuery,
  useGetColorWiseFilteredProductsQuery,
  useGetColorWiseFilteredProductsWithOutSubQuery,
  useGetPriceWiseFilteredProductsQuery,
  useGetPriceWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsQuery,
  useGetAttributesListQuery,
} from "../../src/features/api/apiSlice";
import Loader from "../../components/Loader/Loader";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiFilter } from "react-icons/bi";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductsLayoutWithStaticImage from "../../components/ProductsLayoutWithStaticImage";
import ProductsLayout from "../../components/ProductsLayout";
import Head from "next/head";
import FilterCategory from "../../components/FilterCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function chunkArray(arr, chunkSize = 9) {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

const masterCollectionLayout = () => {
  const router = useRouter();
  console.log("your log output", router);
  const path =
    router.pathname.replace("/", "").charAt(0).toUpperCase() +
    router.pathname.replace("/", "").slice(1);
  const currentPath = router?.query?.cat_name?.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );
  const productName = router?.query?.cat_name?.toUpperCase();

  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [lists, setLists] = useState(false);
  const [lists1, setLists1] = useState(false);
  const [products, setProducts] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [staticData, setStaticData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [fabrics, setFabric] = useState([]);
  const [fabricSelect, setFabricSelect] = useState([]);
  const [subCategorySelect, setSubCategorySelect] = useState([]);
  const [fabricName, setFabricName] = useState("");
  const [fabricID, setFabricID] = useState(0);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryID, setSubCategoryID] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [rangeValue, setValue] = useState([0, 100000]);
  const [priceSelected, setPriceSelected] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [page, setPage] = useState(1);
  const [debounced, setDebounced] = useState([]);
  const [makeFabricTrue, setMakeFabricTrue] = useState(false);
  const [makeSubCategoryTrue, setMakeSubCategoryTrue] = useState(false);
  const [makeColorTrue, setMakeColorTrue] = useState(false);
  const [makePriceTrue, setMakePriceTrue] = useState(false);
  const [slidesPerView, setSlidePreview] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(0);

  const cat = router.query?.cat;
  const sub_cat = subCategoryID;

  const theme = useTheme();

  // Getting product data with only category
  const {
    data: catetoryData,
    isLoading: categoryLoading,
    isFetching: isCategoryFetching,
    // isSuccess: categoryisSuccess,
    // isFetching: isFetchingCat,
  } = useGetCategoryWiseProductsQuery(
    { cat, page },
    {
      refetchOnMountOrArgChange: true,
      skip: !cat || page < 1 || !hasMore,
    }
  );

  // Getting static data with Category
  const {
    data: staticDatasCat,
    isLoading: loadingCat,
    isSuccess: successCat,
    isError: errorstateCat,
    error: errormessageCat,
  } = useGetSubWiseProductsQuery(cat, {
    skip: !cat,
  });
  // Getting attributes of Product with Category
  const {
    data: attirbutesDatasCat,
    isLoading: attirbutesloadingCat,
    isSuccess: attirbutessuccessCat,
    isError: attirbuteserrorstateCat,
    error: attirbuteserrormessageCat,
    isFetching: isAttributeFetchingCat,
  } = useGetAttributesOfProductsQuery(cat, {
    skip: !cat,
  });
  // Getting Attributes List
  const {
    data: attributesListData,
    isSuccess: isAttributesListSuccess,
    isLoading: isAttributesLoading,
    error: attributesListError,
  } = useGetAttributesListQuery(cat);

  // Getting Filtered data by color with sub category
  const colorSelected = selectedColor[1];

  const {
    data: filterDataCat,
    isLoading: filterLoadingCat,
    isSuccess: filterSuccessCat,
    isFetching: isColorFetchingCat,
  } = useGetColorWiseFilteredProductsWithOutSubQuery(
    { cat, colorSelected, page },
    {
      refetchOnMountOrArgChange: true,
      skip:
        !cat ||
        !colorSelected ||
        makeColorTrue === false ||
        page < 1 ||
        !hasMore,
    }
  );

  // Getting Filtered data by price without sub category
  const up = debounced[1];
  const low = debounced[0];

  const {
    data: filterDataCatp,
    isLoading: filterLoadingCatp,
    isSuccess: filterSuccessCatp,
    isFetching: isPriceCatFetching,
    queryFulfilled: isPriceFulfilledCat,
  } = useGetPriceWiseFilteredProductsWithOutSubQuery(
    { cat, up, low, page },
    {
      refetchOnMountOrArgChange: true,
      skip:
        !cat ||
        priceSelected === false ||
        makePriceTrue === false ||
        page < 1 ||
        !hasMore,
    }
  );

  // Getting filtered by fabric
  const {
    data: filterDataCatFab,
    isLoading: filterLoadingCatFab,
    isSuccess: filterSuccessCatFab,
    isFetching: isFabricFetchingCat,
  } = useGetFabricWiseFilteredProductsWithOutSubQuery(
    { cat, fabricID, page },
    {
      refetchOnMountOrArgChange: true,
      skip:
        !cat || !fabricID || makeFabricTrue === false || page < 1 || !hasMore,
    }
  );
  // Getting filtered by sub category
  const {
    data: filterDataBySubCat,
    isLoading: filterDataLoadingSubCat,
    isFetching: filterDataFetchingSubCat,
    // isSuccess,
    // isError,
    // error,
    // isFetching: isFetchingSubCat,
  } = useGetCategoryAndSubWiseProductsQuery(
    { cat, sub_cat, page },
    {
      refetchOnMountOrArgChange: true,
      skip:
        sub_cat === undefined ||
        !subCategoryID ||
        makeSubCategoryTrue === false ||
        page < 1 ||
        !hasMore,
    }
  );

  // Setting all filtering state to its default at page change
  useEffect(() => {
    setMakeFabricTrue(false);
    setMakeColorTrue(false);
    setMakePriceTrue(false);
    setMakeSubCategoryTrue(false);
  }, [window.location.href]);

  useEffect(() => {
    if (productsForStatic?.length) {
    }
    setFilteredData([]);
    setProducts([]);
    setHasMore(true);
    setPage(1);
    setMin(0);
    setMax(1000);
  }, [cat]);

  // Setting product in a state

  useEffect(() => {
    if (
      hasMore &&
      catetoryData?.data &&
      makeColorTrue === false &&
      makePriceTrue === false &&
      makeSubCategoryTrue === false
    ) {
      if (categoryLoading || isCategoryFetching) {
        return;
      }
      const handleSuccess = async () => {
        if (catetoryData?.data) {
          if (page === 1) {
            setProducts((prev) => [...catetoryData.data]);
            setFilteredData((prev) => [...catetoryData.data]);
          } else {
            setProducts((prev) => [...prev, ...catetoryData.data]);
            setFilteredData((prev) => [...prev, ...catetoryData.data]);
          }

          // setProducts((prev) => [...prev, ...catetoryData?.data]);
          // setFilteredData((prev) => [...prev, ...catetoryData?.data]);
          setTotalProducts((prev) => prev + catetoryData.meta?.total);
          if (!catetoryData.data?.length) {
            setHasMore(false);
          }

          const min = Math.min(
            ...filteredData,
            ...catetoryData?.data?.map((item) => item?.p_sale_price)
          );
          const max = Math.max(
            filteredData,
            ...catetoryData?.data?.map((item) => item?.p_sale_price)
          );
          setMin(min);
          setMax(max);
        }
      };
      handleSuccess();
    }
  }, [
    catetoryData,
    hasMore,
    cat,
    page,
    makeSubCategoryTrue,
    makeColorTrue,
    makePriceTrue,
    subCategoryName,
    colorSelected,
  ]);

  // Setting static data of products in a state

  useEffect(() => {
    if (successCat) {
      const handleSuccess = async () => {
        if (cat) {
          setStaticData(staticDatasCat?.data);
          setSubCategories(staticDatasCat?.data?.children);
        }
      };
      handleSuccess();
    }
  }, [staticDatasCat, loadingCat, successCat, subCategories]);

  // Setting fabric of products in a state
  useEffect(() => {
    if (attirbutessuccessCat) {
      const handleSuccess = async () => {
        if (cat) {
          setFabric(attirbutesDatasCat);
        }
      };
      handleSuccess();
    }
  }, [
    attirbutesDatasCat,
    attirbutesloadingCat,
    attirbutessuccessCat,
    fabricName,
    subCategoryName,
    subCategoryID,
    fabricID,
  ]);
  // Filtering the products using fabric
  useEffect(() => {
    if (filterLoadingCatFab) {
    }
    if (
      hasMore &&
      filterDataCatFab?.data &&
      (makeFabricTrue === true ||
        makeColorTrue === true ||
        makePriceTrue === true)
    ) {
      if (filterLoadingCatFab || isFabricFetchingCat) {
        return;
      }
      const handleSuccess = () => {
        if (filterSuccessCatFab && fabricID) {
          if (cat && filterDataCatFab?.data) {
            if (page === 1) {
              // setProducts((prev) => [...filterDataCatFab?.data]);
              setFilteredData((prev) => [...filterDataCatFab?.data]);
            } else {
              // setProducts((prev) => [...prev, ...filterDataCatFab?.data]);
              setFilteredData((prev) => [...prev, ...filterDataCatFab?.data]);
            }
            setTotalProducts((prev) => prev + filterDataCatFab.meta?.total);
            if (!filterDataCatFab.data?.length) {
              setHasMore(false);
            }
          }
        }
      };
      handleSuccess();
    }
  }, [
    filterDataCatFab,
    filterLoadingCatFab,
    filterSuccessCatFab,
    fabricID,
    fabricName,
    subCategoryName,
    subCategoryID,
    hasMore,
    cat,
    page,
    makeFabricTrue,
    makeColorTrue,
    makePriceTrue,
  ]);
  // Filtering data by colors
  useEffect(() => {
    if (
      hasMore &&
      filterDataCat?.data &&
      (makeSubCategoryTrue === true ||
        makeColorTrue === true ||
        makePriceTrue === true)
    ) {
      if (filterLoadingCat || isColorFetchingCat) {
        return;
      }
      const handleSuccess = () => {
        if (filterSuccessCat && selectedColor) {
          if (cat && filterDataCat?.data) {
            if (page === 1) {
              // setProducts((prev) => [...filterDataCat?.data]);
              setFilteredData((prev) => [...filterDataCat?.data]);
            } else {
              // setProducts((prev) => [...prev, ...filterDataCat?.data]);
              setFilteredData((prev) => [...prev, ...filterDataCat?.data]);
            }
            setTotalProducts((prev) => prev + filterDataCat.meta?.total);
            if (!filterDataCat.data?.length) {
              setHasMore(false);
            }
          }
        }
      };
      handleSuccess();
    }
  }, [
    filterDataCat,
    filterLoadingCat,
    filterSuccessCat,
    isColorFetchingCat,
    selectedColor,
    hasMore,
    page,
    makeSubCategoryTrue,
    makeColorTrue,
    makePriceTrue,
  ]);

  // Filtering data by subCategory
  useEffect(() => {
    if (filterDataBySubCat) {
    }
    if (
      hasMore &&
      filterDataBySubCat?.data &&
      (makeSubCategoryTrue === true ||
        makeColorTrue === true ||
        makePriceTrue === true)
    ) {
      if (filterDataLoadingSubCat || filterDataFetchingSubCat) {
        return;
      }
      const handleSuccess = () => {
        if (filterDataBySubCat && subCategoryID) {
          if (cat && filterDataBySubCat?.data) {
            if (page === 1) {
              // setProducts((prev) => [...filterDataCatFab?.data]);
              setFilteredData((prev) => [...filterDataBySubCat?.data]);
            } else {
              // setProducts((prev) => [...prev, ...filterDataCatFab?.data]);
              setFilteredData((prev) => [...prev, ...filterDataBySubCat?.data]);
            }
            setTotalProducts((prev) => prev + filterDataBySubCat.meta?.total);
            if (!filterDataBySubCat.data?.length) {
              setHasMore(false);
            }
          }
        }
      };
      handleSuccess();
    }
  }, [
    filterDataBySubCat,
    filterDataLoadingSubCat,
    filterDataFetchingSubCat,
    subCategoryID,
    fabricName,
    subCategoryName,
    hasMore,
    cat,
    page,
    makeSubCategoryTrue,
    makeColorTrue,
    makePriceTrue,
  ]);

  // Filtering the products using price
  useEffect(() => {
    if (
      hasMore &&
      filterDataCatp?.data &&
      (makeSubCategoryTrue === true ||
        makeColorTrue === true ||
        makePriceTrue === true)
    ) {
      if (filterLoadingCatp || isPriceCatFetching) {
        return;
      }
      const handleSuccess = () => {
        if (filterSuccessCatp && debounced) {
          if (cat && filterDataCatp?.data) {
            if (page === 1) {
              // setProducts((prev) => [...filterDataCat?.data]);
              setFilteredData((prev) => [...filterDataCatp?.data]);
            } else {
              // setProducts((prev) => [...prev, ...filterDataCat?.data]);
              setFilteredData((prev) => [...prev, ...filterDataCatp?.data]);
            }
            setTotalProducts((prev) => prev + filterDataCatp.meta?.total);
            if (!filterDataCatp.data?.length) {
              setHasMore(false);
            }
          }
        }
      };
      handleSuccess();
    }
  }, [
    filterDataCatp,
    filterLoadingCatp,
    filterSuccessCatp,
    isPriceCatFetching,
    debounced,
    hasMore,
    cat,
    page,
    makeSubCategoryTrue,
    makeColorTrue,
    makePriceTrue,
  ]);

  //Setting colors in as state
  useEffect(() => {
    if (isAttributesListSuccess) {
      setUniqueColors(attributesListData?.colours);
    }
  }, [isAttributesListSuccess, attributesListData, uniqueColors, filteredData]);
  //handling unique price
  useEffect(() => {
    const min = Math.min(...filteredData?.map((item) => item?.p_sale_price));
    const max = Math.max(...filteredData?.map((item) => item?.p_sale_price));
    setMin(min === max ? 0 : min);
    setMax(max);
  }, [filteredData]);

  // Setting SlidePreview
  const isExtraSmallerScreen = useMediaQuery(theme.breakpoints.down("xms"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    if (isExtraSmallerScreen) {
      setSlidePreview(2);
      setSpaceBetween(5)
    } else if (isSmallerScreen) {
      setSlidePreview(3);
      setSpaceBetween(5)
    } else if (isMediumScreen) {
      setSlidePreview(3);
      setSpaceBetween(5)
    } else if (isLargeScreen) {
      setSlidePreview(4);
      setSpaceBetween(60)
    } else if (isExtraLargeScreen) {
      setSlidePreview(5);
      setSpaceBetween(60)
    } else {
      setSlidePreview(6);
      setSpaceBetween(80)
    }
  }, [
    isExtraSmallerScreen,
    isSmallerScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  ]);
  // handling fabric change state
  const handleFabricChange = (data, id) => {
    setFabricName(data);
    setFabricSelect(data);
    setFabricID(id);
    setPage(1);
    setMakeFabricTrue(true);
    setMakeSubCategoryTrue(false);
    setMakeColorTrue(false);
    setMakePriceTrue(false);
    setHasMore(true);
    setFilteredData([]);
    setProducts([]);
  };
  const handleSubCategoryChange = (data, id) => {
    setSubCategoryName(data);
    setSubCategorySelect(data);
    setSubCategoryID(id);
    setPage(1);
    setMakeFabricTrue(false);
    setMakeSubCategoryTrue(true);
    setMakeColorTrue(false);
    setMakePriceTrue(false);
    setHasMore(true);
    setFilteredData([]);
    setProducts([]);
  };
  const handleAllProduct = (data) => {
    setFabricName(data);
    setFabricSelect(data);
    setSubCategoryName(data);
    setSubCategorySelect(data);
    setMakeSubCategoryTrue(false);
    setMakeFabricTrue(false);
    setMakeColorTrue(false);
    setMakePriceTrue(false);
    setPage(1);
    setHasMore(true);
  };

  // Getting product data with subCategory
  const getMoreProducts = async () => {
    if (categoryLoading || !hasMore) return;

    setPage((prev) => prev + 1);
  };
  if (loadingCat) {
    return <Loader></Loader>;
  }
  // Slicing data for static products and dynamic products
  const productsForStatic = filteredData.slice(0, 7);
  const productsForDynamic = chunkArray(filteredData.slice(9));

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        />
        <meta name="keywords" content="Aranya online shop" />
        <meta name="sitemap_link" content="sitemap.com" />
        <meta property="og:site_name" content="aranya.com.bd" />

        <meta name="twitter:card" content="Category" />
        <meta name="twitter:title" content={"Aranya | " + productName} />
        <meta name="twitter:site" content="@my_twitter" />
        <meta name="twitter:creator" content="@my_twitter" />

        <meta property="og:title" content={"Aranya | " + productName} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentPath} />
        <meta property="og:image" content={staticData?.cat_img_one} />
        <meta
          property="og:description"
          content={"Find all product  in " + productName + "category"}
        />
      </Head>
      <HomePageIntro title={currentPath} />
      <Box mb={4} sx={{ pt: { lg: 8, xs: 7 } }}>
        <Stack direction={"row"} alignItems="center">
          <img
            src={`${staticData?.cat_img_one
              ?.split("/")
              .slice(0, 6)
              .join("/")}/c_lfill,g_auto,h_900,w_1920/${staticData?.cat_img_one
              ?.split("/")
              .slice(6)
              .join("/")}`}
            width={1900}
            style={{ width: "100%", height: "auto" }}
            height={700}
          />
          {/* <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678530353/aranya-product/boishakh/ZS001671.jpg`}
            width={1900}
            style={{ width: "100%", height: "fit-content" }}
            height={700}
          /> */}
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

        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            position: "sticky",
            top: { lg: 64, xs: 55 },
            zIndex: 1,
          }}
        >
          <Hidden>
            <Stack
              direction={"row"}
              spacing={0}
              sx={{
                width: "90%",
                maxWidth: "1500px",
                margin: "0 auto",
                height: "61px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                direction={"row"}
                // spacing={4}

                justifyContent={"center"}
                alignItems={"center"}
                sx={{ width: "90%" }}
              >
                <Swiper
                  spaceBetween={spaceBetween}
                  slidesPerView={slidesPerView}
                  modules={[Pagination]}
                  className="mySwiper"
                  // style={{border:"1px solid red"}}
                >
                  <SwiperSlide>
                    <Typography
                      variant="homeFlash"
                      className="SemiBold"
                      style={
                        subCategorySelect === "all"
                          ? {
                              borderBottom: "2px solid gray",
                            }
                          : {}
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "5px",
                        letterSpacing: 1.5,
                      }}
                      onClick={() => handleAllProduct("all")}
                    >
                      All {currentPath}
                    </Typography>
                  </SwiperSlide>
                  {subCategories?.map((sub_cat, index) => (
                    <SwiperSlide key={index}>
                      <Typography
                        className="SemiBold"
                        variant="homeFlash"
                        style={
                          subCategorySelect === sub_cat?.category_name
                            ? {
                                borderBottom: "2px solid gray",
                              }
                            : {}
                        }
                        sx={{
                          cursor: "pointer",
                          padding: "5px",
                          letterSpacing: 1.5,
                        }}
                        onClick={() =>
                          handleSubCategoryChange(
                            sub_cat?.category_name,
                            sub_cat?.id
                          )
                        }
                      >{`${sub_cat?.category_name}`}</Typography>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <ArrowForwardIosIcon></ArrowForwardIosIcon> */}
                {/* <Menu1 title={"Nakshikantha Saree"} />
                  <Menu1 title={"Jamdani Saree"} /> */}
              </Stack>
              <Stack
                sx={{ width: "8%" }}
                direction={"row"}
                alignItems="center"
                // spacing={0.5}
                onClick={() => setFilter(true)}
              >
                <Typography
                  variant="homeFlash"
                  className="SemiBold"
                  color="initial"
                  sx={{ cursor: "pointer", letterSpacing: 1.5 }}
                  onClick={() => setFilter(true)}
                >
                  Filter
                </Typography>
                <BiFilter style={{ fontSize: "18px" }} />
              </Stack>
            </Stack>
          </Hidden>
        </Box>
        <div style={{ minHeight: "100px" }}>
          <ProductsLayoutWithStaticImage
            productsDataChunk={productsForStatic}
            staticData={staticData}
            // isLoading={page === 1 && (isFetchingSubCat || isFetchingCat)}
          />
          {productsForStatic?.length > 0 && (
            <InfiniteScroll
              key={cat}
              style={{ minHeight: "100px" }}
              scrollThreshold="950px"
              dataLength={filteredData.length} //This is important field to render the next data
              next={getMoreProducts}
              hasMore={hasMore}
              loader={<Loader></Loader>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>NO MORE ITEMS AVAILABLE.</b>
                </p>
              }
            >
              {productsForDynamic?.map((productsDataChunk, idx) => (
                <ProductsLayout
                  key={idx}
                  productsDataChunk={productsDataChunk}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </Box>
      <Footer />
      <MenuDawer
        products={products}
        fabrics={fabrics}
        open={lists}
        setOpen={setLists}
        setFabricName={setFabricName}
        setFabricID={setFabricID}
        uniqueColors={uniqueColors}
        max={rangeValue[1]}
        min={rangeValue[0]}
        setValue={setValue}
        rangeValue={rangeValue}
        setSelectedColor={setSelectedColor}
        setPriceSelected={setPriceSelected}
        makeFabricTrue={makeFabricTrue}
        makeColorTrue={makeColorTrue}
        makePriceTrue={makePriceTrue}
        setMakeFabricTrue={setMakeFabricTrue}
        setMakeColorTrue={setMakeColorTrue}
        setMakePriceTrue={setMakePriceTrue}
        setPage={setPage}
        setHasMore={setHasMore}
        setFilteredData={setFilteredData}
        setProducts={setProducts}
        subCategories={subCategories}
        setSubCategoryName={setSubCategoryName}
        setSubCategoryID={setSubCategoryID}
        makeSubCategoryTrue={makeSubCategoryTrue}
        setMakeSubCategoryTrue={setMakeSubCategoryTrue}
      />
      {/* <Menu1Dawer open={lists1} setOpen={setLists1} /> */}
      <FilterCategory
        open={filter}
        setOpen={setFilter}
        uniqueColors={uniqueColors}
        max={rangeValue[1]}
        min={rangeValue[0]}
        setValue={setValue}
        rangeValue={rangeValue}
        setSelectedColor={setSelectedColor}
        selectedColor={selectedColor}
        fabrics={fabrics}
        setFabricName={setFabricName}
        setFabricID={setFabricID}
        setDebounced={setDebounced}
        setPriceSelected={setPriceSelected}
        makeFabricTrue={makeFabricTrue}
        makeColorTrue={makeColorTrue}
        makePriceTrue={makePriceTrue}
        setMakeFabricTrue={setMakeFabricTrue}
        setMakeColorTrue={setMakeColorTrue}
        setMakePriceTrue={setMakePriceTrue}
        setPage={setPage}
        setHasMore={setHasMore}
        setFilteredData={setFilteredData}
        setProducts={setProducts}
        currentPath={currentPath}
        subCategories={subCategories}
        setSubCategoryName={setSubCategoryName}
        setSubCategoryID={setSubCategoryID}
        makeSubCategoryTrue={makeSubCategoryTrue}
        setMakeSubCategoryTrue={setMakeSubCategoryTrue}
      />
    </>
  );
};

export default masterCollectionLayout;
