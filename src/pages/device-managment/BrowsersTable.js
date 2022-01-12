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

const BrowsersTable = ({ rowBrowser }) => {
  //  hooks.
  const title = " Browsers Version";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  <TableCell>Users</TableCell>
                  <TableCell> Percent %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowBrowser?.deviceStatistics &&
                  rowBrowser?.deviceStatistics.map((item) => (
                    <TableRow key={item.key}>
                      <TableCell scope="row">
                        {item.browser_name}
                        <TopDeviceModal
                          title={title}
                          rowList={item?.device_models}
                        />
                      </TableCell>
                      <TableCell>{item.devices_count} </TableCell>
                      <TableCell>{item.percent} %</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={rowBrowser?.allCount}
              rowsPerPage={rowBrowser?.limit}
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

export default BrowsersTable;
