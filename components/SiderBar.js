import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Stack,
  IconButton,
  Box,
  Typography,
  Button,
  ClickAwayListener,
  Hidden,
  ListItemButton,
  AppBar,
  Avatar,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Badge,
  ListItemText,
} from "@mui/material";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { BiMap, BiShoppingBag } from "react-icons/bi";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";
import LoginModal from "./LoginModal";
import USER_CONTEXT from "./userContext";
import { CleaningServices } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useGetCampignListsQuery } from "../src/features/api/apiSlice";
import Link from "next/link";

const SiderBar = ({ open, setOpen }) => {
  const router = useRouter();
  const { data, isLoading, isSuccess, isError, error } =
    useGetCampignListsQuery();
  const lists = data?.data;
  const [openList, setOpenList] = React.useState(false);
  const [openList1, setOpenList1] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);
  const [openList5, setOpenList5] = React.useState(false);
  const [openList6, setOpenList6] = React.useState(false);
  const [openListJewelry, setOpenListJewelry] = React.useState(false);
  const [openListKids, setOpenListKids] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [arrow3, setArrow3] = useState(false);
  const [arrow4, setArrow4] = useState(false);
  const [arrow5, setArrow5] = useState(false);
  const [arrow6, setArrow6] = useState(false);
  const [arrowJewelry, setArrowJewelry] = useState(false);
  const [arrowKids, setArrowKids] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
   
  const { isGuestCheckout, setIsGuestCheckout, hasToken, setHasToken } =
    useContext(USER_CONTEXT);
  let usera = true;
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalWishedProduct = useSelector(
    (state) => state?.wishList?.wishList?.length
  );

  const handleClickAway = () => {
    setOpenList(false);
  };
  const handleClick1 = () => {
    setOpenList1((prev) => !prev);
    setArrow1(!arrow1);
  };
  const handleClick2 = () => {
    setOpenList2((prev) => !prev);
    setArrow2(!arrow2);
  };
  const handleClick3 = () => {
    setOpenList3((prev) => !prev);
    setArrow3(!arrow3);
  };
  const handleClick4 = () => {
    setOpenList4((prev) => !prev);
    setArrow4(!arrow4);
  };
  const handleClick5 = () => {
    setOpenList5((prev) => !prev);
    setArrow5(!arrow5);
  };
  const handleClick6 = () => {
    setOpenList6((prev) => !prev);
    setArrow6(!arrow6);
  };
  const handleClickJewelry = () => {
    setOpenListJewelry((prev) => !prev);
    setArrowJewelry(!arrowJewelry);
  };
  const handleClickKids = () => {
    setOpenListKids((prev) => !prev);
    setArrowKids(!arrowKids);
  };

  const { user, setUser } = useContext(USER_CONTEXT);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);

  // Profile section started
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
    localStorage.clear("user");
    setUser("");
    setAnchorEl(null);
    handleMobileMenuClose();
    setModalOpen(false);
    setHasToken(false);
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
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Profile section ended

  return (
    <>
      <Drawer
        transitionDuration={{ enter: 500, exit: 500 }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "433px", xs: "300px" },
          },
        }}
      >
        <Box p={2}>
          <Stack direction={"row"} alignItems="center" spacing={2}>
            <IconButton aria-label="" onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
            <img
              src="/assets/headerLogo.png"
              alt=""
              style={{ width: "90vw", maxWidth: "80px", marginTop: "-.5rem" }}
            />
          </Stack>

          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
            <Box mt={2}>
              <Stack direction={"column"}>
                {/* Women Starts Here */}
                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  onClick={handleClick}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  endIcon={
                    arrow ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow(!arrow)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow(!arrow)}
                      />
                    )
                  }
                >
                  Women
                </Button>
                {openList ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/saree",
                              query: {
                                data: JSON.stringify({ cat: 1, sub_cat: 7 }),
                                cat: 1,
                                sub_cat: 7,
                              },
                            },
                            "/products/saree?cat=1&sub_cat=7"
                          )
                        }
                      >
                        Saree
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ mx: 2 }}
                      >
                        What’s New
                      </Typography>
                    </Stack>

                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/salwar-kameez",
                              query: {
                                data: JSON.stringify({ cat: 1, sub_cat: 8 }),
                                cat: 1,
                                sub_cat: 8,
                              },
                            },
                            "/products/salwar-kameez?cat=1&sub_cat=8"
                          )
                        }
                      >
                        Salwar Kameez
                      </Typography>
                      <Typography variant="cardHeader3" color="initial">
                        Limited Edition
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/kurti-fatua",
                              query: {
                                data: JSON.stringify({ cat: 1, sub_cat: 9 }),
                                cat: 1,
                                sub_cat: 9,
                              },
                            },
                            "/products/kurti-fatua?cat=1&sub_cat=9"
                          )
                        }
                      >
                        Kurti & Fatua
                      </Typography>
                      <Typography variant="cardHeader3" color="initial">
                        Special Edition
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/tops-shirts",
                              query: {
                                data: JSON.stringify({ cat: 1, sub_cat: 10 }),
                                cat: 1,
                                sub_cat: 10,
                              },
                            },
                            "/products/tops-shirts?cat=1&sub_cat=10"
                          )
                        }
                      >
                        Tops & Shirts
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ mx: { xs: 4, lg: 5 } }}
                      >
                        Discount
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/kimono",
                              query: {
                                data: JSON.stringify({ cat: 1, sub_cat: 11 }),
                                cat: 1,
                                sub_cat: 11,
                              },
                            },
                            "/products/kimono?cat=1&sub_cat=11"
                          )
                        }
                      >
                        Kimono
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ mx: { xs: 6.5, lg: 8 } }}
                      >
                        Offer
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/kaftan",
                              query: {
                                data: JSON.stringify({ cat: 1, sub_cat: 12 }),
                                cat: 1,
                                sub_cat: 12,
                              },
                            },
                            "/products/kaftan?cat=1&sub_cat=12"
                          )
                        }
                      >
                        Kaftan
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}

                {/* Men Starts Here */}
                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  onClick={handleClick1}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  endIcon={
                    arrow1 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow1(!arrow1)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow1(!arrow1)}
                      />
                    )
                  }
                >
                  men
                </Button>
                {openList1 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/panjabi",
                              query: {
                                data: JSON.stringify({ cat: 2, sub_cat: 13 }),
                                cat: 2,
                                sub_cat: 13,
                              },
                            },
                            "/products/panjabi?cat=2&sub_cat=13"
                          )
                        }
                      >
                        Panjabi
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: 2 }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/fatua",
                              query: {
                                data: JSON.stringify({ cat: 2, sub_cat: 16 }),
                                cat: 2,
                                sub_cat: 16,
                              },
                            },
                            "/products/fatua?cat=2&sub_cat=16"
                          )
                        }
                      >
                        Fatua
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/vest",
                              query: {
                                data: JSON.stringify({ cat: 2, sub_cat: 14 }),
                                cat: 2,
                                sub_cat: 14,
                              },
                            },
                            "/products/vest?cat=2&sub_cat=14"
                          )
                        }
                      >
                        Vest
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: 2 }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/shirts",
                              query: {
                                data: JSON.stringify({ cat: 2, sub_cat: 17 }),
                                cat: 2,
                                sub_cat: 17,
                              },
                            },
                            "/products/shirts?cat=2&sub_cat=17"
                          )
                        }
                      >
                        Shirts
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/t-shirt",
                              query: {
                                data: JSON.stringify({ cat: 2, sub_cat: 15 }),
                                cat: 2,
                                sub_cat: 15,
                              },
                            },
                            "/products/t-shirt?cat=2&sub_cat=15"
                          )
                        }
                      >
                        T-Shirt
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: 1 }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/jackets",
                              query: {
                                data: JSON.stringify({ cat: 2, sub_cat: 18 }),
                                cat: 2,
                                sub_cat: 18,
                              },
                            },
                            "/products/jackets?cat=2&sub_cat=18"
                          )
                        }
                      >
                        Jackets
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}

                {/* Kids Starts Here */}

                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/products/kids",
                        query: { data: JSON.stringify({ cat: 3 }), cat: 3 },
                      },
                      "/products/kids?cat=3"
                    )
                  }
                >
                  Kids
                </Button>
                {openList2 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}></Box>
                ) : null}
                {/* Updated Kids Section Don't #####********Delete */}
                {/* <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  endIcon={
                    arrowKids ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow1(!arrowKids)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow1(!arrowKids)}
                      />
                    )
                  }
                  onClick={handleClickKids}
                >
                  Kids
                </Button>
                {openListKids ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/babies",
                              query: { cat: 3, sub_cat: 40 },
                            },
                            "/products/babies?cat=3&sub_cat=30"
                          )
                        }
                      >
                        Babies
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 6, lg: 8 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/boys",
                              query: { cat: 3, sub_cat: 39 },
                            },
                            "/products/boys?cat=3&sub_cat=39"
                          )
                        }
                      >
                        Boys
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/girls",
                              query: { cat: 3, sub_cat: 38 },
                            },
                            "/products/girls?cat=3&sub_cat=38"
                          )
                        }
                      >
                        Girls
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 4, lg: 5 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/toddlers",
                              query: { cat: 3, sub_cat: 41 },
                            },
                            "/products/toddlers?cat=3&sub_cat=41"
                          )
                        }
                      >
                        Toddlers
                      </Typography>
                    </Stack>
                  </Box>
                ) : null} */}

                {/* Home Stars Here */}
                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  onClick={handleClick3}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  endIcon={
                    arrow3 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow3(!arrow3)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow3(!arrow3)}
                      />
                    )
                  }
                >
                  Home
                </Button>
                {openList3 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/baby-kantha",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 19 }),
                                cat: 4,
                                sub_cat: 19,
                              },
                            },
                            "/products/baby-kantha?cat=4&sub_cat=19"
                          )
                        }
                      >
                        Baby Kantha
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 1.5, lg: 2 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/bed-cover",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 20 }),
                                cat: 4,
                                sub_cat: 20,
                              },
                            },
                            "/products/bed-cover?cat=4&sub_cat=20"
                          )
                        }
                      >
                        Bed Cover
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/cushion-cover",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 21 }),
                                cat: 4,
                                sub_cat: 21,
                              },
                            },
                            "/products/cushion-cover?cat=4&sub_cat=21"
                          )
                        }
                      >
                        Cushion Cover
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 4, lg: 5 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/basket",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 22 }),
                                cat: 4,
                                sub_cat: 22,
                              },
                            },
                            "/products/basket?cat=4&sub_cat=22"
                          )
                        }
                      >
                        Basket
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/ceramic",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 23 }),
                                cat: 4,
                                sub_cat: 23,
                              },
                            },
                            "/products/ceramic?cat=4&sub_cat=23"
                          )
                        }
                      >
                        Ceramic
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 4, lg: 4.9 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/napkin",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 24 }),
                                cat: 4,
                                sub_cat: 24,
                              },
                            },
                            "/products/napkin?cat=4&sub_cat=24"
                          )
                        }
                      >
                        Napkin
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/table-cloth",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 25 }),
                                cat: 4,
                                sub_cat: 25,
                              },
                            },
                            "/products/table-cloth?cat=4&sub_cat=25"
                          )
                        }
                      >
                        Table Cloth
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/table-runner",
                              query: {
                                data: JSON.stringify({ cat: 4, sub_cat: 26 }),
                                cat: 4,
                                sub_cat: 26,
                              },
                            },
                            "/products/table-runner?cat=4&sub_cat=26"
                          )
                        }
                      >
                        Table Runner
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}

                {/* Beauty Starts Here */}
                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/products/beauty-collection",
                        query: { cat: 5 },
                      },
                      "/products/beauty-collection?cat=5"
                    )
                  }
                >
                  Beauty
                </Button>

                {openList4 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}></Box>
                ) : null}

                {/* Jewelry Starts Here */}
                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  onClick={handleClickJewelry}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  /* endIcon={
                    arrowJewelry ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrowJewelry(!arrowJewelry)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrowJewelry(!arrowJewelry)}
                      />
                    )
                  } */
                >
                  Jewelry
                </Button>
                {/* {openListJewelry ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/metal-jewellery",
                              query: { cat: 37, sub_cat: 31 },
                            },
                            "/products/metal-jewellery?cat=6&sub_cat=31"
                          )
                        }
                      >
                        Aatong
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/other-jewellery",
                              query: { cat: 6, sub_cat: 32 },
                            },
                            "/products/other-jewellery?cat=6&sub_cat=32"
                          )
                        }
                      >
                        Silver Jewellery
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/ashtodhatu-jewellery",
                              query: { cat: 6, sub_cat: 29 },
                            },
                            "/products/ashtodhatu-jewellery?cat=6&sub_cat=29"
                          )
                        }
                      >
                        Cangbuk
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/silver-jewellery",
                              query: { cat: 6, sub_cat: 30 },
                            },
                            "/products/silver-jewellery?cat=6&sub_cat=30"
                          )
                        }
                      >
                        Metal Jewellery
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/metal-jewellery",
                              query: { cat: 6, sub_cat: 31 },
                            },
                            "/products/metal-jewellery?cat=6&sub_cat=31"
                          )
                        }
                      >
                        Ashtodhatu Jewellery
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/other-jewellery",
                              query: { cat: 6, sub_cat: 32 },
                            },
                            "/products/other-jewellery?cat=6&sub_cat=32"
                          )
                        }
                      >
                        Other Jewellery
                      </Typography>
                    </Stack>
                  </Box>
                ) : null} */}

                {/* Accessories Starts Here */}
                <Button
                  className="SemiBold"
                  variant="text"
                  color="inherit"
                  onClick={handleClick5}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  endIcon={
                    arrow5 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow5(!arrow5)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow5(!arrow5)}
                      />
                    )
                  }
                >
                  Accessories
                </Button>
                {openList5 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/aatong",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 27 }),
                                cat: 6,
                                sub_cat: 27,
                              },
                            },
                            "/products/aatong?cat=6&sub_cat=27"
                          )
                        }
                      >
                        Aatong
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 4.5, lg: 5 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/cangbuk",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 28 }),
                                cat: 6,
                                sub_cat: 28,
                              },
                            },
                            "/products/cangbuk?cat=6&sub_cat=28"
                          )
                        }
                      >
                        Cangbuk
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/ashtodhatu-jewellery",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 29 }),
                                cat: 6,
                                sub_cat: 29,
                              },
                            },
                            "/products/ashtodhatu-jewellery?cat=6&sub_cat=29"
                          )
                        }
                      >
                        Ashtodhatu Jewellery
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/silver-jewellery",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 30 }),
                                cat: 6,
                                sub_cat: 30,
                              },
                            },
                            "/products/silver-jewellery?cat=6&sub_cat=30"
                          )
                        }
                      >
                        Silver Jewellery
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/metal-jewellery",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 31 }),
                                cat: 6,
                                sub_cat: 31,
                              },
                            },
                            "/products/metal-jewellery?cat=6&sub_cat=31"
                          )
                        }
                      >
                        Metal Jewellery
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/other-jewellery",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 32 }),
                                cat: 6,
                                sub_cat: 32,
                              },
                            },
                            "/products/other-jewellery?cat=6&sub_cat=32"
                          )
                        }
                      >
                        Other Jewellery
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/scarves",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 33 }),
                                cat: 6,
                                sub_cat: 33,
                              },
                            },
                            "/products/scarves?cat=6&sub_cat=33"
                          )
                        }
                      >
                        Scarves
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 6, lg: 7 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/stoles",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 34 }),
                                cat: 6,
                                sub_cat: 34,
                              },
                            },
                            "/products/stoles?cat=6&sub_cat=34"
                          )
                        }
                      >
                        Stoles
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/orna",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 35 }),
                                cat: 6,
                                sub_cat: 35,
                              },
                            },
                            "/products/orna?cat=6&sub_cat=35"
                          )
                        }
                      >
                        Orna
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer", mx: { xs: 5.5, lg: 6 } }}
                        onClick={() =>
                          router.push(
                            {
                              pathname: "/products/shawls",
                              query: {
                                data: JSON.stringify({ cat: 6, sub_cat: 36 }),
                                cat: 6,
                                sub_cat: 36,
                              },
                            },
                            "/products/shawls?cat=6&sub_cat=36"
                          )
                        }
                      >
                        Shawls
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
              </Stack>
              <Button
                className="SemiBold"
                variant="text"
                color="inherit"
                onClick={handleClick6}
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  textTransform: "capitalize",
                }}
                endIcon={
                  arrow6 ? (
                    <MdOutlineKeyboardArrowUp
                      onClick={() => setArrow6(!arrow6)}
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      onClick={() => setArrow6(!arrow6)}
                    />
                  )
                }
              >
                Occassions
              </Button>
              {openList6 ? (
                <Box sx={{ width: "80%", margin: "0 auto" }}>
                  <Stack direction={"column"} mt={2} spacing={1.5}>
                    {lists?.map((list) => (
                      <Typography
                        key={list.id}
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            pathname: "/campaign",
                            query: {
                              cat_id: `${list?.id}`,
                              cat_name: `${list?.camp_name}`,
                            },
                          })
                        }
                      >
                        {list.camp_name}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ) : null}
            </Box>
          </ClickAwayListener>
          <Hidden only={["md", "lg", "xl"]}>
            <Stack
              direction={"column"}
              pt={13}
              spacing={1}
              justifyContent="flex-start"
              alignItems={"flex-start"}
              
            >
              <Button
                variant="text"
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="cardHeader"
                  className="SemiBold"
                  color="initial"
                  onClick={() => router.push("/shop")}
                >
                  SHOP
                </Typography>
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="cardHeader"
                  className="SemiBold"
                  color="initial"
                  onClick={() => router.push("/story")}
                >
                  STORY
                </Typography>
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {userjsondata || user.status == true ? (
                  <>
                    <Stack
                      onClick={handleProfileMenuOpen}
                      direction={"row"}
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <AccountCircle style={{ color: "#0A0A0A" }} />

                      <Typography variant="cardHeader" className="SemiBold">
                        {userjsondata ? (
                          <Typography variant="cardHeader">
                            {userjsondata.name}
                          </Typography>
                        ) : (
                          <Typography variant="cardHeader">
                            {user.name}
                          </Typography>
                        )}
                      </Typography>
                    </Stack>

                    {renderMobileMenu}
                    {renderMenu}
                  </>
                ) : (
                  <>
                    <Typography
                      variant="cardHeader"
                      className="SemiBold"
                      color="initial"
                      onClick={() => setModalOpen(true)}
                    >
                      LOGIN
                    </Typography>
                  </>
                )}
              </Button>

              <Stack alignItems="center" direction={"row"}>
                <IconButton aria-label="">
                  {/* <BiMap style={{ color: "#0A0A0A" }} /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </IconButton>
                <Typography
                  variant="cardHeader"
                  color="initial"
                  className="SemiBold"
                >
                  BD
                </Typography>
              </Stack>
              {/* <IconButton aria-label="">
                <FiSearch style={{ color: "#0A0A0A" }} />
              </IconButton> */}
              
            </Stack>
          </Hidden>
        </Box>
        <LoginModal open={modalOpen} setOpen={setModalOpen} />
      </Drawer>
    </>
  );
};

export default SiderBar;
