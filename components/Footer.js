import { Box, Input, Stack, Typography, IconButton } from '@mui/material'
import React from 'react'
import { VscArrowRight } from 'react-icons/vsc';
const Footer = () => {
  return (
    <>
    <Box bgcolor={"#1F1F1F"}>
        <Stack direction={"column"} sx={{p:4,justifyContent:"center",alignItems:"center", width:"95%",margin:"0 auto",maxWidth:"1500px"}} spacing={4}>
        <img src="https://www.aranya.eco/wp-content/uploads/2018/07/Aranya-Logo-Dark1.png" alt="" width="96px"/>
        <Typography variant="cardHeader" color="#F2F2F2">Get updates on our latest collections</Typography>
        <Input placeholder="Email Address" sx={{color:"#ffff",width:"90vw",maxWidth:"306px",pb:1}} endAdornment={
            <IconButton>
            <VscArrowRight style={{color:"#787878"}}/>
            </IconButton>
        }/>
      
        <Typography variant="normal" color="#F2F2F2">ABOUT</Typography>
        <Stack direction={"row"}  flexWrap={"wrap"} columnGap={1} rowGap={1} >
          <Typography variant="cardHeader2" color="#787878">About</Typography>
          <Typography variant="cardHeader2" color="#787878">Community</Typography>
          <Typography variant="cardHeader2" color="#787878">Colors</Typography>
          <Typography variant="cardHeader2" color="#787878">Sustainability</Typography>
          <Typography variant="cardHeader2" color="#787878">Partners</Typography>
          <Typography variant="cardHeader2" color="#787878">Blog</Typography>
        </Stack>
        <Typography variant="normal" color="#F2F2F2 ">BUSINESS</Typography>
        <Stack direction={"row"} spacing={3} >
          <Typography variant="cardHeader2" color="#787878">B2B Export</Typography>
          <Typography variant="cardHeader2" color="#787878">Career</Typography>
          <Typography variant="cardHeader2" color="#787878">Contact</Typography>
        </Stack>
        </Stack>
        <Stack flexWrap={"wrap"} columnGap={1} alignItems="center" rowGap={2} sx={{pb:5,justifyContent:"space-between",width:"95%",margin:"0 auto",maxWidth:"1500px"}} direction={"row"} >
          <Typography variant="cardLocation1" color="#E3E3E3" px={2}>© Aranya Crafts Limited  2022</Typography>
          <Stack direction={"row"} columnGap={3} rowGap={2} px={2} alignItems="center">
          <Typography variant="cardLocation1" color="#E3E3E3">Term & Conditions</Typography>
          <Typography variant="cardLocation1" color="#E3E3E3">Privacy Policies</Typography>
          <Typography variant="cardLocation1" color="#E3E3E3">Return</Typography>
          <Typography variant="cardLocation1" color="#E3E3E3">International</Typography>
          </Stack>
        </Stack>
    </Box>
    </>
  )
}

export default Footer