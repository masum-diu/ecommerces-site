import React from 'react'
import { useGetUserAddressQuery } from '../../src/features/api/apiSlice'
import Loader from '../Loader/Loader'
import { Button, Stack, Typography } from '@mui/material'

const AddressBooks = () => {
    const token = localStorage.getItem("acesstoken")
    const { data, isLoading, isSuccess } = useGetUserAddressQuery(token)
    console.log(data)
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <>
            <Stack direction={"column"} sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", }} spacing={2} pt={3} >
                <Typography
                    variant="cardHeader1"
                    color="initial"
                    className="exterBold"
                    textAlign={"center"}
                >
                    Address books
                </Typography>
                {
                    data?.map((data) => <>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} >

                            <Button variant="outlined" disabled color="background2"  >
                                <Typography variant="cardLocation123" color="#af9368" className="SemiBold" sx={{ textTransform: "capitalize", textAlign: "left" }}>
                                    {data?.first_name},
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold">{data?.last_name},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold">{data?.street_address},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold"> {data?.apartment},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold">  {data?.city},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold"> {data?.country},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold">  {data?.post_code},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold">  {data?.phone},</Typography>
                                    <Typography variant="cardLocation123" color="#af9368" className="SemiBold">  {data?.email}</Typography>
                                </Typography>

                            </Button>

                        </Stack>


                    </>)
                }
            </Stack>
        </>
    )
}

export default AddressBooks
