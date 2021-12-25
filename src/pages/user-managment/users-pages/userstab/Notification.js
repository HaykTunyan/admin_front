import React, { useState } from "react";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  FormControl as MuiFormControl,
  IconButton,
  Grid as MuiGrid,
  Alert as MuiAlert,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  Avatar as MuiAvatar,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Formik } from "formik";
import * as yup from "yup";
import { sendNotification_req } from "../../../../api/notificationsAPI";

const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);
const FormControl = styled(MuiFormControl)(spacing);

const Notification = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    message: "",
    sendTo: 1,
    whereTo: 3,
  });

  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;

  const sendNotifSchema = yup.object().shape({
    title: yup.string().required("Field is required"),
    message: yup.string().required("Field is required"),
  });

  const handleWhereTo = (event) => {
    setInitialValues({ ...initialValues, whereTo: event.target.value });
  };

  async function sendNotification(values) {
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
    try {
      const response = await sendNotification_req(data);
      if (response) {
        console.log("SEND NOTIF RESPONSE ==>", response);
      }
    } catch (e) {
      console.log("SEND NOTIF ERROR ==>", e.response);
    }
  }

  return (
    <>
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
              <Card>
                <CardContent p={5}>
                  <Grid container>
                    <Grid item xs={12} md={3}>
                      <Typography>Send Notification</Typography>
                      <Spacer mt={5} />
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
                        <InputLabel id="simple-select">
                          Where to send
                        </InputLabel>
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
                      <Button
                        variant="contained"
                        onClick={() => handleSubmit()}
                      >
                        Send
                      </Button>
                    </Grid>
                    <Spacer mx={6} />
                  </Grid>
                </CardContent>
              </Card>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Notification;
