import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HomePageIntro from "../../components/HomePageIntro";
import HovarImage from "../../components/HovarableImage/HovarImage";
import Loader from "../../components/Loader/Loader";
import {
  useGetCampignListsQuery,
  useGetParticularCampignListsQuery,
} from "../../src/features/api/apiSlice";
import { useCurrencyConversion } from "../../src/hooks/useCurrencyConversion";
import useDiscountCount from "../../src/hooks/useDiscountCount";
import InfiniteScroll from "react-infinite-scroll-component";
const campaign = () => {
  const router = useRouter();
  const [campData, setCampData] = useState([]);
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const { updatedPriceAfterDiscount } = useDiscountCount();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCampBanner, setSelectedCampBanner] = useState(null);

  const catIdMatch = /cat=(\d+)/.exec(router?.query?.id);
  const catNameMatch = /cat_name=([^&]+)/.exec(router?.query?.id);
  const Camp_id = catIdMatch ? catIdMatch[1] : null;
  const Camp_name = catNameMatch ? catNameMatch[1] : null;

  // const page = 1;
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetParticularCampignListsQuery({ Camp_id, page }, { skip: !Camp_id });
  const {
    data: campaignList,
    isLoading: campaignLoading,
    isSuccess: campaignSuccess,
    isError: campaignIsError,
    error: campaignError,
  } = useGetCampignListsQuery({ skip: !Camp_id });
  useEffect(() => {
    if (isSuccess) {
      if (page === 1) {
        setCampData((prevData) => [...data?.data]);
      } else {
        setCampData((prevData) => [...prevData, ...data?.data]);
      }
      setHasMore(data?.data.length > 0);
    }
  }, [data, router.query.id]);
  useEffect(() => {
    // Find the object with the matching id
    const selectedCamp = campaignList?.data?.find(
      (camp) => camp.id === parseInt(Camp_id)
    );

    // Set the camp_banner in state
    if (selectedCamp) {
      setSelectedCampBanner(selectedCamp.camp_banner);
    }
  }, [Camp_id, campaignList]);

  useEffect(() => {
    setCampData([]);
    setHasMore(true);
    setPage(1);
  }, [router.query.id]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  if (isLoading || campaignLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <HomePageIntro title={"Campaign "} />
      <Box >
        <Stack
          direction={"row"}
          alignItems="center"
          sx={{ position: "relative" }}
          // mb={15}
        >
          <img
            src={selectedCampBanner}
            width={1900}
            style={{ width: "100%", height: "auto" }}
            // height={700}
          />
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "40%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              textAlign={"center"}
              fontWeight={"900"}
              textTransform="uppercase"
              /* onClick={() =>
                router.push({
                  pathname: `/new-collections`,
                })
              } */
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                // pt: 4,
                // fontFamily:"cursive",
                // cursor: "pointer",
                px: 4,
                color: "#ffffff",
                fontSize: {
                  xs: "2rem",
                  xms: "3rem",
                  sm: "3rem",
                  md: "5rem",
                  lg: "5rem",
                  xl: "5rem",
                },
              }}
            >
              {Camp_name}
              {/* <li>
                {homedata?.back_url_two?.includes("campaign")
                  ? homedata?.back_url_two
                    ? /cat_name=([^&]+)/.exec(homedata?.back_url_two)[1]
                    : ""
                  : homedata?.back_url_two
                  ? /^(.*?)\?/.exec(homedata?.back_url_two)[1]
                  : ""}
                  {sectionBanner[0]?.name}
              </li> */}
            </Typography>
          </Stack>
          {/* <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1678530353/aranya-product/boishakh/ZS001671.jpg`}
            width={1900}
            style={{ width: "100%", height: "fit-content" }}
            height={700}
          /> */}
        </Stack>
      </Box>
      <Box
        sx={{
          width: "95%",
          margin: "0 auto",
          maxWidth: "1500px",
          mt: 10,
          mb: 2,
        }}
      >
        {/* <Typography
          variant="header1"
          color="initial"
          sx={{ display: "flex", justifyContent: "center" }}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          {Camp_name}
        </Typography> */}
        <InfiniteScroll
          dataLength={campData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader></Loader>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>NO MORE ITEMS AVAILABLE.</b>
            </p>
          }
        >
          <Stack
            mt={3}
            direction={"row"}
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent={"center"}
            columnGap={3}
            rowGap={3}
          >
            {campData?.map((data) => (
              <Stack direction={"column"} spacing={2} key={data?.id}>
                <HovarImage
                  url={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`${data?.p_image_one}`}
                  width={350}
                  height={350}
                ></HovarImage>

                {/* <img src={data?.feature_image} alt="" width={350} height={350} /> */}

                {/* <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"space-between"}
                >
                  <Typography variant="cardHeader2" color="initial">
                    {data?.p_name}
                  </Typography>
                  <Stack
                    direction={"column"}
                    justifyContent={"space-between"}
                    alignItems={"end"}
                  >
                    {data?.p_stocks[0]?.discount?.discount_type !==
                    undefined ? (
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        className="bold"
                      >
                        {selectedCurrency}{" "}
                        <span>
                          {
                            updatedPriceAfterDiscount(
                              convertPrice(data?.p_stocks[0]?.mrp),
                              data?.p_stocks[0]?.discount?.discount_amount,
                              data?.p_stocks[0]?.discount?.discount_type
                            ).updatedPrice
                          }
                        </span>
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Stack direction={"row"} spacing={2}>
                      {data?.p_stocks[0]?.discount?.discount_type !==
                      undefined ? (
                        <Typography
                          variant="cardHeader3"
                          color="initial"
                          className="bold"
                        >
                          -{data?.p_stocks[0]?.discount?.discount_amount}%
                        </Typography>
                      ) : (
                        ""
                      )}

                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        className="bold"
                        style={{
                          textDecorationLine: `${
                            data?.p_stocks[0]?.discount?.discount_type !==
                            undefined
                              ? "line-through"
                              : "none"
                          }`,
                        }}
                      >
                        {selectedCurrency}{" "}
                        {convertPrice(data?.p_stocks[0]?.mrp)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack> */}
              </Stack>
            ))}
          </Stack>
        </InfiniteScroll>
      </Box>
      <Footer />
    </>
  );
};

export default campaign;
