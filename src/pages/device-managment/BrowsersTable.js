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
  //  hooks.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const title = " Browsers Version";

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
                  <TableCell align="">Users</TableCell>
                  <TableCell align=""> Percent %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowColumns
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.key}>
                      <TableCell scope="row">
                        {item.name}
                        <TopDeviceModal title={title} />
                      </TableCell>
                      <TableCell align="">{item.count} </TableCell>
                      <TableCell align="">{item.percent} %</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={rowColumns.length}
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

export default BrowsersTable;
