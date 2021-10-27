import React, { Fragment } from "react";
import styled from "styled-components/macro";
import {
  Typography as MuiTypography,
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const ExchnageTab = ({ rowExchange }) => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell>&#35;</TableCell>
              <TableCell align="center">Users Name</TableCell>
              <TableCell align="center">Exchange Bit</TableCell>
              <TableCell align="right">EXchange Coin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowExchange.map((row) => (
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
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  {row.receive_bit}
                  <span> &#x20BF;</span>
                </TableCell>
                <TableCell align="right">
                  {row.receive_coin} <span>&#8364;</span>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rowExchange} />
      </Box>
    </Fragment>
  );
};

export default ExchnageTab;
