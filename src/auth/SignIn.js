import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
  Paper,
  Typography,
} from "@material-ui/core";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import useAuth from "../hooks/useAuth";
import { signIn_req } from "../redux/actions/users";
import { useDispatch } from "react-redux";

// Spacing.
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);

const initialForm = {
  name: "admin@elsteam.com",
  password: "test321",
};

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

const SignIn = () => {
  // hooks.
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .min(8, "Must be at least 8 characters")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, " Must be a last 6 characters ")
      .max(255)
      .required("Password is required"),
  });

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      // await signIn(values.email, values.password);
      dispatch(signIn_req(values)).then(navigate("/dashboard"));
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
        <Helmet title="Sign In" />
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Welcome back!
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Sign in to your account to continue
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
              <Alert mt={3} mb={3} severity="info">
                Use <strong className="red-color">{initialForm.name}</strong>{" "}
                and <strong>{initialForm.password}</strong> to sign in
              </Alert>
              {errors.submit && (
                <Alert mt={2} mb={3} severity="warning">
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
                my={2}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Sign in
              </Button>
              <Button
                component={Link}
                to="/auth/reset-password"
                fullWidth
                color="primary"
                mt={4}
              >
                Forgot password
              </Button>
            </form>
          )}
        </Formik>
      </Wrapper>
    </Fragment>
  );
};

export default SignIn;
