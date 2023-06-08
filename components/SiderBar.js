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
  const [list, setList] = useState({
    openList: false,
    openList1: false,
    openList2: false,
    openList3: false,
    openList4: false,
    openList5: false,
    openList6: false,
    openListJewelry: false,
    openListKids: false,
  });

  const [arrowList, setArrowList] = useState({
    arrow: false,
    arrow1: false,
    arrow2: false,
    arrow3: false,
    arrow4: false,
    arrow5: false,
    arrow6: false,
    arrowJewelry: false,
    arrowKids: false,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const { isGuestCheckout, setIsGuestCheckout, hasToken, setHasToken } =
    useContext(USER_CONTEXT);
  let usera = true;
  const handleClickAway = () => {
    setList({
      ...list,
      openList: false,
      openList1: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...list,
      arrow: false,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
  };
  const handleClick = () => {
    setList({
      ...list,
      openList: !list.openList,
      openList1: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow: !arrowList.arrow,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow(!arrow);
  };
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalWishedProduct = useSelector(
    (state) => state?.wishList?.wishList?.length
  );
  const handleClick1 = () => {
    setList({
      ...list,
      openList1: !list.openList1,
      openList: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow1: !arrowList.arrow1,
      arrow: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow1(!arrow1);
  };
  const handleClick2 = () => {
    setList({
      ...list,
      openList2: !list.openList2,
      openList1: false,
      openList: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow2: !arrowList.arrow2,
      arrow1: false,
      arrow: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow2(!arrow2);
  };
  const handleClick3 = () => {
    setList({
      ...list,
      openList3: !list.openList3,
      openList1: false,
      openList2: false,
      openList: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow3: !arrowList.arrow3,
      arrow1: false,
      arrow2: false,
      arrow: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow3(!arrow3);
  };
  const handleClick4 = () => {
    setList({
      ...list,
      openList4: !list.openList4,
      openList1: false,
      openList2: false,
      openList3: false,
      openList: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow4: !arrowList.arrow4,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow4(!arrow4);
  };
  const handleClick5 = () => {
    setList({
      ...list,
      openList5: !list.openList5,
      openList1: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList: false,
      openList6: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow5: !arrowList.arrow5,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow: false,
      arrow6: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow5(!arrow5);
  };
  const handleClick6 = () => {
    setList({
      ...list,
      openList6: !list.openList6,
      openList1: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList: false,
      openListJewelry: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrow6: !arrowList.arrow6,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow: false,
      arrowJewelry: false,
      arrowKids: false,
    });
    // setArrow6(!arrow6);
  };
  const handleClickJewelry = () => {
    setList({
      ...list,
      openListJewelry: !list.openListJewelry,
      openList1: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openList: false,
      openListKids: false,
    });
    setArrowList({
      ...arrowList,
      arrowJewelry: !arrowList.arrowJewelry,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrow: false,
      arrowKids: false,
    });
    // setArrowJewelry(!arrowJewelry);
  };
  const handleClickKids = () => {
    setList({
      ...list,
      openListKids: !list.openListKids,
      openList1: false,
      openList2: false,
      openList3: false,
      openList4: false,
      openList5: false,
      openList6: false,
      openListJewelry: false,
      openList: false,
    });
    setArrowList({
      ...arrowList,
      arrowKids: !arrowList.arrowKids,
      arrow1: false,
      arrow2: false,
      arrow3: false,
      arrow4: false,
      arrow5: false,
      arrow6: false,
      arrowJewelry: false,
      arrow: false,
    });
    // setArrowKids(!arrowKids);
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
                    arrowList.arrow ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow: !arrowList.arrow,
                            arrow1: false,
                            arrow2: false,
                            arrow3: false,
                            arrow4: false,
                            arrow5: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow: !arrowList.arrow,
                            arrow1: false,
                            arrow2: false,
                            arrow3: false,
                            arrow4: false,
                            arrow5: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    )
                  }
                >
                  Women
                </Button>
                {list.openList ? (
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
                    arrowList.arrow1 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow1: !arrowList.arrow1,
                            arrow: false,
                            arrow2: false,
                            arrow3: false,
                            arrow4: false,
                            arrow5: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow1: !arrowList.arrow1,
                            arrow: false,
                            arrow2: false,
                            arrow3: false,
                            arrow4: false,
                            arrow5: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    )
                  }
                >
                  men
                </Button>
                {list.openList1 ? (
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
                {list.openList2 ? (
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
                    arrowList.arrowKids ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrowList({ ...arrowList, 
                          arrowKids: !arrowList.arrowKids,
                          arrow1: false,
                          arrow2: false,
                          arrow3: false,
                          arrow4: false,
                          arrow5: false,
                          arrow6: false,
                          arrowJewelry: false,
                          arrow: false, })}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrowList({ ...arrowList, 
                          arrowKids: !arrowList.arrowKids,
                          arrow1: false,
                          arrow2: false,
                          arrow3: false,
                          arrow4: false,
                          arrow5: false,
                          arrow6: false,
                          arrowJewelry: false,
                          arrow: false, })}
                      />
                    )
                  }
                  onClick={handleClickKids}
                >
                  Kids
                </Button>
                {list.openListKids ? (
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
                    arrowList.arrow3 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow3: !arrowList.arrow3,
                            arrow1: false,
                            arrow2: false,
                            arrow: false,
                            arrow4: false,
                            arrow5: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow3: !arrowList.arrow3,
                            arrow1: false,
                            arrow2: false,
                            arrow: false,
                            arrow4: false,
                            arrow5: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    )
                  }
                >
                  Home
                </Button>
                {list.openList3 ? (
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

                {list.openList4 ? (
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
                    arrowList.arrowJewelry ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrowList({ ...arrowList, 
                          arrowJewelry: !arrowList.arrowJewelry,
                          arrow1: false,
                          arrow2: false,
                          arrow3: false,
                          arrow4: false,
                          arrow5: false,
                          arrow6: false,
                          arrow: false,
                          arrowKids: false, })}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrowList({ ...arrowList, 
                          arrowJewelry: !arrowList.arrowJewelry,
                          arrow1: false,
                          arrow2: false,
                          arrow3: false,
                          arrow4: false,
                          arrow5: false,
                          arrow6: false,
                          arrow: false,
                          arrowKids: false, })}
                      />
                    )
                  } */
                >
                  Jewelry
                </Button>
                {/* {list.openListJewelry ? (
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
                    arrowList.arrow5 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow5: !arrowList.arrow5,
                            arrow1: false,
                            arrow2: false,
                            arrow: false,
                            arrow4: false,
                            arrow: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() =>
                          setArrowList({
                            ...arrowList,
                            arrow5: !arrowList.arrow5,
                            arrow1: false,
                            arrow2: false,
                            arrow: false,
                            arrow4: false,
                            arrow: false,
                            arrow6: false,
                            arrowJewelry: false,
                            arrowKids: false,
                          })
                        }
                      />
                    )
                  }
                >
                  Accessories
                </Button>
                {list.openList5 ? (
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
                  arrowList.arrow6 ? (
                    <MdOutlineKeyboardArrowUp
                      onClick={() =>
                        setArrowList({
                          ...arrowList,
                          arrow6: !arrowList.arrow6,
                          arrow1: false,
                          arrow2: false,
                          arrow: false,
                          arrow4: false,
                          arrow5: false,
                          arrow: false,
                          arrowJewelry: false,
                          arrowKids: false,
                        })
                      }
                    />
                  ) : (
                    <MdOutlineKeyboardArrowDown
                      onClick={() =>
                        setArrowList({
                          ...arrowList,
                          arrow6: !arrowList.arrow6,
                          arrow1: false,
                          arrow2: false,
                          arrow: false,
                          arrow4: false,
                          arrow5: false,
                          arrow: false,
                          arrowJewelry: false,
                          arrowKids: false,
                        })
                      }
                    />
                  )
                }
              >
                Occassions
              </Button>
              {list.openList6 ? (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
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
