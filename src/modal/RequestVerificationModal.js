import React, { useState, useEffect } from "react";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  FormControl as MuiFormControl,
  IconButton,
  Grid as MuiGrid,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  Avatar as MuiAvatar,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Formik } from "formik";
import * as yup from "yup";
import {
  getNotifTemplates_req,
  sendNotification_req,
} from "../api/notificationsAPI";
import { editUserData_req } from "../api/userAPI";
import ConfirmationNotice from "../components/ConfirmationNotice";

const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);
const FormControl = styled(MuiFormControl)(spacing);

const RequestVerificationModal = ({
  id,
  blockedUser,
  getUserData,
  setAlert,
  setAlertType,
}) => {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState("");
  const [notifList, setNotifList] = useState([]);
  const [message, setMessage] = useState({
    open: false,
    error: false,
  });

  const [initialValues, setInitialValues] = useState({
    title: "",
    message: "",
    sendTo: 1,
    whereTo: 3,
  });

  const [notify, setNotify] = useState(false);

  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;

  const sendNotifSchema = yup.object().shape({
    title:
      id === "blockUser" && notify
        ? yup.string().notRequired()
        : yup.string().required("Field is required"),
    message:
      id === "blockUser" && notify
        ? yup.string().notRequired()
        : yup.string().required("Field is required"),
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

  const handleTemplates = (event) => {
    setTemplates(event.target.value);
    setInitialValues({
      ...initialValues,
      title: notifList[event.target.value - 1].title,
      message: notifList[event.target.value - 1].content,
    });
  };

  const handleCheckbox = () => {
    setNotify(!notify);
  };

  async function sendNotification(values) {
    setMessage({ ...message, open: false, error: false });

    if (id === "blockUser") {
      let field = "block_status";
      try {
        const response = await editUserData_req(userId, field, !blockedUser);
        if (response) {
          console.log("BLOCK USER RESPONSE ==>", response);
          getUserData();
          setOpen(false);
          setMessage({ ...message, open: true });
        }
      } catch (error) {
        console.log("BLOCK USER ERROR ==>", error.response.data);
        setOpen(false);
        setMessage({ ...message, open: true, error: true });
      }
    }

    let data = {
      title: values.title,
      content: values.message,
      sendAll: false,
      // 1-email, 2 - phone 3 - only notification
      sendType: initialValues.whereTo === 3 ? 3 : 1,
      // if send all is true users can be empty
      users: [userId],
    };

    console.log("Data ===>", data);
    if (!notify) {
      try {
        const response = await sendNotification_req(data);
        if (response) {
          console.log("SEND NOTIF RESPONSE ==>", response);
          setOpen(false);
          setAlert(true);
          setAlertType("success");
        }
      } catch (e) {
        console.log("SEND NOTIF ERROR ==>", e.response);
        setOpen(false);
        setAlert(true);
        setAlertType("error");
      }
    }
  }

  async function getNotifTemplates() {
    try {
      const response = await getNotifTemplates_req(1, 40);
      if (response) {
        console.log("GETTING NOTIF TEMPLATES RESPONSE ==>", response);
        setNotifList(response.templates);
      }
    } catch (e) {
      console.log("GETTING NOTIF TEMPLATES ERROR ==>", e.response);
    }
  }

  useEffect(() => {
    getNotifTemplates();
  }, []);

  return (
    <div>
      {message.open === true && (
        <ConfirmationNotice
          error={message.error}
          title={
            message.error === true
              ? "An error occurred, try again"
              : `Sending ${blockedUser ? "blocked" : "unblocked"}`
          }
        />
      )}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {id === "blockUser"
          ? `${blockedUser ? "Unblock" : "Block"} Sending`
          : "Request Verification"}
      </Button>
      <Formik
        enableReinitialize={true}
        validateOnChange={true}
        initialValues={initialValues}
        validationSchema={sendNotifSchema}
        onSubmit={(values) => {
          sendNotification(values);
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                  {" "}
                  {id === "blockUser"
                    ? "Block Sending"
                    : "Request Verification"}
                </DialogTitle>
                <Spacer mt={3} />
                <DialogContent>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="simple-select">
                      Notification Templates
                    </InputLabel>
                    <Select
                      labelId="simple-select"
                      id="simple-select"
                      value={templates}
                      label="Notification Templates"
                      onChange={handleTemplates}
                    >
                      {notifList.map((notif, key) => {
                        return (
                          <MenuItem key={key} value={key + 1}>
                            {notif.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Spacer mt={5} />
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      //fullWidth
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
                  <Spacer mt={5} />
                  {id === "blockUser" && (
                    <FormControlLabel
                      control={
                        <Checkbox checked={notify} onChange={handleCheckbox} />
                      }
                      label="Do not notify user"
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  {id === "blockUser" ? (
                    <Button
                      onClick={() => handleSubmit()}
                      sx={{ width: "130px" }}
                    >
                      {`${blockedUser ? "Unblock" : "Block"}`}
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleClose} sx={{ width: "120px" }}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleSubmit()}
                        sx={{ width: "130px" }}
                      >
                        Send
                      </Button>
                    </>
                  )}
                </DialogActions>
              </Dialog>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default RequestVerificationModal;
