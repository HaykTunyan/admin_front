import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { instance } from "../../services/api";
import moment from "moment";
import { spacing } from "@material-ui/system";
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
  Chip as MuiChip,
  Tooltip,
  Button,
  IconButton,
  Autocomplete,
  TextField,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import { ArrowDown, ArrowUp } from "react-feather";
import DateRange from "../../components/date-picker/DateRange";
import Loader from "../../components/Loader";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

// Custom Style.

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SendTable = () => {
  //  Hooks.
  const [send, setSend] = useState([]); // send.
  const [page, setPage] = useState(0); // page.
  const [rowsPerPage, setRowsPerPage] = useState(5); // limit.
  const [operationType, setOperationType] = useState(""); // operation type.
  const [coinAll, setCoinAll] = useState(""); // coin.
  const [transactionType, setTransactionType] = useState(""); // transaction type.
  const [statusValue, setStatusValue] = useState(""); // status value.
  const [time, setTime] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coinSettings, getCoinSettings] = useState([]);
  const [sortPhone, setSortPhone] = useState("");
  const [country, setCountry] = useState("");
  // Sorting.
  const [sortDate, setSortDate] = useState(true);
  const [sortEmail, setSortEmail] = useState(true);
  const [sortAmount, setSortAmount] = useState(true);
  const [sortParams, setSortParmas] = useState("");
  const [sortType, setSortType] = useState("");
  const [inputPhone, setPhoneValue] = useState("");
  // State.
  const rows = send?.transactions;
  const setType = operationType?.props?.value;

  // Sorting Functions.
  const sortingDate = () => {
    setSortDate(!sortDate);
    if (sortDate) {
      getSorting("send_receive", "decreasing", "date");
    } else {
      getSorting("send_receive", "increasing", "date");
    }
  };

  // Sorting Email.
  const sortingEmail = () => {
    setSortEmail(!sortEmail);
    if (sortEmail) {
      getSorting("send_receive", "decreasing", "email");
    } else {
      getSorting("send_receive", "increasing", "email");
    }
  };

  // Sorting Phone
  const sortingPhone = (event) => {
    setSortPhone(event.target.value);
    getPhoneSorting(event.target.value);
  };

  const handleCountry = (event, newPhoneValue) => {
    console.log(" event ", event);
    setSortPhone(event?.target?.value);
    setPhoneValue(newPhoneValue);
    getPhoneSorting(event?.target?.value);
  };

  // Amount Receive.
  const sortingAmountReceive = (event) => {
    setSortAmount(!sortAmount);
    if (sortAmount) {
      getSorting("receive", "decreasing", "amount_received");
    } else {
      getSorting("receive", "increasing", "amount_received");
    }
  };

  // Amount Send.
  const sortingAmountSend = (event) => {
    setSortAmount(!sortAmount);
    if (sortAmount) {
      getSorting("send", "decreasing", "amount_sent");
    } else {
      getSorting("send", "increasing", "amount_sent");
    }
  };

  // on Change Time.
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setTime(newValue);
    getDateFilters(
      moment(newValue[0]).format("YYYY-MM-DD"),
      moment(newValue[1]).format("YYYY-MM-DD")
    );
  };

  // Operation Type.
  const handleOperationType = (event, operationType) => {
    setOperationType(event.target.value);
    if (operationType?.props?.value === "all") {
      getSend();
    } else {
      getSendOperationFilter(operationType?.props?.value);
    }
  };

  // Coin Type.
  const handleCoinAll = (event, coinAll) => {
    setCoinAll(event.target.value);
    if (coinAll?.props.value === "all") {
      getSend();
    } else {
      getSend();
      getSendCoinFilter(coinAll?.props.value);
    }
  };

  // Transaction Type
  const handleTransactionType = (event, transactionType) => {
    setTransactionType(event.target.value);
    if (transactionType?.props?.value === "all") {
      getSend();
    } else {
      getSendFilter(transactionType?.props?.value);
    }
  };

  // Status Type
  const handleStatusValue = (event, statusValue) => {
    setStatusValue(event.target.value);
    if (statusValue?.props?.value === "all") {
      getSend();
    } else {
      getSendStatusFilter(statusValue?.props?.value);
    }
  };

  // Pagination Function.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getSend(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  //  get Send/Receive
  const getSend = (
    page,
    rowsPerPage,
    setType,
    transaction_type,
    sortType,
    sortParams,
    coinAll
  ) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          limit: rowsPerPage,
          page: page,
          type: (setType = !"All" ? setType : "send_receive"),
          transaction_type: transaction_type,
          sort_type: sortType,
          sort_param: sortParams,
          coin_id: coinAll?.props?.value,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // get getSettingCoin Data.
  const getSettingCoin = () => {
    return instance
      .get("/admin/settings/coins")
      .then((data) => {
        getCoinSettings(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  // get Coin Filter Data
  const getSendCoinFilter = (coin_id) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "send_receive",
          coin_id: coin_id,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // get Send Operation Filter Data
  const getSendOperationFilter = (send_receive) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: send_receive,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // get Send Filter Data
  const getSendFilter = (transaction_type) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "send_receive",
          transaction_type: transaction_type,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // get Send Status Filter Data
  const getSendStatusFilter = (status) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "send_receive",
          status: status,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // get Send Sorting Data.
  const getSorting = (type, sort_type, sort_params) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: type,
          sort_type: sort_type,
          sort_param: sort_params,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // get Country Code.
  const getCountry = () => {
    return instance.get("/admin/settings/countries").then((data) => {
      setCountry(data.data);
      return data;
    });
  };

  // get Date FIlters Date.
  const getDateFilters = (start_date, end_date) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "send_receive",
          start_date: start_date,
          end_date: end_date,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // Phone Sorting.
  const getPhoneSorting = (telefon_code) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "send_receive",
          telefon_code: telefon_code,
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      });
  };

  // Use Effect.
  useEffect(() => {
    getSend();
    setTimeout(() => {
      getSettingCoin();
      getSendCoinFilter();
      getSendOperationFilter();
      getSorting();
      getDateFilters();
      getCountry();
      getPhoneSorting();
    }, 700);
  }, []);

  return (
    <Fragment>
      <Card
        p={2}
        sx={{
          display: { xs: "grid", sm: "flex" },
          flexFlow: "row",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={2} md={2} m={2}>
          <DateRange value={time} onChange={onChangeTime} />
        </Grid>
        <Grid item xs={12} sm={2} md={2} m={2}>
          <FormControl fullWidth>
            <InputLabel id="select-operation-type">Operation Type</InputLabel>
            <Select
              labelId="select-operation-type"
              id="select-operation-type"
              value={operationType}
              onChange={handleOperationType}
              label="Operation Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="receive">Receive</MenuItem>
              <MenuItem value="send"> Send </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} md={2} m={2}>
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
              {coinSettings.map((item) => (
                <MenuItem value={item.id}> {item.coin} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} md={2} m={2}>
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
        <Grid item xs={12} sm={2} md={2} m={2}>
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
      <Paper>
        <TableContainer component={Paper} mt={5}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Date
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={sortingDate}>
                        {sortDate ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Email
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={sortingEmail}>
                        {sortEmail ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>Phone</Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "20px",
                      }}
                    >
                      <Autocomplete
                        inputValue={inputPhone}
                        onInputChange={handleCountry}
                        id="country-states"
                        options={country}
                        getOptionLabel={(country) => country.telefon}
                        sx={{ width: 150 }}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            {option.telefon}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} label="Phone" />
                        )}
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Amount
                    {operationType === "send" && (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton onClick={sortingAmountSend}>
                          {sortAmount ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </IconButton>
                      </Box>
                    )}
                    {operationType === "receive" && (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton onClick={sortingAmountReceive}>
                          {sortAmount ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>TX Id</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Type of operations</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moment(row.date).format("DD/MM/YYYY HH:mm ")}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      {row.amount_sent != null ? (
                        <>{row.amount_sent}</>
                      ) : (
                        <>{row.amount_received}</>
                      )}
                    </TableCell>
                    <TableCell>{row.cointo}</TableCell>
                    <TableCell>
                      <Tooltip title={row.transaction_id} arrow>
                        <Button>{row.transaction_id?.substring(0, 9)}</Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {row.type === "fake" ? (
                        <Chip
                          label={row.type[0].toUpperCase() + row.type.slice(1)}
                          color="error"
                        />
                      ) : (
                        <Chip
                          label={row.type[0].toUpperCase() + row.type.slice(1)}
                          color="success"
                        />
                      )}
                    </TableCell>
                    <TableCell>{row.operation_type}</TableCell>
                    <TableCell>
                      {row.status === "accepted" ? (
                        <Chip
                          label={
                            row.status[0].toUpperCase() + row.status.slice(1)
                          }
                          color="success"
                        />
                      ) : (
                        <Chip
                          label={
                            row.status[0].toUpperCase() + row.status.slice(1)
                          }
                          color="error"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          {rows && (
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={send?.transactionsCount}
              rowsPerPage={send?.limit}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Paper>
      {rows ? (
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
      ) : (
        <Box sx={{ marginTop: "100px" }}>
          <Loader />
        </Box>
      )}
    </Fragment>
  );
};

export default SendTable;
