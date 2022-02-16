import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { green, orange, grey, blue } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import { instance } from "../../services/api";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  CardContent,
  Card as MuiCard,
} from "@material-ui/core";
import Chart from "react-chartjs-2";
import Stats from "../../components/Stats";
import BrowsersTable from "./BrowsersTable";
import MobileTab from "./MobileTab";
import TabletTab from "./TabletTab";
import WebTab from "./WebTab";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const ChartWrapper = styled.div`
  height: 500px;
`;

const DeviceManagement = () => {
  // Hooks.
  const [tabOne, setOpenOne] = useState(false);
  const [tabThree, setOpenThree] = useState(false);
  const [tabTwo, setOpenTwo] = useState(false);
  const [allTab, setAllTab] = useState(true);
  const [allStatic, setAllStatic] = useState(null);
  const [allBrowswers, setAllBrowsers] = useState(null);
  // Destructure Data.
  const mobileList = allStatic?.deviceStatistics[0];
  const webList = allStatic?.deviceStatistics[1];
  const tabletList = allStatic?.deviceStatistics[2];
  // Cgarts Data.
  const mobilePercent = mobileList?.percent * 3.6;
  const tablePercent = tabletList?.percent * 3.6;
  const webPercent = webList?.percent * 3.6;

  const data = {
    labels: ["Mobile", "Tablet", "Web"],
    datasets: [
      {
        data: [mobilePercent, tablePercent, webPercent],
        backgroundColor: [blue[600], grey[500], orange[900]],
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
    setAllTab(false);
  };

  const openTablet = () => {
    setOpenTwo(true);
    setOpenOne(false);
    setOpenThree(false);
    setAllTab(false);
  };

  const openDescktop = () => {
    setOpenThree(true);
    setOpenTwo(false);
    setOpenOne(false);
    setAllTab(false);
  };

  const openDevice = () => {
    setOpenThree(false);
    setOpenTwo(false);
    setOpenOne(false);
    setAllTab(true);
  };

  const getAllStatic = () => {
    return instance
      .get("/admin/device-statistics", {})
      .then((data) => {
        setAllStatic(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  const getAllBrowsers = () => {
    return instance.get("/admin/device-statistics/browser", {}).then((data) => {
      setAllBrowsers(data.data);
      return data;
    });
  };

  useEffect(() => {
    getAllStatic();
    getAllBrowsers();
  }, []);

  return (
    <>
      <Helmet title="Device management" />
      <Grid container spacing={6}>
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
            title={"All Devices"}
            chip="100%"
            ViewMore={openDevice}
            className={allTab && "#376fd0"}
            color={allTab && "#FFFFFF"}
          />
        </Grid>
        {mobileList && (
          <Grid item xs={12} md={3}>
            <Stats
              title={mobileList?.type?.toUpperCase()}
              amount={mobileList?.percent}
              ViewMore={openMobile}
              className={tabOne && "#376fd0"}
              color={tabOne && "#FFFFFF"}
            />
          </Grid>
        )}
        {tabletList && (
          <Grid item xs={12} md={3}>
            <Stats
              title={tabletList?.type?.toUpperCase()}
              amount={tabletList?.percent}
              percentagecolor={green[500]}
              ViewMore={openTablet}
              className={tabTwo && "#376fd0"}
              color={tabTwo && "#FFFFFF"}
            />
          </Grid>
        )}
        {webList && (
          <Grid item xs={12} md={3}>
            <Stats
              title={webList?.type?.toUpperCase()}
              amount={webList?.percent}
              percentagecolor={green[500]}
              ViewMore={openDescktop}
              className={tabThree && "#376fd0"}
              color={tabThree && "#FFFFFF"}
            />
          </Grid>
        )}
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        {tabOne && (
          <>
            <MobileTab />
          </>
        )}
        {tabTwo && (
          <>
            <TabletTab />
          </>
        )}
        {tabThree && (
          <>
            <WebTab />
          </>
        )}
      </Grid>
      {allTab && (
        <Grid container spacing={6}>
          {/* Chart Data */}
          <Grid item xs={12} xs={12} md={6}>
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
          {/* Browsers */}
          <Grid item xs={12} xs={12} md={6}>
            <Card my={6}>
              <BrowsersTable rowBrowser={allBrowswers} />
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DeviceManagement;
