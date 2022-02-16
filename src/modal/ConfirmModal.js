import { Modal, ModalBody, Button, ModalFooter } from "reactstrap";
import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";

const ConfirmModal = ({
  size,
  title,
  onClose,
  message,
  className,
  cancelText,
  confirmText,
  cancelColor,
  confirmColor,
  buttonsComponent,
}) => {
  let buttonsContent = (
    <>
      {cancelText && (
        <Button color={cancelColor} onClick={() => onClose(false)}>
          {cancelText}
        </Button>
      )}{" "}
      <Button color={confirmColor} onClick={() => onClose(true)}>
        {confirmText}
      </Button>
    </>
  );

  if (buttonsComponent) {
    const CustomComponent = buttonsComponent;
    buttonsContent = <CustomComponent onClose={onClose} />;
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle textAlign="center">Confirm Your Action</DialogTitle>
        <DialogActions>
          <button className="close" onClick={() => onClose(false)}>
            <i className="icon icon-x-circle" />
          </button>
          {!!title && <h3>{title}</h3>}
          {!!message && <div className="body-color mt-3">{message}</div>}

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
              onClick={onSuccess}
              sx={{ width: "120px" }}
            >
              Confirm
            </Button>
          </Grid>
        </DialogActions>
        <DialogActions>{buttonsContent}</DialogActions>
      </Dialog>
    </>
  );
};

ConfirmModal.defaultProps = {
  message: "Are you sure?",
  title: "Are you sure?",
  confirmText: "Ok",
  cancelText: "",
  confirmColor: "primary",
  cancelColor: "",
  className: "",
  buttonsComponent: null,
  size: null,
};

export default ConfirmModal;
