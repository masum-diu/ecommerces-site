import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { IconButton, Stack, Typography } from '@mui/material'
import { MdClose } from 'react-icons/md'


const PaymentDetails = ({open,setOpen}) => {
  return (
    <>
    <Dialog open={open} onClose={()=>setOpen(false)}
    PaperProps={{
      sx: { width: { lg: "30%", xs: "100vw" }, height: "fit-content" },
    }} >
      <DialogTitle >
      <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>

      </DialogTitle>
      <DialogContent>
        <DialogContentText>
         <Stack direction={"row"} justifyContent="space-between">
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
         </Stack>
         <Stack direction={"row"} justifyContent="space-between">
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
          <Typography variant="homeFlash" color="initial">Order Id</Typography>
         </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={} color="default">
          Cancel
        </Button> */}
      </DialogActions>
    </Dialog>
    </>
  )
}

export default PaymentDetails