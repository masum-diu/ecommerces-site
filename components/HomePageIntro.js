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
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
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
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata);
  console.log("from local", userjsondata);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
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
              {userjsondata ? (
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
                    {/* <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                    >
                      <AccountCircle style={{ color: "#0A0A0A" }} />
                    </IconButton>
                      <p style={{ color: "#0A0A0A",marginLeft:"5px" }}>{userjsondata?.name}</p> */}
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
                      <p style={{ color: "#0A0A0A" }}>{userjsondata?.name}</p>
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
                    sx={{ cursor: "pointer" }}
                    variant="cardHeader"
                    color="initial"
                    onClick={() => setModalOpen(true)}
                  >
                    LOGIN
                  </Typography>
                </>
              )}

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
