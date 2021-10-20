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
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import DateRange from "../../components/DateRange";
import Stats from "../../components/Stats";
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

const DashboardPage = () => {
  const theme = useTheme();
  const [panel, setPanel] = useState("1");

  function createData(name, coin, percent) {
    return { name, coin, percent };
  }

  const rows = [
    createData("User One", 130, 30),
    createData("User Two", 430, 15),
    createData("User Three", 180, 75),
    createData("User Four", 240, 60),
    createData("User Five", 300, 50),
  ];

  const handleChange = (event, newPanel) => {
    setPanel(newPanel);
  };

  return (
    <Fragment>
      <Helmet title="Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container justifyContent="space-between">
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          300 000 $
                        </Typography>
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          11 360 000 $
                        </Typography>
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          9 960 000 $
                        </Typography>
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          11 000 000 $
                        </Typography>
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          11 200 000 $
                        </Typography>
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          1 700 000 $
                        </Typography>
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
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          4 200 000 $
                        </Typography>
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
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Total Users</TableCell>
                            <TableCell align="center">Coin</TableCell>
                            <TableCell align="right">Percent</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">
                                {row.coin} <span>$</span>{" "}
                              </TableCell>
                              <TableCell align="right">
                                {row.percent} <span>%</span>{" "}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </TabPanel>
              {/* Panel Two */}
              <TabPanel value="2">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Users</TableCell>
                          <TableCell align="center">Coin</TableCell>
                          <TableCell align="right">Percent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin} <span>$</span>{" "}
                            </TableCell>
                            <TableCell align="right">
                              {row.percent} <span>%</span>{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <Stats
                    title="The total balance of all users is in $ and you can open it to see how much in each coin."
                    amount="11 360 000 $"
                    chip="Today Info"
                    percentagetext="-5%"
                    percentagecolor={red[500]}
                  /> */}
                </Grid>
              </TabPanel>
              {/* Panel Three */}
              <TabPanel value="3">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Users</TableCell>
                          <TableCell align="center">Coin</TableCell>
                          <TableCell align="right">Percent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin} <span>$</span>{" "}
                            </TableCell>
                            <TableCell align="right">
                              {row.percent} <span>%</span>{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <Stats
                    title="The current balance of all users by default wallets is in $ and you can open it to see how much in each coin."
                    amount="9 960 000 $"
                    chip="Today Info"
                    percentagetext="-4%"
                    percentagecolor={red[500]}
                  /> */}
                </Grid>
              </TabPanel>
              {/* Panel Four */}
              <TabPanel value="4">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Users</TableCell>
                          <TableCell align="center">Coin</TableCell>
                          <TableCell align="right">Percent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin} <span>$</span>{" "}
                            </TableCell>
                            <TableCell align="right">
                              {row.percent} <span>%</span>{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </TabPanel>
              {/* Panel Five */}
              <TabPanel value="5">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Users</TableCell>
                          <TableCell align="center">Coin</TableCell>
                          <TableCell align="right">Percent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin} <span>$</span>{" "}
                            </TableCell>
                            <TableCell align="right">
                              {row.percent} <span>%</span>{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </TabPanel>
              {/* Panel Six */}
              <TabPanel value="6">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Users</TableCell>
                          <TableCell align="center">Coin</TableCell>
                          <TableCell align="right">Percent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin} <span>$</span>{" "}
                            </TableCell>
                            <TableCell align="right">
                              {row.percent} <span>%</span>{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </TabPanel>

              {/* Panel Seven */}
              <TabPanel value="7">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Users</TableCell>
                          <TableCell align="center">Coin</TableCell>
                          <TableCell align="right">Percent</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin} <span>$</span>{" "}
                            </TableCell>
                            <TableCell align="right">
                              {row.percent} <span>%</span>{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
