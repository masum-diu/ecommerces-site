import React, { useEffect, useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  Box,
  Button,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MdClose, AiOutlinePlus } from "react-icons/md";
import { useDebouncedCallback, useDebounce } from "use-debounce";
import { useRouter } from "next/router";

const Filter = ({
  open,
  setOpen,
  uniqueColors,
  min,
  max,
  setValue,
  rangeValue,
  setSelectedColor,
  selectedColor,
  fabrics,
  products,
  setFabricName,
  setFabricID,
  setDebounced,
  setPriceSelected,
  setMakeFabricTrue,
  setMakeColorTrue,
  setMakePriceTrue,
  setPage,
  setHasMore,
  setFilteredData,
  setProducts,
}) => {
  const [openList, setOpenList] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const [value] = useDebounce(rangeValue, 1000, { trailing: true });
  const router = useRouter();
  const currentPath =
    router?.query?.product?.charAt(0).toUpperCase() +
    router?.query?.product?.slice(1);
  const dataFetchedRef = useRef(false);

  // console.log("your log output", value);
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const [openList1, setOpenList1] = React.useState(false);
  const [arrow1, setArrow1] = useState(false);
  /* const debounced = useDebouncedCallback(
    (rangeValue) => {
      setValue(rangeValue);
    },

    1000
  ); */
  useEffect(() => {
    setDebounced(value);
  }, [value]);
  const handleClick1 = () => {
    setOpenList1((prev) => !prev);
    setArrow1(!arrow1);
  };

  const [openList2, setOpenList2] = React.useState(false);
  const [arrow2, setArrow2] = useState(false);
  const handleClick2 = () => {
    setOpenList2((prev) => !prev);
    setArrow2(!arrow2);
  };
  //price range state
  // const [value, setValue] = useState([min, max]);

  const handleAllProduct = (name) => {
    setFabricName(name);
    setMakeFabricTrue(false);
    setMakeColorTrue(false);
    setMakePriceTrue(false);
    setPage(1);
    setHasMore(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPriceSelected(true);
    setMakeFabricTrue(false);
    setMakeColorTrue(false);
    setMakePriceTrue(true);
    setPage(1);
    setHasMore(true);
    setFilteredData([]);
    setProducts([]);
  };
  const handleFabric = (name, id) => {
    setFabricName(name);
    setFabricID(id);
    setMakeFabricTrue(true);
    setMakeColorTrue(false);
    setMakePriceTrue(false);
    setPage(1);
    setHasMore(true);
    setFilteredData([]);
    setProducts([]);
  };
  const handleColor = ([colorName, colorId]) => {
    setSelectedColor([colorName, colorId]);
    setMakeFabricTrue(false);
    setMakeColorTrue(true);
    setMakePriceTrue(false);
    setHasMore(true);
  };
  return (
    <React.Fragment>
      <Drawer
        transitionDuration={{ enter: 500, exit: 500 }}
        anchor="right"
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
        <Stack direction={"column"} spacing={1} p={2}>
          {/* Fabric Wise Filter Starts */}
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
                  onClick={() => handleAllProduct("all")}
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

          {/* Color Wise Filter Starts */}
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
                      onClick={() => handleColor([color?.color_name, color.id])}
                      variant="cardHeader3"
                      color="initial"
                      key={index}
                      sx={{ cursor: "pointer" }}
                    >
                      {color?.color_name}
                    </Typography>
                  </>
                ))}
              </Stack>
            </Box>
          ) : null}

          {/* Price wise filter Starts */}
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
                  step={50}
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
    </React.Fragment>
  );
};

export default Filter;
