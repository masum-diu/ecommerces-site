import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { BiMap} from 'react-icons/bi';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { MenuItem, Select, Stack, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

const FlashPage = ({title}) => {
  const [country,setCountry]=React.useState(10)
  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const [currency,setCurrency]=React.useState(10)
  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const [language,setLanguage]=React.useState(10)
  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const router=useRouter()
  return (
    <> 
    <Head>
        <title>{title?title +'- Aranya':"Aranya"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Box sx={{backgroundImage:"url('https://static.zara.net/photos///contents/mkt/spots/aw22-north-man-edition/subhome-xmedia-w47//w/1920/IMAGE-landscape-fill-88c5ba6c-832e-442e-878f-48b60c0c8aa7-default_0.jpg?ts=1669457412950')",backgroundSize:"cover",height:"100vh", maxHeight:"fit-content"}}>
    <AppBar position="fixed" sx={{boxShadow:"none",backgroundColor:"#fff"}}>
      <Toolbar sx={{display:"flex",justifyContent:"space-between",alignItems:"center",py:1}}>
       <Stack direction={"row"} alignItems="center">
       
       <img src="https://www.aranya.eco/wp-content/uploads/2018/07/Aranya-Logo-Dark1.png" alt="" width="96px"/>
       </Stack>
      
       <Stack direction={"row"} alignItems="center">
       <IconButton aria-label="">
       <BiMap style={{color:"#0A0A0A"}}/>
       </IconButton>
         <Typography variant="cardHeader" color="initial">BD</Typography>
       </Stack>
      </Toolbar>
    </AppBar>
    <Box>
    <Stack direction={"column"} sx={{width:"90vw",maxWidth:"433px",pt:{lg:29,xs:13},mx:{lg:20,xs:"auto"}}} spacing={1} >
      <Typography variant="subtitle1" color="initial" >Select your shipping country</Typography>
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          onChange={handleChange}
          size="small"
          sx={{backgroundColor:"white"}}
        >
          <MenuItem value={10} disabled>Select Shipping Country </MenuItem>
          <MenuItem value={20}>Bangladesh</MenuItem>
          <MenuItem value={30}>England</MenuItem>
          <MenuItem value={40}>India</MenuItem>
        </Select>
      <Typography variant="subtitle1" color="initial">Select your currency</Typography>
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          onChange={handleChangeCurrency}
          size="small"
          sx={{backgroundColor:"white"}}
        >
          <MenuItem value={10} disabled>Select currency </MenuItem>
          <MenuItem value={20}>Taka</MenuItem>
          <MenuItem value={30}>Euro</MenuItem>
          <MenuItem value={40}>Dollar</MenuItem>
        </Select>
      <Typography variant="subtitle1" color="initial">Language</Typography>
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={handleLanguage}
          size="small"
          sx={{backgroundColor:"white"}}
        >
          <MenuItem value={10} disabled>Select Language </MenuItem>
          <MenuItem value={20}>Bangla</MenuItem>
          <MenuItem value={30}>English</MenuItem>
          <MenuItem value={40}>Hindi</MenuItem>
        </Select>
    </Stack>
    <Stack direction={"column"} sx={{width:"90vw",maxWidth:"433px",mx:{lg:20,xs:"auto"}}} mt={3}>  
          <Button variant="contained" color="black" onClick={()=>router.push('/shop')}>
        continue
        </Button>
        </Stack>
    </Box>
</Box >
</>
  )
}

export default FlashPage