import React from "react";
import HomePageIntro from "../../components/HomePageIntro";
import {
  Box,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Footer from "../../components/Footer";
import Agreements from "../../components/policies/Agreements";
import { useGetInformationQuery } from "../../src/features/api/apiSlice";
import Loader from "../../components/Loader/Loader";
import SegmentIcon from "@mui/icons-material/Segment";
import { useContext } from "react";
import USER_CONTEXT from "../../components/userContext";
import { MdClose } from "react-icons/md";

const policiespages = () => {
  // const [selectItem, setSelectItem] = useState("terms-conditions");
  const { selectItem, setSelectItem } = useContext(USER_CONTEXT);
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, isSuccess } = useGetInformationQuery();
  // console.log("data", data);
  const handleMenuClick = (menu) => {
    setSelectItem(menu);
    setOpen(false);
  };
  const renderMenuContent = () => {
    const selectedItem = data?.find((item) => item.slug === selectItem);
    if (selectedItem) {
      return <Agreements data={selectedItem.content} />;
    }
    return null;
  };
  if (isLoading) {
    <Loader></Loader>;
  }
  return (
    <>
      <HomePageIntro title={"PoliciesPages "} />
      <Box sx={{ pt: { lg: 8, xs: 7 } }} mb={4}>
        <Stack>
          <Typography
            variant="header1"
            color="#7E7250"
            className="bold"
            sx={{ background: "#2C3649", py: 10 }}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontWeight="500"
          >
            {selectItem}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <IconButton onClick={() => setOpen(true)}>
            <Hidden only={["xl", "lg", "md"]}>
              <SegmentIcon />
            </Hidden>
          </IconButton>
        </Stack>
        <Grid
          container
          // spacing={2}
          sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto", mt: 2 }}
        >
          <Hidden only={["sm", "xs", "xms"]}>
            <Grid item lg={3} sx={{ height: "600px" }}>
              <List>
                {data?.map((content, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleMenuClick(content.slug)}
                    >
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="cardHeader1"
                              className="bold"
                              color="#1B3148"
                              textAlign={"left"}
                            >
                              {content?.title}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Hidden>
          <Grid item lg={6} sm={12} xs={12}>
            <Typography paragraph textAlign={"justify"}>
              {renderMenuContent()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Footer />
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
        <Stack justifyContent={"flex-end"} alignItems={"flex-start"} p={1}>
          <IconButton aria-label="" onClick={() => setOpen(false)}>
            <img src="/assets/close_sidebar.svg" alt="" />
            {/* <MdClose /> */}
          </IconButton>
        </Stack>
        <List>
          {data?.map((content, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(content.slug)}>
                {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="cardHeader1"
                        className="bold"
                        color="#1B3148"
                      >
                        {content.title}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default policiespages;
