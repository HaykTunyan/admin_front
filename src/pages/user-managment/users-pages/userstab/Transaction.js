import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { instance } from "../../../../services/api";
import moment from "moment";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  Box,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
  TablePagination,
  Grid,
  InputBase,
  Card as MuiCard,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
  Collapse,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CSVButton from "../../../../components/CSVButton";
import { Search as SearchIcon } from "react-feather";
import DatePickerFilter from "../../../../components/date-picker/DatePickerFilter";
import NoData from "../../../../components/NoData";
import { getUserTransactions_req } from "../../../../api/userTransactionsAPI";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 100%;
  }
`;

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const TransactionHistory = () => {
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  //  hooks.
  const { t } = useTranslation();
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [operationType, setOperationType] = useState("");
  const [coinAll, setCoinAll] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openFor, setOpenFor] = useState({});

  const handleOperationType = (event) => {
    setOperationType(event.target.value);
  };

  const handleCoinAll = (event) => {
    setCoinAll(event.target.value);
  };

  const handleTransactionType = (event) => {
    setTransactionType(event.target.value);
  };

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleExpand = (e) => {
    setOpenFor({
      ...openFor,
      [`${e.currentTarget.id}`]: !openFor[`${e.currentTarget.id}`],
    });
  };

  async function getTransactions() {
    try {
      const response = await getUserTransactions_req(userId);
      if (response) {
        console.log("GET USER TRANSACTIONS RESPONSE ==>", response);
        setTransactions(response);
      }
    } catch (e) {
      console.log("GET USER TRANSACTIONS ERROR  ==>", e);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  console.log("Open ==>", openFor);

  return (
    <Fragment>
      <Card p={4} sx={{ display: "flex" }}>
        <Grid item md={2}>
          <Box component="div">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder={t("searchList")} />
            </Search>
          </Box>
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
          <DatePickerFilter />
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-operation-type">Operation Type</InputLabel>
            <Select
              labelId="select-operation-type"
              id="select-operation-type"
              value={operationType}
              onChange={handleOperationType}
              label="Operation Type"
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value="receive">Receive</MenuItem>
              <MenuItem value="send"> Send </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-coin">Coin</InputLabel>
            <Select
              labelId="select-coin"
              id="select-coin"
              value={coinAll}
              onChange={handleCoinAll}
              label="Coin"
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value="btc">btc</MenuItem>
              <MenuItem value="cxc"> cxc </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-transaction">Transaction Type</InputLabel>
            <Select
              labelId="select-transaction"
              id="select-transaction"
              value={transactionType}
              onChange={handleTransactionType}
              label="Transaction Type"
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value="internal">Internal</MenuItem>
              <MenuItem value="real"> Real </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-status">Status</InputLabel>
            <Select
              labelId="select-status"
              id="select-status"
              value={statusValue}
              onChange={handleStatusValue}
              label="Status"
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value="panding">Pending</MenuItem>
              <MenuItem value="rejected"> Rejected </MenuItem>
              <MenuItem value="approved"> Approved </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Card>
      <Card p={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item md={2}>
          <Box component="div">
            <Typography variant="h6" gutterBottom component="div">
              {`Received: 00000000`}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Box component="div">
            <Typography variant="h6" gutterBottom component="div">
              {`Send: 00000000`}
            </Typography>
          </Box>
        </Grid>
      </Card>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(transactions.transactions || []).map((row) => (
                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                <>
                  <TableRow
                    key={row.transaction_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moment(row.date).format("DD/MM/YYYY HH:mm ")}{" "}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      {row.type === "send" ? row.coin_from : row.coin_to}
                    </TableCell>
                    <TableCell>
                      {row.amount_sent != null ? (
                        <>{row.amount_sent}</>
                      ) : (
                        <>{row.amount_received}</>
                      )}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton
                        id={`${row.transaction_id}`}
                        aria-label="expand row"
                        size="small"
                        onClick={(e) => handleExpand(e)}
                      >
                        {openFor[`${row.transaction_id}`] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openFor[`${row.transaction_id}`]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={3}>
                          <Typography variant="h6" gutterBottom component="div">
                            {`Transaction ID: ${row.transaction_id}`}
                          </Typography>
                          <Spacer my={3} />
                          <Typography variant="h6" gutterBottom component="div">
                            {`Date: ${moment(row.date).format(
                              "DD/MM/YYYY HH:mm "
                            )}`}
                          </Typography>
                          <Spacer my={3} />
                          <Typography variant="h6" gutterBottom component="div">
                            {`From: ${
                              row.address_from
                                ? row.address_from
                                : row.coin_from_name
                            }`}
                          </Typography>
                          <Spacer my={3} />
                          <Typography variant="h6" gutterBottom component="div">
                            {`To: ${
                              row.address_to ? row.address_to : row.coin_to_name
                            }`}
                          </Typography>
                          <Spacer my={3} />
                          <Typography variant="h6" gutterBottom component="div">
                            {`Fee: ${row.fee}`}
                          </Typography>
                          <Spacer my={3} />
                          <Typography variant="h6" gutterBottom component="div">
                            {`Value: ${
                              row.type === "send"
                                ? row.amount_usd_sent
                                : row.amount_usd_received
                            }$`}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            //count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      {/* {rows && (
        <Box
          mt={8}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
          <CSVButton data={rows} />
        </Box>
      )} */}
    </Fragment>
  );
};

export default TransactionHistory;
