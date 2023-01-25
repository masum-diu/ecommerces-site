import { Box, Stack, Button, Typography } from '@mui/material'
import HomePageIntro from '../components/HomePageIntro'
import Footer from '../components/Footer'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
const login = () => {
  const [value, setValue] =useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <HomePageIntro/>
    <Box sx={{ width: '100%',height:'1000px',py:11 }}>
      <Stack >
        
        
        </Stack>
      
    </Box>
        <Footer/>
    </>
  )
}

export default login
