import {
  AppBar,
  Avatar,
  Badge,
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
import React, { useContext, useEffect, useState } from "react";
import { BiMap, BiShoppingBag } from "react-icons/bi";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FcMenu } from "react-icons/fc";
import { HiOutlineShoppingCart } from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import { FiSearch } from "react-icons/fi";
import SiderBar from "./SiderBar";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import SearchModal from "./SearchModal";
import USER_CONTEXT from "./userContext";
import { CleaningServices } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import style from "../public/assets/css/HomePageIntro.module.css";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../src/firebase.init";
import Loader from "./Loader/Loader";
import { useGetCategoryAndSubCatListQuery } from "../src/features/api/apiSlice";
const HomePageIntro = ({ title }) => {
  const [signOut, loading] = useSignOut(auth);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const router = useRouter();
  const [value, setValue] = React.useState("0");
  const { user, setUser, setHasToken } = useContext(USER_CONTEXT);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);

  const totalAmount = useSelector((state) => state.cart?.totalAmount);
  const totalAmountWishList = useSelector(
    (state) => state?.wishList?.totalAmount
  );
  const totalWishedProduct = useSelector(
    (state) => state?.wishList?.wishList?.length
  );
  // Profile section starts here
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handelogout = async () => {
    setUser("");
    setAnchorEl(null);
    router.push("/shop");
    const success = await signOut();
    if (success) {
      router.push("/shop");
    }
    localStorage.removeItem("user");
    localStorage.removeItem("acesstoken");
    handleMobileMenuClose();
    setHasToken(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  if (loading) {
    return <Loader></Loader>;
  }
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link href={"/userDashboard"}>
        <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      </Link>
      <MenuItem onClick={handelogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle color="background2" />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Profile ends here

  return (
    <>
      <Head>
        <title>{title ? title + "- Aranya" : "Aranya"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          borderBottom: "none",
          backgroundColor: "#fff",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // py: 2,
            // backgroundColor:"red"
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
            <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
              <IconButton
                style={{ marginTop: ".50rem" }}
                onClick={() => setOpen(true)}
              >
                {/* <GoThreeBars style={{ color: "#0A0A0A" }} /> */}
                <FcMenu style={{ color: "#0A0A0A" }} />
              </IconButton>
              <Link href={"/shop"}>
                <img
                  style={{
                    cursor: "pointer",
                    width: "90vw",
                    maxWidth: "80px",
                    marginTop: ".15rem",
                  }}
                  src="/assets/headerLogo.png"
                  alt=""
                />
              </Link>
            </Stack>

            <Hidden only={["lg", "xl", "md"]}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <IconButton
                  aria-label=""
                  onClick={() => router.push("/wishlists")}
                >
                  <Badge badgeContent={totalWishedProduct} color="background2">
                    {" "}
                    {/* <FiHeart
                      style={{ color: "#0A0A0A" }}
                    
                    /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="gray"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => router.push("/addtocart")}
                >
                  <Badge badgeContent={totalAmount} color="background2">
                    {/* <FiShoppingCart
                      style={{ color: "#0A0A0A" }}
                      
                    /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="gray"
                      className="bi bi-cart2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                  </Badge>
                </IconButton>

                <IconButton aria-label="">
                  <CiSearch
                    style={{ color: "#0A0A0A" }}
                    onClick={() => setSearchModal(true)}
                  />
                </IconButton>
              </Stack>
            </Hidden>
          </Stack>
          <Hidden only={["xs", "xms", "sm"]}>
            <Box
              ml={userjsondata?.name ? { xl: 35, lg: 35 } : 30}
              mr={userjsondata?.name ? { md: 20, xl: 0, lg: 0 } : {lg:0,xl:0,md:30}}
            >
              <Stack direction={"row"} spacing={5} mt={1}>
                <Typography
                  className={style.menu3}
                  sx={{ cursor: "pointer" }}
                  variant="homeFlash"
                  color="initial"
                  onClick={() => router.push("/shop")}
                >
                  <li style={{ color: "gray" }}>SHOP</li>
                </Typography>
                <Typography
                  className={style.menu3}
                  sx={{ cursor: "pointer" }}
                  variant="homeFlash"
                  color="initial"
                  onClick={() => router.push("/story")}
                >
                  <li style={{ color: "gray" }}>STORY</li>
                </Typography>
              </Stack>
            </Box>

            <Stack direction={"row"} alignItems="center" spacing={1} mt={1}>
              <IconButton aria-label="" onClick={() => setSearchModal(true)}>
                <CiSearch style={{ color: "#0A0A0A" }} />
              </IconButton>
              {userjsondata || user.status == true ? (
                <>
                  {/* <MenuItem>
                    <IconButton
                      sx={{ cursor: "pointer" }}
                      variant="cardHeader"
                      color="initial"
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                    >
                      <AccountCircle />
                    </IconButton>
                    <p>{userjsondata?.name}</p>
                  </MenuItem> */}
                  {/* <Box sx={{ flexGrow: 1 }} /> */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                    }}
                    onClick={handleProfileMenuOpen}
                  >
                    <IconButton
                      sx={{
                        cursor: "pointer",
                        color: "#0A0A0A",
                        marginRight: "5px",
                      }}
                      variant="cardHeader"
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                    >
                      <AccountCircle color="gray" />
                    </IconButton>
                    <p style={{ color: "#0A0A0A", cursor: "pointer" }}>
                      {userjsondata
                        ? userjsondata?.name.split(" ")[0]
                        : user.name}
                    </p>
                  </Box>
                  <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="initial"
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>
                  {renderMobileMenu}
                  {renderMenu}
                </>
              ) : (
                <>
                  <Typography
                    className={style.menu3}
                    sx={{ cursor: "pointer" }}
                    variant="cardHeader"
                    color="initial"
                    onClick={() => setModalOpen(true)}
                  >
                    <li>LOGIN</li>
                  </Typography>
                </>
              )}

              <IconButton
                aria-label=""
                onClick={() => router.push("/wishlists")}
              >
                <Badge badgeContent={totalWishedProduct} color="background2">
                  {/* <TfiHeart style={{ color: "#0A0A0A", fontSize: "18px" }} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="gray"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </Badge>
              </IconButton>
              <IconButton
                aria-label=""
                onClick={() => router.push("/addtocart")}
              >
                <Badge badgeContent={totalAmount} color="background2">
                  {/* <CiShoppingCart style={{ color: "#0A0A0A" }} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="gray"
                    className="bi bi-cart2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </Badge>
              </IconButton>
              <Stack alignItems="center" direction={"row"}>
                <IconButton aria-label="">
                  {/* <BiMap style={{ color: "#0A0A0A",fontWeight:"10px" }} /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </IconButton>
                <Typography
                  variant="cardHeader"
                  
                  sx={{ cursor: "pointer",color:"#8b8b8b" }}
                >
                  BD
                </Typography>
              </Stack>
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
