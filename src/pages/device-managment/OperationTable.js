import React, { useState } from "react";
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
  TablePagination,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import TopDeviceModal from "../../modal/TopDeviceModal";

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
  // hooks.
  const rowOperation = useSelector((state) => state.deviceManagment);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const operationList = rowOperation.opetionCall;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const title = "Operation Sistem";
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
                  <TableCell>Percent %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operationList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.key}>
                      <TableCell scope="row">
                        {item.name}
                        <TopDeviceModal title={title} />
                      </TableCell>
                      <TableCell align="center">{item.count} </TableCell>
                      <TableCell align="">{item.percent} %</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={operationList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableWrapper>
        </Paper>
      </Card>
    </>
  );
};

export default OperationTable;
