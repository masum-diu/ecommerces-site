// import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import OrderDetails from "../../components/Dashboard/OrderDetails";
import UserProfile from "../../components/Dashboard/userProfile";
import Footer from "../../components/Footer";
import HomePageIntro from "../../components/HomePageIntro";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  main: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    position: "absolute",
    top: "100px",
    left: "0px",
    border: "1px solid red",
  },
};

const Dashboard = (props) => {
  const [selectedMenu, setSelectedMenu] = React.useState("User Profile");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderMenuContent = () => {
    switch (selectedMenu) {
      case "User Profile":
        return <UserProfile></UserProfile>;
      case "Order":
        return <OrderDetails></OrderDetails>;
      default:
        return null;
    }
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {["User Profile", "Order"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div style={{ position: "relative" }}>
      <HomePageIntro></HomePageIntro>
      <Box sx={{ display: "flex", height: "1000px", marginTop: "100px" }}>
        <CssBaseline />
        <AppBar
          style={{ marginTop: "100px" }}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "none",
            boxShadow: "none",
            paddingLeft: "10px",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            anchor="right"
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            anchor="left"
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "100px",
                height: "1000px",
                paddingLeft: "15px",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Typography paragraph>{renderMenuContent()}</Typography>
        </Box>
      </Box>

      {/* <Box
        style={{
          height: "1000px",
          width: "100%",
          border: "1px solid red",
          marginTop: "100px",
          position: "relative",
        }}
      >
        <Drawer
          sx={{ marginTop:"100px"}}
          variant="persistent"
          anchor="left"
          open={true}
        >
          <List style={{ marginTop: "100px" }}>
            <ListItem button onClick={() => handleMenuClick("profile")}>
              <ListItemText primary="User Profile" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick("order")}>
              <ListItemText primary="Order Details" />
            </ListItem>
          </List>
        </Drawer>
        {renderMenuContent()}
      </Box> */}

      <Footer></Footer>
    </div>
  );
};
Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
