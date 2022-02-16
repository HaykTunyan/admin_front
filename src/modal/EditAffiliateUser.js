import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Form, Formik } from "formik";
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
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { editAffiliate } from "../redux/actions/user-managment";

// Spacing.
const TextField = styled(MuiTextField)(spacing);

// validation Schema.
const editAffilateValidation = Yup.object().shape({
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

const EditAffiliateModal = ({
  email,
  phone,
  password,
  userId,
  getUserList_req,
}) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    userId: userId,
    email: email,
    full_name: "",
    phone: phone,
    password: password,
    is_affiliate: true,
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    dispatch(editAffiliate(values)).then((data) => {
      if (data.success) {
        setOpen(false);
      }
      getUserList_req();
    });
  };

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Affiliate</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={editAffilateValidation}
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
                    Save Affiliate
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

export default EditAffiliateModal;
