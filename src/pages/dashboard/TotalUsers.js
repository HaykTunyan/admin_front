import React, { Fragment } from "react";
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

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const TotalUsers = ({ rowUsers }) => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography variant="h6" gutterBottom>
                  Users (Title)
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
                  10 000 000
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
                  8 000 000
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
                  2 000 000
                </Typography>
              </TableCell>
            </TableRow>
            {/* {rowUsers.map((row) => (
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
                  <Typography variant="inherit" gutterBottom>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="inherit" gutterBottom>
                    {row.value}
                  </Typography>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TotalUsers;
