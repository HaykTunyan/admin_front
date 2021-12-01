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
import { useFormik } from "formik";
import { UserPlus } from "react-feather";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import { createAffiliate } from "../redux/actions/user-managment";

// Spacing.
const TextField = styled(MuiTextField)(spacing);

// validation Schema.
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .min(8, "Must be at least 8 characters")
    .max(255)
    .required("Email is requried"),
  name: Yup.string().required("Name is requrired"),
  performance: Yup.string()
    .length("Min Selected One Item")
    .required(" Performance is required "),
  password: Yup.string()
    .min(6, " Must be a last 6 characters ")
    .max(255, " Must be a last 355 characters")
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

  const formik = useFormik({
    initialValues: {
      ...state,
    },
    validationSchema: { validationSchema },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      dispatch(createAffiliate(values)).then();
      setOpen(false);
    },
  });

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Affiliate User</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              id="email"
              defaultValue={formik.values.email}
              onChange={formik.handleChange}
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
              <Button sx={{ width: "150px" }} variant="contained" type="submit">
                Create Affiliate
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAffiliateUser;
