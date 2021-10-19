import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import PieChart from "../../components/charts/PieChart";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

export const Divaces = [
  {
    key: "0",
    title: "Mobile Phone",
    description: "Mobile Phone Users of this time",
  },
  {
    key: "1",
    title: "Desktop",
    description: "Desktop User of this time",
  },
  {
    key: "2",
    title: "OS",
    description: "How to use users have implement this app",
  },
];

const DeviceManagement = () => {
  return (
    <>
      <Helmet title="Device Management" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Device Management
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        {Divaces.map((item) => (
          <Grid item xs={12} md={6} key={item.key}>
            <PieChart title={item.title} description={item.description} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DeviceManagement;
