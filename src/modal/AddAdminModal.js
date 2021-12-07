import React, { useState } from "react";
import styled from "styled-components/macro";
import { UserPlus } from "react-feather";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import useAuth from "../hooks/useAuth";
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

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Spacer = styled.div(spacing);
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

const AddAdminModal = () => {
  //   //  hooks.
  const [open, setOpen] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { addAdmin } = useAuth();
  const dispatch = useDispatch();
  const [messageError, setMessageError] = useState([]);

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
    console.log("values", values);
    dispatch(createAdmin(values))
      .then((data) => {
        if (data.success) {
          console.log(" data success ", data.success);
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log("error", error?.message);
        setMessageError(error?.response?.data);
      });
  };

  console.log("messageError", messageError);
  const invalid = messageError?.message;

  // console.log("invalid", invalid[0]);

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
              ...state,
            }}
            initialForms={state}
            validationSchema={addAdminValidation}
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
                  <FormControlLabel
                    label="FSend"
                    control={
                      <Checkbox
                        {...label}
                        onChange={handleChange}
                        name="permissions"
                        defaultValue={state.permissions}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Real Send"
                    control={
                      <Checkbox
                        {...label}
                        defaultValue={state.permissions}
                        name="permissions"
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permission for changes on deposits"
                    control={
                      <Checkbox
                        {...label}
                        defaultValue={state.permissions}
                        name="permissions"
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permissions to change KYC status"
                    control={
                      <Checkbox
                        {...label}
                        defaultValue={state.permissions}
                        name="permissions"
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permission to send notifications"
                    control={
                      <Checkbox
                        {...label}
                        defaultValue={state.permissions}
                        name="permissions"
                        onChange={handleChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Permission to download the user base"
                    control={
                      <Checkbox
                        {...label}
                        defaultValue={state.permissions}
                        name="permissions"
                        onChange={handleChange}
                      />
                    }
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
                    Create Admin
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

export default AddAdminModal;
