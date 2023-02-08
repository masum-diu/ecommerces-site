import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";

const checkout = () => {
  const [distict, setDistict] = React.useState(10);

  const handleDistict = (event) => {
    setDistict(event.target.value);
  };
  return (
    <>
      <HomePageIntro title={"Checkout "} />
      <Box
        sx={{
          height: { lg: "100%", xs: "fit-content" },
          py: 15,
          width: { lg: "90%", xs: "100%" },
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="header1"
            color="initial"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Checkout
          </Typography>
          <Grid
            container
            spacing={5}
            pt={5}
            xs={12}
            sx={{
              // display: "flex",
              // justifyContent: "center",
              //  alignItems: "center",
              width: "100%",
            }}
          >
            <Grid item lg={8} sx={{ width: "100%" }}>
              <Typography variant="header1" color="initial">
                BILLING DETAILS
              </Typography>
              <Stack direction={"column"} spacing={2} mt={2}>
                <Typography variant="cardHeader1" color="initial">
                  FIRST NAME *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}

                  // onChange={}
                  placeholder="First Name *"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  LAST NAME *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Last Name *"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  COMPANY NAME (OPTIONAL)
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Company Name (Optional)"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  STREET ADDRESS *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="House Number and street name"
                  size="small"
                />
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Apartment suite, unit, etc (optional)"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  TOWN / CITY *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Town / City"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  DISTRICT *
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
                  id="demo-simple-select"
                  size="small"
                  value={distict}
                  onChange={handleDistict}
                >
                  <MenuItem value={10}>Dhaka</MenuItem>
                  <MenuItem value={20}>Feni</MenuItem>
                  <MenuItem value={30}>Gazipur</MenuItem>
                </Select>
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  POSTCODE / ZIP (OPTIONAL)
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Postcode / zip (Optional)"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  PHONE *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Phone *"
                  size="small"
                />
              </Stack>
              <Stack direction={"column"} spacing={2} mt={3}>
                <Typography variant="cardHeader1" color="initial">
                  EMAIL ADDRESS *
                </Typography>
                <TextField
                  // id=""
                  // label=""
                  // value={}
                  // onChange={}
                  placeholder="Email Address *"
                  size="small"
                />
              </Stack>
              
            </Grid>
            <Grid item lg={4} mt={4} xs={12}>
              <Paper elevation={3} mb={1}>
                <Stack
                  sx={{ width: "90%", mx: "auto", p: 2 }}
                  direction={"column"}
                  spacing={2}
                >
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <Typography variant="cardHeader1" color="initial">
                      PRODUCT
                    </Typography>
                    <Typography variant="cardHeader1" color="initial">
                      SUBTOTAL
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <Typography variant="cardHeader12" color="initial">
                      Broom baby shirt - 4-5 × 1
                    </Typography>
                    <Typography variant="cardHeader12" color="initial">
                      ৳ 1,165
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <Typography variant="cardHeader12" color="initial">
                      Broom baby shirt - 4-5 × 1
                    </Typography>
                    <Typography variant="cardHeader12" color="initial">
                      ৳ 1,165
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={"row"} spacing={2} justifyContent="space-between">
                    <Typography variant="cardHeader"  color="initial">
                      SUBTOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 23,155
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={"row"} spacing={5} mb={5}>
                    <Typography variant="cardHeader" color="initial" mt={1}>
                      SHIPPING
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="DHAKA"
                        control={<Radio />}
                        label="DHAKA : ৳ 100"
                      />
                      <FormControlLabel
                        value="PICK FROM SHOWROOM"
                        control={<Radio />}
                        label="PICK FROM SHOWROOM"
                      />
                    </RadioGroup>
                  </Stack>
                  <br />
                  <br />
                  <Stack direction={"row"} spacing={9}>
                    <Typography variant="cardHeader" color="initial">
                      TAX :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12
                    </Typography>
                  </Stack>

                  <Divider />
                  <Stack direction={"row"} spacing={7}>
                    <Typography variant="cardHeader" color="initial">
                      TOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12,160
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={"column"} spacing={9}>
                    {/* <Typography variant="cardHeader" color="initial">
                      TOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12,160
                    </Typography> */}
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Online Payment"
                        control={<Radio />}
                        label="Online Payment"
                      />
                      <Divider />
                      <FormControlLabel
                        value="Cash On Delivery"
                        control={<Radio />}
                        label="Cash On Delivery"
                      />
                      <Divider />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                      <Divider />
                    </RadioGroup>
                  </Stack>
                  <Stack direction={"row"} width="100%" alignItems={"center"}>
                    <Checkbox />
                    <Typography variant="cardLocation1" color="initial">
                      I have read and agree to the terms and conditions *
                    </Typography>
                  </Stack>

                  <Button
                    variant="contained"
                    color="background2"
                    // onClick={() => router.push("/checkout")}
                  >
                    place order
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};

export default checkout;
