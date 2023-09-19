import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { IconButton, Stack, Typography, Divider } from '@mui/material'
import { MdClose } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useCurrencyConversion } from '../src/hooks/useCurrencyConversion'

const ProductPoPup = ({open,setOpen,product,count,Currency,price,subTotal,unitPrice}) => {
  const router = useRouter();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  console.log(router.asPath)
  return (
    <>
      <Dialog open={open} onClose={()=>setOpen(false)}   PaperProps={{
          sx: { width: { lg: "100%", xs: "100vw" }, height: "fit-content" },
        }} >
           <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={1}>
         
          <Typography variant="cardHeader1" px={2}color="initial"className="SemiBold" >Product successfully added to your cart.</Typography>
      
          <IconButton aria-label="" onClick={()=>setOpen(false)}>
            <MdClose />
          </IconButton>
        </Stack>
       
        <DialogContent>
          <Stack direction={{lg:"row",xs:"column"}} spacing={2}>
          <img src={product?.p_image_one} alt="" width={200} />
          <Stack direction={"column"}spacing={1}>
            <Stack direction={"row"}spacing={1}>
            <Typography variant="cardHeader1" className="SemiBold" color="initial">Product Name : </Typography><Typography variant="normal" color="initial" className="SemiBold">{product?.p_name}</Typography>
            </Stack>
            {/* <Stack direction={"row"}spacing={1}>
            <Typography variant="cardHeader1" className="SemiBold" color="initial">SKY : </Typography><Typography variant="normal" color="initial" className="SemiBold">{product?.p_design_code}</Typography>
            </Stack> */}
            <Stack direction={"row"}spacing={1}>
            <Typography variant="cardHeader1" className="SemiBold" color="initial">Quantity : </Typography><Typography variant="normal" color="initial" className="SemiBold">{count}</Typography>
            </Stack>
            <Stack direction={"row"}spacing={1}>
            <Typography variant="cardHeader1" className="SemiBold" color="initial">Unit Price : </Typography><Typography variant="normal" color="initial" className="SemiBold">{Currency} {price}</Typography>
            </Stack>
            <Stack direction={"row"}spacing={1} >
            <Typography variant="cardHeader1" className="SemiBold" color="initial">SubTotal : </Typography><Typography variant="normal"  color="initial" className="SemiBold">{Currency} {convertPrice(unitPrice)}</Typography>
            </Stack>
          
          </Stack>
          </Stack>
         
          
        </DialogContent>
        <Divider
       
          variant="fullWidth"
          orientation="horizontal"
          
        />
       <Stack direction={{lg:"row",xs:"column"}} spacing={1} p={2} justifyContent={"space-between"}>
        <Button fullWidth variant="contained" color="secondary" className="SemiBold" onClick={()=>setOpen(false)}>
          continue shopping
        </Button>
        <Button fullWidth variant="contained" color="background2" className="SemiBold" onClick={()=>router.push("/addtocart")} >
          go to cart
        </Button>
       </Stack>
      </Dialog>
    </>
  )
}

export default ProductPoPup
