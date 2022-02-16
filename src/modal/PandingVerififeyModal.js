import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  IconButton as MuiIconButton,
  TextField as MuiTextField,
  Box,
  FormControlLabel,
  Checkbox,
  TextField,
  Alert as MuiAlert,
  FormControl,
} from "@material-ui/core";
import { XCircle } from "react-feather";
import { editKYC } from "../redux/actions/kyc";
import SuccessModal from "./SuccessModal";

// Spacing.
const Spacer = styled.div(spacing);

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

// Validation Schema.
const PandingValidation = Yup.object().shape({
  title: Yup.string().required("Title is requrired"),
  content: Yup.string().required("Text is requrired"),
});

const PandingVerififeyModal = ({ subTitle, kycId, statusKyc, getKYC }) => {
  const [open, setOpen] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [messageError, setMessageError] = useState([]);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    user_id: kycId, // is required
    status_kyc: statusKyc, //2 | 4,
    content: "",
    title: "",
    notification_type: [],
    // [1, 2, 3] // 1-email, 2 - phone 3 - only notification
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    let types = [];
    for (let type of values.notification_type) {
      types.push(Number(type));
    }
    let data = {
      user_id: kycId,
      status_kyc: statusKyc,
      content: values.content,
      title: values.title,
      notification_type: types,
    };
    dispatch(editKYC(data)).then((data) => {
      if (data.success) {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          {subTitle}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4" color="inherit" component="div">
              Send For Verification
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                ...state,
              }}
              initialForms={state}
              validationSchema={PandingValidation}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <TextField
                    margin="dense"
                    id="title"
                    defaultValue={state.title}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    my={8}
                  />
                  <Spacer my={5} />
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      label="Content"
                      id="content"
                      type="text"
                      defaultValue={state.content}
                      error={Boolean(touched.content && errors.content)}
                      helperText={touched.content && errors.content}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      multiline={true}
                      rows={3}
                      maxRows={4}
                      variant="outlined"
                    />
                  </FormControl>
                  <Spacer my={5} />
                  <Typography variant="subtitle1">Select Type</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
                    <FormControlLabel
                      label="Email"
                      control={
                        <Checkbox
                          name="notification_type"
                          value={1}
                          defaultValue={1}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Phone"
                      control={
                        <Checkbox
                          name="notification_type"
                          value={2}
                          defaultValue={2}
                          onChange={handleChange}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Notification"
                      control={
                        <Checkbox
                          name="notification_type"
                          value={3}
                          defaultValue={3}
                          onChange={handleChange}
                        />
                      }
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                      Send
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PandingVerififeyModal;
