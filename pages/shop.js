import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import Loader from "../components/Loader/Loader";
import { useGetProductsQuery,useGetHomePageProductsQuery } from "../src/features/api/apiSlice";

const shop = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  const { data: post } = useGetHomePageProductsQuery();
  // console.log('output',post)
  if (isLoading) {
    return (
      <Stack
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Loader></Loader>
      </Stack>
    );
  }
  const products = data?.data;
  console.log("from shop", products);
  return (
    <>
      <HomePageIntro title={"Shop "} />
      <Box mt={10} sx={{ width: "100%", mb: 4 }}>
        <Stack>
          {/* <video
            src="https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-party/subhome-xmedia-47-2//w/1920/IMAGE-landscape-fill-90388659-c9ad-44c0-8fbc-3e049adef8d9-default_0.jpg?ts=1669457847606"
            alt=""
            width="100%"
          /> */}
          
          <video width="100%" autoPlay muted loop>
            <source src={homedata?.image_one} />
          </video>
          {/* <Image
            src=
            {repo.image_two}
            width={1900}
            style={{ width: "100%", height: "fit-content" }}
            height={700}
          /> */}
          <img
            src={homedata?.image_two}
            alt=""
            style={{ width: "100%", height: "fit-content" }}
          />
        </Stack>
        <Stack direction={"row"} sx={{ width: "100%" }}>
          <img src={homedata?.image_three} alt="" width={"50%"} />
          <img src={homedata?.image_four} alt="" width={"50%"} />
        </Stack>
        <Box mt={4}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="tabText" color="initial">
                YOU MAY ALSO LIKE
              </Typography>
              <Typography variant="tabText" color="initial">
                VIEW ALL
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent={"center"}
              columnGap={3}
              rowGap={3}
            >
              {products?.slice(0, 4).map((data) => (
                <>
                  <Stack direction={"column"} spacing={2} key={data?.id}>
                    <img src={data?.feature_image} alt="" width={300} />

                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="cardHeader2" color="initial">
                        {data?.p_name}
                      </Typography>
                      <Typography
                        variant="cardHeader2"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        BDT {data?.p_sale_price}
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* <Image
          src="/assets/f1.png"
          width={1900}
          style={{ width: "100%", height: "fit-content", marginTop: "25px" }}
          height={700}
        /> */}
        <img
          src={homedata?.image_five}
          alt=""
          style={{ width: "100%", height: "fit-content", marginTop: "25px" }}
        />
        <Box mt={4}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="tabText" color="initial">
                WHAT'S NEW
              </Typography>
              <Typography variant="tabText" color="initial">
                VIEW ALL
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent={"center"}
              columnGap={3}
              rowGap={3}
            >
              {products?.slice(0, 4).map((data) => (
                <>
                  <Stack direction={"column"} spacing={2} key={data?.id}>
                    <img src={data?.feature_image} alt="" width={300} />

                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="cardHeader2" color="initial">
                        {data?.p_name}
                      </Typography>
                      <Typography
                        variant="cardHeader2"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        BDT {data?.p_sale_price}
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default shop;
