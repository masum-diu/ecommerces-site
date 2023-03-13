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
import React, { createRef, useEffect } from "react";
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
  useLazyGetCategoryAndSubWiseProductsQuery,
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

function chunkArray(arr, chunkSize = 8) {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  // console.log(chunkedArray, 'chunked');
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
  const [fabricID, setFabricID] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [rangeValue, setValue] = useState([min, max]);
  const dataFetchedRef = useRef(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [page, setPage] = useState(0);
  const divRef = useRef(null);
  const cat = router?.query?.cat;
  const sub_cat = router?.query?.sub_cat;

  // Getting product data with subCategory
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoryAndSubWiseProductsQuery(
      { cat, sub_cat, page },
      {
        refetchOnMountOrArgChange: true,
        skip: !sub_cat || page < 1 || !hasMore,
      }
    );
  /* const [lazyLoadData, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetCategoryAndSubWiseProductsQuery(); */

  // Getting product data with only category
  const {
    data: catetoryData,
    isLoading: categoryLoading,
    isSuccess: categoryisSuccess,
  } = useGetCategoryWiseProductsQuery(
    { cat, page },
    { refetchOnMountOrArgChange: true, skip: sub_cat|| !cat || page < 1||!hasMore }
  );


  console.log('your log output',cat)
  console.log('your log output',sub_cat)

  // Getting static data with subCategory
  const {
    data: staticDatas,
    isLoading: loading,
    isSuccess: success,
    isError: errorstate,
    error: errormessage,
  } = useGetSubWiseProductsQuery(sub_cat, {
    refetchOnMountOrArgChange: true,
    skip: cat == 5 || cat == 3 || sub_cat === undefined,
  });

  // Getting static data with Category
  const {
    data: staticDatasCat,
    isLoading: loadingCat,
    isSuccess: successCat,
    isError: errorstateCat,
    error: errormessageCat,
  } = useGetSubWiseProductsQuery(cat, {
    skip: sub_cat || sub_cat === undefined,
  });

  // Getting attributes of Product with subCategory
  const {
    data: attirbutesDatas,
    isLoading: attirbutesloading,
    isSuccess: attirbutessuccess,
    isError: attirbuteserrorstate,
    error: attirbuteserrormessage,
  } = useGetAttributesOfProductsQuery(sub_cat, {
    refetchOnMountOrArgChange: true,
    skip: cat === 5 || cat === 3 || sub_cat === undefined,
  });
  // Getting attributes of Product with Category
  const {
    data: attirbutesDatasCat,
    isLoading: attirbutesloadingCat,
    isSuccess: attirbutessuccessCat,
    isError: attirbuteserrorstateCat,
    error: attirbuteserrormessageCat,
  } = useGetAttributesOfProductsQuery(cat, {
    skip: sub_cat,
  });

  // Getting Filtered data by color
  const colorSelected = selectedColor[1];
  const {
    data: filterDataSub,
    isLoading: filterLoading,
    isSuccess: filterSuccess,
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
  } = useGetColorWiseFilteredProductsWithOutSubQuery(
    { cat, colorSelected },
    {
      refetchOnMountOrArgChange: true,
      skip: sub_cat || !colorSelected,
    }
  );

  // Getting Filtered data by price
  const up = rangeValue[1];
  const low = rangeValue[0];

  const {
    data: filterDataSubp,
    isLoading: filterLoadingp,
    isSuccess: filterSuccessp,
  } = useGetPriceWiseFilteredProductsQuery(
    { cat, sub_cat, up, low },
    {
      refetchOnMountOrArgChange: true,
      skip: cat == 5 || cat == 3 || !up || !low,
    }
  );
  const {
    data: filterDataCatp,
    isLoading: filterLoadingCatp,
    isSuccess: filterSuccessCatp,
  } = useGetPriceWiseFilteredProductsWithOutSubQuery(
    { cat, up, low },
    {
      refetchOnMountOrArgChange: true,
      skip: sub_cat || !up || !low,
    }
  );

  // Getting filtered by fabric
  // const fabSelectedID = fabricSelect[0]
  // console.log("your log output", filterDataSubFab);
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

  // Setting product in a state
  useEffect(() => {
    if (isLoading || categoryLoading) {
      const setLoader = () => {
        return <Loader></Loader>;
      };
      setLoader();
    }
    if ((isSuccess || categoryisSuccess) && hasMore && (data?.data||catetoryData?.data)) {
      const handleSuccess = async () => {
        if (sub_cat && data?.data) {
          setProducts((prev) => [...prev, ...data.data]);
          setFilteredData((prev) => [...prev, ...data.data]);
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
        } if (cat && !sub_cat && catetoryData?.data) {

          console.log('dfgdfgd',catetoryData)
          setProducts((prev) => [...prev, ...catetoryData?.data]);
          setFilteredData((prev) => [...prev, ...catetoryData?.data]);
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
          /* setProducts(catetoryData?.data);
          setFilteredData(catetoryData?.data);
          setTotalProducts(data?.meta?.total);
          // console.log("yisnide else");
          const min = Math.min(
            ...catetoryData?.data?.map((item) => item?.p_sale_price)
          );
          const max = Math.max(
            ...catetoryData?.data?.map((item) => item?.p_sale_price)
          );
          setMin(min);
          setMax(max); */
        }
        setLoadings(false);
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
    hasMore,
  ]);


  console.log('your log output',filteredData)
  //handling minimum and maximum value
  /* useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (products) {
      const min = Math.min(...products?.map((item) => item?.p_sale_price));
      const max = Math.max(...products?.map((item) => item?.p_sale_price));
      setMin(min);
      setMax(max);
    }
  }, [products]);
  console.log("your log output", min);
  console.log("your log output", max); */

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
    if (loading || loadingCat) {
      const setLoader = () => {
        return <Loader></Loader>;
      };
      setLoader();
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
    if (attirbutesloading || attirbutesloadingCat) {
      const setLoader = () => {
        return <Loader></Loader>;
      };
      setLoader();
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
    if (filterLoadingCatFab || filterLoadingFab) {
      const setLoader = () => {
        return <Loader></Loader>;
      };
      setLoader();
    }
    const handleSuccess = () => {
      if ((filterSuccessFab || filterSuccessCatFab) && fabricID) {
        if (sub_cat) {
          setTimeout(() => {
            setFilteredData(filterDataSubFab?.data);
          }, 100);
        } else {
          setTimeout(() => {
            setFilteredData(filterDataCatFab?.data);
          }, 100);
        }
      }
      if (fabricName === "all") {
        setTimeout(() => {
          setFilteredData(products);
        }, 100);
      }
    };
    handleSuccess();

    /* const handelFilterGallery = async () => {
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
    } */
  }, [fabricID, fabricName]);
  // Filtering data by colors
  useEffect(() => {
    if ((filterSuccess || filterSuccessCat) && selectedColor) {
      if (sub_cat) {
        setTimeout(() => {
          setFilteredData(filterDataSub?.data);
        }, 100);
      } else {
        setTimeout(() => {
          setFilteredData(filterDataCat?.data);
        }, 100);
      }
    }
    if (filterLoading || filterLoadingCat) {
      const setLoader = () => {
        return <Loader></Loader>;
      };
      setLoader();
    }
  }, [selectedColor]);

  // Filtering the products using price
  useEffect(() => {
    if ((filterSuccessCatp || filterSuccessp) && rangeValue) {
      if (sub_cat) {
        setTimeout(() => {
          setFilteredData(filterDataSubp?.data);
        }, 100);
      } else {
        setTimeout(() => {
          setFilteredData(filterDataCatp?.data);
        }, 100);
      }
    }
    if (filterLoadingp || filterLoadingCatp) {
      const setLoader = () => {
        return <Loader></Loader>;
      };
      setLoader();
    }
  }, [rangeValue]);
  // Through static data
  /* useEffect(() => {
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
  }, [rangeValue]); */

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
  //handling unique colors
  useEffect(() => {
    const min = Math.min(...filteredData?.map((item) => item?.p_sale_price));
    const max = Math.max(...filteredData?.map((item) => item?.p_sale_price));
    setMin(min === max ? 0 : min);
    setMax(max);
  }, [filteredData]);

  console.log("min", min);
  console.log("max", max);

  // handling fabric change state
  const handleFabricChange = (data, id) => {
    setFabricName(data);
    setFabricSelect(data);
    setFabricID(id);
  };

  const getMoreProducts = async () => {
    // Getting product data with subCategory
    console.log("getting more products....");
    if (isLoading || categoryLoading || !hasMore) return;
    console.log("setting page");
    setPage((prev) => prev + 1);
  };

  // Handling the loading state
  // console.log("your log output", products);
  // console.log("your log output", filteredData);

  const productsForStatic = filteredData.slice(0, 7);
  const productsForDynamic = chunkArray(filteredData.slice(7));
  console.log(
    filteredData,
    productsForStatic,
    productsForDynamic,
    "filteredData"
  );

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

        <InfiniteScroll
          dataLength={filteredData.length} //This is important field to render the next data
          next={getMoreProducts}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <ProductsLayoutWithStaticImage
            productsDataChunk={productsForStatic}
            staticData={staticData}
            isLoading={attirbutesloading}
          />
          {productsForDynamic.map((productsDataChunk, idx) => (
            <ProductsLayout key={idx} productsDataChunk={productsDataChunk} />
          ))}
        </InfiniteScroll>
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
