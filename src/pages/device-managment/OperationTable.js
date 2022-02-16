import React, { Fragment, useState } from "react";
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
  TablePagination,
} from "@material-ui/core";
import TopDeviceModal from "../../modal/TopDeviceModal";

//  Spacing.
const Card = styled(MuiCard)(spacing);

//  Custom Style.
const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const OperationTable = ({ rowList }) => {
  // Hooks.
  const title = "Operation Sistem";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  return (
    <Fragment>
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
                {rowList?.deviceStatistics &&
                  rowList?.deviceStatistics.map((item) => (
                    <TableRow key={item.key}>
                      <TableCell scope="row">
                        {item.device_os}
                        <TopDeviceModal
                          title={title}
                          rowList={item?.device_models}
                        />
                      </TableCell>
                      <TableCell align="center">{item.devices_count}</TableCell>
                      <TableCell align="">{item.percent} %</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            {rowList?.deviceStatistics && (
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={rowList?.allCount}
                rowsPerPage={rowList?.limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableWrapper>
        </Paper>
      </Card>
    </Fragment>
  );
};

export default OperationTable;
