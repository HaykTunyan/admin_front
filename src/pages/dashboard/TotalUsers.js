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
              <TableCell>&#35;</TableCell>
              <TableCell align="center">
                <Typography variant="h6" gutterBottom>
                  Status Users
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" gutterBottom>
                  Value Type
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowUsers.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TotalUsers;
