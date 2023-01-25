import { Box,Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Footer from '../components/Footer'
import HomePageIntro from '../components/HomePageIntro'
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router'
import Menu from '../components/Menu'

const saree = () => {
  const router=useRouter()
  const data=[
    {
      id:1,
      title:"Work",
      image:"/assets/shirt.png"
    },
    {
      id:2,
      title:"Modern",
      image:"/assets/shirt.png"
    },
    {
      id:3,
      title:"Formal",
      image:"/assets/shirt.png"
    },
    {
      id:4,
      title:"Casual",
      image:"/assets/shirt.png"
    },
  ]
  return (
    <>
    <HomePageIntro title={"Saree "}/>
    <Box mt={10}>
    <Stack direction={"row"} alignItems="center" >  
    <Image src="/assets/saree.png"  width={1900} style={{width:"100%",height:"fit-content"}} height={700}/>
    </Stack>
    <Stack direction={"column"} spacing={2} sx={{justifyContent:"center",alignItems:"center",p:6}} >
    <Stack direction={"row"} spacing={.5} sx={{justifyContent:"center",alignItems:"center"}}>
   <Typography variant="cardHeader2" color="initial" sx={{cursor:"pointer"}}  onClick={()=>router.push("/")}>Home</Typography>
     <MdOutlineKeyboardArrowRight/>
     <Typography variant="cardHeader2" sx={{cursor:"pointer"}}  color="initial">Collection</Typography>
   </Stack>
   <Typography variant="cardHeader1" color="initial">WOMEN SHIRT COLLECTION</Typography>
  
   </Stack>
   <Divider />

   <Stack direction={"row"} sx={{p:3,justifyContent:"center"}} spacing={6}>
     {
      data.map((dataList)=><>
      <Stack direction={"column"} sx={{alignItems:"center"}} spacing={2} key={dataList.id}> 
        <Image src={dataList.image} width={105} height={115} />
         <Typography variant="cardLocation" color="initial">{dataList.title}</Typography>
      </Stack>
       
      </>)
     }
    </Stack>

    <Stack direction={"row"} spacing={4} sx={{p:4,width:"90%",maxWidth:"1500px",margin:"0 auto"}}>
      <Menu title={"Category"} />
      <Menu title={"Color"} />
      <Menu title={"Fabric"} />
      <Menu title={"Price"} />
      <Menu title={"Size"} />
    </Stack>
    
    </Box>
    <Footer/>
    </>
  )
}

export default saree