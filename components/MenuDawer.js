import {
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Menu1 from "./Menu1";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/router";

const MenuDawer = ({
  open,
  setOpen,
  fabrics,
  products,
  setFilteredData,
  setFabricName,
  setFabricID,
  uniqueColors,
  min,
  max,
  setValue,
  rangeValue,
  setSelectedColor,
  setPriceSelected,
}) => {
  const [openList, setOpenList] = useState(false);
  const [arrow, setArrow] = useState(false);
  const router = useRouter()
  const currentPath =
    router?.query?.product?.charAt(0).toUpperCase() +
    router?.query?.product?.slice(1);
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const [openList1, setOpenList1] = useState(false);
  const [arrow1, setArrow1] = useState(false);
  const handleClick1 = () => {
    setOpenList1((prev) => !prev);
    setArrow1(!arrow1);
  };
  const [openList2, setOpenList2] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const handleClick2 = () => {
    setOpenList2((prev) => !prev);
    setArrow2(!arrow2);
  };
  //price range state
  // const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPriceSelected(true);
  };

  const handleFabric = (name, id) => {
    setFabricName(name);
    setFabricID(id);
  };
  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "400px", xs: "300px" },
          },
        }}
      >
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={2}
          justifyContent="flex-end"
        >
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>
        {/* <Stack direction={"column"}>
          <ListItemButton
            sx={{ cursor: "pointer" }}
            onClick={() => handleFabric("all")}
          >
            All Product
          </ListItemButton>
          {fabrics?.map((fabric) => (
            <ListItemButton
              sx={{ cursor: "pointer" }}
              onClick={() =>
                handleFabric(fabric?.fabric_name, fabric?.fabric_id)
              }
            >{`${fabric?.fabric_name}`}</ListItemButton>
          ))}
        </Stack> */}
        <Stack direction={"column"} spacing={1} p={2}>
          {/* Fabric Filter Starts */}
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
                <RemoveIcon onClick={() => setArrow(!arrow)} />
              ) : (
                <AddIcon onClick={() => setArrow(!arrow)} />
              )
            }
          >
            Fabric
          </Button>
          {openList ? (
            <Box sx={{ width: "80%", margin: "0 auto", px: 2 }}>
              <Stack direction={"column"} spacing={1.5}>
                <Typography
                  onClick={() => handleFabric("all")}
                  variant="cardHeader3"
                  color="initial"
                  sx={{ cursor: "pointer" }}
                >
                  All {currentPath}
                </Typography>
                {fabrics?.map((fabric, index) => (
                  <Typography
                    onClick={() =>
                      handleFabric(fabric?.fabric_name, fabric?.fabric_id)
                    }
                    variant="cardHeader3"
                    color="initial"
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    {fabric?.fabric_name}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ) : null}

          {/* Color Filter Starts Here */}
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
                <RemoveIcon onClick={() => setArrow1(!arrow1)} />
              ) : (
                <AddIcon onClick={() => setArrow1(!arrow1)} />
              )
            }
          >
            Colors
          </Button>
          {openList1 ? (
            <Box sx={{ width: "80%", margin: "0 auto", px: 2 }}>
              <Stack direction={"column"} spacing={1.5}>
                {uniqueColors?.map((color, index) => (
                  <>
                    <Typography
                      onClick={() => setSelectedColor([color.name, color.id])}
                      variant="cardHeader3"
                      color="initial"
                      key={index}
                      sx={{ cursor: "pointer" }}
                    >
                      {color.name}
                    </Typography>
                  </>
                ))}
              </Stack>
            </Box>
          ) : null}

          {/* Price Range starts here */}
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
            endIcon={
              arrow2 ? (
                <RemoveIcon onClick={() => setArrow2(!arrow2)} />
              ) : (
                <AddIcon onClick={() => setArrow2(!arrow2)} />
              )
            }
          >
            Price Range
          </Button>
          {openList2 ? (
            <Box sx={{ width: "100%", margin: "0 auto", px: 2 }}>
              <Stack direction={"column"} spacing={1.5}>
                <Slider
                  size="small"
                  min={0}
                  step={1}
                  max={10000}
                  value={rangeValue}
                  onChange={(event, newValue) => handleChange(event, newValue)}
                  sx={{ color: "#2D323F" }}
                />
                <Stack direction={"row"} justifyContent="space-between">
                  <Typography>{min}</Typography>
                  <Typography>{max}</Typography>
                </Stack>
              </Stack>
            </Box>
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
};

export default MenuDawer;
