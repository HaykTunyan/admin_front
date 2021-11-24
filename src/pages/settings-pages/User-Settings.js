import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Grid,
  Alert as MuiAlert,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import * as Yup from "yup";
import { Formik } from "formik";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Alert = styled(MuiAlert)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const initialValues = {
  fullName: "Admin",
  email: "lucylavender@gmail.com",
  phone: "+11 000 000 ",
  balance: "100",
  password: "mypassword123",
  confirmPassword: "mypassword123",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  phone: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(12, "Must be at least 12 characters")
    .max(255)
    .required("Required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});

const UserSettings = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Typography variant="body1" p={6}>
              Scenarios in which the user is sent to KYC
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                status,
              }) => (
                <Card mb={6}>
                  <CardContent>
                    {status && status.sent && (
                      <Alert severity="success" my={3}>
                        Your data has been submitted successfully!
                      </Alert>
                    )}

                    {isSubmitting ? (
                      <Box display="flex" justifyContent="center" my={6}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <TextField
                          name="name"
                          label="Full Name"
                          value={values.fullName}
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          variant="outlined"
                          my={2}
                        />

                        {/* Email */}
                        <TextField
                          name="email"
                          label="Email"
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          variant="outlined"
                          my={2}
                        />

                        {/* Phone Number */}
                        <TextField
                          name="phone"
                          label="Phone"
                          value={values.phone}
                          error={Boolean(touched.phone && errors.phone)}
                          fullWidth
                          helperText={touched.phone && errors.phone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="phone"
                          variant="outlined"
                          my={2}
                        />

                        {/* Balance */}
                        <TextField
                          name="number"
                          label="Banlance"
                          value={values.balance}
                          error={Boolean(touched.balance && errors.balance)}
                          fullWidth
                          helperText={touched.balance && errors.balance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          variant="outlined"
                          my={2}
                        />

                        {/* Password */}
                        <TextField
                          name="password"
                          label="Password"
                          value={values.password}
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          helperText={touched.password && errors.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="password"
                          variant="outlined"
                          my={2}
                        />

                        {/* Confirm Password */}
                        <TextField
                          name="confirmPassword"
                          label="Confirm password"
                          value={values.confirmPassword}
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          fullWidth
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="password"
                          variant="outlined"
                          my={2}
                        />

                        {/* Submit */}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          mt={3}
                        >
                          Save changes
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              )}
            </Formik>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default UserSettings;
