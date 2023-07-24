import React from 'react'
import HomePageIntro from '../../components/HomePageIntro'
import { Box, Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Terms from '../../components/policies/Terms'
import Privacy from '../../components/policies/Privacy'
import { useGetInformationQuery } from '../../src/features/api/apiSlice'
import Loader from '../../components/Loader/Loader'
import SegmentIcon from "@mui/icons-material/Segment";

const policiespages = () => {
    
    const [selectItem,setSelectItem]=useState("Terms & Conditions")
    const [open,setOpen]=useState(false)
    const {data,isLoading,isError,isSuccess}=useGetInformationQuery()

    const handleMenuClick = (menu) => {
        setSelectItem(menu);
      };
    const renderMenuContent = () => {
        switch (selectItem) {
          case "Terms & Conditions":
            return <Terms data={data}/>;
          case "Privacy Policies":
            return <Privacy data={data}/>;
         
          default:
            return null;
        }
      };
      if(isLoading){
        <Loader></Loader>
      }
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
        <Stack direction={"row"} sx={{justifyContent:"flex-end",width:"100%",alignItems:"flex-end"}}>
        <IconButton onClick={()=>setOpen(true)}>
            <Hidden only={["xl","lg","md"]}>
             
                 <SegmentIcon />
             
             
            </Hidden>
          </IconButton>
          </Stack>
        <Grid
          container
          // spacing={2}
          sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", mt: 2,}}
        >
             <Hidden only={["sm","xs","xms"]}>
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
          </Hidden>
          <Grid item lg={6} sm={12} xs={12} >
            <Typography paragraph>{renderMenuContent()}</Typography>
          </Grid>
       
        </Grid>
        </Box>  
        <Footer/>
          {/* mobile views */}
        <Drawer
        transitionDuration={{ enter: 500, exit: 500 }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "90vw",
            maxWidth: { lg: "433px", xs: "300px" },
          },
        }}
      >
         <List >
              {["Terms & Conditions", "Privacy Policies"].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(text)}>
                    {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={<><Typography variant="cardHeader1" className="bold" color="initial">{text}</Typography></>} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
      </Drawer>
    </>
  )
}

export default policiespages
