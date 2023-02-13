import { Divider, Grid, Typography, Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const ProductInnerPage = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={7}>
          <Stack direction={"column"}>
            <img src="/assets/9.png" alt="" width={"fit-content"} />
            <Stack direction={"row"}>
              {" "}
              <img src="/assets/6.png" alt="" width={"100%"} />
              <img src="/assets/7.png" alt="" width={"100%"} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item lg={5}>
          <Stack direction={"column"} mx={5} mt={3}>
            <Typography variant="login1" color="initial" fontWeight="bold">
              Santolina Kurti
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Typography variant="cardHeader1" color="initial">
                HOME /
              </Typography>
              <Typography variant="cardHeader1" color="initial">
                WOMEN /
              </Typography>
              <Typography variant="cardHeader1" color="initial">
                KURTI & FATUA
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"column"} mx={5} mt={3} spacing={3}>
            <Typography variant="cardHeader3" color="initial">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              iusto odit, molestias dolores provident cupiditate delectus.
              Dolorem provident, tempora itaque aliquam sint veniam vitae
              dolores temporibus beatae inventore accusantium perspiciatis!
            </Typography>
            <Typography variant="header1" color="initial">
              Price : 2995 TK
            </Typography>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="cardHeader3" color="initial">
                Sizes
              </Typography>
              <hr
                style={{
                  textAlign: "left",
                  width: "100%",
                  height: "1px",
                  backgroundColor: "black",
                  // maxWidth: "350px",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack direction={"row"}>
                <Button variant="primary" color="primary">
                  S
                </Button>
                <Button variant="text" color="primary">
                  M
                </Button>
                <Button variant="text" color="primary">
                  L
                </Button>
                <Button variant="text" color="primary">
                  XL
                </Button>
                <Button variant="text" color="primary">
                  XXL
                </Button>
              </Stack>
              <Button variant="text" color="primary">
                size guide
              </Button>
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="cardHeader3" color="initial">
                Quantity
              </Typography>
              <hr
                style={{
                  textAlign: "left",
                  width: "100%",
                  height: "1px",
                  backgroundColor: "black",
                  // maxWidth: "340px",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems="center"
              justifyContent={"space-between"}
              sx={{ width: "100%", maxWidth: "50px" }}
            >
              <IconButton
                size="small"
                aria-label="reduce"
                // onClick={() => {
                //   setCount(Math.max(count - 1, 0));
                // }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography variant="cardHeader3" color="initial">
                {" "}
                1
              </Typography>
              <IconButton aria-label="increase">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="cardHeader3" color="initial">
                Colors
              </Typography>
              <hr
                style={{
                  textAlign: "left",
                  width: "100%",
                  height: "1px",
                  backgroundColor: "black",
                  // maxWidth: "350px",
                }}
              />
            </Stack>
            <Stack direction={"row"} spacing={1} height={40}>
              <Button variant="contained" color="primary"></Button>
              <Button variant="contained" color="primary"></Button>
              <Button variant="contained" color="primary"></Button>
              <Button variant="contained" color="primary"></Button>
            </Stack>
            <Button variant="contained" color="background2">
              ADD TO CART
            </Button>
          </Stack>
        </Grid>
        <Grid item lg={7}>
          <img src="/assets/Bitmap.png" alt="" width={"100%"} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductInnerPage;
