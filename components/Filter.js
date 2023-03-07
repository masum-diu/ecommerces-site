import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  Button,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Filter = ({
  open,
  setOpen,
  uniqueColors,
  min,
  max,
  setValue,
  rangeValue,
  setSelectedColor,
}) => {
  const [openList, setOpenList] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const [openList1, setOpenList1] = React.useState(false);
  const [arrow1, setArrow1] = useState(false);
  const handleClick1 = () => {
    setOpenList1((prev) => !prev);
    setArrow1(!arrow1);
  };
  //price range state
  // const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Drawer
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
                <MdOutlineKeyboardArrowUp onClick={() => setArrow(!arrow)} />
              ) : (
                <MdOutlineKeyboardArrowDown onClick={() => setArrow(!arrow)} />
              )
            }
          >
            Colors
          </Button>
          {openList ? (
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
                <MdOutlineKeyboardArrowUp onClick={() => setArrow1(!arrow1)} />
              ) : (
                <MdOutlineKeyboardArrowDown
                  onClick={() => setArrow1(!arrow1)}
                />
              )
            }
          >
            Price Range
          </Button>
          {openList1 ? (
            <Box sx={{ width: "100%", margin: "0 auto", px: 2 }}>
              <Stack direction={"column"} spacing={1.5}>
                <Slider
                  size="small"
                  step={50}
                  min={min}
                  max={max > 0 ? max : ""}
                  value={rangeValue}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  sx={{ color: "#2D323F" }}
                />
              </Stack>
            </Box>
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
};

export default Filter;
