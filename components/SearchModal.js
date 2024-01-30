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
import InfiniteScroll from "react-infinite-scroll-component";

const SearchModal = ({ open, setOpen }) => {
  /* const [searchText, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState(); */
  const [searchText, setSearchText] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [apiData, setApiData] = useState([]);
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isSuccess } = useGetSearchResultQuery({
    searchText,
    page,
  });

  // Debouncing logic with an additional delay after the last keypress
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const delayedHandleFilter = (value) => {
    setSearchText(value);
    setPage(1);
  };

  const debouncedHandleFilter = debounce(delayedHandleFilter, 1000); //

  useEffect(() => {
    if (page === 1) {
      if (searchText === "") {
        setApiData([]);
      } else {
        setApiData(data?.data);
      }
    } else {
      if (searchText === "") {
        setApiData([]);
      } else {
        setApiData((prevData) => [...prevData, ...data?.data]);
      }
    }
    setHasMore(data?.data.length > 0);
  }, [data]);
  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    setPage(1);
  }, [searchText]);
  const handleFilter = (e) => {
    const value = e.target.value;
    debouncedHandleFilter(value);
    setFilterVal(value);
  };

  return (
    <>
      <Drawer
        className="some"
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "433px", xs: "300px" },
            mx: "auto",
            display: "flex",
            justifyContent: "flex-start",
          },
        }}
        transitionDuration={{ enter: 500, exit: 500 }}
        onClose={() => setOpen(false)}
      >
        <Box p={3}>
          <Stack
            direction={"column"}
            alignItems="flex-start"
            spacing={2}
            justifyContent="right"
          >
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <IconButton
                aria-label=""
                onClick={() => {
                  setOpen(false);
                  setApiData([]);
                }}
              >
                {/* <MdClose /> */}
                <img src="/assets/close_sidebar.svg" alt="" />
              </IconButton>
              <Typography sx={{ ml: 2 }} color="#1B3148">
                SEARCH
              </Typography>
            </Stack>

            <TextField
              fullWidth
              sx={{ color: "#1B3148" }}
              id="standard-textarea"
              label="Search products…"
              value={filterVal ? filterVal : null}
              onInput={(e) => handleFilter(e)}
              size="small"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton> </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <div id="scrollableDiv" style={{}}>
            <InfiniteScroll
              dataLength={apiData?.length}
              next={fetchMoreData}
              hasMore={hasMore}
              scrollThreshold={1}
              style={{ overflow: "auto" }}
              height={700}
              // loader={<p>"Loading"</p>}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>NO MORE ITEMS AVAILABLE.</b>
                </p>
              }
            >
              <Stack
                direction={"column"}
                flexWrap={"wrap"}
                columnGap={1.5}
                rowGap={1.5}
                justifyContent="center"
                alignItems={"flex-start"}
              >
                {apiData?.map((data, index) => (
                  <Link
                    key={index}
                    style={{ textDecoration: "none" }}
                    href={`/products/${
                      data?.p_subcategory?.slug === "unknown"
                        ? data?.p_category?.slug
                        : data?.p_subcategory?.slug
                    }/${data?.id}`}
                  >
                    <Stack direction={"column"} mt={4} spacing={1}>
                      <img
                        style={{
                          cursor: "pointer",
                          width: "90vw",
                          maxWidth: "90px",
                        }}
                        src={`${data?.p_image_one}`}
                      />
                      <Typography
                        variant="cardHeader2"
                        color="#1B3148"
                        textAlign={"center"}
                      >
                        {data?.p_name}
                      </Typography>
                    </Stack>
                  </Link>
                ))}
              </Stack>
            </InfiniteScroll>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default SearchModal;
