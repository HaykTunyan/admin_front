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
  LinearProgress as MuiLinearProgress,
} from "@material-ui/core";
import { useSelector } from "react-redux";

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

const OperationTable = () => {
  const rowOperation = useSelector((state) => state.deviceManagment);

  const operationList = rowOperation.opetionCall;
  return (
    <>
      <Card mb={6}>
        <CardHeader title="Operation Sistems" />
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    All Operation Sistems support
                  </TableCell>
                  <TableCell align="center">Users</TableCell>
                  {/* <TableCell>% Users</TableCell> */}
                  <TableCell>Percent %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operationList.map((item) => (
                  <TableRow key={item.key}>
                    <TableCell scope="row">{item.name}</TableCell>
                    <TableCell align="center">{item.count} </TableCell>
                    {/* <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={item.percent}
                        color="secondary"
                      />
                    </TableCell> */}
                    <TableCell align="">{item.percent} %</TableCell>
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

export default OperationTable;
