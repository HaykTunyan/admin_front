import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { green, orange, grey, blue } from "@material-ui/core/colors";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  CardContent,
  Card as MuiCard,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useSelector } from "react-redux";
import Chart from "react-chartjs-2";
import Stats from "../../components/Stats";
import MobileCall from "./MobileCall";
import TabletCell from "./TabletCall";
import DesktopCall from "./DesktopCall";
import BrowsersTable from "./BrowsersTable";
import UniqueTable from "./UniqueTable";
import OperationTable from "./OperationTable";
import { instance } from "../../services/api";
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
  // hooks.
  const [tabOne, setOpenOne] = useState(false);
  const [tabThree, setOpenThree] = useState(false);
  const [tabTwo, setOpenTwo] = useState(false);
  const [allTab, setAllTab] = useState(true);
  const totalDevice = useSelector((state) => state.deviceManagment);
  const [allStatic, setAllStatic] = useState(null);
  // Redux Moke data.
  const desktopData = totalDevice?.desktopCall;
  const tabletData = totalDevice?.tableCall;
  const mobileDate = totalDevice?.mobileCall;
  const uniqueData = totalDevice?.uniqueCall;

  const data = {
    labels: ["Mobile", "Web", "Tablet"],
    datasets: [
      {
        data: [38, 316, 6],
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

  // admin/device-statistics

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

  const mobileList = allStatic?.deviceStatistics[0];
  const webList = allStatic?.deviceStatistics[1];
  const tabletList = allStatic?.deviceStatistics[2];

  useEffect(() => {
    getAllStatic();
  }, []);

  return (
    <>
      <Helmet title="Device management" />
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
            title={"All Devices"}
            // amount="100%"
            chip="100%"
            ViewMore={openDevice}
            className={allTab && { background: "#376fd0" }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stats
            title={mobileList?.type?.toUpperCase()}
            amount={mobileList?.percent}
            ViewMore={openMobile}
            className={tabOne && { background: "#376fd0" }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stats
            title={tabletList?.type?.toUpperCase()}
            amount={tabletList?.percent}
            percentagecolor={green[500]}
            ViewMore={openTablet}
            className={tabTwo && { background: "#376fd0" }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Stats
            title={webList?.type?.toUpperCase()}
            amount={webList?.percent}
            percentagecolor={green[500]}
            ViewMore={openDescktop}
            className={tabThree && { background: "#376fd0" }}
          />
        </Grid>
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
          {/* Browsers */}
          <Grid item xs={12} md={6}>
            <Card my={6}>
              <BrowsersTable uniqueData={uniqueData} />
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DeviceManagement;
