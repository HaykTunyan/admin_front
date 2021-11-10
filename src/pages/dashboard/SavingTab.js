import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Typography as MuiTypography,
  Card as MuiCard,
  CardContent,
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
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CSVButton from "../../components/CSVButton";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

const SavingTab = ({ rowLocked, rowFlexible }) => {
  const [panel, setPanel] = useState("1");

  const handleChangePanel = (event, newPanel) => {
    setPanel(newPanel);
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={panel}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangePanel}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Locked" value="1" />
                  <Tab label="Flexible" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" mt={6}>
                    <TableHead>
                      <TableRow>
                        <TableCell>&#35;</TableCell>
                        <TableCell align="center">Coint Name</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="right">Bonus</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowLocked.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">
                            {row.coin_name}
                            <span> &#x20BF;</span>
                          </TableCell>
                          <TableCell align="center">
                            {row.status}
                            <span> &#x20BF;</span>
                          </TableCell>
                          <TableCell align="right">
                            {row.bonus} <span>&#8364;</span>{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  mt={8}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    component="div"
                  >
                    Export Data
                  </Typography>
                  <CSVButton data={rowLocked} />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" mt={6}>
                    <TableHead>
                      <TableRow>
                        <TableCell>&#35;</TableCell>
                        <TableCell align="center">Coint Name</TableCell>
                        <TableCell align="center">Min Amount</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowFlexible.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">
                            {row.coin_name}
                            <span> &#x20BF;</span>
                          </TableCell>
                          <TableCell align="center">
                            {row.min_amount}
                            <span> &#x20BF;</span>
                          </TableCell>
                          <TableCell align="right">
                            {row.status} <span>&#8364;</span>{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  mt={8}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    component="div"
                  >
                    Export Data
                  </Typography>
                  <CSVButton data={rowFlexible} />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SavingTab;
