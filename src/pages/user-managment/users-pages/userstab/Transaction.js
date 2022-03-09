import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { spacing } from "@material-ui/system";
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
import DateRange from "../../../../components/date-picker/DateRange";
import { getUserTransactions_req } from "../../../../api/userTransactionsAPI";
import AddTransactionHistory from "../../../../modal/AddTransactionHistory";
import { deleteAffiliateExchanges_req } from "../../../../api/userExchangesAPI";
import EditTransactionHistory from "../../../../modal/EditTransactionHistory";
import { getCoins_req } from "../../../../api/userWalletsAPI";
import { ArrowDown, ArrowUp } from "react-feather";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.

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

export const cellList = [
  {
    id: "1",
    head: "Date",
    sortable: true,
    param: "date",
  },
  {
    id: "2",
    head: "Type",
    sortable: false,
  },
  {
    id: "3",
    head: "Coin",
    sortable: false,
  },
  {
    id: "4",
    head: "Amount",
    sortable: true,
    param: "amount",
  },
  {
    id: "5",
    head: "Status",
    sortable: false,
  },
  {
    id: "6",
    head: "Action",
    sortable: false,
  },
];

const TransactionHistory = () => {
  //  Hooks.
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const { affiliate } = location.state;
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Filters
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [operationType, setOperationType] = useState("");
  const [coinAll, setCoinAll] = useState("");
  const [coins, setCoins] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const [openFor, setOpenFor] = useState({});

  const [sort, setSort] = useState({
    type: "decreasing",
    param: "",
  });

  const handleCellClick = (id, param) => {
    setSort({
      [`sorted_${id}`]: true,
      type: sort.type === "decreasing" ? "increasing" : "decreasing",
      param:
        id === 4
          ? `${param}_${operationType === "receive" ? "received" : "sent"}`
          : param,
    });

    getTransactions(
      1,
      rowsPerPage,
      startDate,
      endDate,
      operationType,
      Number(coinAll),
      transactionType === "all" ? null : transactionType,
      statusValue === "all" ? null : statusValue,
      sort.type === "decreasing" ? "increasing" : "decreasing",
      id === 4
        ? `${param}_${operationType === "send" ? "sent" : "received"}`
        : param
    );
  };

  const onChangeTime = (newResult) => {
    setStartDate(moment(newResult[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newResult[1]).format("YYYY-MM-DD"));
    setValue(newResult);

    if (newResult[1]) {
      getTransactions(
        1,
        rowsPerPage,
        moment(newResult[0]).format("YYYY-MM-DD"),
        moment(newResult[1]).format("YYYY-MM-DD"),
        operationType,
        Number(coinAll),
        transactionType === "all" ? null : transactionType,
        statusValue === "all" ? null : statusValue,
        sort.type,
        sort.param
      );
    }
  };

  const handleOperationType = (event) => {
    setSort({
      [`sorted_${4}`]: event.target.value === "all" ? false : true,
      type: sort.type,
      param:
        event.target.value === "all"
          ? null
          : `amount_${event.target.value === "send" ? "sent" : "received"}`,
    });

    setOperationType(event.target.value);

    getTransactions(
      page,
      rowsPerPage,
      startDate,
      endDate,
      event.target.value,
      Number(coinAll),
      transactionType === "all" ? null : transactionType,
      statusValue === "all" ? null : statusValue,
      sort.type,
      event.target.value === "all"
        ? null
        : `amount_${event.target.value === "send" ? "sent" : "received"}`
    );
  };

  const handleCoinAll = (event) => {
    setCoinAll(event.target.value);

    getTransactions(
      page,
      rowsPerPage,
      startDate,
      endDate,
      operationType,
      Number(event.target.value),
      transactionType === "all" ? null : transactionType,
      statusValue === "all" ? null : statusValue,
      sort.type,
      sort.param
    );
  };

  const handleTransactionType = (event) => {
    setTransactionType(event.target.value);
    getTransactions(
      page,
      rowsPerPage,
      startDate,
      endDate,
      operationType,
      Number(coinAll),
      event.target.value === "all" ? null : event.target.value,
      statusValue === "all" ? null : statusValue,
      sort.type,
      sort.param
    );
  };

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    getTransactions(
      page,
      rowsPerPage,
      startDate,
      endDate,
      operationType,
      Number(coinAll),
      transactionType === "all" ? null : transactionType,
      event.target.value === "all" ? null : event.target.value,
      sort.type,
      sort.param
    );
  };

  const handleChangePage = (event, newPage) => {
    getTransactions(
      newPage + 1,
      rowsPerPage,
      startDate,
      endDate,
      operationType,
      Number(coinAll),
      transactionType === "all" ? null : transactionType,
      statusValue === "all" ? null : statusValue,
      sort.type,
      sort.param
    );
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

    try {
      const response = await deleteAffiliateExchanges_req(userId, id);
      if (response) {
        getTransactions(
          1,
          rowsPerPage,
          startDate,
          endDate,
          operationType,
          Number(coinAll),
          transactionType === "all" ? null : transactionType,
          statusValue === "all" ? null : statusValue,
          sort.type,
          sort.param
        );
      }
    } catch (e) {}
  }

  async function getTransactions(
    page,
    rowsPerPage,
    start_date,
    end_date,
    operation_type,
    coinId,
    transaction_type,
    status,
    sort_type,
    sort_param
  ) {
    let data = {
      page: page,
      limit: rowsPerPage,
      start_date: start_date,
      end_date: end_date,
      type: operation_type,
      coin_id: coinId,
      transaction_type: transaction_type,
      status: status,
      sort_type: sort_type,
      sort_param: sort_param,
    };

    let result = Object.keys(data).filter(
      (key) => !data[key] || data[key] === ""
    );

    for (let item of result) {
      delete data[`${item}`];
    }

    try {
      const response = await getUserTransactions_req(userId, data);
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
        setCoins(response);
      }
    } catch (e) {}
  }

  useEffect(() => {
    getTransactions();
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
                {cellList?.map((item) => (
                  <TableCell
                    key={item.id}
                    align={Number(item.id) === 6 ? "right" : "left"}
                  >
                    <Box
                      // sx={{
                      //   display: "flex",
                      //   alignItems: "center",
                      // }}
                      onMouseOver={
                        Number(item.id) === 4 &&
                        (!operationType || operationType === "all")
                          ? () => {}
                          : () =>
                              setSort({ ...sort, [`show_${item.id}`]: true })
                      }
                      onMouseLeave={
                        Number(item.id) === 4 &&
                        (!operationType || operationType === "all")
                          ? () => {}
                          : () =>
                              setSort({ ...sort, [`show_${item.id}`]: false })
                      }
                      onClick={
                        Number(item.id) === 4 &&
                        (!operationType || operationType === "all")
                          ? () => {}
                          : () => handleCellClick(Number(item.id), item.param)
                      }
                    >
                      {item.head}

                      {item.sortable === true &&
                        (sort[`sorted_${item.id}`] === true ||
                          sort[`show_${item.id}`] === true) && (
                          <Box sx={{ display: "flex" }}>
                            <IconButton
                              onClick={() =>
                                handleCellClick(Number(item.id), item.param)
                              }
                            >
                              {sort.type === "increasing" ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        )}
                    </Box>
                  </TableCell>
                ))}
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
