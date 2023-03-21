import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import USER_CONTEXT from "./userContext";

export default function GuestCheckout({ open, setOpen }) {
  // const [openGuestCheckoutModalOpen, setGuestCheckoutModalOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isGuestCheckout, setIsGuestCheckout } =
    React.useContext(USER_CONTEXT);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuestCheckoutYes = () => {
    setOpen(false);
    setIsGuestCheckout(true);
  };
  const handleGuestCheckoutNo = () => {
    setOpen(false);
    setIsGuestCheckout(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Checkout As Guest?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleGuestCheckoutNo()} autoFocus>
            Cancel
          </Button>
          <Button onClick={() => handleGuestCheckoutYes()} autoFocus>
            Yes, proceed!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
