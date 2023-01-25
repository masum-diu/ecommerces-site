import React from 'react'
import Typography from '@mui/material/Typography'
import { Icon, Stack, IconButton } from '@mui/material'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const Menu = ({title}) => {
  return (
    <>
    <Stack direction={"row"} alignItems="center" sx={{cursor:"pointer"}} > 
    <Typography variant="cardHeader3" color="initial">{title}</Typography>
       <Icon>
        <MdOutlineKeyboardArrowDown color='#979797'/>
        </Icon>
       </Stack>
   
    </>
  )
}

export default Menu