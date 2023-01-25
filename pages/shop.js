import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Footer from '../components/Footer'
import HomePageIntro from '../components/HomePageIntro'

const shop = () => {
  const data=([
    {
      id:1,
      title:"Eustoma linen suits",
      taka:"5,185",
      image:"https://i0.wp.com/aranya.com.bd/wp-content/uploads/2021/11/1-33.jpg?resize=512%2C512&ssl=1"
    },
    {
      id:2,
      title:"Eustoma linen suits",
      taka:"5,185",
      image:"https://i0.wp.com/aranya.com.bd/wp-content/uploads/2021/11/1-33.jpg?resize=512%2C512&ssl=1"
    },
    {
      id:3,
      title:"Eustoma linen suits",
      taka:"5,185",
      image:"https://i0.wp.com/aranya.com.bd/wp-content/uploads/2021/11/1-33.jpg?resize=512%2C512&ssl=1"
    },
    {
      id:4,
      title:"Eustoma linen suits",
      taka:"5,185",
      image:"https://i0.wp.com/aranya.com.bd/wp-content/uploads/2021/11/1-33.jpg?resize=512%2C512&ssl=1"
    },
    
  ])
  return (
    <>
    <HomePageIntro title={"Shop "}/>
       <Box mt={10} sx={{width:"100%",mb:4}} >
        <Stack ><img src="https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-party/subhome-xmedia-47-2//w/1920/IMAGE-landscape-fill-90388659-c9ad-44c0-8fbc-3e049adef8d9-default_0.jpg?ts=1669457847606" alt="" width="100%" />
        <Image src="/assets/img.png" width={1900} style={{width:"100%",height:"fit-content"}} height={700} />
         </Stack>
         <Stack direction={"row"} sx={{width:"100%"}}>
          <img src="https://blog.ebulking.com/wp-content/uploads/2020/02/001_IMG_7883.jpg" alt="" width={"50%"} />
          <img src="https://www.mamathatulluri.com/products/bgphotos/BlackA-LineCottonSleevelessKurtiDress_bimg605aee0f246c7.jpg" alt="" width={"50%"} />
         </Stack>
         <Box mt={4}> 
        <Stack direction={"column"} spacing={2} sx={{width:"95%",margin:"0 auto",maxWidth:"1500px"}}>
         <Stack direction={"row"}  justifyContent="space-between" >
         <Typography variant="tabText" color="initial">YOU MAY ALSO LIKE</Typography>  
          <Typography variant="tabText" color="initial">VIEW ALL</Typography> 
         </Stack>
                <Stack direction={"row"} flexWrap={"wrap"} alignItems="center" justifyContent={"center"} columnGap={3} rowGap={3} >
               { data.map((data)=><>
                <Stack direction={"column"} spacing={2} key={data.id}>
                <img src={data.image} alt="" width={300} />
                
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
               <Typography variant="cardHeader2" color="initial">{data.title}</Typography>
               <Typography variant="cardHeader2" fontWeight={"bold"} color="initial">BDT {data.taka}</Typography>
               </Stack>
               </Stack>
                </>)}
                </Stack>
                </Stack>
         </Box>
        
         <Image src="/assets/f1.png" width={1900} style={{width:"100%",height:"fit-content",marginTop:"25px"}} height={700} />
         <Box mt={4}> 
        <Stack direction={"column"} spacing={2} sx={{width:"95%",margin:"0 auto",maxWidth:"1500px"}}>
         <Stack direction={"row"}  justifyContent="space-between" >
         <Typography variant="tabText" color="initial">WHAT'S NEW</Typography>  
          <Typography variant="tabText" color="initial">VIEW ALL</Typography> 
         </Stack>
                <Stack direction={"row"} flexWrap={"wrap"} alignItems="center" justifyContent={"center"} columnGap={3} rowGap={3} >
               { data.map((data)=><>
                <Stack direction={"column"} spacing={2}  key={data.id}>
                <img src={data.image} alt="" width={300} />
                
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
               <Typography variant="cardHeader2" color="initial">{data.title}</Typography>
               <Typography variant="cardHeader2" fontWeight={"bold"} color="initial">BDT {data.taka}</Typography>
               </Stack>
               </Stack>
                </>)}
                </Stack>
                </Stack>
         </Box>
       </Box>
       <Footer/>
    </>  
  )
}

export default shop
