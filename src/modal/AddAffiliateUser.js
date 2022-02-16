import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Alert as MuiAlert,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import userSingleton from "../singletons/user.singleton";
import { createAffiliateUser_req } from "../api/userAPI";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Alert = styled(MuiAlert)(spacing);

const AddAffiliateUser = ({ getUserList }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
  });
  const [errorMes, setErrorMes] = useState([]);

  const [emailAuth, setEmailAuth] = useState(false);
  const [phoneAuth, setPhoneAuth] = useState(false);
  const [check2FA, setCheck2FA] = useState(false);

  // validation Schema.
  const addAffilateValidation = Yup.object().shape(
    {
      email: Yup.string()
        .email()
        .when("phone", {
          is: (phone) => !phone || phone.length === 0 || emailAuth,
          then: Yup.string()
            .email("Must be a valid email")
            .min(8, "Must have at least 8 characters")
            .max(255)
            .required("Email is required"),
          otherwise: Yup.string(),
        }),
      full_name: Yup.string()
        .min(2, "Too Short!")
        .max(200, " Too Long!")
        .required("Full Name is requrired"),
      phone: Yup.string().when("email", {
        is: (email) => !email || email.length === 0 || phoneAuth,
        then: Yup.string()
          .matches(
            /^\+(?:[0-9] ?){6,14}[0-9]$/,
            "Phone number is not valid. Must have + and numbers."
          )
          .required(" Phone is requrired "),
        otherwise: Yup.string().matches(
          /^\+(?:[0-9] ?){6,14}[0-9]$/,
          "Phone number is not valid. Must have + and numbers."
        ),
      }),
      password: Yup.string()
        .min(6, " Must have at least 6 characters ")
        .max(255, " No more than 355 characters")
        .uppercase(1, " Must have at least one uppercase ")
        .lowercase(1, " Must have at least one lowercase ")
        .required(" Passowrd is required "),
    },
    [["email", "phone"]]
  );

  const handleEmailAuth = () => {
    setEmailAuth(!emailAuth);
    if (check2FA) {
      setCheck2FA(false);
    }
  };

  const handlePhoneAuth = () => {
    setPhoneAuth(!phoneAuth);
    if (check2FA) {
      setCheck2FA(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    userSingleton._affiliateList = false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addAffiliateUser = async (values) => {
    let data = {
      email: values.email,
      full_name: values.full_name,
      phone: values.phone,
      password: values.password,
      enable_email_mfa: emailAuth,
      enable_phone_mfa: phoneAuth,
    };

    let result = Object.keys(data).filter((key) => data[key] === "");

    for (let item of result) {
      delete data[`${item}`];
    }

    console.log("DATA", data);

    try {
      const response = await createAffiliateUser_req(data);
      if (response) {
        console.log("ADD AFFILIATE USER RESPONSE ==>", response);
        console.log(" data affiliate", userSingleton._affiliateList);
        userSingleton._affiliateList = true;
        getUserList();
        setOpen(false);
      }
    } catch (e) {
      console.log("ADD AFFILIATE USER ERROR ==>", e, e.response);
      setErrorMes(e?.response?.data?.message);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Affiliate User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Affiliate User</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={addAffilateValidation}
            onSubmit={(values) => {
              if (!check2FA) {
                addAffiliateUser(values);
              }
            }}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Form>
                {errorMes && (
                  <>
                    {errorMes[0]?.messages && (
                      <Alert my={2} severity="error">
                        {errorMes[0]?.messages}
                      </Alert>
                    )}

                    {errorMes[1]?.messages && (
                      <Alert my={2} severity="error">
                        {errorMes[1]?.messages}
                      </Alert>
                    )}
                    {errorMes[2]?.messages && (
                      <Alert my={2} severity="error">
                        {errorMes[2]?.messages}
                      </Alert>
                    )}
                    {errorMes[3]?.messages && (
                      <Alert my={2} severity="error">
                        {errorMes[3]?.messages}
                      </Alert>
                    )}
                  </>
                )}
                <TextField
                  margin="dense"
                  id="email"
                  name="email"
                  defaultValue={state.email}
                  error={Boolean(touched.email && errors.email)}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  my={6}
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
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  my={6}
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
                  label="Phone"
                  type="phone"
                  variant="outlined"
                  fullWidth
                  my={6}
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
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  my={6}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={emailAuth} onChange={handleEmailAuth} />
                  }
                  label="2FA by email"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={phoneAuth} onChange={handlePhoneAuth} />
                  }
                  label="2FA by phone"
                />
                {check2FA && (
                  <span style={{ color: "red" }}>
                    {"At lease one of the options should be checked."}
                  </span>
                )}

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
                    onClick={() => {
                      if (!emailAuth && !phoneAuth) {
                        setCheck2FA(true);
                      }

                      handleSubmit();
                    }}
                  >
                    Create Affiliate
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

export default AddAffiliateUser;
