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
  const imgs = [
    { id: 0, value: "https://aranya.com.bd/wp-content/uploads/2022/06/62.jpg" },
    { id: 1, value: "https://aranya.com.bd/wp-content/uploads/2022/06/66.jpg" },
    { id: 2, value: "https://aranya.com.bd/wp-content/uploads/2022/06/65.jpg" },
    { id: 3, value: "https://aranya.com.bd/wp-content/uploads/2022/06/64.jpg" },
  ];
  const [silderData, setSilderData] = useState(imgs[0]);
  const handleClick = (index) => {
    const slider = imgs[index];
    setSilderData(slider);
  };
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
          {/* <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems="center"
            sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}
          >
            <img src={silderData.value} width={500} />

            <Stack direction={"row"} mt={5}>
              {imgs.map((data, i) => (
                <>
                  <img
                    src={data.value}
                    alt=""
                    onClick={() => handleClick(i)}
                    height={200}
                  />
                </>
              ))}
              
            </Stack>
            
          </Stack> */}
        </Box>
      </Modal>
    </>
  );
};

export default ThumbsGallery;
