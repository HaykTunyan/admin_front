import React, { useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  InputLabel,
  MenuItem,
  Box,
  IconButton,
  FormControlLabel,
  Select,
  Checkbox,
} from "@material-ui/core";
import { UserPlus } from "react-feather";
import { Formik } from "formik";
import { spacing } from "@material-ui/system";

const AddAdminModal = () => {
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (event) => {
    setVerify(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              promision: [],
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  tabIndex={1}
                  margin="dense"
                  id="email"
                  label="Admin Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <TextField
                  tabIndex={2}
                  margin="dense"
                  id="name"
                  label="Admin Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  my={8}
                />

                {errors.email && touched.email && errors.email}
                <TextField
                  tabIndex={2}
                  margin="dense"
                  id="password"
                  label="Admin password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                {errors.password && touched.password && errors.password}
                <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
                  <FormControlLabel
                    label="FSend"
                    control={<Checkbox {...label} value="1" />}
                  />
                  <FormControlLabel
                    label="Real Send"
                    control={<Checkbox {...label} value="2" />}
                  />
                  <FormControlLabel
                    label="Permission for changes on deposits"
                    control={<Checkbox {...label} value="3" />}
                  />
                  <FormControlLabel
                    label="Permissions to change KYC status"
                    control={<Checkbox {...label} value="4" />}
                  />
                  <FormControlLabel
                    label="Permission to send notifications"
                    control={<Checkbox {...label} value="5" />}
                  />
                  <FormControlLabel
                    label="Permission to download the user base"
                    control={<Checkbox {...label} value="6" />}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleClose} sx={{ width: "120px" }}>
                    Cancel
                  </Button>
                  <Box mx={3} />
                  <Button
                    onClick={handleClose}
                    sx={{ width: "120px" }}
                    disabled={isSubmitting}
                    variant="contained"
                  >
                    Create Admin
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdminModal;
