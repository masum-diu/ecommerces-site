import React from "react";
import { useGetUserAddressQuery } from "../../src/features/api/apiSlice";
import Loader from "../Loader/Loader";
import { Button, Stack, Typography } from "@mui/material";

const AddressBooks = () => {
  const token = localStorage.getItem("acesstoken");
  const { data, isLoading, isSuccess } = useGetUserAddressQuery(token);
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Stack
        direction={"column"}
        sx={{ width: "90%", maxWidth: "1500px", margin: "0 auto" }}
        spacing={2}
        pt={3}
      >
        <Typography
          variant="cardHeader1"
          color="#1B3148"
          className="exterBold"
          textAlign={"center"}
        >
          Address book
        </Typography>
        {data?.map((data) => (
          <>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Button variant="outlined" disabled color="background2">
                <Stack
                  direction={"column"}
                  textAlign={"left"}
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    - FIRST NAME: {data?.first_name}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    - LAST NAME: {data?.last_name}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    - STREET ADDRESS: {data?.street_address}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    {" "}
                    - APARTMENT ADDRESS: {data?.apartment}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    {" "}
                    - CITY: {data?.city}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    {" "}
                    - COUNTRY: {data?.country}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    {" "}
                    - POSTCODE: {data?.post_code}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    {" "}
                    - PHONE: {data?.phone}
                  </Typography>
                  <Typography
                    variant="cardLocation"
                    color="#af9368"
                    className="SemiBold"
                    sx={{ color: "#1B3148" }}
                  >
                    {" "}
                    - EMAIL: {data?.email}
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </>
        ))}
      </Stack>
    </>
  );
};

export default AddressBooks;
