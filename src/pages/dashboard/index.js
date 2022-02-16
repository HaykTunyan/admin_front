import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  CardContent,
  Card as MuiCard,
  Box,
  Tab,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import DateRange from "../../components/date-picker/DateRange";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CurrentTab from "./BalanceTab";
import TotalUsers from "./TotalUsers";
import ReceiveTab from "./ReceiveTab";
import SendTab from "./SendTab";
import ExchnageTab from "./ExchnageTab";
import SavingTab from "./SavingTab";
import { DollarSign, User } from "react-feather";
import { getTotalAmounts_req } from "../../api/dashboardAPI";
import moment from "moment";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

const DashboardPage = () => {
  // Hooks
  const [panel, setPanel] = useState("1");
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmounts, setTotalAmounts] = useState({});

  const onChangeTime = (newValue) => {
    setStartDate(newValue[0] ? moment(newValue[0]).format("YYYY-MM-DD") : null);
    setEndDate(newValue[1] ? moment(newValue[1]).format("YYYY-MM-DD") : null);
    setValue(newValue);
  };

  const handleChange = (event, newPanel) => {
    setPanel(newPanel);
  };

  async function getTotalAmounts() {
    try {
      const response = await getTotalAmounts_req();
      if (response) {
        setTotalAmounts(response);
      }
    } catch (e) {}
  }

  useEffect(() => {
    getTotalAmounts();
  }, []);

  return (
    <Fragment>
      <Helmet title="Dashboard" />
      <Grid container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Card my={6}>
        <CardContent>
          <Grid container>
            <DateRange value={value} onChange={onChangeTime} />
          </Grid>
        </CardContent>
      </Card>
      <Divider my={6} />
      <Grid xs={12} item>
        <Grid item>
          <Box sx={{ width: "100%" }}>
            <TabContext value={panel}>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {/* Tab Total Users */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">
                            {totalAmounts.totalUsers}
                          </Typography>
                          <User size={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Total Users" />
                      </Box>
                    }
                    value="1"
                    style={{ width: "16.666%" }}
                  />
                  {/* Tab Balance */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">
                            {totalAmounts.totalBalance}
                          </Typography>
                          <DollarSign small={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Balance" />
                      </Box>
                    }
                    value="2"
                    style={{ width: "16.666%" }}
                  />
                  {/* Tab Receive */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">
                            {totalAmounts.totalReceive}
                          </Typography>
                          <DollarSign small={22} />
                        </Box>

                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Receive" />
                      </Box>
                    }
                    value="3"
                    style={{ width: "16.666%" }}
                  />
                  {/* Tab Send */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">
                            {totalAmounts.totalSend}
                          </Typography>
                          <DollarSign small={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Send" />
                      </Box>
                    }
                    value="4"
                    style={{ width: "16.666%" }}
                  />
                  {/* Tab Exchange */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">
                            {totalAmounts.totalSwap}
                          </Typography>
                          <DollarSign small={22} />
                        </Box>

                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Exchange" />
                      </Box>
                    }
                    value="5"
                    style={{ width: "16.666%" }}
                  />
                  {/* Tab Amount */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">
                            {totalAmounts.savingBalance}
                          </Typography>
                          <DollarSign small={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Saving" />
                      </Box>
                    }
                    value="6"
                    style={{ width: "16.666%" }}
                  />
                </TabList>
              </Box>
              {/* Panel One */}
              <TabPanel value="1">
                <Grid item xs={12}>
                  <TotalUsers startDate={startDate} endDate={endDate} />
                </Grid>
              </TabPanel>
              {/* Panel Two */}
              <TabPanel value="2">
                <Grid item xs={12}>
                  <CurrentTab startDate={startDate} endDate={endDate} />
                </Grid>
              </TabPanel>
              {/* Panel Three */}
              <TabPanel value="3">
                <Grid item xs={12}>
                  <ReceiveTab startDate={startDate} endDate={endDate} />
                </Grid>
              </TabPanel>
              {/* Panel Four */}
              <TabPanel value="4">
                <Grid item xs={12}>
                  <SendTab startDate={startDate} endDate={endDate} />
                </Grid>
              </TabPanel>
              {/* Panel Five */}
              <TabPanel value="5">
                <Grid item xs={12}>
                  <ExchnageTab startDate={startDate} endDate={endDate} />
                </Grid>
              </TabPanel>
              {/* Panel Six */}
              <TabPanel value="6">
                <Grid item xs={12}>
                  <SavingTab startDate={startDate} endDate={endDate} />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
