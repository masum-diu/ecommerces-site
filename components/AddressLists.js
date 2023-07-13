import React from 'react'
import { Controller, useForm, useWatch } from "react-hook-form";
import Button from '@mui/material/Button'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Stack, Drawer, Grid, Typography, TextField, Select, MenuItem } from '@mui/material'
import { MdClose } from 'react-icons/md'
import { useState } from 'react';

const AddressLists = ({ open, setOpen,getUserAddress }) => {
    // console.log("hello")
    const datalists = [
        { label: "Barishal", year: 1994, value: "Barishal" },
        { label: "Chittagong", year: 1972, value: "Chittagong" },
        { label: "Dhaka", year: 1974, value: "Dhaka" },
        { label: "Khulna", year: 2008, value: "Khulna" },
        { label: "Mymensingh", year: 1957, value: "Mymensingh" },
        { label: "Rajshahi", year: 1993, value: "Rajshahi" },
        { label: "Sylhet", year: 1994, value: "Sylhet" },
        { label: "Rangpur", year: 1994, value: "Rangpur" },
      ];
    // console.log(getUserAddress)
    const [openList, setOpenList] = React.useState(false);
    const [arrow, setArrow] = useState(false);
    const handleClick = () => {
        setOpenList((prev) => !prev);
        setArrow(!arrow);
      };
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = useForm({
        defaultValues: {
            id:"",
            first_name: "",
            last_name: "",
            street_address: "",
            city: "",
            country: "",
            post_code: "",
            phone: "",
            email: "",
            apartment: "",


        },
    });
   
    const onSubmit = async (data) => {
        console.log(data)
    }
   
    return (
        <>

            <Drawer
                transitionDuration={{ enter: 500, exit: 500 }}
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: "90vw",
                        maxWidth: { lg: "400px", xs: "300px" },
                    },
                }}


            >
                
                <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
                    <IconButton aria-label="" onClick={() => setOpen(false)}>
                        <MdClose />
                    </IconButton>
                </Stack>
              <Stack sx={{width:"90%",margin:"0 auto"}} spacing={2}>
                <Typography variant="cardHeader1" color="initial" sx={{textAlign:"center"}}>Select Your Address</Typography>
                {
                    getUserAddress?.map((data)=><>
                        <Button variant="outlined" color="background2" sx={{textAlign:"left"}}>
                        <Typography variant="cardLocation123" color="#af9368" className="SemiBold" sx={{textTransform:"capitalize"}}> {data?.first_name},{data?.last_name},
                          {data?.street_address},{data?.apartment},{data?.city},
                          {data?.country},{data?. post_code},
                          {data?.phone},{data?. email},
                          </Typography>
                         
                        </Button>
                       
                    </>)
                }
              </Stack>
              <br/>
                <Button
                
            variant="contained"
            color="background2"
            onClick={handleClick}
            // className="bold"
            fullWidth
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textTransform: "capitalize",
              width: "90%",
              margin:"0 auto"
            }}
            endIcon={
              arrow ? (
                <RemoveIcon onClick={() => setArrow(!arrow)} />
              ) : (
                <AddIcon onClick={() => setArrow(!arrow)} />
              )
            }
          >
            Add New Address
          </Button>
          
          {openList ? (
           
              <form
                    onSubmit={handleSubmit(onSubmit)}
                    // style={{ width: "100%", margin: "0 auto" }}
                >

                    {/* Billing form */}
                   
                       
                        <Stack sx={{width:"90%",margin:"0 auto"}} spacing={1}  height={"100vh"}>
                       
                        <Stack direction={"column"} spacing={1} mt={2}>

                            <Typography variant="cardHeader1" color="initial">
                                FIRST NAME *
                            </Typography>
                            <TextField
                            size="small"
                                // id=""
                                // label=""
                                // value={}
                                {...register("first_name", {
                                    required: {
                                        value: true,
                                        message: "First Name Required",
                                    },
                                })}
                                onKeyUp={() => trigger("first_name_billing")}
                                error={Boolean(errors.first_name_billing)}
                                // onChange={}
                                placeholder="First Name *"
                               
                            />
                            {errors.first_name_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.first_name_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                LAST NAME *
                            </Typography>
                            <TextField
                                // id=""
                                // label=""
                                // value={}
                                // onChange={}
                                {...register("last_name", {
                                    required: {
                                        value: true,
                                        message: "Last Name Required",
                                    },
                                })}
                                onKeyUp={() => trigger("last_name_billing")}
                                error={Boolean(errors.last_name_billing)}
                                placeholder="Last Name *"
                                size="small"
                            />
                            {errors.last_name_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.last_name_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                STREET ADDRESS *
                            </Typography>
                            <TextField
                                // id=""
                                // label=""
                                // value={}
                                // onChange={}
                                {...register("street_address", {
                                    required: {
                                        value: true,
                                        message: "House and Street Address Required",
                                    },
                                })}
                                onKeyUp={() => trigger("street_address_billing")}
                                error={Boolean(errors.street_address_billing)}
                                placeholder="House Number and street name"
                                size="small"
                            />
                            {errors.street_address_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.street_address_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                APARTMENT ADDRESS (OPTIONAL)
                            </Typography>
                            <TextField
                                // id=""
                                // label=""
                                // value={}
                                // onChange={}
                                {...register("apartment", {
                                    required: {
                                        value: false,
                                        message: "Apartment Address Required",
                                    },
                                })}
                                // onSelect={(e) => setBillingTown(e.target.value)}
                                onKeyUp={() => trigger("apartment_address_billing")}
                                error={Boolean(errors.apartment_address_billing)}
                                placeholder="Apartment suite, unit, etc."
                                size="small"
                            />
                            {errors.apartment_address_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.apartment_address_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1}>
                            <Typography variant="cardHeader1" color="initial">
                                TOWN / CITY *
                            </Typography>
                           
                            <Select
                                id="city_billing"
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "Town/City is Required",
                                    },
                                })}
                                onMouseLeave={() => trigger("city_billing")}
                                error={Boolean(errors.city_billing)}
                                size="small"
                            // value={townBilling}
                            // onChange={handleSelectChangeTownBilling}
                            >
                                <MenuItem value={"Select Town/City"} disabled>
                                    Select Town/City
                                </MenuItem>
                                {datalists?.map((towns) => (
                                    <MenuItem value={towns.value}>{towns.label}</MenuItem>
                                ))}
                                {/* <MenuItem value={"India"}>India</MenuItem> */}
                            </Select>
                            {errors.city_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.city_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                COUNTRY *
                            </Typography>
                            {/* <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Company Name (Optional)"
                  size="small"
                /> */}

                            <Select
                                id="country_billing"
                                {...register("country", {
                                    required: {
                                        value: true,
                                        message: "Country is Required",
                                    },
                                })}
                                onMouseLeave={() => trigger("country_billing")}
                                error={Boolean(errors.country_billing)}
                                size="small"
                            // value={distict}
                            // onChange={handleSelectChange}
                            >
                                <MenuItem value={"Select Country"} disabled>
                                    Select Country
                                </MenuItem>
                                <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                                {/* <MenuItem value={"India"}>India</MenuItem> */}
                            </Select>
                            {errors.country_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.country_billing?.message}
                                </p>
                            )}
                            {/* <Select label="Age"  /> */}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                POSTCODE / ZIP (OPTIONAL)
                            </Typography>
                            <TextField
                                // id=""
                                // label=""
                                // value={}
                                // onChange={}
                                {...register("post_code", {
                                    required: {
                                        value: false,
                                        message: "Enter Post Code",
                                    },
                                })}
                                error={Boolean(errors.post_code_billing)}
                                placeholder="Postcode / zip (Optional)"
                                size="small"
                            />
                            {errors.post_code_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.post_code_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                PHONE *
                            </Typography>
                            <TextField
                                // id=""
                                // label=""
                                // value={}
                                // onChange={}
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: "Phone Number is Required",
                                    },
                                })}
                                onKeyUp={() => trigger("phone")}
                                error={Boolean(errors.phone_billing)}
                                placeholder="Phone *"
                                size="small"
                            />
                            {errors.phone_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.phone_billing?.message}
                                </p>
                            )}
                        </Stack>
                        <Stack direction={"column"} spacing={1} >
                            <Typography variant="cardHeader1" color="initial">
                                EMAIL ADDRESS *
                            </Typography>
                            <TextField
                                // id=""
                                // label=""
                                // value={}
                                // onChange={}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email Address is Required",
                                    },
                                    pattern: {
                                        value:
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "This is not a valid email",
                                    },
                                })}
                                onKeyUp={() => trigger("email_billing")}
                                error={Boolean(errors.email_billing)}
                                placeholder="Email Address *"
                                size="small"
                            />
                            {errors.email_billing && (
                                <p style={{ color: "red" }}>
                                    {errors.email_billing?.message}
                                </p>
                            )}
                        </Stack>


                        {/* Shipping Form */}

                        <Button
                    //   disabled={enable}
                      variant="contained"
                      color="background2"
                      type="submit"
                    //   onClick={() => setIsPlaceOrder(true)}
                    >
                      place order
                    </Button>
                    </Stack>
                      
                </form>
           
          ) : null}
         
                
            </Drawer>
        </>
    )
}

export default AddressLists
