import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const SearchModal = ({ open, setOpen }) => {
  return (
    <>
      {/*  */}
      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "100vw",
            // maxWidth: { lg: "100%",  },
            height:{lg:"300px",xs:"200px"},
            mx: "auto",
            display:"flex",
            justifyContent:"center",
          },
        }}
      >
        <Box p={2}>
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={2}
            justifyContent="right"
          >
            <TextField
              fullWidth
              id=""
              label=""
              // value={}
              // onChange={}
              size="small"
              placeholder="search products…
                  "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <FiSearch style={{fontSize:"18px"}} />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton aria-label="" onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default SearchModal;
