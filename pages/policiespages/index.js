import React from 'react'
import HomePageIntro from '../../components/HomePageIntro'
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Terms from '../../components/policies/Terms'
import Privacy from '../../components/policies/Privacy'

const policiespages = () => {
    
    const [selectItem,setSelectItem]=useState("Terms & Conditions")
    const handleMenuClick = (menu) => {
        setSelectItem(menu);
      };
    const renderMenuContent = () => {
        switch (selectItem) {
          case "Terms & Conditions":
            return <Terms/>;
          case "Privacy Policies":
            return <Privacy/>;
         
          default:
            return null;
        }
      };
  return (
    <>
        <HomePageIntro title={"PoliciesPages "} />
      <Box sx={{pt:{lg:8,xs:7}}} mb={4} height={"fit-content"}>
      <Stack>
          <Typography
            variant="header1"
            color="#7E7250"
            sx={{ background: "#2C3649", py: 10 }}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontWeight="500"
          >
            {selectItem}
          </Typography>
        </Stack>
        <Grid
          container
          // spacing={2}
          sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", mt: 2,}}
        >
            
          <Grid item lg={3} sx={{height:"600px"}}>
        
            <List >
              {["Terms & Conditions", "Privacy Policies"].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(text)}>
                    <ListItemText  primary={<><Typography variant="cardHeader1" className="bold" color="initial">{text}</Typography></>} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
           
          </Grid>
         
          <Grid item lg={6} sm={12} xs={12} >
            <Typography paragraph>{renderMenuContent()}</Typography>
          </Grid>
        </Grid>
        </Box>  
        <Footer/>
    </>
  )
}

export default policiespages
