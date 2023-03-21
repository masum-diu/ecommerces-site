import { useState } from "react";
import { Grid, Typography, Card, CardContent, Avatar } from "@mui/material";
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: "1rem",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const OrderDetails = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>Order Details</Typography>
        <Typography variant="body2" component="p">
          Order Number: 123456
        </Typography>
        <Typography variant="body2" component="p">
          Date: March 21, 2023
        </Typography>
        <Typography variant="body2" component="p">
          Amount: $50.00
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
