import {
  AppBar,
  Avatar,
  Hidden,
  IconButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiMap, BiShoppingBag } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { FiSearch, FiHeart } from "react-icons/fi";
import SiderBar from "../components/SiderBar";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import SearchModal from "./SearchModal";
import USER_CONTEXT from "./userContext";
import { CleaningServices } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
const HomePageIntro = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const router = useRouter();
  const [value, setValue] = React.useState("0");
  const { user, setUser } = useContext(USER_CONTEXT);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("user hay", user);
  const userdata = typeof window !== 'undefined' ?localStorage.getItem("user"):null;
  const userjsondata = JSON.parse(userdata)
  console.log("from local",userjsondata)
  return (
    <>
      <Head>
        <title>{title ? title + "- Aranya" : "Aranya"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="fixed"
        sx={{ boxShadow: "none", backgroundColor: "#fff" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={1}
            sx={{
              justifyContent: { xs: "space-between" },
              width: { xs: "100%", lg: "0%" },
            }}
          >
            <IconButton onClick={() => setOpen(true)}>
              <GoThreeBars style={{ color: "#0A0A0A" }} />
            </IconButton>
            <Link href={"/"}>
              <img
                src="https://www.aranya.eco/wp-content/uploads/2018/07/Aranya-Logo-Dark1.png"
                alt=""
                width="96px"
              />
            </Link>
            <Hidden only={["lg", "xl"]}>
              <IconButton aria-label="">
                <FiSearch
                  style={{ color: "#0A0A0A" }}
                  onClick={() => setSearchModal(true)}
                />
              </IconButton>
            </Hidden>
          </Stack>
          <Hidden only={["xs", "xms"]}>
            <Stack direction={"row"} spacing={2}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                // aria-label="secondary tabs example"
              >
                <Tab
                  sx={{ fontWeight: "bold" }}
                  onClick={() => router.push("/shop")}
                  value="0"
                  label="SHOP"
                />
                <Tab
                  sx={{ fontWeight: "bold" }}
                  onClick={() => router.push("/story")}
                  value="1"
                  label="STORY"
                />
              </Tabs>
            </Stack>

            <Stack direction={"row"} alignItems="center" spacing={2}>
              <Typography
                sx={{ cursor: "pointer" }}
                variant="cardHeader"
                color="initial"
                onClick={() => setModalOpen(true)}
              >
                {userjsondata ? (
                  <>
                    <MenuItem>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <p>{userjsondata?.name}</p>
                    </MenuItem>
                  </>
                ) : (
                  "LOGIN"
                )}
              </Typography>
              <Stack alignItems="center" direction={"row"}>
                <IconButton aria-label="">
                  <BiMap style={{ color: "#0A0A0A" }} />
                </IconButton>
                <Typography variant="cardHeader" color="initial">
                  BD
                </Typography>
              </Stack>
              <IconButton aria-label="">
                <FiSearch
                  style={{ color: "#0A0A0A" }}
                  onClick={() => setSearchModal(true)}
                />
              </IconButton>
              <IconButton aria-label="">
                <FiHeart style={{ color: "#0A0A0A" }} />
              </IconButton>
              <IconButton aria-label="">
                <BiShoppingBag style={{ color: "#0A0A0A" }} />
              </IconButton>
            </Stack>
          </Hidden>
        </Toolbar>
      </AppBar>
      <SiderBar open={open} setOpen={setOpen} />
      <LoginModal open={modalOpen} setOpen={setModalOpen} />
      <SearchModal open={searchModal} setOpen={setSearchModal} />
    </>
  );
};

export default HomePageIntro;
