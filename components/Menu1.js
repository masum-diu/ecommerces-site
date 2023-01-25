import React from 'react'
import Typography from '@mui/material/Typography'
import {Stack} from '@mui/material'

const Menu1 = ({title}) => {
  return (
    <>
    <Stack direction={"row"} alignItems="center" sx={{cursor:"pointer"}} > 
    <Typography variant="cardHeader3" color="initial">{title}</Typography>
       </Stack>
   
    </>
  )
}

export default Menu1