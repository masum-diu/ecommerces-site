import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Footer from '../components/Footer'
import HomePageIntro from '../components/HomePageIntro'
const story = () => {
  return (
    <>
  <HomePageIntro title={"Story "}/>
  <Box mt={10}>
     <Image src="/assets/img.png" width={1900} style={{width:"100%",height:"fit-content"}} height={700} />
    <Stack direction={"row"}  sx={{width:{lg:"50%",xs:"96%",sm:"80%"},maxWidth:"1500px",margin:"0 auto",justifyContent:"space-between",mt:2}}>
      <Typography variant="cardHeader1" color="initial">Sustainable Practices</Typography>
      <Typography variant="cardHeader1" color="initial">Our Community</Typography>
      <Typography variant="cardHeader1" color="initial">About Aranya</Typography>
      <Typography variant="cardHeader1" color="initial">Color Stories</Typography>
    </Stack>
    <Stack direction={"column"} spacing={1} sx={{justifyContent:"center",alignItems:"center",width:{lg:"50%",xs:"96%",},maxWidth:"1500px",margin:"0 auto",}}>
      <Typography variant="login1" color="initial" mt={4}>Commited To Sustainable Practices</Typography>
      <Typography variant="cardHeader3"  textAlign={"center"}>Aranya is a member of WFTO and World Craft Council and is committed to ensuring that the <br></br> supply chain is up to international trade standards.</Typography>
    </Stack>
    <Stack direction={"row"} justifyContent="center" spacing={6} mt={6}>
       <Stack direction={"column"} alignItems="center" justifyContent={"center"} spacing={2} >
        <Image src="/assets/save-plants.png" style={{width:"100%",height:"fit-content"}} width={121} height={121} />
        <Typography variant="cardHeader3" color="initial">Natural Dye</Typography>
       </Stack>
       <Stack direction={"column"} alignItems="center" justifyContent={"center"} spacing={2} >
        <Image src="/assets/carbon-neutral.png" width={121} height={121} style={{width:"100%",height:"fit-content"}} />
       </Stack>
       <Stack direction={"column"} alignItems="center" justifyContent={"center"} spacing={2} >
        <Image src="/assets/save-plants.png" style={{width:"100%",height:"fit-content"}} width={121} height={121} />
        <Typography variant="cardHeader3" color="initial">Fair Trade</Typography>
       </Stack>
    </Stack>
    <Stack direction={"row"} sx={{width:"90%",maxWidth:"1500px",m:"0 auto",justifyContent:"center",alignItems:"center",mt:8}} spacing={4} >
    
     <Image src="/assets/tfdd.png" width={524} height={700} style={{width:"100%",height:"fit-content"}}/>
      <Stack direction={"column"} spacing={4} sx={{width:"90%",maxWidth:"1500px",m:"0 auto"}}>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        </Stack>
    </Stack>
    <Stack direction={"row"} sx={{width:"90%",maxWidth:"1500px",m:"0 auto",justifyContent:"center",alignItems:"center",mt:8}} spacing={4} >
      <Stack direction={"column"} spacing={4} sx={{width:"90%",maxWidth:"1500px",m:"0 auto"}}>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        <Typography variant="" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga similique, culpa cum eaque, tempore deleniti obcaecati eum repellat amet harum nesciunt ipsam cumque iure quas dolorem error laudantium, nulla laborum?</Typography>
        </Stack>
        <Image src="/assets/jf.png" width={439} height={487}/>
    </Stack>
    <Stack direction={"row"} sx={{width:"90%",maxWidth:"1500px",m:"0 auto",justifyContent:"center",alignItems:"center",mt:8}} spacing={4} >
    <Image src="/assets/group.png" width={428} height={300} style={{width:"100%",height:"fit-content"}}/>
    <Image src="/assets/ss.png" width={764} height={900} style={{width:"100%",height:"fit-content"}}/>
    </Stack>
   <Stack>
      <Image src="/assets/bit.png" width={1472} height={773} style={{width:"100%",height:"fit-content"}}/>
      </Stack>
    
  </Box>
  <Footer/>
    </>
  )
}

export default story
