import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
  Paper,
  Typography,
} from "@material-ui/core";
import useAuth from "../hooks/useAuth";
import { ReactComponent as Logo } from "../assets/svg/logo_main.svg";

// Spacing.
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const initialValues = {
    email: " ",
    submit: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255, "Must be a maximum charactors")
      .required("Email is required"),
  });

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      resetPassword(values.email);
      navigate("/auth/sign-in");
    } catch (error) {
      const message = error.message || "Something went wrong";
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Reset Password" />
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Enter your email to reset your password
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              {errors.submit && (
                <Alert mt={2} mb={1} severity="warning">
                  {errors.submit}
                </Alert>
              )}
              <TextField
                type="email"
                name="email"
                label="Email Address"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                my={3}
              />
              <Spacer my={4} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Reset password
              </Button>
            </form>
          )}
        </Formik>
      </Wrapper>
    </Fragment>
  );
};

export default ResetPassword;
