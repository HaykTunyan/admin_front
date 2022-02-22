import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { instance } from "../../services/api";
import moment from "moment";
import { spacing } from "@material-ui/system";
import { useTranslation } from "react-i18next";
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
} from "@material-ui/core";
import { ArrowDown, ArrowUp } from "react-feather";
import CSVButton from "../../components/CSVButton";
import Loader from "../../components/Loader";
import DateRange from "../../components/date-picker/DateRange";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

// Custom Style.

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SavingsTable = () => {
  // Hooks.
  const [savings, setSavings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [coinAll, setCoinAll] = useState("");
  const [depositType, setDepositeType] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [value, setValue] = useState([null, null]);
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
  const rows = savings?.transactions;

  // Sorting Functions.
  const sortingDate = () => {
    setSortDate(!sortDate);
    if (sortDate) {
      getSorting("decreasing", "date");
    } else {
      getSorting("increasing", "date");
    }
  };

  // Sorting Email.
  const sortingEmail = () => {
    setSortEmail(!sortEmail);
    if (sortEmail) {
      getSorting("decreasing", "email");
    } else {
      getSorting("increasing", "email");
    }
  };

  // Sorting Phone.
  const sortingPhone = (event, sortPhone) => {
    setSortPhone(event.target.value);
    // getPhoneSorting(event.target.value);
    getPhoneSorting(sortPhone?.props?.value);
  };

  const handleCountry = (event, newPhoneValue) => {
    setSortPhone(event?.target?.value);
    setPhoneValue(newPhoneValue);
    getPhoneSorting(event?.target?.value);
  };

  // Sorting Amount.
  const sortingAmount = () => {
    setSortAmount(!sortAmount);
    if (sortAmount) {
      getSorting("decreasing", "amount_received");
    } else {
      getSorting("increasing", "amount_received");
    }
  };

  // on Change Time.
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);
    getDateFilters(
      moment(newValue[0]).format("YYYY-MM-DD"),
      moment(newValue[1]).format("YYYY-MM-DD")
    );
  };

  // Coin Type.
  const handleCoinAll = (event, coinAll) => {
    setCoinAll(event.target.value);
    if (coinAll?.props?.value === "all") {
      setCoinAll(event.target.value);
      getSavings();
    } else {
      getSendCoinFilter(coinAll?.props?.value);
    }
  };

  const handleDepositeType = (event) => {
    setDepositeType(event.target.value);
    if (depositType?.props?.value != "All") {
      getDepositeSorting(event.target.value);
    } else {
      getSavings();
    }
  };

  const handleTransactionType = (event, transactionType) => {
    setTransactionType(event.target.value);
    if (transactionType?.props?.value === "all") {
      getSavings();
    } else {
      getSendFilter(transactionType?.props?.value);
    }
  };

  const handleChangePage = (event, newPage) => {
    getSavings(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // get Savings.
  const getSavings = (page, rowsPerPage) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "savings",
          limit: rowsPerPage,
          page: page,
          coin_id: coinAll,
        },
      })
      .then((data) => {
        setSavings(data.data);
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

  // get Coin Filter Data.
  const getSendCoinFilter = (coin_id) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "savings",
          coin_id: coin_id,
        },
      })
      .then((data) => {
        setSavings(data.data);
        return data;
      });
  };

  // get Send Sorting Data.
  const getSorting = (sort_type, sort_params) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "savings",
          sort_type: sort_type,
          sort_param: sort_params,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSavings(data.data);
        return data;
      });
  };

  // get Date Filters.
  const getDateFilters = (start_date, end_date) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "savings",
          start_date: start_date,
          end_date: end_date,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSavings(data.data);
        return data;
      });
  };

  // get Send Filter Data
  const getSendFilter = (transaction_type) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "savings",
          transaction_type: transaction_type,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSavings(data.data);
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

  // Phone Sorting.
  const getPhoneSorting = (telefon_code) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "savings",
          telefon_code: telefon_code,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSavings(data.data);
        return data;
      });
  };

  const getDepositeSorting = (deposite, page, rowsPerPage) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: deposite,
          page: page,
          limit: rowsPerPage,
        },
      })
      .then((data) => {
        setSavings(data.data);
        return data;
      });
  };

  // Use Effect.
  useEffect(() => {
    getSavings();
    setTimeout(() => {
      getSettingCoin();
      getSendCoinFilter();
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
          <DateRange value={value} onChange={onChangeTime} />
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
              <MenuItem value="all">
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
                      {/* <FormControl sx={{ minWidth: "100px" }}>
                        <InputLabel id="select-phone-label">Sort</InputLabel>
                        <Select
                          labelId="select-phone-label"
                          id="select-phone-label"
                          value={sortPhone}
                          onChange={sortingPhone}
                          autoWidth
                          label="Sort"
                          fullWidth
                        >
                          {country &&
                            country.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                <Box sx={{ display: "flex", width: "100%" }}>
                                  <Box mr={2}>{item.telefon}</Box>
                                </Box>
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl> */}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Amount
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={sortingAmount}>
                        {sortAmount ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>TX ID</TableCell>
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
