import React, { Fragment } from "react";
import styled from "styled-components/macro";
import {
  Card as MuiCard,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

// Spacing.
const Card = styled(MuiCard)(spacing);

const KYCSettings = () => {
  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Typography variant="body1" p={6} textAlign="center">
              Scenarios in which the user is sent to KYC
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default KYCSettings;
