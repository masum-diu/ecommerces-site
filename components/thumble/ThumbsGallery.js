import React, { useState } from "react";
import { Stack } from "@mui/system";
import { Box, IconButton, Modal, cancelOpen } from "@mui/material";
import { MdClose } from "react-icons/md";


const ThumbsGallery = ({ open, setOpen }) => {
  const imgs = [
    {
      id: 0,
      value: "https://aranya.com.bd/wp-content/uploads/2023/02/1-2.jpg",
    },
    {
      id: 1,
      value: "https://aranya.com.bd/wp-content/uploads/2023/02/3-2.jpg",
    },
    {
      id: 2,
      value: "https://aranya.com.bd/wp-content/uploads/2023/02/2-2.jpg",
    },
  ];
  const [sliderData, setSliderData] = useState(imgs[0]);

  const handleClick = (index) => {
    const slider = imgs[index];
    setSliderData(slider);
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
          >
            <img
              src={sliderData.value}
              alt=""
              style={{ width: "90vw", maxWidth: "600px", margin: "0 atuo" }}
              height="fit-content"
            />

            <Stack direction={"row"} mt={3} spacing={3}>
              {imgs.map((data, i) => (
                <>
                  <img
                    src={data.value}
                    alt=""
                    onClick={() => handleClick(i)}
                    style={{ width: "90vw", maxWidth: "150px" }}
                  />
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Modal>

      {/* <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width:"100%", height: "fit-content" },
        }}
      >
        <DialogTitle>
          <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
            <IconButton aria-label="" onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{display:"flex"}}>
           <img src="https://static.massimodutti.net/3/photos//2023/V/0/1/p/5668/601/401/5668601401_2_5_16.jpg?t=1676548550007&impolicy=massimodutti-itxmediumhigh&imwidth=700&imformat=chrome" alt="" />
           <img src="https://static.massimodutti.net/3/photos//2023/V/0/1/p/5668/601/401/5668601401_2_5_16.jpg?t=1676548550007&impolicy=massimodutti-itxmediumhigh&imwidth=700&imformat=chrome" alt="" />
           <img src="https://static.massimodutti.net/3/photos//2023/V/0/1/p/5668/601/401/5668601401_2_5_16.jpg?t=1676548550007&impolicy=massimodutti-itxmediumhigh&imwidth=700&imformat=chrome" alt="" />
           <img src="https://static.massimodutti.net/3/photos//2023/V/0/1/p/5668/601/401/5668601401_2_5_16.jpg?t=1676548550007&impolicy=massimodutti-itxmediumhigh&imwidth=700&imformat=chrome" alt="" />
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog> */}
    </>
  );
};

export default ThumbsGallery;
