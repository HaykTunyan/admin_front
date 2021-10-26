import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { green, orange, grey, blue, purple } from "@material-ui/core/colors";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  CardContent,
  Card as MuiCard,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import Chart from "react-chartjs-2";
import Stats from "../components/Stats";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const ChartWrapper = styled.div`
  height: 500px;
`;

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

const DeviceManagement = ({ theme }) => {
  const data = {
    labels: ["Mobile", "Desktop", "Mac", "Other"],
    datasets: [
      {
        data: [220, 120, 120, 30],
        backgroundColor: [purple[600], blue[600], grey[500], orange[900]],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <>
      <Helmet title="Device Management" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Users Device in Project
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <Stats
            title="Mobile Phone Users"
            amount="45%"
            chip="45%"
            percentagetext="+45%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stats
            title="Desktop User"
            amount="25 %"
            chip="25%"
            percentagetext="+25%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stats
            title="Mac Users"
            amount="25 %"
            chip="25%"
            percentagetext="+25%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stats
            title="Other Users"
            amount="5 %"
            chip="5%"
            percentagetext="+5%"
            percentagecolor={green[500]}
          />
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card my={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Users
              </Typography>

              <Spacer mb={6} />

              <ChartWrapper>
                <Chart type="pie" data={data} options={options} />
              </ChartWrapper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DeviceManagement;
