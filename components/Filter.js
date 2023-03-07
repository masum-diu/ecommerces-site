import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  Button,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
function valuetext(value) {
  return `${value}°C`;
}
const Filter = ({ open, setOpen, uniqueColor }) => {
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
  const [value, setValue] = React.useState([0, 37]);

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
                {uniqueColor?.map((color) => (
                  <>
                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      key={color}
                      sx={{ cursor: "pointer", }}
                    >
                      {color}
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
              <Stack direction={"column"} spacing={1.5}  >
                <Slider
                  getAriaLabel={() => "Temperature range"}
                 size="small"
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  sx={{color:"#2D323F"}}
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
