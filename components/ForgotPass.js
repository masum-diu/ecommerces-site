import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md'

const ForgotPass = ({open,setOpen}) => {
  return (
    <>
       <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { lg: "30%", xs: "100vw" }, height: "fit-content" },
        }}
      >
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>

        <DialogTitle>
          <Typography
            variant="header1"
            color="initial"
            sx={{ display: "flex", justifyContent: "center" }}
          >
          Forgot Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
          <Typography variant="subtitl2" color="initial">
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </Typography>

            <Stack mt={5} direction={"column"} spacing={1} mb={2.5}>
              <Typography variant="cardHeader12" color="initial">
                USERNAME OR EMAIL
              </Typography>
              <TextField
                  id=""
                  label=""
                  // value={}
                  // onChange={}
                  size="small"
                  placeholder="Username or Email*"
                />
            </Stack>
            <Button variant="contained" color="background2" fullWidth  onClick={() => setOpen(false)}>
                reset password
              </Button>
           
          </DialogContentText>
        </DialogContent>
      </Dialog>  
    </>
  )
}

export default ForgotPass
