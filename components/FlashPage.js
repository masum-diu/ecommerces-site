import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BiMap } from "react-icons/bi";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MenuItem, Select, Stack, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const FlashPage = ({ title }) => {
  const [country, setCountry] = React.useState(10);
  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const [currency, setCurrency] = React.useState(10);
  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const [language, setLanguage] = React.useState(10);
  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title ? title + "- Aranya" : "Aranya"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundImage:
            "url('https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/v1676527368/aranya/r98zxbtcywpy4jocgyqd.jpg')",
          backgroundSize: "cover",
          height: "100vh",
          maxHeight: "fit-content",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ boxShadow: "none", backgroundColor: "#fff" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
            }}
          >
            <Stack direction={"row"} alignItems="center">
              <img src="/assets/headerLogo.png" alt="" />
            </Stack>

            <Stack direction={"row"} alignItems="center">
              <IconButton aria-label="">
                <BiMap style={{ color: "#0A0A0A" }} />
              </IconButton>
              <Typography variant="cardHeader" color="initial">
                BD
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>
        <Box>
          <Stack
            direction={"column"}
            sx={{
              width: "90vw",
              maxWidth: "433px",
              pt: { lg: 29, xs: 13 },
              mx: { lg: 20, xs: "auto" },
            }}
            spacing={1}
          >
            <Typography variant="homeFlash" color="initial">
              Select your shipping country
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              onChange={handleChange}
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={20} disabled>
                Select Shipping Country
              </MenuItem>
              <MenuItem value={10}>Bangladesh</MenuItem>
              {/* <MenuItem value={30}>England</MenuItem>
              <MenuItem value={40}>India</MenuItem> */}
            </Select>
            <Typography variant="homeFlash" color="initial">
              Select your currency
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={handleChangeCurrency}
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={20} disabled>
                Select currency{" "}
              </MenuItem>
              <MenuItem value={10}>Taka</MenuItem>
              {/* <MenuItem value={30}>Euro</MenuItem>
              <MenuItem value={40}>Dollar</MenuItem> */}
            </Select>
            <Typography variant="homeFlash" color="initial">
              Language
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              onChange={handleLanguage}
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={20} disabled>
                Select Language{" "}
              </MenuItem>
              {/* <MenuItem value={20}>Bangla</MenuItem> */}
              <MenuItem value={10} sx>
                English
              </MenuItem>
              {/* <MenuItem value={40}>Hindi</MenuItem> */}
            </Select>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              width: "90vw",
              maxWidth: "433px",
              mx: { lg: 20, xs: "auto" },
            }}
            mt={3}
          >
            <Button
              variant="contained"
              color="black"
              /* onClick={() => router.push("/shop")} */
            >
              <Link sx={{textDecoration:"none"}} href={"/shop"}>continue</Link>
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default FlashPage;
