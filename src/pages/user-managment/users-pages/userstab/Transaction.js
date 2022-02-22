import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
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
  Button,
} from "@material-ui/core";
import { Tooltip, tooltipClasses } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Search as SearchIcon } from "react-feather";
import DateRange from "../../../../components/date-picker/DateRange";
import { getUserTransactions_req } from "../../../../api/userTransactionsAPI";
import AddTransactionHistory from "../../../../modal/AddTransactionHistory";
import EditAffiliateSwap from "../../../../modal/EditAffiliateSwap";
import { deleteAffiliateExchanges_req } from "../../../../api/userExchangesAPI";
import EditTransactionHistory from "../../../../modal/EditTransactionHistory";
import { getCoins_req } from "../../../../api/userWalletsAPI";
import { ArrowDown, ArrowUp } from "react-feather";

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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} enterTouchDelay />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const TransactionHistory = () => {
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const { affiliate } = location.state;
  //  hooks.
  const { t } = useTranslation();
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [operationType, setOperationType] = useState("");
  const [coinAll, setCoinAll] = useState("");
  const [coins, setCoins] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [openFor, setOpenFor] = useState({});

  const [sortBy, setSortBy] = useState({
    sorted_date: false,
    sorted_amount: false,
    type: "increasing",
  });

  const handleCellClick = (sortParam) => {
    setSortBy({
      ...sortBy,
      [`sorted_${sortParam}`]: true,
      [`sorted_${sortParam === "date" ? "amount" : "date"}`]: false,
      type: sortBy.type === "increasing" ? "decreasing" : "increasing",
    });
  };

  const onChangeTime = (newResult) => {
    setStartDate(moment(newResult[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newResult[1]).format("YYYY-MM-DD"));
    setValue(newResult);
  };

  const handleOperationType = (event) => {
    setOperationType(event.target.value);
    if (sortBy.sorted_amount === true) {
      setSortBy({ ...sortBy, sorted_amount: false });
    }
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
    getTransactions(newPage + 1, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleExpand = (e) => {
    setOpenFor({
      ...openFor,
      [`${e.currentTarget.id}`]: !openFor[`${e.currentTarget.id}`],
    });
  };

  async function deleteTransactionHistory(id) {
    let data = {
      userId: userId,
      transactionId: id,
    };

    console.log("DELETE TRANSACTION HISTORY DATA ==>", data);

    try {
      const response = await deleteAffiliateExchanges_req(userId, id);
      if (response) {
        console.log(
          "DELETE AFFILIATE TRANSACTION HISTORY RESPONSE ==>",
          response
        );
        getTransactions(1, rowsPerPage);
      }
    } catch (e) {
      console.log("DELETE AFFILIATE TRANSACTION HISTORY ERROR==>", e.response);
    }
  }

  async function getTransactions(page, rowsPerPage) {
    let data = {
      operation_type:
        operationType && operationType !== "" && operationType !== "all"
          ? operationType
          : null, //['send', 'receive'],
      coin_id: Number(coinAll), //1 | 2 | 3,
      transaction_type:
        transactionType && transactionType !== "" ? transactionType : null, //['real', 'fake'],
      status: statusValue && statusValue !== "" ? statusValue : null, //['pending', 'accepted', 'rejected'],
      start_date: startDate && startDate !== "" ? startDate : null, //start date,
      end_date: endDate && endDate !== "" ? endDate : null, //end date,
      sort_param:
        sortBy.sorted_date === true && sortBy.sorted_amount === false
          ? "date"
          : sortBy.sorted_date === false && sortBy.sorted_amount === true
          ? `amount_${operationType === "receive" ? "received" : "sent"}`
          : null, //['date', 'amount'],
      sort_type:
        sortBy.sorted_date === true || sortBy.sorted_amount === true
          ? sortBy.type
          : null, //['increasing', 'decreasing']
    };

    try {
      const response = await getUserTransactions_req(
        userId,
        page,
        rowsPerPage,
        data
      );
      if (response) {
        console.log("GET USER TRANSACTIONS RESPONSE ==>", response);
        setTransactions(response);
      }
    } catch (e) {
      console.log("GET USER TRANSACTIONS ERROR  ==>", e.response);
    }
  }

  async function getCoins() {
    try {
      const response = await getCoins_req();
      if (response) {
        console.log("GET COINS RESPONSE ==>", response);
        setCoins(response);
      }
    } catch (e) {
      console.log("GET COINS ERROR ==>", e.response);
    }
  }

  useEffect(() => {
    getTransactions(1, rowsPerPage);
  }, [sortBy, operationType, coinAll, transactionType, statusValue, value[1]]);

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <Fragment>
      <Card
        p={4}
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <Grid item xs={12} md={4} lg={2}>
          <DateRange value={value} onChange={onChangeTime} />
        </Grid>
        <Spacer my={2} mx={2} />
        <Grid item xs={12} md={4} lg={2}>
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
        <Spacer my={2} mx={2} />
        <Grid item xs={12} md={4} lg={2}>
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
              {coins.map((coin) => (
                <MenuItem value={coin.id}>{coin.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Spacer my={2} mx={2} />
        <Grid item xs={12} md={4} lg={2}>
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
              <MenuItem value="fake">Internal</MenuItem>
              <MenuItem value="real"> Real </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Spacer my={2} mx={2} />
        <Grid item xs={12} md={4} lg={2}>
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
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="rejected"> Rejected </MenuItem>
              <MenuItem value="accepted"> Approved </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Card>
      <Spacer my={2} />
      <Card p={4} sx={{ display: "flex", flexDirection: "column" }}>
        <Grid container alignItems="center">
          <Grid item md={2}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  {(transactions.receiveDetails || []).map((item) => {
                    return (
                      <Typography variant="subtitle2" gutterBottom>
                        {`${item.coin_name}: ${item.total_received} ${item.coin}`}
                      </Typography>
                    );
                  })}
                </React.Fragment>
              }
            >
              <Box display="flex">
                <Typography variant="subtitle1" gutterBottom>
                  {`Received:  $${transactions.receive}`}
                </Typography>
              </Box>
            </HtmlTooltip>
          </Grid>
          <Spacer mx={4} />
          <Grid item md={2}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  {(transactions.sendDetails || []).map((item) => {
                    return (
                      <Typography variant="subtitle2" gutterBottom>
                        {`${item.coin_name}: ${item.total_send} ${item.coin}`}
                      </Typography>
                    );
                  })}
                </React.Fragment>
              }
            >
              <Box display="flex">
                <Typography variant="subtitle1" gutterBottom>
                  {`Sent:  $${transactions.send}`}
                </Typography>
              </Box>
            </HtmlTooltip>
          </Grid>
          {affiliate && (
            <>
              <Spacer mx={4} />
              <Grid item md={2}>
                <AddTransactionHistory
                  userId={userId}
                  getTransactions={getTransactions}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Card>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleCellClick("date")}>
                  <Button color="inherit">
                    Date
                    {sortBy.sorted_date === true && (
                      <IconButton onClick={() => handleCellClick("date")}>
                        {sortBy.type === "increasing" ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </IconButton>
                    )}
                  </Button>
                </TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell
                  onClick={() => {
                    if (operationType !== "" && operationType !== "all") {
                      console.log("Here ==>", operationType);
                      handleCellClick(`amount`);
                    }
                  }}
                >
                  <Button color="inherit">
                    Amount
                    {sortBy.sorted_amount === true && (
                      <IconButton onClick={() => handleCellClick(`amount`)}>
                        {sortBy.type === "increasing" ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </IconButton>
                    )}
                  </Button>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(transactions.transactions || []).map((row) => (
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
                    <TableCell align="right">
                      {affiliate && (
                        <>
                          <EditTransactionHistory
                            userId={userId}
                            transaction={row}
                            getTransactions={getTransactions}
                          />
                          <Button
                            variant="contained"
                            sx={{ width: "50px", mx: "15px" }}
                            onClick={() =>
                              deleteTransactionHistory(row.transaction_id)
                            }
                          >
                            {"Delete"}
                          </Button>
                        </>
                      )}
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
            rowsPerPageOptions={[10]}
            component="div"
            count={transactions?.allCount}
            rowsPerPage={transactions?.limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default TransactionHistory;
