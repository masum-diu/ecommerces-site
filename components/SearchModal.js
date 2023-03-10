import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const SearchModal = ({ open, setOpen }) => {
  // const [message, setMessage] = useState("");

  // console.log(message);
  // const handleChange = (event) => {
  //   // 👇 Get input value from "event"
  //   setMessage(event.target.value);
  // };
  // const { handleSubmit, register } = useForm({
  //   defaultValues: {
  //     searchData: message,
  //   },
  // });
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const [data, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  // console.log(data);
  const fetchData = () => {
    return axios
      .get(
        `https://apiaranya.jumriz.com/public/api/product?no_paginate=yes&keyword`
      )
      .then((response) => {
        // setData(response.data?.data);
        setSearchApiData(response.data?.data);
      });
  };
  // console.log("search api", searchApiData);
  useEffect(() => {
    fetchData();
  }, []);
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(setFilterVal);
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
            // maxWidth: { lg: "100%",  },
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
              // {...register("searchData", {
              //   required: "Password is required",
              // })}
              // value={}
              // onChange={handleChange}
              value={filterVal}
              onInput={(e) => handleFilter(e)}
              size="small"
              placeholder="search products…
                  "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      {" "}
                      {/* <FiSearch style={{ fontSize: "18px" }} /> */}
                    </IconButton>
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
            {data?.slice(0, 4).map((data) => (
              <>
                <Link
                style={{textDecoration:"none"}}
                  href={`/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                >
                  <Stack direction={"column"} mt={4} spacing={1}>
                    <img src={data?.feature_image} alt="" width={100} />
                    <Typography variant="cardHeader2" color="initial" textAlign={"center"} >
                      {data?.p_name}
                    </Typography>
                    {/* <Typography
                      variant="cardHeader2"
                      fontWeight={"bold"}
                      color="initial"
                    >
                      BDT {data?.p_sale_price} ৳
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
