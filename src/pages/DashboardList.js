import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useTheme } from "@material-ui/core/styles";
import { green, red, orange } from "@material-ui/core/colors";
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
import DateRange from "../components/date-picker/DateRange";
import DoughnutChart from "../components/charts/DoughnutChart";
import Stats from "../components/Stats";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

export const item = [
  {
    key: 0,
    title: "Actual",
    percent: "100/30 ",
    version: " new version ",
  },
  {
    key: 1,
    title: "Reacive",
    percent: "100/10 ",
    version: " new version ",
  },
  {
    key: 2,
    title: "Reacive",
    percent: "100/40 ",
    version: " new version ",
  },
  {
    key: 3,
    title: "Flex",
    percent: "100/20 ",
    version: " new version ",
  },
  {
    key: 4,
    title: "Savings",
    percent: "100/10 ",
    version: " new version ",
  },
  {
    key: 5,
    title: "Locked ",
    percent: "100/50 ",
    version: " first version ",
  },
];

const DashboardList = () => {
  const theme = useTheme();
  const [panel, setPanel] = useState("1");

  const handleChange = (event, newPanel) => {
    setPanel(newPanel);
  };
  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125, 164],
        backgroundColor: [theme.palette.secondary.main, red[500], orange[500]],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "80%",
  };

  return (
    <Fragment>
      <Helmet title="Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard List
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container justifyContent="center">
        <Card mb={6}>
          <CardContent flex>
            <DateRange />
          </CardContent>
        </Card>
      </Grid>

      <Divider my={6} />

      <Grid xs={12}>
        <Grid item>
          <Box sx={{ width: "100%" }}>
            <TabContext value={panel}>
              <Box sx={{ width: "100%" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Total Users" />
                        <Divider my={2} />
                        <Typography>300 000</Typography>
                      </Box>
                    }
                    value="1"
                    style={{ width: "14.28%" }}
                  />
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Total Users Balance" />
                        <Divider my={2} />
                        <Typography>11 360 000 $</Typography>
                      </Box>
                    }
                    value="2"
                    style={{ width: "14.28%" }}
                  />
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Current Balance" />
                        <Divider my={2} />
                        <Typography>9 960 000 $</Typography>
                      </Box>
                    }
                    value="3"
                    style={{ width: "14.28%" }}
                  />
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Total Receive" />
                        <Divider my={2} />
                        <Typography>11 000 000 $</Typography>
                      </Box>
                    }
                    value="4"
                    style={{ width: "14.28%" }}
                  />
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Total Send" />
                        <Divider my={2} />
                        <Typography>11 200 000 $</Typography>
                      </Box>
                    }
                    value="5"
                    style={{ width: "14.28%" }}
                  />
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Total Exchange" />
                        <Divider my={2} />
                        <Typography>1 700 000 $</Typography>
                      </Box>
                    }
                    value="6"
                    style={{ width: "14.28%" }}
                  />
                  <Tab
                    label={
                      <Box flex>
                        <Typography children="Amount Saving" />
                        <Divider my={2} />
                        <Typography>4 200 000 $</Typography>
                      </Box>
                    }
                    value="7"
                    style={{ width: "10.428%" }}
                  />
                </TabList>
              </Box>
              {/* Panel One */}
              <TabPanel value="1">
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Stats
                      title="Total number of users"
                      amount="300000"
                      chip="Today Info"
                      percentagetext="+16%"
                      percentagecolor={green[500]}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              {/* Panel Two */}
              <TabPanel value="2">
                <Grid item xs={12}>
                  <Stats
                    title="The total balance of all users is in $ and you can open it to see how much in each coin."
                    amount="11 360 000 $"
                    chip="Today Info"
                    percentagetext="-5%"
                    percentagecolor={red[500]}
                  />
                </Grid>
              </TabPanel>
              {/* Panel Three */}
              <TabPanel value="3">
                <Grid item xs={12}>
                  <Stats
                    title="The current balance of all users by default wallets is in $ and you can open it to see how much in each coin."
                    amount="9 960 000 $"
                    chip="Today Info"
                    percentagetext="-4%"
                    percentagecolor={red[500]}
                  />
                </Grid>
              </TabPanel>
              {/* Panel Four */}
              <TabPanel value="4">
                <Grid item xs={12}>
                  <Stats
                    title="The total amount of Receive is in $ and you can open it to see how much in each coin."
                    amount="11 000 000 $"
                    chip="Today Info"
                    percentagetext="+4%"
                    percentagecolor={green[500]}
                  />
                </Grid>
              </TabPanel>
              {/* Panel Five */}
              <TabPanel value="5">
                <Grid item xs={12}>
                  <Stats
                    title="The total amount of Send in $ and you can open it to see how much in each coin."
                    amount="11 200 000 $"
                    chip="Today Info"
                    percentagetext="-14%"
                    percentagecolor={red[500]}
                  />
                </Grid>
              </TabPanel>
              {/* Panel Six */}
              <TabPanel value="6">
                <Grid item xs={12}>
                  <Stats
                    title="The total amount of the exchange is $ and you can open it to see what was changed for and in what volume."
                    amount="1 700 000 $"
                    chip="Today Info"
                    percentagetext="-2%"
                    percentagecolor={red[500]}
                  />
                </Grid>
              </TabPanel>
              {/* Panel Seven */}
              <TabPanel value="7">
                <Grid item xs={12}>
                  <Stats
                    title="Total amount now in Savings in $
                    separately: in Locked / in Flex
                    and you can expand to see how many where in coins"
                    amount="4 200 000 $"
                    chip="Today Info"
                    percentagetext="+22%"
                    percentagecolor={green[500]}
                  />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        {item.map((item) => (
          <Grid item xs={12} md={6} key={item.key}>
            <DoughnutChart
              title={item.title}
              percent={item.percent}
              version={item.version}
            />
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          {/* <Stats /> */}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardList;
