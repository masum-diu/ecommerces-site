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
      }
      setApiData((prevData) => [...prevData, ...data?.data]);
    }
    setHasMore(data?.data.length > 0);
  }, [data, page, searchText, isSuccess]);
  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilterVal(value);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "30%",
            mx: "auto",
            display: "flex",
            justifyContent: "flex-start",
          },
        }}
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
              <IconButton aria-label="" onClick={() => setOpen(false)}>
                <MdClose />
              </IconButton>
              <Typography>SEARCH</Typography>
            </Stack>

            <TextField
              fullWidth
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
          <div id="scrollableDiv" style={{ }}>
            <InfiniteScroll
              dataLength={apiData?.length}
              next={fetchMoreData}
              hasMore={hasMore}
              scrollThreshold={1}
              height={600}
              loader={<p>"Loading"</p>}
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
                        color="initial"
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
