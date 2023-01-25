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
} from "@mui/material";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import { BiMap, BiShoppingBag } from "react-icons/bi";
import { FiHeart, FiSearch } from "react-icons/fi";
import LoginModal from "./LoginModal";

const SiderBar = ({ open, setOpen }) => {
  const [openList, setOpenList] = React.useState(false);
  const [openList1, setOpenList1] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);
  const [openList5, setOpenList5] = React.useState(false);

  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };

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
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/masterCollectionLayout")}
                      >
                        Saree
                      </Typography>
                      <Typography variant="body" color="initial">
                        What’s New
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/salwar-kameez")}
                      >
                        Salwar Kameez
                      </Typography>
                      <Typography variant="body" color="initial">
                        Limited Edition
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/kurti-fatua")}
                      >
                        Kurti & Fatua
                      </Typography>
                      <Typography variant="body" color="initial">
                        Special Edition
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/tops-shirts")}
                      >
                        Tops & Shirts
                      </Typography>
                      <Typography variant="body" color="initial">
                        Discount
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/kimono")}
                      >
                        Kimono
                      </Typography>
                      <Typography variant="body" color="initial">
                        Offer
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body"
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
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/panjabi")}
                      >
                        Panjabi
                      </Typography>
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
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
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/vest")}
                      >
                        Vest
                      </Typography>
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
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
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/tshirts")}
                      >
                        T-Shirt
                      </Typography>
                      <Typography
                        variant="body"
                        color="initial"
                        sx={{ cursor: "pointer" }}
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
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/baby-kantha")}>
                        Baby Kantha
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/bed-cover")}>
                        Bed Cover
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/cushion-cover")}>
                        Cushion Cover
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/basket")}>
                        Basket
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/ceramic")}>
                        Ceramic
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/napkin")}>
                        Napkin
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/table-cloth")}>
                        Table Cloth
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/table-runner")}>
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
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/aatong")}>
                        Aatong
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/cangbuk")}>
                        Cangbuk
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/ashtodhatu-jewellery")}>
                        Ashtodhatu Jewellery
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/silver-jewellery")}>
                        Silver Jewellery
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/metal-jewellery")}>
                        Metal Jewellery
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/other-jewellery")}>
                        Other Jewellery
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/scarves")}>
                        Scarves
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/stoles")}>
                        Stoles
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      mt={2}
                      justifyContent="space-between"
                    >
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/orna")}>
                        Orna
                      </Typography>
                      <Typography variant="body" color="initial"sx={{ cursor: "pointer" }}
                        onClick={() => router.push("/shawls")}>
                        Shawls
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
              </Stack>
            </Box>
          </ClickAwayListener>
          <Hidden only={["lg", "xl"]}>
            <Stack direction={"column"} mt={3} alignItems="center" spacing={2}>
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
                <Typography
                  variant="cardHeader"
                  color="initial"
                  onClick={() => setModalOpen(true)}
                >
                  LOGIN
                </Typography>
              </ListItemButton>

              <Stack alignItems="center" direction={"row"}>
                <IconButton aria-label="">
                  <BiMap style={{ color: "#0A0A0A" }} />
                </IconButton>
                <Typography variant="cardHeader" color="initial">
                  BD
                </Typography>
              </Stack>
              <IconButton aria-label="">
                <FiSearch style={{ color: "#0A0A0A" }} />
              </IconButton>
              <IconButton aria-label="">
                <FiHeart style={{ color: "#0A0A0A" }} />
              </IconButton>
              <IconButton aria-label="">
                <BiShoppingBag style={{ color: "#0A0A0A" }} />
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
