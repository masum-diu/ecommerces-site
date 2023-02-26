import React, { useState } from 'react'
import Button from '@mui/material/Button'
import PaymentDetails from '../components/PaymentDetails'

const payment = () => {
  const [open,setOpen]=useState(false)
  return (
    <div>
        <Button variant="contained"  onClick={()=>setOpen(true)}>
          ADD
        </Button>
        <PaymentDetails open={open} setOpen={setOpen}/>
    </div>
  )
}

export default payment
