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
import React, { createRef, useEffect, useMemo } from "react";
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
  useGetColorWiseFilteredProductsQuery,
  useGetColorWiseFilteredProductsWithOutSubQuery,
  useGetPriceWiseFilteredProductsQuery,
  useGetPriceWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsQuery,
} from "../../../src/features/api/apiSlice";
import Loader from "../../../components/Loader/Loader";
import HovarImage from "../../../components/HovarableImage/HovarImage";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Filter from "../../../components/Filter";
import { BiFilter } from "react-icons/bi";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import instance from "../../api/api_instance";
import ProductsLayoutWithStaticImage from "../../../components/ProductsLayoutWithStaticImage";
import ProductsLayout from "../../../components/ProductsLayout";
import Head from "next/head";

function chunkArray(arr, chunkSize = 9) {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

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
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [staticData, setStaticData] = useState([]);
  const [fabrics, setFabric] = useState([]);
  const [fabricSelect, setFabricSelect] = useState([]);
  const [fabricName, setFabricName] = useState("");
  const [fabricID, setFabricID] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [rangeValue, setValue] = useState([0, 10000]);
  const dataFetchedRef = useRef(false);
  const [priceSelected, setPriceSelected] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [page, setPage] = useState(1);
  const [debounced, setDebounced] = useState([]);
  const divRef = useRef(null);
  const cat = router.query?.cat;
  const sub_cat = router.query?.sub_cat;

  // console.log('your log output',debounced)

  // Getting product data with subCategory
  const {
    data,
    isLoading,
    isFetching,
    // isSuccess,
    // isError,
    // error,
    // isFetching: isFetchingSubCat,
  } = useGetCategoryAndSubWiseProductsQuery(
    { cat, sub_cat, page },
    {
      refetchOnMountOrArgChange: true,
      skip: cat == 5 || cat == 3 || !sub_cat || page < 1 || !hasMore,
    }
  );
  /* const [lazyLoadData, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetCategoryAndSubWiseProductsQuery(); */

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
      skip: sub_cat || !cat || page < 1 || !hasMore,
    }
  );

  // Getting static data with subCategory
  const {
    data: staticDatas,
    isLoading: loading,
    isSuccess: success,
    isError: errorstate,
    error: errormessage,
  } = useGetSubWiseProductsQuery(sub_cat, {
    refetchOnMountOrArgChange: true,
    skip: cat == 5 || cat == 3,
  });

  // Getting static data with Category
  const {
    data: staticDatasCat,
    isLoading: loadingCat,
    isSuccess: successCat,
    isError: errorstateCat,
    error: errormessageCat,
  } = useGetSubWiseProductsQuery(cat, {
    skip: sub_cat,
  });

  // Getting attributes of Product with subCategory
  const {
    data: attirbutesDatas,
    isLoading: attirbutesloading,
    isSuccess: attirbutessuccess,
    isError: attirbuteserrorstate,
    error: attirbuteserrormessage,
    isFetching: isAttributeFetchingSub,
  } = useGetAttributesOfProductsQuery(sub_cat, {
    refetchOnMountOrArgChange: true,
    skip: cat === 5 || cat === 3 || sub_cat === undefined,
  });

  // console.log("your log output", attirbutesloading);
  // Getting attributes of Product with Category
  const {
    data: attirbutesDatasCat,
    isLoading: attirbutesloadingCat,
    isSuccess: attirbutessuccessCat,
    isError: attirbuteserrorstateCat,
    error: attirbuteserrormessageCat,
    isFetching: isAttributeFetchingCat,
  } = useGetAttributesOfProductsQuery(cat, {
    skip: sub_cat,
  });
  // Getting Filtered data by color
  const colorSelected = selectedColor[1];
  const {
    data: filterDataSub,
    isLoading: filterLoading,
    isSuccess: filterSuccess,
    isFetching: isColorFetchingSub,
  } = useGetColorWiseFilteredProductsQuery(
    { cat, sub_cat, colorSelected },
    {
      refetchOnMountOrArgChange: true,
      skip: cat == 5 || cat == 3 || !colorSelected,
    }
  );
  const {
    data: filterDataCat,
    isLoading: filterLoadingCat,
    isSuccess: filterSuccessCat,
    isFetching: isColorFetchingCat,
  } = useGetColorWiseFilteredProductsWithOutSubQuery(
    { cat, colorSelected },
    {
      refetchOnMountOrArgChange: true,
      skip: sub_cat || !colorSelected,
    }
  );

  // Getting Filtered data by price
  const up = debounced[1];
  const low = debounced[0];
  const ups = rangeValue[1];
  const lows = rangeValue[0];

  console.log(
    "your log output",
    debounced[1],
    debounced[0],
    rangeValue[1],
    rangeValue[0]
  );

  const {
    data: filterDataSubp,
    isLoading: filterLoadingp,
    isSuccess: filterSuccessp,
    isFetching: isPriceSubFetching,
    queryFulfilled: isPriceFulfilledSub,
  } = useGetPriceWiseFilteredProductsQuery(
    { cat, sub_cat, up, low },
    {
      refetchOnMountOrArgChange: true,
      skip: cat == 5 || cat == 3 || priceSelected === false,
    }
  );

  const {
    data: filterDataCatp,
    isLoading: filterLoadingCatp,
    isSuccess: filterSuccessCatp,
    isFetching: isPriceCatFetching,
    queryFulfilled: isPriceFulfilledCat,
  } = useGetPriceWiseFilteredProductsWithOutSubQuery(
    { cat, up, low },
    {
      refetchOnMountOrArgChange: true,
      skip: sub_cat || priceSelected === false,
    }
  );

  // Getting filtered by fabric
  const {
    data: filterDataSubFab,
    isLoading: filterLoadingFab,
    isSuccess: filterSuccessFab,
  } = useGetFabricWiseFilteredProductsQuery(
    { cat, sub_cat, fabricID },
    { refetchOnMountOrArgChange: true, skip: cat == 5 || cat == 3 || !fabricID }
  );
  const {
    data: filterDataCatFab,
    isLoading: filterLoadingCatFab,
    isSuccess: filterSuccessCatFab,
  } = useGetFabricWiseFilteredProductsWithOutSubQuery(
    { cat, fabricID },
    {
      refetchOnMountOrArgChange: true,
      skip: sub_cat || !fabricID,
    }
  );

  useEffect(() => {
    if (productsForStatic?.length) {
    }
    setFilteredData([]);
    setProducts([]);
    setHasMore(true);
    setPage(1);
    setMin(0);
    setMax(1000);
  }, [cat, sub_cat]);

  // Setting product in a state
  useEffect(() => {
    if (isLoading || categoryLoading) {
    }
    if (hasMore && (data?.data || catetoryData?.data)) {
      const handleSuccess = async () => {
        if (sub_cat && (cat !== 3 || cat !== 5) && data?.data) {
          if (page === 1) {
            setProducts((prev) => [...data.data]);
            setFilteredData((prev) => [...data.data]);
          } else {
            setProducts((prev) => [...prev, ...data.data]);
            setFilteredData((prev) => [...prev, ...data.data]);
          }

          setTotalProducts((prev) => prev + data.meta?.total);
          if (!data.data?.length) {
            setHasMore(false);
          }

          const min = Math.min(
            ...filteredData,
            ...data?.data?.map((item) => item?.p_sale_price)
          );
          const max = Math.max(
            filteredData,
            ...data?.data?.map((item) => item?.p_sale_price)
          );
          setMin(min);
          setMax(max);
        }

        if ((cat == 3 || cat == 5) && !sub_cat && catetoryData?.data) {
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
    data,
    // isSuccess,
    isLoading,
    catetoryData,
    // categoryisSuccess,
    categoryLoading,
    hasMore,
    cat,
    sub_cat,
    page,
  ]);

  // Setting static data of products in a state

  useEffect(() => {
    if (success || successCat) {
      const handleSuccess = async () => {
        if (sub_cat && (cat !== 3 || cat !== 5)) {
          await setStaticData(staticDatas?.data);
        }
        if (cat == 3 || cat == 5) {
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
    fabricName,
    fabricID,
  ]);

  // Filtering the products using fabric
  useEffect(() => {
    if (filterLoadingCatFab || filterLoadingFab) {
    }
    const handleSuccess = () => {
      if ((filterSuccessFab || filterSuccessCatFab) && fabricID) {
        if (sub_cat) {
          setFilteredData(filterDataSubFab?.data);
        } else {
          setFilteredData(filterDataCatFab?.data);
        }
      }
      if (fabricName === "all") {
        if (sub_cat) {
          setFilteredData(products);
        } else {
          setFilteredData(products);
        }
        // setFilteredData(products);
      }
    };
    handleSuccess();
  }, [
    filterDataSubFab,
    filterLoadingFab,
    filterSuccessFab,
    filterDataCatFab,
    filterLoadingCatFab,
    filterSuccessCatFab,
    fabricID,
    fabricName,
  ]);

  // Filtering data by colors
  useEffect(() => {
    if ((filterSuccess || filterSuccessCat) && selectedColor) {
      if (sub_cat) {
        setFilteredData(filterDataSub?.data);
      } else {
        setFilteredData(filterDataCat?.data);
      }
    }
    if (filterLoading || filterLoadingCat) {
    }
  }, [
    filterDataSub,
    filterLoading,
    filterSuccess,
    isColorFetchingSub,
    filterDataCat,
    filterLoadingCat,
    filterSuccessCat,
    isColorFetchingCat,
    selectedColor,
  ]);

  // Filtering the products using price
  useEffect(() => {
    if (filterSuccessp || filterSuccessCatp) {
      if (sub_cat) {
        // console.log("inside filter");
        setFilteredData(filterDataSubp?.data);
        // console.log('inside Setting',filteredData)
      } else {
        setFilteredData(filterDataCatp?.data);
      }
    }
  }, [
    filterDataCatp,
    filterDataSubp,
    filterLoadingp,
    filterSuccessp,
    filterLoadingCatp,
    filterSuccessCatp,
  ]);

  console.log('your log output',priceSelected)

  // console.log('your log output',filteredData)

  //handling unique colors
  useEffect(() => {
    const colorWiseFilter = products
      ?.map((item) =>
        item?.p_colours?.map((item) =>
          item.color_name ? { name: item.color_name, id: item.id } : null
        )
      )
      .filter((value, index, self) => self.indexOf(value) === index);
    let unified = [...new Set(colorWiseFilter?.flat(1))];

    const uniqueColor = [
      ...new Map(unified.map((item) => [item["name"], item])).values(),
    ];
    setUniqueColors(uniqueColor);
  }, [products]);
  //handling unique price
  useEffect(() => {
    const min = Math.min(...filteredData?.map((item) => item?.p_sale_price));
    const max = Math.max(...filteredData?.map((item) => item?.p_sale_price));
    setMin(min === max ? 0 : min);
    setMax(max);
  }, [filteredData]);

  // useEffect(() => {
  //   if (hasMore === false) {
  //     setHasMore(!hasMore);
  //   }
  // }, [cat, sub_cat]);

  /*  if (isPriceSubFetching || isPriceCatFetching) {
    return <p>Loading</p> ;
  } */
  /*   if (filterLoadingp || filterLoadingCatp) {
    return <Loader></Loader>;
  } */
  // handling fabric change state
  const handleFabricChange = (data, id) => {
    setFabricName(data);
    setFabricSelect(data);
    setFabricID(id);
  };

  /* if (
    isAttributeFetchingSub ||
    isAttributeFetchingCat ||
    isColorFetchingSub ||
    isColorFetchingCat
  ) {
    return <Loader></Loader>;
  } */

  const getMoreProducts = async () => {
    // Getting product data with subCategory

    if (isLoading || categoryLoading || !hasMore) return;

    setPage((prev) => prev + 1);
  };
  // Handling the loading state

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
      <HomePageIntro title={"Saree "} />
      <Box mt={10} mb={4}>
        <Stack direction={"row"} alignItems="center">
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_900,w_1920/${staticData?.cat_img_one
              ?.split("/")
              .slice(-3)
              .join("/")}`}
            width={1900}
            style={{ width: "100%", height: "fit-content" }}
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

        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            position: "sticky",
            top: 82,
            zIndex: 1,
          }}
        >
          <Hidden only={["xs", "xms", "sm"]}>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                width: "90%",
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
                  className="SemiBold"
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
                    letterSpacing: 1.5,
                  }}
                  onClick={() => handleFabricChange("all")}
                >
                  All Product
                </Typography>
                {fabrics?.slice(0, 4).map((fabric) => (
                  <Typography
                    className="SemiBold"
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
                      letterSpacing: 1.5,
                    }}
                    onClick={() =>
                      handleFabricChange(fabric?.fabric_name, fabric?.fabric_id)
                    }
                  >{`${fabric?.fabric_name}`}</Typography>
                ))}

                {/* <Menu1 title={"Nakshikantha Saree"} />
                  <Menu1 title={"Jamdani Saree"} /> */}
              </Stack>
              <Stack
                direction={"row"}
                alignItems="center"
                spacing={0.5}
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
              key={sub_cat + cat}
              style={{ minHeight: 400 }}
              scrollThreshold="400px"
              dataLength={filteredData.length} //This is important field to render the next data
              next={getMoreProducts}
              hasMore={hasMore}
              loader={<Loader></Loader>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>NO MORE ITEMS AVAILABLE...</b>
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
        setFilteredData={setFilteredData}
        setFabricName={setFabricName}
        setFabricID={setFabricID}
        uniqueColors={uniqueColors}
        max={rangeValue[1]}
        min={rangeValue[0]}
        setValue={setValue}
        rangeValue={rangeValue}
        setSelectedColor={setSelectedColor}
        setPriceSelected={setPriceSelected}
      />
      {/* <Menu1Dawer open={lists1} setOpen={setLists1} /> */}
      <Filter
        open={filter}
        setOpen={setFilter}
        uniqueColors={uniqueColors}
        max={rangeValue[1]}
        min={rangeValue[0]}
        setValue={setValue}
        rangeValue={rangeValue}
        setSelectedColor={setSelectedColor}
        fabrics={fabrics}
        setFabricName={setFabricName}
        setFabricID={setFabricID}
        setDebounced={setDebounced}
        setPriceSelected={setPriceSelected}
      />
    </>
  );
};

export default masterCollectionLayout;
