import React from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Card as MuiCard,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Chip as MuiChip,
} from "@material-ui/core";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

export const rows = [
  {
    key: 1,
    acount: "Account User",
    device: "Mobile",
    start_time: "11/09/21, 20:30",
    active_status: false,
  },
  {
    key: 2,
    acount: "Account User",
    device: "Mobile",
    start_time: "11/09/21, 20:30",
    active_status: true,
  },
  {
    key: 3,
    acount: "Account User",
    device: "Mobile",
    start_time: "11/09/21, 20:30",
    active_status: true,
  },
  {
    key: 4,
    acount: "Account User",
    device: "Mobile",
    start_time: "11/09/21, 20:30",
    active_status: false,
  },
  {
    key: 5,
    acount: "Account User",
    device: "Mobile",
    start_time: "11/09/21, 20:30",
    active_status: true,
  },
];

const Activity = () => {
  return (
    <>
      <Card mb={6}>
        <CardHeader title="Account Activity" />
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="25%">Account</TableCell>
                  <TableCell align="center" width="25%">
                    Device
                  </TableCell>
                  <TableCell align="center" width="25%">
                    Start Time
                  </TableCell>
                  <TableCell align="right">Active Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell component="th" scope="row" width="25%">
                      {row.acount}
                    </TableCell>
                    <TableCell align="center" width="25%">
                      {row.device}
                    </TableCell>
                    <TableCell align="center" width="25%">
                      {row.start_time}
                    </TableCell>
                    <TableCell align="right">
                      {!row.active_status ? (
                        <Chip label="Passive" color="error" />
                      ) : (
                        <Chip label="Active" color="primary" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Paper>
      </Card>
    </>
  );
};

export default Activity;
