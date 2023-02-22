import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import HovarImage from "../components/HovarableImage/HovarImage";
import Loader from "../components/Loader/Loader";
import { useGetParticularCampignListsQuery } from "../src/features/api/apiSlice";
const campaign = () => {
  const router = useRouter();

  if (router.asPath !== router.route) {
    var Camp_id = router?.query.cat_id;
    var Camp_name = router?.query.cat_name;
  }

  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularCampignListsQuery(Camp_id);
  const camp = data?.data;
  console.log(camp);
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
        <Stack
          mt={3}
          direction={"row"}
          flexWrap={"wrap"}
          alignItems="center"
          justifyContent={"center"}
          columnGap={3}
          rowGap={3}
        >
          {camp?.map((data) => (
            <>
              <Stack direction={"column"} spacing={2} key={data?.id}>
                <HovarImage
                  url={`/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_550,w_550/v1676527368/aranya/${data?.feature_image?.substring(
                    data?.feature_image?.lastIndexOf("/") + 1
                  )}`}
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
                  <Typography
                    variant="cardHeader2"
                    fontWeight={"bold"}
                    color="initial"
                  >
                    BDT {data?.p_sale_price} ৳
                  </Typography>
                </Stack>
              </Stack>
            </>
          ))}
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default campaign;
