import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { UserPlus } from "react-feather";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert as MuiAlert,
} from "@material-ui/core";
import { createAdmin } from "../redux/actions/user-managment";
import ConfirmationNotice from "../components/ConfirmationNotice";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Alert = styled(MuiAlert)(spacing);

// Validation Schema.
const addAdminValidation = Yup.object().shape({
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

const AddAdminModal = ({ getAdminUsers, primission }) => {
  //  Hooks.
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState([]);
  const [success, setSuccess] = useState(false);

  const [state, setState] = useState({
    email: "",
    name: "",
    role: "4", // 1 is super admin
    permissions: [], //permissions are 1, 2, 3, 4, 5, 6
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    setSuccess(false);
    dispatch(createAdmin(values))
      .then((data) => {
        if (data.success) {
          setOpen(false);
          getAdminUsers();
          setSuccess(true);
        }
      })
      .catch((error) => {
        setMessageError(error?.response?.data);
      });
  };
  const invalid = messageError?.message;

  return (
    <Fragment>
      {success == true && <ConfirmationNotice title="New Admin Added" />}
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={addAdminValidation}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                {invalid && (
                  <>
                    {invalid[0]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[0]?.messages}
                      </Alert>
                    )}

                    {invalid[1]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[1]?.messages}
                      </Alert>
                    )}
                    {invalid[2]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[2]?.messages}
                      </Alert>
                    )}
                    {invalid[3]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[3]?.messages}
                      </Alert>
                    )}
                  </>
                )}
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
                    label="Fake Send"
                    control={
                      <Checkbox
                        {...label}
                        name="permissions"
                        value={1}
                        defaultValue={1}
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Real Send"
                    control={
                      <Checkbox
                        {...label}
                        name="permissions"
                        value={2}
                        defaultValue={2}
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permission for changes on deposits"
                    control={
                      <Checkbox
                        {...label}
                        name="permissions"
                        value={3}
                        defaultValue={3}
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permissions to change KYC status"
                    control={
                      <Checkbox
                        {...label}
                        name="permissions"
                        value={4}
                        defaultValue={4}
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permission to send notifications"
                    control={
                      <Checkbox
                        {...label}
                        name="permissions"
                        value={5}
                        defaultValue={5}
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permission to download the user base"
                    control={
                      <Checkbox
                        {...label}
                        name="permissions"
                        value={6}
                        defaultValue={6}
                        onChange={handleChange}
                      />
                    }
                  />
                  {/* Primission Super Admin */}
                  {primission.role === 1 && (
                    <FormControlLabel
                      label="Create and Edit the Admin Settings"
                      control={
                        <Checkbox
                          {...label}
                          name="permissions"
                          value={7}
                          defaultValue={7}
                          onChange={handleChange}
                        />
                      }
                    />
                  )}
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
                    Create Admin
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default AddAdminModal;
