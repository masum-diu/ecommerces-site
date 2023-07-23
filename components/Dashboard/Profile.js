import React, { useContext } from "react";
import {
  Box,
  Divider,
  Grid,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import { usePostAdditionalInfoMutation } from "../../src/features/api/apiSlice";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import USER_CONTEXT from "../userContext";
import { toast } from "react-hot-toast";
const Profile = () => {
  const [useUpdateProfile, { data, isLoading, isError, isSuccess, error }] =
    usePostAdditionalInfoMutation();
  const [openList, setOpenList] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const [token, setToken] = useState("");
  const { user, setUser, setHasToken } = useContext(USER_CONTEXT);
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const userdata =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userjsondata = JSON.parse(userdata); 
  // useForm using
  const { register, handleSubmit } = useForm({
    defaultValues: {
      full_name: "",
      address: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      occupation: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("acesstoken");
    setToken(token);
  }, [token]);
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("User information updated successfully");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess]);
  if (isLoading) {
    return <Loader></Loader>;
  }

  const onSubmit = async (data) => {
    try {
      const response = await useUpdateProfile({ data, token });
    } catch (error) {
      console.log("post request failed", error);
    }
  };

  return (
    <>
      <Box>
        <Stack
          direction={"column"}
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
        >
          <Typography
           variant="cardHeader1"
           color="initial"
           className="exterBold"
           textAlign={"center"}
           textTransform={"capitalize"}
          >
            ACCOUNT INFORMATION
          </Typography>
          <Typography variant="cardLocation1" color="initial" className="light">
            This section contains your address information
          </Typography>
          <br />
          <Paper
            sx={{ p: 2, width: "90%", maxWidth: "800px", marginTop: "30px" }}
            elevation={2}
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="cardHeader12"
                color="initial"
                className="SemiBold"
              >
                Personal Information
              </Typography>
            </Stack>

            <Divider />
            <Stack direction={"column"} mt={2} spacing={2}>
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  User Name
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {userjsondata ? userjsondata?.name : user?.name}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Full Name
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {userjsondata ? userjsondata?.first_name : user?.first_name}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Email Address
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {/* {userjsondata?.email} */}
                  {userjsondata ? userjsondata?.email : user?.email}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Address
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {/* {userjsondata?.address} */}
                  {userjsondata ? userjsondata?.address : user?.address}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Phone Number
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {/* {userjsondata?.phone} */}
                  {userjsondata ? userjsondata?.phone : user?.phone}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Date of Birth
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {/* {userjsondata?.date_of_birth} */}
                  {userjsondata
                    ? userjsondata?.date_of_birth
                    : user?.date_of_birth}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Gender
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {/* {userjsondata?.gender} */}
                  {userjsondata ? userjsondata?.gender : user?.gender}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="cardLocation1"
                  color="#807f83"
                  className="bold"
                >
                  Occupation
                </Typography>
                <Typography
                  variant="cardLocation1"
                  color="initial"
                  className="SemiBold"
                >
                  {/* {userjsondata?.occupation} */}
                  {userjsondata ? userjsondata?.occupation : user?.occupation}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
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
              maxWidth: "800px",
            }}
            endIcon={
              arrow ? (
                <RemoveIcon onClick={() => setArrow(!arrow)} />
              ) : (
                <AddIcon onClick={() => setArrow(!arrow)} />
              )
            }
          >
            Additional Information
          </Button>
          {openList ? (
            <Paper sx={{ p: 2, width: "90%", maxWidth: "800px" }} elevation={2}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={"column"} spacing={2}>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="cardLocation1"
                      color="#807f83"
                      className="bold"
                    >
                      Full Name
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Full Name"
                      {...register("full_name")}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="cardLocation1"
                      color="#807f83"
                      className="bold"
                    >
                      Address
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Address"
                      {...register("address")}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="cardLocation1"
                      color="#807f83"
                      className="bold"
                    >
                      Phone Number
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Phone Number"
                      type="tel"
                      {...register("phone")}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="cardLocation1"
                      color="#807f83"
                      className="bold"
                    >
                      Date of Birth
                    </Typography>
                    <TextField
                      size="small"
                      type="date"
                      {...register("date_of_birth")}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="cardLocation1"
                      color="#807f83"
                      className="bold"
                    >
                      Gender
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio {...register("gender")} />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio {...register("gender")} />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio {...register("gender")} />}
                        label="Other"
                      />
                    </RadioGroup>
                  </Stack>
                  <Stack direction={"column"} spacing={1}>
                    <Typography
                      variant="cardLocation1"
                      color="#807f83"
                      className="bold"
                    >
                      Occupation
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Occupation"
                      {...register("occupation", {
                        required: "Occupation is required",
                      })}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      color="background2"
                    >
                      Update
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>
          ) : null}
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
