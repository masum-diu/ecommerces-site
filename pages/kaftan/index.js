import {
  Box,
  Grid,
  Hidden,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useRouter } from "next/router";
import SegmentIcon from "@mui/icons-material/Segment";
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";
import HomePageIntro from "../../components/HomePageIntro";
import Menu1 from "../../components/Menu1";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import MenuDawer from "../../components/MenuDawer";
import Menu1Dawer from "../../components/Menu1Dawer";
import Link from "next/link";
const masterCollectionLayout = () => {
  const router = useRouter();
  console.log("sdsdf", router);
  const [lists, setLists] = useState(false);
  const [lists1, setLists1] = useState(false);
  const data = [
    {
      id: 1,
      title: "Demo Product Name",
      price: "5,185",
      image: "/assets/saree3.png",
    },
    {
      id: 2,
      title: "Demo Product Name",
      price: "5,185",
      image: "/assets/saree3.png",
    },
    {
      id: 3,
      title: "Demo Product Name",
      price: "5,185",
      image: "/assets/saree3.png",
    },
  ];
  return (
    <>
      <HomePageIntro title={"Master Collection Layout "} />
      <Box mt={10} mb={4}>
        <Stack direction={"row"} alignItems="center">
          <Image
            src="/assets/saree.png"
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
              onClick={() => router.push("/")}
            >
              Home
            </Typography>
            <MdOutlineKeyboardArrowRight />
            <Typography
              variant="cardHeader2"
              sx={{ cursor: "pointer" }}
              color="initial"
            >
              Collection
            </Typography>
          </Stack>
          <Typography variant="cardHeader1" color="initial">
            WOMEN SHIRT COLLECTION
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
          <IconButton onClick={() => setLists1(true)}>
            <Hidden only={["xl", "lg"]}>
              <SegmentIcon />
            </Hidden>
          </IconButton>
        </Stack>

        <Box sx={{ backgroundColor: "#FAFAFA" }}>
          <Hidden only={["xs", "xms", "sm"]}>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                width: "100%",
                maxWidth: "1500px",
                margin: "0 auto",
                height: "61px",
                justifyContent: "space-between",
              }}
            >
              <Stack direction={"row"} spacing={4}>
                <Menu1 title={"Cotton Saree"} />
                <Menu1 title={"Silk Saree"} />
                <Menu1 title={"Nakshikantha Saree"} />
                <Menu1 title={"Jamdani Saree"} />
              </Stack>
              <Stack direction={"row"} spacing={4}>
                <Menu title={"Category"} />
                <Menu title={"Color"} />
                <Menu title={"Fabric"} />
                <Menu title={"Price"} />
                <Menu title={"Size"} />
              </Stack>
            </Stack>
          </Hidden>
        </Box>

        <Stack
          direction={"column"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 1, lg: 2 },
          }}
        >
          <Image
            src="/assets/saree1.png"
            width={565}
            height={565}
            style={{ maxWidth: "90%", height: "fit-content" }}
          />
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              maxWidth: "565px",
              mt: 2,
            }}
          >
            <Typography variant="cardHeader3" color="initial">
              Demo Product Name
            </Typography>
            <Typography variant="cardHeader3" color="initial">
              BDT 5,185
            </Typography>
          </Stack>
        </Stack>

        <Grid
          container
          justifyContent={"center"}
          spacing={2}
          sx={{
            width: "90%",
            maxWidth: "1500px",
            margin: "0 auto",
            marginTop: "3rem",
          }}
        >
          {data.map((dataList) => (
            <>
              <Grid item lg={4} sm={6} key={dataList.id}>
                <Link href={`/${router.asPath}/${dataList.id}`}>
                  <Image
                    src={dataList.image}
                    width={568}
                    height={827}
                    style={{ maxWidth: "100%", height: "fit-content" }}
                  />
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="cardHeader3" color="initial">
                      {dataList.title}
                    </Typography>
                    <Typography variant="cardHeader3" color="initial">
                      BDT {dataList.price}
                    </Typography>
                  </Stack>
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
        <Stack direction={"row"} sx={{ width: "100%" }} mt={4}>
          <img
            src="https://blog.ebulking.com/wp-content/uploads/2020/02/001_IMG_7883.jpg"
            alt=""
            width={"50%"}
          />
          <img
            src="https://www.mamathatulluri.com/products/bgphotos/BlackA-LineCottonSleevelessKurtiDress_bimg605aee0f246c7.jpg"
            alt=""
            width={"50%"}
          />
        </Stack>
        <Grid
          container
          justifyContent={"center"}
          spacing={2}
          sx={{
            width: "90%",
            maxWidth: "1500px",
            margin: "0 auto",
            marginTop: "3rem",
          }}
        >
          {data.map((dataList) => (
            <>
              <Grid
                item
                lg={4}
                sm={6}
                justifyContent="center"
                key={dataList.id}
              ><Link href={`/${router.asPath}/${dataList.id}`}>
                <Image
                  src={dataList.image}
                  width={568}
                  height={827}
                  style={{ maxWidth: "100%", height: "fit-content" }}
                />
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"space-between"}
                >
                  <Typography variant="cardHeader3" color="initial">
                    {dataList.title}
                  </Typography>
                  <Typography variant="cardHeader3" color="initial">
                    BDT {dataList.price}
                  </Typography>
                </Stack>
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
        <Stack
          direction={"column"}
          sx={{ justifyContent: "center", alignItems: "center", mt: 5 }}
        >
          <Image
            src="/assets/k.png"
            width={565}
            height={565}
            style={{ maxWidth: "90%", height: "fit-content" }}
          />
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              maxWidth: "565px",
              mt: 2,
            }}
          >
            <Typography variant="cardHeader3" color="initial">
              Demo Product Name
            </Typography>
            <Typography variant="cardHeader3" color="initial">
              BDT 5,185
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Footer />
      <MenuDawer open={lists} setOpen={setLists} />
      <Menu1Dawer open={lists1} setOpen={setLists1} />
    </>
  );
};

export default masterCollectionLayout;
