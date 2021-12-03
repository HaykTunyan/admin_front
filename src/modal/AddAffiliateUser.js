import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
} from "@material-ui/core";
import { useFormik, Form, Formik } from "formik";
import { UserPlus } from "react-feather";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import { createAffiliate } from "../redux/actions/user-managment";

// Spacing.
const TextField = styled(MuiTextField)(spacing);

// validation Schema.
const addAffilateValidation = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .min(8, "Must be at least 8 characters")
    .max(255)
    .required("Email is requried"),
  full_name: Yup.string()
    .min(2, "Too Short!")
    .max(200, " Too Short!")
    .required("Full Name is requrired"),
  phone: Yup.string().required(" Phone is requrired "),
  password: Yup.string()
    .min(6, " Must be a last 6 characters ")
    .max(255, " Must be a last 355 characters")
    .uppercase(1, " Must be a one uppercase ")
    .lowercase(1, " Must be a one lowercase ")
    .required(" Passowrd is required "),
});

const AddAffiliateUser = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     ...state,
  //   },
  //   validationSchema: { addAffilateValidation },
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values));
  //     dispatch(createAffiliate(values)).then();
  //     setOpen(false);
  //   },
  // });

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(createAffiliate(values)).then();
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Affiliate User</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={addAffilateValidation}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  margin="dense"
                  id="email"
                  name="email"
                  defaultValue={state.email}
                  error={Boolean(touched.email && errors.email)}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  label="Affiliate Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <TextField
                  margin="dense"
                  id="full_name"
                  name="full_name"
                  defaultValue={state.full_name}
                  error={Boolean(touched.full_name && errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Affiliate Full Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <TextField
                  margin="dense"
                  id="phone"
                  name="phone"
                  defaultValue={state.phone}
                  onChange={handleChange}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  onBlur={handleBlur}
                  label="Affiliate Phone"
                  type="phone"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <TextField
                  margin="dense"
                  id="password"
                  name="password"
                  defaultValue={state.password}
                  onChange={handleChange}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  label="Affiliate Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    onClick={handleClose}
                    sx={{ width: "150px" }}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Box mx={3} />
                  <Button
                    sx={{ width: "150px" }}
                    variant="contained"
                    type="submit"
                  >
                    Create Affiliate
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          {/* <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                defaultValue={formik.values.email}
                error={Boolean(touched.decimals && errors.decimals)}
                onChange={formik.handleChange}
                helperText={touched.email && errors.email}
                onBlur={formik.handleBlur}
                label="Affiliate Email"
                type="email"
                variant="outlined"
                fullWidth
                my={8}
              />
              <TextField
                margin="dense"
                autoFocus="true"
                id="full_name"
                name="full_name"
                defaultValue={formik.values.full_name}
                onChange={formik.handleChange}
                label="Affiliate Full Name"
                type="text"
                variant="outlined"
                fullWidth
                my={8}
              />
              <TextField
                margin="dense"
                id="phone"
                name="phone"
                defaultValue={formik.values.phone}
                onChange={formik.handleChange}
                label="Affiliate Phone"
                type="phone"
                variant="outlined"
                fullWidth
                my={8}
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                defaultValue={formik.values.password}
                onChange={formik.handleChange}
                label="Affiliate Password"
                type="password"
                variant="outlined"
                fullWidth
                my={8}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={handleClose}
                  sx={{ width: "150px" }}
                  type="button"
                >
                  Cancel
                </Button>
                <Box mx={3} />
                <Button
                  sx={{ width: "150px" }}
                  variant="contained"
                  type="submit"
                >
                  Create Affiliate
                </Button>
              </Box>
            </form> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAffiliateUser;
