import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Breadcrumbs,
  Toolbar as MuiToolbar,
  Typography,
  Box,
  TablePagination,
  Chip as MuiChip,
  Grid,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import EditTransactionModal from "../../modal/EditTransactionModal";
import NoData from "../../components/NoData";

// Spacing.
const Toolbar = styled(MuiToolbar)(spacing);

// Custom Style.

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TransactionsSettings = ({ coins }) => {
  // hooks.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!coins) {
    return <NoData />;
  }

  return (
    <Fragment>
      <Paper>
        <Toolbar pt={5}>
          <Grid flex justifyContent="space-between" container spacing={6}>
            <Grid item>
              <Typography variant="h6" color="inherit" component="div">
                Transaction Settings List
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="">Coin Name</TableCell>
                <TableCell align="center">Fee</TableCell>
                <TableCell align="center">Min Send Amount</TableCell>
                <TableCell align="center">
                  Suspend Transaction
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    display="flex"
                    justifyContent="space-around"
                    align="center"
                  >
                    <Typography color="text.primary">
                      Suspend Receive
                    </Typography>
                    <Typography color="text.primary">Suspend Send</Typography>
                  </Breadcrumbs>
                </TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins &&
                coins
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="">{row.name}</TableCell>
                      <TableCell align="center">{row.fee}%</TableCell>
                      <TableCell align="center">{row.minSendAmount}</TableCell>
                      <TableCell align="center">
                        <Breadcrumbs
                          aria-label="breadcrumb"
                          display="flex"
                          justifyContent="space-around"
                          align="center"
                        >
                          <Typography color="text.primary">
                            {row.suspendReceiveTransaction === true ? (
                              <Chip label=" Enable" color="success" />
                            ) : (
                              <Chip label="Disable" color="error" />
                            )}
                          </Typography>
                          <Typography color="text.primary">
                            {row.suspendSendTransaction === true ? (
                              <Chip label="Enable" color="success" />
                            ) : (
                              <Chip label="Disable" color="error" />
                            )}
                          </Typography>
                        </Breadcrumbs>
                      </TableCell>
                      <TableCell padding="none" align="right">
                        <EditTransactionModal
                          coinId={row.id}
                          name={row.name}
                          coin={row.coin}
                          minSendAmount={row.minSendAmount}
                          decimals={row.decimals}
                          fee={row.fee}
                          price={row.price}
                          priceChange={row.priceChange}
                          priceChangePercent={row.priceChangePercent}
                          suspendSendTransaction={row.suspendSendTransaction}
                          suspendReceiveTransaction={
                            row.suspendReceiveTransaction
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={coins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableWrapper>
      </Paper>
      <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={coins} />
      </Box>
    </Fragment>
  );
};

export default TransactionsSettings;
