import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";

const style = {
  width: 360,
  bgcolor: "background.paper",
};

const ReferralUserModal = () => {
  //  hooks.
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <RemoveRedEyeIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Information for Referral User
        </DialogTitle>
        <DialogContent>
          <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText children="User Number" />
              <Typography variant="inherit">75 %</Typography>
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText children="Referral Coin" />
              <Typography variant="inherit">45 000 $</Typography>
            </ListItem>
            <ListItem divider>
              <ListItemText children="Referral Users  Price" />
              <Typography variant="inherit"> 1 445 000 $</Typography>
            </ListItem>
            <ListItem divider>
              <ListItemText children="Users List Number" />
              <Typography variant="inherit">300</Typography>
            </ListItem>
            <ListItem divider>
              <ListItemText children="Saving List Number" />
              <Typography variant="inherit">170</Typography>
            </ListItem>
            <ListItem divider>
              <ListItemText children="User All coin" />
              <Typography variant="inherit">2 450 500 $</Typography>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReferralUserModal;
