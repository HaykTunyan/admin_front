import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { instance } from "../../services/api";
import moment from "moment";
import { spacing } from "@material-ui/system";
import {
  Box,
  Grid,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
  TablePagination,
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
  createFilterOptions,
} from "@material-ui/core";
import { ArrowDown, ArrowUp } from "react-feather";
import CSVButton from "../../components/CSVButton";
import Loader from "../../components/Loader";
import DateRange from "../../components/date-picker/DateRange";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

export const cellList = [
  {
    id: "1",
    head: "Date",
    sortable: true,
    param: "date",
  },
  {
    id: "2",
    head: "Email",
    sortable: true,
    param: "email",
  },
  {
    id: "3",
    head: "Phone",
    sortable: false,
  },
  {
    id: "4",
    head: "Amount",
    sortable: true,
    param: "amount_received",
  },
  {
    id: "5",
    head: "Coin",
    sortable: false,
  },
  {
    id: "6",
    head: "TX Id",
    sortable: false,
  },
  {
    id: "7",
    head: "Type",
    sortable: false,
  },
  {
    id: "8",
    head: "Type of operations",
    sortable: false,
  },
  {
    id: "9",
    head: "Status",
    sortable: false,
  },
];

const SavingsTable = () => {
  // Hooks.
  const [savings, setSavings] = useState([]);
  // State.
  const rows = savings?.transactions;
  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Filters
  const [coinAll, setCoinAll] = useState("");
  const [depositType, setDepositeType] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [time, setTime] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coinSettings, getCoinSettings] = useState([]);
  const [country, setCountry] = useState("");
  const [inputValue, setInputValue] = useState("");
  // Sorting.
  const [sort, setSort] = useState({
    type: "decreasing",
    param: "",
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    limit: 8,
    stringify: (country) => country.telefon,
  });

  //Handle Sorting
  const handleSorting = (id, param) => {
    setSort({
      [`sorted_${id}`]: true,
      type: sort.type === "decreasing" ? "increasing" : "decreasing",
      param: param,
    });

    getSavings(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(coinAll),
      depositType,
      transactionType === "all" ? null : transactionType,
      sort.type === "decreasing" ? "increasing" : "decreasing",
      param,
      inputValue
    );
  };

  // on Change Time.
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setTime(newValue);

    if (newValue[1]) {
      getSavings(
        1,
        rowsPerPage,
        moment(newValue[0]).format("YYYY-MM-DD"),
        moment(newValue[1]).format("YYYY-MM-DD"),
        Number(coinAll),
        depositType,
        transactionType === "all" ? null : transactionType,
        sort.type,
        sort.param,
        inputValue
      );
    }
  };

  // Coin Type.
  const handleCoinAll = (event) => {
    setCoinAll(event.target.value);
    getSavings(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(event.target.value),
      depositType,
      transactionType === "all" ? null : transactionType,
      sort.type,
      sort.param,
      inputValue
    );
  };

  const handleDepositeType = (event) => {
    setDepositeType(event.target.value);
    getSavings(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(coinAll),
      event.target.value,
      transactionType === "all" ? null : transactionType,
      sort.type,
      sort.param,
      inputValue
    );
  };

  const handleTransactionType = (event) => {
    setTransactionType(event.target.value);

    getSavings(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(coinAll),
      depositType,
      event.target.value === "all" ? null : event.target.value,
      sort.type,
      sort.param,
      inputValue
    );
  };

  const handleChangePage = (event, newPage) => {
    getSavings(
      newPage + 1,
      rowsPerPage,
      startDate,
      endDate,
      Number(coinAll),
      depositType,
      transactionType === "all" ? null : transactionType,
      sort.type,
      sort.param,
      inputValue
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handlePhoneCode = (value) => {
    setInputValue(value);

    getSavings(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(coinAll),
      depositType,
      transactionType === "all" ? null : transactionType,
      sort.type,
      sort.param,
      value
    );
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

  // get Country Code.
  const getCountry = () => {
    return instance.get("/admin/settings/countries").then((data) => {
      setCountry(data.data);
      return data;
    });
  };

  // get Savings.
  const getSavings = (
    page,
    rowsPerPage,
    start_date,
    end_date,
    coin_id,
    type,
    transaction_type,
    sort_type,
    sort_param,
    code
  ) => {
    let params = {
      page: page,
      limit: rowsPerPage,
      start_date: start_date,
      end_date: end_date,
      coin_id: coin_id,
      type: type,
      transaction_type: transaction_type,
      sort_type: sort_type,
      sort_param: sort_param,
      telefon_code: code,
    };

    let result = Object.keys(params).filter(
      (key) => !params[key] || params[key] === ""
    );

    for (let item of result) {
      delete params[`${item}`];
    }

    return instance
      .get("/admin/transaction/all", {
        params: params,
      })
      .then((data) => {
        setSavings(data.data);
        return data;
      })
      .catch((err) => {
        console.log("error ==>", err.response);
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getSavings();
    getCountry();
    getSettingCoin();
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
                <MenuItem value={item.id}>{item.coin}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} md={2} m={2}>
          <FormControl fullWidth>
            <InputLabel id="select-deposit-type">Deposit Type</InputLabel>
            <Select
              labelId="select-deposit-type"
              id="select-deposit-type"
              value={depositType}
              onChange={handleDepositeType}
              label="Deposit Type"
            >
              <MenuItem value="savings">
                <em>All</em>
              </MenuItem>
              <MenuItem value="flexible">Flexible</MenuItem>
              <MenuItem value="locked"> Locked </MenuItem>
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
      </Card>
      <Paper>
        <TableContainer component={Paper} mt={5}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {cellList?.map((item) => (
                  <TableCell key={item.id} align="left">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseOver={() => {
                        setSort({ ...sort, [`show_${item.id}`]: true });
                      }}
                      onMouseLeave={() =>
                        setSort({ ...sort, [`show_${item.id}`]: false })
                      }
                      onClick={() => {
                        handleSorting(Number(item.id), item.param);
                      }}
                    >
                      {item.head}

                      {item.sortable === true &&
                        (sort[`sorted_${item.id}`] === true ||
                          sort[`show_${item.id}`] === true) && (
                          <Box sx={{ display: "flex" }}>
                            <IconButton
                              onClick={() =>
                                handleSorting(Number(item.id), item.param)
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
                      {Number(item.id) === 3 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "20px",
                          }}
                        >
                          <Autocomplete
                            filterOptions={filterOptions}
                            id="country-phone-select"
                            sx={{ width: 150 }}
                            options={country}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                              handlePhoneCode(newInputValue);
                            }}
                            autoHighlight
                            getOptionLabel={(option) => option.telefon}
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
                              <TextField
                                {...params}
                                label="Phone"
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
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
              count={savings?.transactionsCount}
              rowsPerPage={savings?.limit}
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

export default SavingsTable;
