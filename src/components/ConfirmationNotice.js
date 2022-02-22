import React, { useState, forwardRef } from "react";
import { Alert as MuiAlert, Snackbar, Stack } from "@material-ui/core";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
});

const ConfirmationNotice = ({ opening, title }) => {
  const [state, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    opening = false;
    setOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Snackbar open={state} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {title}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ConfirmationNotice;
