import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import {
  Grid,
  Typography as MuiTypography,
  Divider as MuiDivider,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import ReferralTable from "./referralTable";
import ReferralUsers from "./referralUsers";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const Referral = () => {
  return (
    <>
      <Helmet children="Referral" />
      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item alignItems="center">
          <Typography variant="h3" gutterBottom mb={0}>
            Referral
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      {/* Referral Users */}
      <Grid item xs={12}>
        <ReferralUsers />
      </Grid>
      <Divider my={6} />
      {/* Referral Table */}
      <Grid item xs={12}>
        <ReferralTable />
      </Grid>
    </>
  );
};

export default Referral;
