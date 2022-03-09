import React, { useState, forwardRef } from "react";
import { Alert as MuiAlert, Snackbar, Stack } from "@material-ui/core";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
});

const ConfirmationNotice = ({ title, error }) => {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState({
    vertical: "bottom",
    horizontal: "left",
  });

  const { vertical, horizontal } = state;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Stack spacing={2}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          autoHideDuration={2500}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={error === true ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {title}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default ConfirmationNotice;
