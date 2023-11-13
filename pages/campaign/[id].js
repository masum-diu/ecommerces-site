import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HomePageIntro from "../../components/HomePageIntro";
import HovarImage from "../../components/HovarableImage/HovarImage";
import Loader from "../../components/Loader/Loader";
import { useGetParticularCampignListsQuery } from "../../src/features/api/apiSlice";
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
  // console.log('your log output',campData)
  const Camp_id = router?.query?.cat_id;
  const Camp_name = router?.query?.cat_name;
  // const page = 1;
  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularCampignListsQuery({ Camp_id, page });
  useEffect(() => {
    if (isSuccess) {
      setCampData((prevData) => [...prevData, ...data?.data]);
      setHasMore(data?.data.length > 0);
    }
  }, [data, isSuccess]);
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  // console.log("your log output", campData);
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <HomePageIntro title={"Campaign "} />
      <Box
        sx={{
          width: "95%",
          margin: "0 auto",
          maxWidth: "1500px",
          mt: 10,
          mb: 2,
        }}
      >
        <Typography
          variant="header1"
          color="initial"
          sx={{ display: "flex", justifyContent: "center" }}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          {Camp_name}
        </Typography>
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

                <Stack
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
                        {/* BDT {product?.p_stocks[0]?.mrp} */}
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
                        {/* BDT {product?.p_stocks[0]?.mrp} */}
                        {selectedCurrency}{" "}
                        {convertPrice(data?.p_stocks[0]?.mrp)}
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* <Typography
                  variant="cardHeader2"
                  fontWeight={"bold"}
                  color="initial"
                >
                  
                  {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                </Typography> */}
                </Stack>
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
