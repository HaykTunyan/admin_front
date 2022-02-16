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
  Box,
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

const TopDeviceModal = ({ title, rowList }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <ListItem divider>
              <ListItemText children={"Version"} sx={{ width: "60%" }} />
              <Typography variant="inherit" sx={{ width: "20%" }}>
                Percent %
              </Typography>
              <Spacer mx={3} />
              <Typography variant="inherit">Count</Typography>
            </ListItem>
            {rowList &&
              rowList?.map((item) => (
                <ListItem divider key={item.key}>
                  {item.device_model && (
                    <ListItemText
                      children={item.device_model}
                      sx={{ width: "60%" }}
                    />
                  )}
                  {item.device_os_version && (
                    <ListItemText
                      children={item.device_os_version}
                      sx={{ width: "60%" }}
                    />
                  )}
                  {item.browser_version && (
                    <ListItemText
                      children={item.browser_version}
                      sx={{ width: "60%" }}
                    />
                  )}
                  {!item.device_model &&
                    !item.device_os_version &&
                    !item.browser_version && <Box sx={{ width: "60%" }} />}
                  <Typography
                    variant="inherit"
                    textAlign="end"
                    sx={{ width: "20%" }}
                  >
                    {item.percent} %
                  </Typography>
                  <Spacer mx={3} />
                  <Typography
                    variant="inherit"
                    textAlign="end"
                    sx={{ width: "15%" }}
                  >
                    {item.devices_count}
                  </Typography>
                </ListItem>
              ))}
          </List>
          {rowList.length == "0" && (
            <Typography
              variant="inherit"
              fontWeight="bold"
              align="center"
              sx={{ mt: "20px" }}
            >
              There is no information yet
            </Typography>
          )}
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
