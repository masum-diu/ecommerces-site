import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import instance from "../pages/api/api_instance";
import { useGetSearchResultQuery } from "../src/features/api/apiSlice";
import Loader from "./Loader/Loader";

const SearchModal = ({ open, setOpen }) => {
  const [searchText, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState();

  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    // isError,
    // error,
    // isFetching: isFetchingSubCat,
  } = useGetSearchResultQuery(searchText, {
    refetchOnMountOrArgChange: true,
    skip: !filterVal,
  });


  /*   const fetchData = async () => {
    return await instance
      .get(`/product?no_paginate=yes&keyword`)
      .then(function (response) {
        setSearchApiData(response.data?.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchText]); */

  useEffect(() => {
    if (isSuccess) {
      setSearchApiData(data?.data);
    }
  }, [searchText]);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData([]);
    } else {
      const filterResults = searchApiData.filter((item) =>
        item.p_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterResults);
    }
    setFilterVal(e.target.value);
  };

  return (
    <>
      {/*  */}
      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "100vw",

            height: { lg: "fit-content", xs: "fit-content" },
            mx: "auto",
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <Box p={2}>
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={2}
            justifyContent="right"
          >
            <TextField
              fullWidth
              id=""
              label=""
              value={filterVal ? filterVal : null}
              onInput={(e) => handleFilter(e)}
              size="small"
              placeholder="search products…
                  "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton> </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton aria-label="" onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </Stack>

          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            columnGap={1.5}
            rowGap={1.5}
            justifyContent="center"
            // alignItems={"center"}
            alignItems={"center"}
          >
            {searchText?.slice(0, 4).map((data) => (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                >
                  <Stack direction={"column"} mt={4} spacing={1}>
                    {/* <img src={data?.feature_image} alt="" width={100} /> */}
                    <img
                      style={{ cursor: "pointer" }}
                      src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto:face,h_180,w_180/${data?.feature_image
                        ?.split("/")
                        .slice(-3)
                        .join("/")}`}
                    />
                    <Typography
                      variant="cardHeader2"
                      color="initial"
                      textAlign={"center"}
                    >
                      {data?.p_name}
                    </Typography>
                    {/* <Typography
                      variant="cardHeader2"
                      fontWeight={"bold"}
                      color="initial"
                    >
                      BDT {data?.p_sale_price} BDT
                    </Typography> */}
                  </Stack>
                </Link>
              </>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default SearchModal;
