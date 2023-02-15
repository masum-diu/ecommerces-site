import React from "react";
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
import { FiHeart, FiSearch } from "react-icons/fi";
import LoginModal from "./LoginModal";

import USER_CONTEXT from "./userContext";
import { CleaningServices } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";

const SiderBar = ({ open, setOpen }) => {
  const [openList, setOpenList] = React.useState(false);
  const [openList1, setOpenList1] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);
  const [openList5, setOpenList5] = React.useState(false);
  let usera = true;
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const totalAmount = useSelector((state)=>state.cart.totalAmount)
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

  const router = useRouter();

  const [arrow, setArrow] = useState(false);
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [arrow3, setArrow3] = useState(false);
  const [arrow4, setArrow4] = useState(false);
  const [arrow5, setArrow5] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { user, setUser } = useContext(USER_CONTEXT);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log("user hay", user);
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
              src="https://www.aranya.eco/wp-content/uploads/2018/07/Aranya-Logo-Dark1.png"
              alt=""
              style={{ width: "90vw", maxWidth: "80px" }}
            />
          </Stack>

          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
            <Box mt={2}>
              <Stack direction={"column"}>
                <Button
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
                        onClick={() => router.push("/saree")}
                      >
                        Saree
                      </Typography>
                      <Typography variant="cardHeader3" color="initial" sx={{mx:2}}>
                        What’s New
                      </Typography>
                    </Stack>
                    {/* demo route */}
                    {/* <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/demo")}
                      >
                        Demo
                      </Typography>
                      <Typography variant="body" color="initial">
                        What’s New
                      </Typography>
                    </Stack> */}
                    {/* demo rout ends */}


                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/salwar-kameez")}
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
                        onClick={() => router.push("/kurti-fatua")}
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
                        onClick={() => router.push("/tops-shirts")}
                      >
                        Tops & Shirts
                      </Typography>
                      <Typography variant="cardHeader3" color="initial" sx={{mx:{xs:4,lg:5}}}>
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
                        onClick={() => router.push("/kimono")}
                      >
                        Kimono
                      </Typography>
                      <Typography variant="cardHeader3" color="initial" sx={{mx:{xs:6.5,lg:8}}}>
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
                        onClick={() => router.push("/kaftan")}
                      >
                        Kaftan
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
                <Button
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
                        onClick={() => router.push("/panjabi")}
                      >
                        Panjabi
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:2}}
                        onClick={() => router.push("/fatua")}
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
                        sx={{ cursor: "pointer", }}
                        onClick={() => router.push("/vest")}
                      >
                        Vest
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:2 }}
                        onClick={() => router.push("/shirts")}
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
                        onClick={() => router.push("/tshirts")}
                      >
                        T-Shirt
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:1 }}
                        onClick={() => router.push("/jackets")}
                      >
                        Jackets
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
                <Button
                  variant="text"
                  color="inherit"
                  onClick={handleClick2}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  /* endIcon={
                    arrow2 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow2(!arrow2)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow2(!arrow2)}
                      />
                    )
                  } */
                >
                  Kids
                </Button>
                {openList2 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    {/* <Stack direction={"row"} mt={2} spacing={19} >
                <Typography variant="body" color="initial">Saree</Typography>
                <Typography variant="body" color="initial">What’s New</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={10.5}>
                <Typography variant="body" color="initial">Salwar Kameez</Typography>
                <Typography variant="body" color="initial">Limited Edition</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={12.5}>
                <Typography variant="body" color="initial">Kurti & Fatua</Typography>
                <Typography variant="body" color="initial">Special Edition</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={12}>
                <Typography variant="body" color="initial">Tops & Shirts</Typography>
                <Typography variant="body" color="initial">Discount</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={17}>
                <Typography variant="body" color="initial">Kimono</Typography>
                <Typography variant="body" color="initial">Offer</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={15}>
                <Typography variant="body" color="initial">Kaftan</Typography>
               
              </Stack> */}
                  </Box>
                ) : null}
                <Button
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
                  Home Furnishings
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
                        onClick={() => router.push("/baby-kantha")}
                      >
                        Baby Kantha
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        
                        sx={{ cursor: "pointer",mx:{xs:1.5,lg:2
                         }}}
                        onClick={() => router.push("/bed-cover")}
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
                        sx={{ cursor: "pointer", }}
                        onClick={() => router.push("/cushion-cover")}
                      >
                        Cushion Cover
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:{xs:4,lg:5 }}}
                        onClick={() => router.push("/basket")}
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
                        onClick={() => router.push("/ceramic")}
                      >
                        Ceramic
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:{xs:4,lg:4.9 }}}
                        onClick={() => router.push("/napkin")}
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
                        onClick={() => router.push("/table-cloth")}
                      >
                        Table Cloth
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",}}
                        onClick={() => router.push("/table-runner")}
                      >
                        Table Runner
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
                <Button
                  variant="text"
                  color="inherit"
                  onClick={handleClick4}
                  fullWidth
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                  /* endIcon={
                    arrow4 ? (
                      <MdOutlineKeyboardArrowUp
                        onClick={() => setArrow4(!arrow4)}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        onClick={() => setArrow4(!arrow4)}
                      />
                    )
                  } */
                >
                  Beauty Colection
                </Button>
                {openList4 ? (
                  <Box sx={{ width: "80%", margin: "0 auto" }}>
                    {/* <Stack direction={"row"} mt={2} spacing={19} >
                <Typography variant="body" color="initial">Saree</Typography>
                <Typography variant="body" color="initial">What’s New</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={10.5}>
                <Typography variant="body" color="initial">Salwar Kameez</Typography>
                <Typography variant="body" color="initial">Limited Edition</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={12.5}>
                <Typography variant="body" color="initial">Kurti & Fatua</Typography>
                <Typography variant="body" color="initial">Special Edition</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={12}>
                <Typography variant="body" color="initial">Tops & Shirts</Typography>
                <Typography variant="body" color="initial">Discount</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={17}>
                <Typography variant="body" color="initial">Kimono</Typography>
                <Typography variant="body" color="initial">Offer</Typography> 
              </Stack>
              <Stack direction={"row"} mt={2} spacing={15}>
                <Typography variant="body" color="initial">Kaftan</Typography>
               
              </Stack> */}
                  </Box>
                ) : null}
                <Button
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
                        onClick={() => router.push("/aatong")}
                      >
                        Aatong
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:{xs:4.5,lg:5} }}
                        onClick={() => router.push("/cangbuk")}
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
                        onClick={() => router.push("/ashtodhatu-jewellery")}
                      >
                        Ashtodhatu Jewellery
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/silver-jewellery")}
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
                        onClick={() => router.push("/metal-jewellery")}
                      >
                        Metal Jewellery
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/other-jewellery")}
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
                        onClick={() => router.push("/scarves")}
                      >
                        Scarves
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:{xs:6.5,lg:7} }}
                        onClick={() => router.push("/stoles")}
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
                        onClick={() => router.push("/orna")}
                      >
                        Orna
                      </Typography>
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        sx={{ cursor: "pointer",mx:{xs:5.5,lg:6} }}
                        onClick={() => router.push("/shawls")}
                      >
                        Shawls
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
              </Stack>
            </Box>
          </ClickAwayListener>
          <Hidden only={["md", "lg", "xl"]}>
            <Stack direction={"column"} mt={3} alignItems="left" spacing={2}>
              <ListItemButton width="100%">
                <Typography
                  variant="cardHeader"
                  color="initial"
                  onClick={() => router.push("/shop")}
                >
                  SHOP
                </Typography>
              </ListItemButton>
              <ListItemButton width="100%">
                <Typography
                  variant="cardHeader"
                  color="initial"
                  onClick={() => router.push("/story")}
                >
                  STORY
                </Typography>
              </ListItemButton>
              <ListItemButton width="100%">
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
                    <Box sx={{ display: { xs: "flex" } }}>
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
                    {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                  </Box> */}
                    {renderMobileMenu}
                    {renderMenu}
                  </>
                ) : (
                  <>
                    <Typography
                      variant="cardHeader"
                      color="initial"
                      onClick={() => setModalOpen(true)}
                    >
                      LOGIN
                    </Typography>
                  </>
                )}
              </ListItemButton>

              <Stack alignItems="center" direction={"row"} >
                <IconButton aria-label="">
                  <BiMap style={{ color: "#0A0A0A" }} />
                </IconButton>
                <Typography variant="cardHeader" color="initial">
                  BD
                </Typography>
              </Stack  >
              {/* <IconButton aria-label="">
                <FiSearch style={{ color: "#0A0A0A" }} />
              </IconButton> */}
              <IconButton aria-label="" sx={{display:"flex",justifyContent:"flex-start",width:"100%",pl:1.5}}>
                <Badge badgeContent={4} color="background2">
                  {" "}
                  <FiHeart
                    style={{ color: "#0A0A0A" }}
                    onClick={() => router.push("/wishlists")}
                  />
                </Badge>
              </IconButton>
              <IconButton aria-label=""sx={{display:"flex",justifyContent:"flex-start",width:"100%",pl:1.5}}>
                <Badge badgeContent={totalAmount} color="background2">
                  <BiShoppingBag
                    style={{ color: "#0A0A0A" }}
                    onClick={() => router.push("/addtocart")}
                  />
                </Badge>
              </IconButton>
            </Stack>
          </Hidden>
        </Box>
        <LoginModal open={modalOpen} setOpen={setModalOpen} />
      </Drawer>
    </>
  );
};

export default SiderBar;
