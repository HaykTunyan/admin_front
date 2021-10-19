import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import useAuth from "../../hooks/useAuth";
import { signIn_req } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const initialForm = {
  name: "admin@elsteam.com",
  password: "test321",
};

const SignIn = () => {
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
      .min(6, " Mus be a last 6 characters ")
      .max(255)
      .required("Password is required"),
  });

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    console.log("values", values);
    try {
      await signIn(values.email, values.password);
      console.log("value sign in", values);
      dispatch(signIn_req(values));
      // userSingleton.email = values.email
      // userSingleton.passwo

      // const email = usersingleton.email

      if (initialValues) {
        navigate("/dashboard");
      }
    } catch (error) {
      const message = error.message || "Something went wrong";

      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
    }
  };

  return (
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
            Use <strong className="red-color">{initialForm.name}</strong> and{" "}
            <strong>{initialForm.password}</strong> to sign in
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
  );
};

export default SignIn;
