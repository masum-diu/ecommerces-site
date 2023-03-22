import { Box, Paper, Stack, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs';
const payment = () => {
  const router =useRouter()
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90vw", maxWidth: "800px", margin: "0 auto", height: "100vh", }}>
        <Paper sx={{ p: 4, }} elevation={3} >
          <Stack direction={"column"} sx={{ justifyContent: "center", alignItems: "center", }} spacing={2}>
            <Typography variant="login1" color="initial" className='bold'>Your order has been received</Typography>
            <BsFillCheckCircleFill style={{ fontSize: '50px', color: "green" }} />
            <Typography variant="header1" color="initial">Thank you for your purchase !</Typography>
            <Typography variant="legend" color="initial" className='SemiBold'>Your order ID is: 11233432234</Typography>
            <Button variant="contained" color="bandColor" onClick={()=>router.push("/shop")} >
              continue shopping
            </Button>
          </Stack>

        </Paper>
      </Box>
    </>
  )
}

export default payment
