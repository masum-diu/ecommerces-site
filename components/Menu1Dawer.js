import { Drawer } from '@mui/material'
import React from 'react'
import { IconButton, ListItemButton, Stack } from "@mui/material";
import { MdClose } from 'react-icons/md';
import Menu from "../components/Menu";
const Menu1Dawer = ({open,setOpen}) => {
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
        <Stack direction={"column"}>
          <ListItemButton>
          <Menu title={"Category"} />
          </ListItemButton>
          <ListItemButton>
          <Menu title={"Color"} />
          </ListItemButton>
          <ListItemButton>
          <Menu title={"Fabric"} />
          </ListItemButton>
          <ListItemButton>
          <Menu title={"Price"} />
          </ListItemButton>
          <ListItemButton>
          <Menu title={"Size"} />
          </ListItemButton>
        </Stack>
      </Drawer>
    </>
  )
}

export default Menu1Dawer