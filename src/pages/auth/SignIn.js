import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { Paper, Typography } from "@material-ui/core";
import { ReactComponent as Logo } from "../../vendor/logo.svg";
import SignInComponent from "../../components/auth/SignIn";

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

function SignIn() {
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

        <SignInComponent />
      </Wrapper>
    </Fragment>
  );
}

export default SignIn;
