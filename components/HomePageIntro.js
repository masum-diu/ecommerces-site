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
import React, { useContext, useState } from "react";
import { BiMap, BiShoppingBag } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
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
const HomePageIntro = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const router = useRouter();
  const [value, setValue] = React.useState("0");
  const { user, setUser,setHasToken } = useContext(USER_CONTEXT);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  //

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
  const handelogout = () => {
    localStorage.clear();
    setUser("");
    setAnchorEl(null);
    handleMobileMenuClose();
    setHasToken(false)
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      <Link href={"/userDashboard"}><MenuItem onClick={handleMenuClose}>My Account</MenuItem></Link>
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
          <AccountCircle />
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
        sx={{ boxShadow: "none", backgroundColor: "#fff",height:"85px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
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
            <Link href={"/shop"}>
              <img  style={{cursor:"pointer",width:"90vw",maxWidth:"80px",marginTop:"-.5rem"}} src="/assets/headerLogo.png"  alt="" />
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
          <Hidden only={["xs", "xms", "sm"]}>
            <Stack direction={"row"} spacing={5} ml={35}>
              <Typography
                className={style.menu3}
                sx={{ cursor: "pointer" }}
                variant="cardHeader"
                color="initial"
                onClick={() => router.push("/shop")}
              >
                <li>SHOP</li>
              </Typography>
              <Typography
                className={style.menu3}
                sx={{ cursor: "pointer" }}
                variant="cardHeader"
                color="initial"
                onClick={() => router.push("/story")}
              >
                <li>STORY</li>
              </Typography>
            </Stack>

            <Stack direction={"row"} alignItems="center" spacing={2}>
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
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <MenuItem onClick={handleProfileMenuOpen}>
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
                        <AccountCircle />
                      </IconButton>
                      <p style={{ color: "#0A0A0A" }}>
                        {userjsondata ? userjsondata.name : user.name}
                      </p>
                    </MenuItem>
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

              <Stack alignItems="center" direction={"row"}>
                <IconButton aria-label="">
                  <BiMap style={{ color: "#0A0A0A" }} />
                </IconButton>
                <Typography
                  variant="cardHeader"
                  color="initial"
                  sx={{ cursor: "pointer" }}
                >
                  BD
                </Typography>
              </Stack>
              <IconButton aria-label="">
                <FiSearch
                  style={{ color: "#0A0A0A" }}
                  onClick={() => setSearchModal(true)}
                />
              </IconButton>
              <IconButton
                aria-label=""
                onClick={() => router.push("/wishlists")}
              >
                <Badge badgeContent={totalWishedProduct} color="background2">
                  <FiHeart style={{ color: "#0A0A0A" }} />
                </Badge>
              </IconButton>
              <IconButton
                aria-label=""
                onClick={() => router.push("/addtocart")}
              >
                <Badge badgeContent={totalAmount} color="background2">
                  <FiShoppingCart style={{ color: "#0A0A0A" }} />
                </Badge>
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
