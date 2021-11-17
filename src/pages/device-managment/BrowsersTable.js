import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { MoreVertical } from "react-feather";
import { spacing } from "@material-ui/system";
import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress as MuiLinearProgress,
} from "@material-ui/core";

//  Spacing.
const Card = styled(MuiCard)(spacing);

//  Custom Style.
const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const LinearProgress = styled(MuiLinearProgress)`
  height: 14px;
  width: 180px;
  border-radius: 3px;
  background: ${(props) => props.theme.palette.grey[200]};
`;

export const rowColumns = [
  {
    key: 1,
    name: "Google Chrome",
    count: "646 700",
    percent: "64.67",
  },
  {
    key: 2,
    name: "Safari",
    count: "190 600",
    percent: "19.06",
  },
  {
    key: 3,
    name: "Edge",
    count: "41 000",
    percent: "4.10",
  },
  {
    key: 4,
    name: "Firefox",
    count: "36 600",
    percent: "3.66",
  },
  {
    key: 5,
    name: "Samsung Internet",
    count: "28 100",
    percent: "2.81",
  },
  {
    key: 6,
    name: "Opera",
    count: "23 600",
    percent: "2.36",
  },
  {
    key: 7,
    name: "Others",
    count: "33 400",
    percent: "3.34",
  },
];

const BrowsersTable = () => {
  return (
    <>
      <Card mb={6}>
        <CardHeader title="Browsers" />
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    All browsers support
                  </TableCell>
                  <TableCell align="right">Users</TableCell>
                  <TableCell>% Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowColumns.map((item) => (
                  <TableRow key={item.key}>
                    <TableCell scope="row">{item.name}</TableCell>
                    <TableCell align="right">{item.count} </TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={item.percent}
                        color="secondary"
                      />
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

export default BrowsersTable;
