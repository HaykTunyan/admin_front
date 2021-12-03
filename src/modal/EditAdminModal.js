import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  Button,
  Paper,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { editAdmin } from "../redux/actions/user-managment";

// Spacing.
const TextField = styled(MuiTextField)(spacing);

// validation Schema.
const editAdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is requrired"),
  email: Yup.string()
    .email("Must be a valid email")
    .min(8, "Must be at least 8 characters")
    .max(255)
    .required("Email is requried"),
  password: Yup.string()
    .min(6, " Must be a last 8 characters ")
    .max(255, " Must be a last 355 characters")
    .required(" Passowrd is required "),
});

const EditAdminModal = ({ email, name, id }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: name,
    email: email,
    password: "12345678",
    role: 4,
    permissions: [],
    adminId: id,
  });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(editAdmin(values)).then();
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={editAdminSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  margin="dense"
                  id="name"
                  defaultValue={state.name}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Admin Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <TextField
                  margin="dense"
                  id="email"
                  defaultValue={state.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Admin Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <TextField
                  margin="dense"
                  id="password"
                  defaultValue={state.password}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Admin password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <Typography variant="subtitle1">Permissions</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
                  <FormControlLabel
                    label="FSend"
                    control={<Checkbox {...label} onChange={handleChange} />}
                  />
                  <FormControlLabel
                    label="Real Send"
                    control={<Checkbox {...label} onChange={handleChange} />}
                  />
                  <FormControlLabel
                    label="Permission for changes on deposits"
                    control={<Checkbox {...label} onChange={handleChange} />}
                  />
                  <FormControlLabel
                    label="Permissions to change KYC status"
                    control={<Checkbox {...label} onChange={handleChange} />}
                  />
                  <FormControlLabel
                    label="Permission to send notifications"
                    control={<Checkbox {...label} onChange={handleChange} />}
                  />
                  <FormControlLabel
                    label="Permission to download the user base"
                    control={<Checkbox {...label} onChange={handleChange} />}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    onClick={handleClose}
                    sx={{ width: "120px" }}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Box mx={3} />
                  <Button
                    sx={{ width: "120px" }}
                    variant="contained"
                    type="submit"
                  >
                    Save Admin
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAdminModal;
