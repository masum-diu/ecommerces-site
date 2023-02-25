import React, { useState } from "react";
import { Stack } from "@mui/system";
import { Box, IconButton, Modal, cancelOpen } from "@mui/material";
import { MdClose } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const ThumbsGallery = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          ".mui-style-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: "#ffff",
          },
          "*": {
            outline: "none",
          },
        }}

        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box>
          <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
            <IconButton aria-label="" onClick={() => setOpen(false)}>
              <MdClose
                fontSize={"32px"}
                style={{ color: cancelOpen ? "#f00" : "#000" }}
              />
            </IconButton>
          </Stack>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems="center"
            sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}
          >
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              slideOnThumbnailOver={true}
            />
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ThumbsGallery;
