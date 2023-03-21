import { useState } from 'react';
import { Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import OrderDetails from "../../components/Dashboard/OrderDetails";
import UserProfile from "../../components/Dashboard/userProfile";

const Dashboard = () => {
    const classes = useStyles();
    const [selectedCard, setSelectedCard] = useState('profile');
  
    const handleCardClick = (card) => {
      setSelectedCard(card);
    }
  
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card} onClick={() => handleCardClick('profile')}>
              <CardContent>
                <Typography className={classes.title}>
                  User Profile
                </Typography>
              </CardContent>
            </Card>
            {selectedCard === 'profile' && <UserProfile />}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card} onClick={() => handleCardClick('order')}>
              <CardContent>
                <Typography className={classes.title}>
                  Order Details
                </Typography>
              </CardContent>
            </Card>
            {selectedCard === 'order' && <OrderDetails />}
          </Grid>
        </Grid>
      </div>
    );
  }
  
  export default Dashboard;