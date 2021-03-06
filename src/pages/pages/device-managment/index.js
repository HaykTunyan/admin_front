import React, { useState } from "react";
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
import Stats from "../../components/Stats";
import MobileCall from "./MobileCall";
import TabletCell from "./TabletCall";
import DesktopCall from "./DesktopCall";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const ChartWrapper = styled.div`
  height: 500px;
`;

const DeviceManagement = ({ theme }) => {
  // hooks.
  const [tabOne, setOpenOne] = useState(false);
  const [tabThree, setOpenThree] = useState(false);
  const [tabTwo, setOpenTwo] = useState(false);

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

  const openMobile = () => {
    setOpenOne(true);
    setOpenTwo(false);
    setOpenThree(false);
  };

  const openTablet = () => {
    setOpenTwo(true);
    setOpenOne(false);
    setOpenThree(false);
  };

  const openDescktop = () => {
    setOpenThree(true);
    setOpenTwo(false);
    setOpenOne(false);
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
        <Grid item xs={12} md={4}>
          <Stats
            title="Mobile Users"
            amount="50%"
            chip="50%"
            percentagetext="+50%"
            percentagecolor={green[500]}
            ViewMore={openMobile}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stats
            title="Tablet Users"
            amount="25 %"
            chip="25%"
            percentagetext="+25%"
            percentagecolor={green[500]}
            ViewMore={openTablet}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stats
            title="Desktop Users"
            amount="25 %"
            chip="25%"
            percentagetext="+25%"
            percentagecolor={green[500]}
            ViewMore={openDescktop}
          />
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        {tabOne && (
          <Grid item xs={12} md={12}>
            <MobileCall />
          </Grid>
        )}

        {tabTwo && (
          <Grid item xs={12} md={12}>
            <TabletCell />
          </Grid>
        )}

        {tabThree && (
          <Grid item xs={12} md={12}>
            <DesktopCall />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Card my={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Users
              </Typography>

              <Spacer my={6} />

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
