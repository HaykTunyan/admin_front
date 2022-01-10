import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ChevronDown } from "react-feather";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";

// Spacing.
const Spacer = styled.div(spacing);

const style = {
  width: 360,
  bgcolor: "background.paper",
};

// export const TopPhone = [
//   {
//     key: 1,
//     phone: "Device One",
//     percent: 30,
//   },
//   {
//     key: 2,
//     phone: "Device Two",
//     percent: 20,
//   },
//   {
//     key: 3,
//     phone: "Device Three",
//     percent: 10,
//   },
//   {
//     key: 4,
//     phone: "Device Four",
//     percent: 40,
//   },
//   {
//     key: 5,
//     phone: "Device Five",
//     percent: 50,
//   },
// ];

const TopDeviceModal = ({ title, rowList }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("row list", rowList);

  return (
    <>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <ChevronDown />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Information for Top Right
          <span children={title} />
        </DialogTitle>
        <DialogContent>
          <List sx={style} component="nav" aria-label="mailbox folders">
            {rowList &&
              rowList?.map((item) => (
                <ListItem divider key={item.key}>
                  <ListItemText
                    children={item.device_model}
                    children={item.device_os_version}
                  />
                  <Typography variant="inherit">
                    {item.percent} <span> &#8453;</span>
                  </Typography>
                  <Spacer mx={3} />
                  <Typography variant="inherit">
                    {item.devices_count}
                  </Typography>
                </ListItem>
              ))}
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

export default TopDeviceModal;
