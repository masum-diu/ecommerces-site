import { useState } from 'react';
import { Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '1rem'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const UserProfile = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Avatar />
        <Typography className={classes.title}>
          User Profile
        </Typography>
        <Typography variant="body2" component="p">
          Name: John Doe
        </Typography>
        <Typography variant="body2" component="p">
          Email: john.doe@example.com
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserProfile;