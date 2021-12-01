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
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { edit_req } from "../api/edit.api";
import { editAdmin } from "../redux/actions/user-managment";

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

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setState({
  //     ...state,
  //     [event.target.name]: value,
  //   });
  // };

  // const submitReq = async (id) => {
  //   try {
  //     const editReq = await edit_req(...state, id);

  //     console.log("createReq", editReq);
  //     if (editReq) {
  //       setOpen(false);
  //     }
  //   } catch (e) {}
  // };

  const formik = useFormik({
    initialValues: {
      ...state,
    },
    initialForm: { state },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(editAdmin(values)).then();
      setOpen(false);
    },
  });

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Paper mt={3}></Paper>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              tabIndex={1}
              autoFocus
              onChange={formik.handleChange}
              defaultValue={state.name}
              margin="dense"
              id="name"
              label="Admin Name"
              type="text"
              variant="outlined"
              fullWidth
              my={8}
            />
            <TextField
              tabIndex={2}
              onChange={formik.handleChange}
              defaultValue={state.email}
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
              onChange={formik.handleChange}
              defaultValue={state.password}
              id="password"
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
                  <Checkbox {...label} defaultValue={state.permissions[1]} />
                }
              />
              <FormControlLabel
                label="Real Send"
                control={
                  <Checkbox {...label} defaultValue={state.permissions[2]} />
                }
              />
              <FormControlLabel
                label="Permission for changes on deposits"
                control={
                  <Checkbox {...label} defaultValue={state.permissions[3]} />
                }
              />
              <FormControlLabel
                label="Permissions to change KYC status"
                control={
                  <Checkbox {...label} defaultValue={state.permissions[4]} />
                }
              />
              <FormControlLabel
                label="Permission to send notifications"
                control={
                  <Checkbox {...label} defaultValue={state.permissions[5]} />
                }
              />
              <FormControlLabel
                label="Permission to download the user base"
                control={
                  <Checkbox {...label} defaultValue={state.permissions[6]} />
                }
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleClose} sx={{ width: "120px" }}>
                Cancel
              </Button>
              <Box mx={3} />
              <Button sx={{ width: "120px" }} type="submit" variant="contained">
                Save Admin
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAdminModal;
