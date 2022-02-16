import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import Code from "../../../components/Code";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Typography = styled(MuiTypography)(spacing);

function HowTo() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        How to use
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Learn how to use JWT authentication. There are multiple examples
        included, including sign in, sign up and sign out.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Retreive user info
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        <Code>{`import useAuth from '../hooks/useAuth';

const App = () => {
  const { displayName } = useAuth();

  return (
    <span>
      {user.displayName}
    </span>
  );
};`}</Code>
      </Typography>
      <Typography variant="h4" gutterBottom>
        Execute actions
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        <Code>{`import useAuth from '../hooks/useAuth';

const App = () => {
  const { signIn } = useAuth();

  return (
    <button onClick={() => signIn()}>
      Sign in
    </button>
  );
};`}</Code>
      </Typography>
    </Box>
  );
}

function JWT() {
  return (
    <Fragment>
      <Helmet title="JWT" />

      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} lg={9} xl={7}>
          <Typography variant="h2" gutterBottom display="inline">
            JWT
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/documentation/welcome">
              Documentation
            </Link>
            <Typography>JWT</Typography>
          </Breadcrumbs>

          <Divider my={6} />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default JWT;
