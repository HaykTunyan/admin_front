import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton as MuiIconButton,
  Grid,
  Divider,
} from "@material-ui/core";
import { Trash } from "react-feather";
import { instance } from "../../services/api";
import ConfirmationNotice from "../../components/ConfirmationNotice";

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const DeleteSwapModal = ({ swapId, getSwap }) => {
  // hooks
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    open: false,
    error: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setMessage({ ...message, open: false, error: false });

    return instance
      .delete(`/admin/swap-settings/${swapId} `, { mode: "no-cors" })
      .then((data) => {
        getSwap();
        setMessage({ ...message, open: true });
        return data;
      })
      .catch((error) => {
        setMessage({ ...message, open: true, error: true });
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  return (
    <Fragment>
      {message.open === true && (
        <ConfirmationNotice
          error={message.error}
          title={
            message.error === true
              ? "An error occurred, try again"
              : `Swap Deleted`
          }
        />
      )}
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Trash />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle textAlign="center">Delete Swap Item</DialogTitle>
        <DialogContent>
          <DialogContentText pt={4} textAlign="center"></DialogContentText>
        </DialogContent>
        <Divider my={6} />
        <DialogActions>
          <Grid width="100%" display="flex" justifyContent="space-around" p={3}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "120px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClick}
              sx={{ width: "120px" }}
            >
              Delete Item
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteSwapModal;
