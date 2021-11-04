import React, { Fragment } from "react";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar as MuiToolbar,
  Typography,
} from "@material-ui/core";

const Toolbar = styled(MuiToolbar)(spacing);

export const rows = [
  {
    id: "01",
    brand_name: "Dell XPS Desktop 8940",
    percent: "40",
    quantity: "4000",
  },
  {
    id: "02",
    brand_name: "Alienware Aurora R11",
    percent: "5",
    quantity: "500",
  },
  {
    id: "03",
    brand_name: "Apple iMac",
    percent: "15",
    quantity: "1500",
  },
  {
    id: "04",
    brand_name: "Apple Mac Mini M1",
    percent: "10",
    quantity: "1000",
  },
  {
    id: "05",
    brand_name: "Acer Aspire TC",
    percent: "30",
    quantity: "3000",
  },
];

const DesktopCall = () => {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Desktop Info
          </Typography>
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="30%">Brand Name</TableCell>
              <TableCell>Percent</TableCell>
              <TableCell align="right">Quantity People</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" width="30%">
                  {row.brand_name}
                </TableCell>
                <TableCell>
                  {row.percent}
                  <span> &#8453;</span>
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default DesktopCall;
