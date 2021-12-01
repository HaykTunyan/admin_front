import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useFormik } from "formik";
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
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { editAffiliate } from "../redux/actions/user-managment";

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

const EditAffiliateModal = ({ email, phone, password, userId }) => {
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

  const formik = useFormik({
    initialValues: {
      ...state,
    },
    validationSchema: { validationSchema },
    initialForm: { state },
    onSubmit: (values) => {
      dispatch(editAffiliate(values)).then();
      setOpen(false);
    },
  });

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Affiliate</DialogTitle>
        <DialogContent>
          <Paper mt={3}></Paper>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              tabIndex={2}
              onChange={formik.handleChange}
              defaultValue={state.email}
              margin="dense"
              id="email"
              label="Affiliate Email"
              type="email"
              variant="outlined"
              fullWidth
              my={8}
            />
            <TextField
              tabIndex={1}
              onChange={formik.handleChange}
              defaultValue={state.name}
              margin="dense"
              id="full_name"
              label="Affiliate Full Name"
              type="text"
              variant="outlined"
              fullWidth
              my={8}
            />
            <TextField
              tabIndex={2}
              margin="dense"
              onChange={formik.handleChange}
              defaultValue={state.phone}
              id="phone"
              label="Affiliate Phone"
              type="phone"
              variant="outlined"
              fullWidth
              my={8}
            />
            <TextField
              tabIndex={2}
              margin="dense"
              onChange={formik.handleChange}
              defaultValue={state.password}
              id="password"
              label="Affiliate Password"
              type="password"
              variant="outlined"
              fullWidth
              my={8}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleClose} sx={{ width: "120px" }}>
                Cancel
              </Button>
              <Box mx={3} />

              <Button
                // onClick={() => submitReq(id)}
                sx={{ width: "120px" }}
                type="submit"
                variant="contained"
              >
                Save Affiliate
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAffiliateModal;
