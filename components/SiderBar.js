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
  MenuItem,
  Grid,
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
import { useSignOut } from "react-firebase-hooks/auth";
import {
  useGetCampignListsQuery,
  useGetCategoryAndSubCatListQuery,
} from "../src/features/api/apiSlice";
import Link from "next/link";
import Loader from "./Loader/Loader";
import auth from "../src/firebase.init";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const SiderBar = ({ open, setOpen }) => {
  const [categoryAndSubCatList, setCatAndSubCatList] = useState([]);
  const [signOut, loading] = useSignOut(auth);
  const {
    data: catAndSubCatList,
    isLoading: isListLoading,
    isError: isCatError,
    isSuccess: isCatSuccess,
    error: catError,
  } = useGetCategoryAndSubCatListQuery();
  const router = useRouter();
  const { data, isLoading, isSuccess, isError, error } =
    useGetCampignListsQuery();
  const lists = data?.data;
  const [list, setList] = useState(null);

  const [arrowList, setArrowList] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [occasion, setOccasion] = useState(false);
  const [arrowListOccasion, setArrowListOccasion] = useState(false);
  const { isGuestCheckout, setIsGuestCheckout, hasToken, setHasToken } =
    useContext(USER_CONTEXT);
  const handleClickAway = () => {
    setList(null);
    setArrowList(null);
    setOccasion(false);
    setArrowListOccasion(false);
  };
  useEffect(() => {
    if (catAndSubCatList && isCatSuccess) {
      setCatAndSubCatList(catAndSubCatList);
    }
  }, [catAndSubCatList, isCatSuccess, categoryAndSubCatList]);

  const { user, setUser } = useContext(USER_CONTEXT);

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
  const handelogout = async () => {
    // localStorage.clear("user");
    setUser("");
    setAnchorEl(null);
    const success = await signOut();
    if (success) {
      router.push("/shop");
    }
    localStorage.removeItem("user");
    localStorage.removeItem("acesstoken");
    handleMobileMenuClose();
    setModalOpen(false);
    setHasToken(false);
  };
  const handleClick = (id, hasChild, cat_id, slug) => {
    if (list === id) {
      // If the clicked category is already open, collapse it
      setList(null);
      setArrowList(null);
    } else {
      // If a different category is clicked, expand it
      setList(id);
      setArrowList(id);
    }
    if (hasChild === 0) {
      router.push(
        {
          pathname: `/products/${slug}`,
          query: {
            data: JSON.stringify({
              cat: cat_id,
            }),
            cat: cat_id,
          },
        },
        `/products/${slug}?cat=${cat_id}`
      );
    }
  };
  const handleClickOccasion = () => {
    setOccasion((prev) => !prev);
    setArrowListOccasion(!arrowListOccasion);
    // setArrow6(!arrow6);
  };
  if (isListLoading) {
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
          <AccountCircle style={{ color: "#3D5675" }} />
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
              <MdClose style={{color:"#3D5675"}} />
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
                {categoryAndSubCatList.map((category, index) => (
                  <>
                    <Button
                      key={index}
                      className="SemiBold"
                      variant="text"
                      // color="inherit"
                      onClick={() =>
                        handleClick(
                          category?.id,
                          category?.children.length,
                          category?.id,
                          category?.slug
                        )
                      }
                      fullWidth
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        textTransform: "capitalize",
                        color:"#1B3148"
                      }}
                      endIcon={
                        category?.children.length > 0 ? (
                          arrowList === category.id ? (
                            <MdOutlineKeyboardArrowUp />
                          ) : (
                            <MdOutlineKeyboardArrowDown />
                          )
                        ) : (
                          ""
                        )
                      }
                    >
                      {category?.category_name}
                    </Button>
                    {category?.children.length > 0 ? (
                      <>
                        {list === category.id ? (
                          <Box sx={{ width: "80%", margin: "0 auto" }}>
                            <Grid container spacing={2}>
                              {category.children.map((sub_cat, index) => (
                                <>
                                  <Grid item xs={6} sm={6} key={index}>
                                    <Typography
                                      variant="cardHeader3"
                                      color="#1B3148"
                                      sx={{ cursor: "pointer" }}
                                      onClick={() =>
                                        router.push(
                                          {
                                            pathname: `/products/${sub_cat?.slug}`,
                                            query: {
                                              data: JSON.stringify({
                                                cat: sub_cat?.parent_category,
                                                sub_cat: sub_cat?.id,
                                              }),
                                              cat: sub_cat?.parent_category,
                                              sub_cat: sub_cat?.id,
                                            },
                                          },
                                          `/products/${sub_cat?.slug}?cat=${
                                            sub_cat?.parent_category
                                          }${
                                            sub_cat?.id
                                              ? `&sub_cat=${sub_cat?.id}`
                                              : ""
                                          }`
                                        )
                                      }
                                    >
                                      {sub_cat.category_name}
                                    </Typography>
                                  </Grid>
                                </>
                              ))}
                              <Grid item xs={6} sm={6}>
                                <Typography
                                  variant="bolder"
                                  color="#1B3148"
                                  sx={{ cursor: "pointer" }}
                                  onClick={() =>
                                    router.push(
                                      {
                                        pathname: `/new-collections`,
                                        query: {
                                          data: JSON.stringify({
                                            cat: category?.id,
                                          }),
                                          cat: category?.id,
                                        },
                                      },
                                      `/new-collections/${category?.slug}?cat=${category?.id}`
                                    )
                                  }
                                >
                                  What's New
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        ) : null}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ))}
                <Button
                  className="SemiBold"
                  variant="text"
                  // color="inherit"
                  onClick={handleClickOccasion}
                  fullWidth
                  sx={{
                    color:"#1B3148",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  endIcon={
                    arrowListOccasion ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrowListOccasion(!arrowListOccasion)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrowListOccasion(!arrowListOccasion)}
                      />
                    )
                  }
                >
                  Occasions
                </Button>
                {occasion ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <Stack direction={"column"} mt={2} spacing={1.5}>
                      {lists?.map((list, index) => (
                        <Typography
                          key={index}
                          variant="cardHeader3"
                          color="initial"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push({
                              pathname: `/campaign/cat=${list?.id}&cat_name=${list?.camp_name}`,
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
              </Stack>
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
                  color="#1B3148"
                  // style={{ color: "#8b8b8b" }}
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
                  color="#1B3148"
                  // style={{ color: "#8b8b8b" }}
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
                      <AccountCircle style={{ color: "#3D5675" }} />

                      <Typography variant="cardHeader" className="SemiBold">
                        {userjsondata ? (
                          <Typography variant="cardHeader" color="#1B3148">
                            {userjsondata.name}
                          </Typography>
                        ) : (
                          <Typography variant="cardHeader" color="#1B3148">
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
                    {/* <Typography
                      variant="cardHeader"
                      className="SemiBold"
                      color="initial"
                      onClick={() => setModalOpen(true)}
                    >
                      LOGIN
                    </Typography> */}
                    <IconButton
                      onClick={() => setModalOpen(true)}
                      color="initial"
                    >
                      <PersonOutlineOutlinedIcon style={{ color: "#3D5675" }} />
                    </IconButton>
                  </>
                )}
              </Button>

              {/* <Stack alignItems="center" direction={"row"}>
                <IconButton aria-label="">
                 
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
                  style={{ color: "#8b8b8b" }}
                  className="SemiBold"
                >
                  BD
                </Typography>
              </Stack> */}
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
