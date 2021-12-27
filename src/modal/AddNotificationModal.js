import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  InputLabel,
  MenuItem,
  Box,
  Select,
} from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import { createNotifTemplate_req } from "../api/notificationsAPI";

const AddNotificationModal = ({ getTemplates }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    message: "",
  });

  const addNotifsSchema = yup.object().shape({
    title: yup.string().required("Field is required"),
    message: yup.string().required("Field is required"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function saveNotification(values) {
    let data = {
      title: values.title,
      content: values.message,
    };
    try {
      const response = await createNotifTemplate_req(data);
      if (response) {
        console.log("CREATING NOTIF TEMPLATE RESPONSE ==>", response);
        setOpen(false);
        getTemplates();
      }
    } catch (e) {
      console.log("CREATING NOTIF TEMPLATE ERROR ==>", e.response);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Notification
      </Button>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        validationSchema={addNotifsSchema}
        onSubmit={(values) => {
          saveNotification(values);
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => {
          console.log("Errors ==>", errors, touched);
          return (
            <>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add Notification</DialogTitle>
                <DialogContent>
                  <Box my={8}>
                    <FormControl fullWidth my={8} variant="outlined">
                      <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        my={3}
                        //defaultValue="Input Title"
                        onChange={handleChange("title")}
                        error={touched.title && errors.title}
                        helperText={touched.title && errors.title}
                      />
                    </FormControl>
                  </Box>
                  <FormControl fullWidth my={8} variant="outlined">
                    <TextField
                      label="Message"
                      id="message"
                      multiline={true}
                      rows={3}
                      //maxRows={4}
                      variant="outlined"
                      //defaultValue=" Send Notification for Users "
                      onChange={handleChange("message")}
                      error={touched.message && errors.message}
                      helperText={touched.message && errors.message}
                    />
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
                    Save Notification
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

export default AddNotificationModal;
