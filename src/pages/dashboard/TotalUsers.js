import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import {
  Typography as MuiTypography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { getDashboardUsers_req } from "../../api/dashboardAPI";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const TotalUsers = ({ startDate, endDate }) => {
  const [totalUsers, setTotalUsers] = useState({});

  async function getTotalUsers() {
    try {
      const response = await getDashboardUsers_req(startDate, endDate);
      if (response) {
        console.log("GET TOTAL USERS RESPONSE ==>", response);
        setTotalUsers(response);
      }
    } catch (e) {
      console.log("GET TOTAL USERS ERROR ==>", e.response);
    }
  }

  useEffect(() => {
    getTotalUsers();
  }, []);
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography variant="h6" gutterBottom>
                  Users
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" gutterBottom>
                  Count
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="left">
                <Typography variant="inherit" gutterBottom>
                  All
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="inherit" gutterBottom>
                  {totalUsers.totalUsersCount}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="left">
                <Typography variant="inherit" gutterBottom>
                  Verified
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="inherit" gutterBottom>
                  {totalUsers.verifiedUsersCount}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="left">
                <Typography variant="inherit" gutterBottom>
                  Unverified
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="inherit" gutterBottom>
                  {totalUsers.unVerifiedUsersCount}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TotalUsers;
