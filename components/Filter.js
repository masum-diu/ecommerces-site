import React, { useState } from "react";
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

const Filter = ({
  open,
  setOpen,
  uniqueColors,
  min,
  max,
  setValue,
  rangeValue,
  setSelectedColor,
  fabrics,
  products,
  setFilteredData,
  setFabricName,
  setFabricID,
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
  const [openList2, setOpenList2] = React.useState(false);
  const [arrow2, setArrow2] = useState(false);
  const handleClick2 = () => {
    setOpenList2((prev) => !prev);
    setArrow2(!arrow2);
  };
  //price range state
  // const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFabric = (name, id) => {
    setFabricName(name);
    setFabricID(id);
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
                  onClick={() => handleFabric("all")}
                  variant="cardHeader3"
                  color="initial"
                  sx={{ cursor: "pointer" }}
                >
                  All Product
                </Typography>
                {fabrics?.map((fabric, index) => (
                  <>
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
                  </>
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
    </React.Fragment>
  );
};

export default Filter;
