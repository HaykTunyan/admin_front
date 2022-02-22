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
  const [success, setSuccess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    return instance
      .delete(`/admin/swap-settings/${swapId} `, { mode: "no-cors" })
      .then((data) => {
        setSuccess(false);
        getSwap();
        setSuccess(true);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  return (
    <Fragment>
      {success === true && (
        <ConfirmationNotice
          opening={success}
          title="Delete Item successfully"
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
