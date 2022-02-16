import React, { useState } from "react";
import {
  FormControl as MuiFormControl,
  Button as MuiButton,
  TextField as MuiTextField,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Formik } from "formik";
import * as yup from "yup";
import { updateUserKYC_req } from "../api/userSettingskycAPI";

const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);
const FormControl = styled(MuiFormControl)(spacing);

const RejectKYCModal = ({ getUserKYC }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    message: "",
    whereTo: 3,
  });

  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;

  const sendNotifSchema = yup.object().shape({
    title: yup.string().required("Field is required"),
    message: yup.string().required("Field is required"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWhereTo = (event) => {
    setInitialValues({ ...initialValues, whereTo: event.target.value });
  };

  async function rejectUserKYC(values) {
    let data = {
      user_id: userId, // is required
      status_kyc: 2,
      content: values.content,
      title: values.title,
      // 1-email, 2 - phone 3 - only notification
      notification_type: [initialValues.whereTo === 3 ? 3 : 1],
    };
    try {
      const response = await updateUserKYC_req(data);
      if (response) {
        console.log("UPDATE USER KYC RESPONSE ==>", response);
        setOpen(false);
      }
      getUserKYC();
    } catch (e) {
      console.log("UPDATE USER KYC ERROR ==>", e.response);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Reject
      </Button>
      <Formik
        validateOnChange={true}
        initialValues={{ ...initialValues }}
        validationSchema={sendNotifSchema}
        onSubmit={(values) => {
          rejectUserKYC(values);
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogContent>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      fullWidth
                      //my={3}
                      defaultValue={initialValues.title}
                      onChange={handleChange("title")}
                      error={touched.title && errors.title}
                      helperText={touched.title && errors.title}
                    />
                  </FormControl>
                  <Spacer mt={5} />
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      label="Message"
                      id="message"
                      multiline={true}
                      rows={3}
                      variant="outlined"
                      defaultValue={initialValues.message}
                      onChange={handleChange("message")}
                      error={touched.message && errors.message}
                      helperText={touched.message && errors.message}
                    />
                  </FormControl>
                  <Spacer mt={5} />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="simple-select">Where to send</InputLabel>
                    <Select
                      labelId="simple-select"
                      id="simple-select"
                      value={initialValues.whereTo}
                      label="Where to send"
                      onChange={handleWhereTo}
                    >
                      <MenuItem value={1}>Email</MenuItem>
                      <MenuItem value={3}>Personal Account</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} sx={{ width: "120px" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    sx={{ width: "130px" }}
                  >
                    Reject
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default RejectKYCModal;
