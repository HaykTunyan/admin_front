import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Button,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { getDashboardUsers_req } from "../../api/dashboardAPI";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const TotalUsers = ({ startDate, endDate }) => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState({});

  function goTo(status) {
    navigate("/users", {
      state: {
        status: status,
      },
    });
  }

  async function getTotalUsers() {
    try {
      const response = await getDashboardUsers_req(startDate, endDate);
      if (response) {
        setTotalUsers(response);
      }
    } catch (e) {}
  }

  useEffect(() => {
    getTotalUsers();
  }, [startDate, endDate]);

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
                <Button
                  color="inherit"
                  variant="text"
                  style={{ justifyContent: "flex-start" }}
                  onClick={() => goTo("all")}
                >
                  All
                </Button>
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
                <Button
                  color="inherit"
                  variant="text"
                  style={{ justifyContent: "flex-start" }}
                  onClick={() => goTo(4)}
                >
                  Verified
                </Button>
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
                <Button
                  color="inherit"
                  variant="text"
                  style={{ justifyContent: "flex-start" }}
                  onClick={() => goTo(0)}
                >
                  Unverified
                </Button>
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
