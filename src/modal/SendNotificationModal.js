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
import { sendNotification_req } from "../api/notificationsAPI";

const SendNotificationModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: item.title,
    message: item.content,
    emailOrId: "",
    sendTo: 3,
    whereTo: 3,
  });

  const sendNotifSchema = yup.object().shape({
    title: yup.string().required("Field is required"),
    message: yup.string().required("Field is required"),
    emailOrId:
      initialValues.sendTo === 1 || initialValues.sendTo === 2
        ? yup.string().required("Field is required")
        : yup.string().notRequired(),
  });

  const handleSendTo = (event) => {
    setInitialValues({ ...initialValues, sendTo: event.target.value });
  };

  const handleWhereTo = (event) => {
    setInitialValues({ ...initialValues, whereTo: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function sendNotification(values) {
    let users = values.emailOrId.replace(/\s+/g, "").split(",");

    let data = {
      title: values.title,
      content: values.message,
      sendAll: initialValues.sendTo === 3 ? true : false,
      // 1-email, 2 - phone 3 - only notification
      sendType: initialValues.whereTo === 3 ? 3 : 1,
      // if send all is true users can be empty
      users: initialValues.sendTo === 3 ? [] : users,
    };

    console.log("Data ===>", data);
    try {
      const response = await sendNotification_req(data);
      if (response) {
        console.log("SEND NOTIF RESPONSE ==>", response);
        setOpen(false);
      }
    } catch (e) {
      console.log("SEND NOTIF ERROR ==>", e.response);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Action
      </Button>
      <Formik
        validateOnChange={true}
        initialValues={{ ...initialValues }}
        validationSchema={sendNotifSchema}
        onSubmit={(values) => {
          sendNotification(values);
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Action</DialogTitle>
                <DialogContent>
                  <Box my={8}>
                    <FormControl fullWidth my={8} variant="outlined">
                      <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        my={3}
                        defaultValue={initialValues.title}
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
                      variant="outlined"
                      defaultValue={initialValues.message}
                      onChange={handleChange("message")}
                      error={touched.message && errors.message}
                      helperText={touched.message && errors.message}
                    />
                  </FormControl>
                  <Box my={8}>
                    <FormControl fullWidth my={8} variant="outlined">
                      <InputLabel id="simple-select">Send to</InputLabel>
                      <Select
                        labelId="simple-select"
                        id="simple-select"
                        value={initialValues.sendTo}
                        label="Send to"
                        onChange={handleSendTo}
                      >
                        <MenuItem value={1}>Send to one user</MenuItem>
                        <MenuItem value={2}>Send to group</MenuItem>
                        <MenuItem value={3}>Send to all</MenuItem>
                      </Select>
                    </FormControl>
                    {(initialValues.sendTo === 1 ||
                      initialValues.sendTo === 2) && (
                      <FormControl fullWidth my={8} variant="outlined">
                        <TextField
                          placeholder="Please fill in the user'(s) email or id"
                          id="emailOrId_input"
                          multiline={true}
                          variant="outlined"
                          onChange={handleChange("emailOrId")}
                          error={touched.emailOrId && errors.emailOrId}
                          helperText={touched.emailOrId && errors.emailOrId}
                        />
                      </FormControl>
                    )}
                  </Box>
                  <Box my={8}>
                    <FormControl fullWidth my={8} variant="outlined">
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
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} sx={{ width: "120px" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    sx={{ width: "120px" }}
                  >
                    Send
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

export default SendNotificationModal;
