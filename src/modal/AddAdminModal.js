import React, { useState } from "react";
import styled from "styled-components/macro";
import { UserPlus } from "react-feather";
import { Formik, useFormik, Form, useField, useFormikContext } from "formik";
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
} from "@material-ui/core";
import { createAdmin } from "../redux/actions/user-managment";
import { create_req } from "../api/edit.api";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Spacer = styled.div(spacing);

// Validation Schema.
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .min(8, "Must be at least 8 characters")
    .max(255)
    .required("Email is requried"),
  name: Yup.string().required("Name is requrired"),
  password: Yup.string()
    .min(6, " Must be a last 8 characters ")
    .max(255, " Must be a last 355 characters")
    .required(" Passowrd is required "),
});

// Initial Values.
const initialValues = {
  email: "",
  name: "",
  role: "4", // 1 is super admin
  permissions: [], //permissions are 1, 2, 3, 4, 5, 6
  password: "",
};

const AddAdminModal = () => {
  //   //  hooks.
  const [open, setOpen] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { addAdmin } = useAuth();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    name: "",
    role: "4", // 1 is super admin
    permissions: [], //permissions are 1, 2, 3, 4, 5, 6
    password: "",
  });

  const submitReq = async () => {
    try {
      debugger;
      const createReq = await create_req(state);
      console.log("createReq", createReq);
    } catch (e) {}
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const onSubmitReq = async (
  //   state,
  //   { setErrors, setStatus, setSubmitting }
  // ) => {
  //   try {
  //     await addAdmin(state);
  //     console.log("value sign in", state);
  //     dispatch(create_req(state)).then();
  //     // await create_req(state);
  //   } catch (error) {
  //     const message = error.message || "Something went wrong";
  //     setStatus({ succes: false });
  //     setErrors({ submit: message });
  //     setSubmitting(false);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      ...state,
    },
    validationSchema: { validationSchema },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      dispatch(createAdmin(values)).then();
      setOpen(false);
    },
  });

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              autoFocus="true"
              id="name"
              defaultValue={formik.values.name}
              // error={Boolean(touched.name && errors.name)}
              // helperText={touched.name && errors.name}
              // onBlur={handleBlur}
              onChange={formik.handleChange}
              label="Admin Name"
              type="text"
              variant="outlined"
              fullWidth
              my={8}
            />
            <TextField
              margin="dense"
              id="email"
              defaultValue={formik.values.email}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
              // onBlur={handleBlur}
              onChange={formik.handleChange}
              label="Admin Email"
              type="email"
              variant="outlined"
              fullWidth
              my={8}
            />
            <TextField
              margin="dense"
              id="password"
              defaultValue={formik.values.password}
              // error={Boolean(touched.password && errors.password)}
              // helperText={touched.email && errors.email}
              // onBlur={handleBlur}
              onChange={formik.handleChange}
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
                    // value={formik.values.permissions[1]}
                    // onBlur={handleBlur}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Real Send"
                control={
                  <Checkbox
                    {...label}
                    // value={formik.values.permissions[2]}
                    // onBlur={handleBlur}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Permission for changes on deposits"
                control={
                  <Checkbox
                    {...label}
                    // value={formik.values.permissions[3]}
                    // onBlur={handleBlur}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Permissions to change KYC status"
                control={
                  <Checkbox
                    {...label}
                    // value={formik.values.permissions[4]}
                    // onBlur={handleBlur}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Permission to send notifications"
                control={
                  <Checkbox
                    {...label}
                    // value={formik.values.permissions[5]}
                    // onBlur={handleBlur}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Permission to download the user base"
                control={
                  <Checkbox
                    {...label}
                    // value={formik.values.permissions[6]}
                    // onBlur={handleBlur}
                    onChange={formik.handleChange}
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
                // disabled={isSubmitting}
                // onClick={handleSubmit}
                // onClick={submitReq}
                variant="contained"
                type="submit"
              >
                Create Admin
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdminModal;
