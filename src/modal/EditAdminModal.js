import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  Alert as MuiAlert,
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { editAdmin } from "../redux/actions/user-managment";
import ConfirmationNotice from "../components/ConfirmationNotice";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Alert = styled(MuiAlert)(spacing);

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

const EditAdminModal = ({ email, name, id, getAdminUsers, permissions }) => {
  // Hooks.
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    name: name,
    email: email,
    password: "12345678",
    role: 4,
    permissions: permissions,
    adminId: id,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    dispatch(editAdmin(values))
      .then((data) => {
        setSuccess(false);
        if (data.success) {
          setOpen(false);
        }
        setSuccess(true);
        getAdminUsers();
      })
      .catch((error) => {
        setMessageError(error?.response?.data);
      });
  };

  const invalid = messageError?.message;

  return (
    <Fragment>
      {success === true && (
        <ConfirmationNotice opening={true} title="Edit Admin User" />
      )}
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
                  <FormControl>
                    <FormControlLabel
                      label="Fake Send"
                      name="permissions"
                      control={
                        <Checkbox
                          {...label}
                          defaultValue={1}
                          value={1}
                          defaultChecked={permissions.find(
                            (item) => item === 1
                          )}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Real Send"
                      name="permissions"
                      control={
                        <Checkbox
                          {...label}
                          defaultValue={2}
                          value={2}
                          defaultChecked={permissions.find(
                            (item) => item === 2
                          )}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Permission for changes on deposits"
                      name="permissions"
                      control={
                        <Checkbox
                          {...label}
                          defaultValue={3}
                          value={3}
                          defaultChecked={permissions.find(
                            (item) => item === 3
                          )}
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
                          defaultValue={4}
                          value={4}
                          defaultChecked={permissions.find(
                            (item) => item === 4
                          )}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Permission to send notifications"
                      name="permissions"
                      control={
                        <Checkbox
                          {...label}
                          defaultValue={5}
                          value={5}
                          defaultChecked={permissions.find(
                            (item) => item === 5
                          )}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Permission to download the user base"
                      name="permissions"
                      control={
                        <Checkbox
                          {...label}
                          defaultValue={6}
                          value={6}
                          defaultChecked={permissions.find(
                            (item) => item === 6
                          )}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Create and Edit the Admin Settings"
                      name="permissions"
                      control={
                        <Checkbox
                          {...label}
                          defaultValue={7}
                          value={7}
                          defaultChecked={permissions.find(
                            (item) => item === 6
                          )}
                          onChange={handleChange}
                        />
                      }
                    />
                  </FormControl>
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
    </Fragment>
  );
};

export default EditAdminModal;
