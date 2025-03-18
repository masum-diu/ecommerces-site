import React, { useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SegmentIcon from "@mui/icons-material/Segment";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { Email, Phone, Room } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import style from "../map.module.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../Loader/Loader";
import { useGetCommunityDataQuery } from "../../../src/features/api/apiSlice";
const Community = () => {
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [hoveredDivision, setHoveredDivision] = useState(null);
  const [showRdBtn, setShowRdBtn] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [sidebarContent, setSidebarContent] = useState({});
  const router = useRouter();
  const {
    data: communityData,
    isError: communityError,
    isLoading: communityLoading,
  } = useGetCommunityDataQuery();

  useEffect(() => {
    const data = communityData?.data?.map((item) => ({
      id: `division${item.id}`,
      name: item.district_name,
      description: item.description,
      featureImage: item.feature_image,
      detailImage: item.detail_image,
      rowData: item,
    }));
    setDivisions(data);
  }, [communityData]);

  /* const divisions = [
    { id: "division1", name: "Rangpur" },
    { id: "division2", name: "Nawabganj" },
    { id: "division3", name: "Sirajganj" },
    { id: "division4", name: "Rajshahi" },
    { id: "division5", name: "Mymensingh" },
    { id: "division6", name: "Tangail" },
    { id: "division7", name: "Gazipur" },
    { id: "division8", name: "Sylhet" },
    { id: "division9", name: "Jhinaidaha" },
    { id: "division10", name: "Jassore" },
    { id: "division11", name: "Patuakhali" },
    { id: "division12", name: "Rangamati" },
    { id: "division13", name: "Bandarban" },
  ]; */
  if (communityLoading) {
    <Loader></Loader>;
  }

  return (
    <Stack
      //   sx={{ pt: { lg: 8, xs: 7 } }}
      mb={4}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack sx={{ width: "100%" }}>
        <Typography
          variant="productName"
          color="#1B3148"
          className="bold"
          //   sx={{ background: "#2C3649",  }}
          textAlign={"center"}
          //   textTransform={"uppercase"}
          fontWeight="500"
        >
          Community
        </Typography>
      </Stack>

      <Grid
        container
        spacing={3}
        // mx={"auto"}
        sx={{ maxWidth: "1500px", width: "100%" }}
        mt={5}
        mb={5}
        justifyContent={"space-around"}
        alignItems={"flex-start"}
      >
        {/* Map Section */}
        <Grid item xs={10} md={5}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={{
              sm: "100%",
              md: "100%",
              lg: "100%",
            }}
            sx={{ maxHeight: "941px", height: "100%" }}
            className={style.map_container}
          >
            <Stack>
              <img
                style={{ height: "100%", width: "100%" }}
                src="../assets/Map.png"
                alt="Bangladesh Map"
              />
            </Stack>

            <Stack className={style.division_buttons}>
              {divisions?.map((division) => (
                <Stack
                  key={division.id}
                  className={style.division_button}
                  data-division={division.id}
                  onMouseEnter={() => setShowRdBtn(division.id)}
                  onMouseLeave={() => {
                    setShowRdBtn(null);
                  }}
                >
                  <Typography
                    variant="cardHeader3"
                    className="bold"
                    color={"#1B3148"}
                    mb={2}
                  >
                    {division.name}
                  </Typography>
                  <Radio
                    style={{
                      transform: "translateY(-50%)",
                      visibility:
                        showRdBtn === division.id ? "visible" : "hidden",
                      transition: "visibility 1s ease-in-out",
                    }}
                    checked={true}
                    onClick={() => {
                      setHoveredDivision((prev) =>
                        prev === division.id ? null : division.id
                      );
                      setSidebarContent(division?.rowData);
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>

        {/* Details Section */}
        <Grid item xs={10} md={5}>
          <Stack
            sx={{
              position: "relative",
              overflow: "hidden",
              maxHeight: "941px",
              height: "100%",
            }}
          >
            <Stack
              style={{
                position: "absolute",
                right: hoveredDivision ? 0 : "-100%", // Adjust to '0' for right to left effect
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                backgroundImage: `url(${sidebarContent?.detail_image})`, // Replace with the path to your image
                backgroundSize: "cover", // You can adjust the background size as needed
                backgroundPosition: "center", // You can adjust the background position as needed
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.8s ease-in-out", // Adjust the duration and easing as needed
                transform: hoveredDivision
                  ? "translateX(0)"
                  : "translateX(100%)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for the desired transparency
                }}
              />
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                columnGap={5}
                rowGap={5}
                height={"100%"}
                p={5}
              >
                <Typography
                  variant="productName"
                  sx={{
                    color: "#ffffff",
                    textAlign: "center",
                    zIndex: 1,
                  }}
                  textTransform="uppercase"
                >
                  Our work in {sidebarContent?.district_name}
                </Typography>
                <Typography
                  sx={{
                    color: "#ffffff",
                    zIndex: 1,
                  }}
                >
                  {sidebarContent?.short_description}
                </Typography>

                <Link
                  style={{
                    padding: "0",
                    width: {
                      xs: "8rem",
                      xms: "10rem",
                      sm: "15rem",
                      md: "15rem",
                    },
                  }}
                  variant="text"
                  size="large"
                  href={`/story/community/${sidebarContent?.id}`}
                  color="#ffffff"

                  //   onClick={() =>
                  //     handleSecondBanner(sectionBanner[1]?.back_link)
                  //   }
                >
                  <Typography
                    textTransform={"none"}
                    color="#ffffff"
                    zIndex={1}
                    style={{ cursor: "pointer" }}
                    // onClick={() => router.push("/story/community")}
                  >
                    Read More ...
                  </Typography>
                </Link>
              </Stack>
            </Stack>

            <Stack sx={{ maxHeight: "800px", height: "100%" }}>
              <img
                src="/assets/map_sider.png"
                style={{
                  height: "100%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                alt=""
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Community;
