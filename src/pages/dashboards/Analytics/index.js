import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import Actions from "./Actions";
import Table from "./Table";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Analytics = () => {
  return (
    <Fragment>
      <Helmet title="Analytics Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Analytics Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Actions />
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6} center>
        <Grid item xs={12} lg={12}>
          <Table />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Analytics;
