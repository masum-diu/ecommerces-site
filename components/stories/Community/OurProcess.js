import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const OurProcess = ({ products }) => {
  const [parsedData, setParsedData] = useState([]);
  useEffect(() => {
    if (products) {
      const processImages = JSON.parse(products);
      setParsedData(processImages);
    }
  }, [products, parsedData]);

  return (
    <Box mt={15}>
      <Stack mb={4}>
        <Typography color="#1B3148" className="bold" variant="productName">
          Our Process
        </Typography>
      </Stack>

      <Grid
        container
        spacing={1}
        justifyContent={{
          xs: "center",
          xms: "center",
          sm: "center",
          md: "space-between",
          lg: "space-between",
          xl: "space-between",
        }}
        // sx={{ border: "1px solid red" }}
      >
        {parsedData?.map((data, index) => (
          <Grid
            item
            mt={1}
            xs={12}
            xms={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
            key={index}
          >
            <Stack direction={"column"} justifyContent={"center"}>
              <Image
                height={440}
                width={440}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={data}
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                src={data}
                alt=""
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurProcess;
