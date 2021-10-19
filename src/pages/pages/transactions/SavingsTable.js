import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import {
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const rows = [
  {
    key: 0,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 1,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 2,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 3,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 4,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 5,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 6,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
  {
    key: 7,
    date_operation: "01.10.2021",
    email: "email@email.com",
    phone: "00000000",
    sum: " 30 ",
    coin: " 20 ",
    tx_id: " 100 ",
    type: "Flexible",
    operation_type: "active",
  },
];

const SavingsTable = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date Opetation</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Sum</TableCell>
                <TableCell>Coin / Coin</TableCell>
                <TableCell>TX ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Operation Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date_operation}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.sum}</TableCell>
                  <TableCell align="center">{row.coin}</TableCell>
                  <TableCell align="center">{row.tx_id}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.operation_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default SavingsTable;