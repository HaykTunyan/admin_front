import React, { Fragment } from "react";
import FormikPage from "../../forms/Formik";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { ArrowLeft } from "react-feather";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const UserView = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Helmet title="Formik" />
      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            User Information
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="left" onClick={() => navigate("/users")}>
            <ArrowLeft />
          </IconButton>
        </Grid>
      </Grid>
      <Divider my={6} />
      <FormikPage />
    </Fragment>
  );
};

export default UserView;
