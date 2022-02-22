import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { instance } from "../../services/api";
import moment from "moment";
import { spacing } from "@material-ui/system";
import {
  Box,
  Grid,
  Paper as MuiPaper,
  Card as MuiCard,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
  TablePagination,
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
import DateRange from "../../components/date-picker/DateRange";
import { ArrowDown, ArrowUp } from "react-feather";
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

const SwapTable = () => {
  // Hooks.
  const [swap, setSwap] = useState([]);
  const [page, setPage] = useState(0); // page.
  const [rowsPerPage, setRowsPerPage] = useState(10); // limit.
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortPhone, setSortPhone] = useState("");
  const [country, setCountry] = useState("");
  const [coinSettings, getCoinSettings] = useState([]);
  // Sorting.
  const [sortDate, setSortDate] = useState(true);
  const [sortEmail, setSortEmail] = useState(true);
  const [sortAmount, setSortAmount] = useState(true);
  const [sortParams, setSortParmas] = useState("");
  const [sortType, setSortType] = useState("");
  const [inputPhone, setPhoneValue] = useState("");
  // State.
  const rows = swap?.transactions;

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
  const sortingPhone = (event) => {
    setSortPhone(event.target.value);
    getPhoneSorting(event.target.value);
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

  // Date Range Picker.
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);
    getDateFilters(
      moment(newValue[0]).format("YYYY-MM-DD"),
      moment(newValue[1]).format("YYYY-MM-DD")
    );
  };

  // Filter Search.
  const handleChangeFrom = (event, from) => {
    setFrom(event.target.value);
    console.log(" from  change", from);
    if (from?.props.value != "all") {
      getFromCoin(from?.props.value);
    } else {
      getSwap();
    }
  };

  const handleChangeTo = (event, to) => {
    setTo(event.target.value);
    if (to?.props.value === "all") {
      getSwap();
    } else {
      getToCoin(to?.props.value);
    }
  };

  const handleStatusValue = (event, statusValue) => {
    setStatusValue(event.target.value);
    if (statusValue?.props?.value != "all") {
      getSendStatusFilter(statusValue?.props?.value);
    } else {
      getSwap();
    }
  };

  // Table Pagination.
  const handleChangePage = (event, newPage) => {
    getSwap(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // End FIlter .

  // get Swap.
  const getSwap = (
    page,
    rowsPerPage,
    startDate,
    endDate,
    from,
    to,
    statusValue
  ) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          limit: rowsPerPage,
          page: page,
          start_date: startDate,
          end_date: endDate,
          coin_from_id: from,
          coin_to_id: to,
          status: statusValue,
        },
      })
      .then((data) => {
        setSwap(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // get Send Sorting Data.
  const getSorting = (sort_type, sort_params, page, rowsPerPage) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          sort_type: sort_type,
          sort_param: sort_params,
          limit: rowsPerPage,
          page: page,
          start_date: startDate,
          end_date: endDate,
          coin_from_id: from,
          coin_to_id: to,
          status: statusValue,
        },
      })
      .then((data) => {
        setSwap(data.data);
        return data;
      });
  };

  // get Date FIlters Date.
  const getDateFilters = (start_date, end_date) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          start_date: start_date,
          end_date: end_date,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSwap(data.data);
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

  // get getSettingCoin Data.
  const getSettingCoin = () => {
    return instance.get("/admin/settings/coins").then((data) => {
      getCoinSettings(data.data);
      return data;
    });
  };

  // get Send Status Filter Data
  const getSendStatusFilter = (status) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          status: status,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSwap(data.data);
        return data;
      });
  };

  // Phone Sorting.
  const getPhoneSorting = (telefon_code) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          telefon_code: telefon_code,
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setSwap(data.data);
        return data;
      });
  };

  // get Coin Filter Data
  const getFromCoin = (coin_from_id, page, rowsPerPage, to) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          coin_from_id: coin_from_id,
          limit: rowsPerPage,
          page: page,
          coin_to_id: to,
        },
      })
      .then((data) => {
        setSwap(data.data);
        return data;
      });
  };

  // get Coin Filter Data
  const getToCoin = (coin_to_id, page, rowsPerPage, from) => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          type: "swap",
          coin_to_id: coin_to_id,
          limit: rowsPerPage,
          page: page,
          coin_from_id: from,
        },
      })
      .then((data) => {
        setSwap(data.data);
        return data;
      });
  };

  // Use Effect.
  useEffect(() => {
    getSwap();
    setTimeout(() => {
      getSorting();
      getDateFilters();
      getSettingCoin();
      getCountry();
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
            <InputLabel id="select-from-label">From Coin</InputLabel>
            <Select
              labelId="select-from-label"
              id="select-from-label"
              value={from}
              onChange={handleChangeFrom}
              label="From Coin"
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
            <InputLabel id="select-to-label">To Coin</InputLabel>
            <Select
              labelId="select-to-label"
              id="select-to-label"
              value={to}
              onChange={handleChangeTo}
              label="To Coin"
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
                          <>
                            {console.log(" params ", params)}
                            <TextField
                              {...params}
                              label="Phone"
                              value={params?.inputProps?.value}
                            />
                          </>
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
                          MenuProps={MenuProps}
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
                    <TableCell component="th" scope="row">
                      {moment(row.date).format("DD/MM/YYYY HH:mm ")}{" "}
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
                    <TableCell>
                      <Box component="div" sx={{ display: "flex" }}>
                        <span>{row.coinfrom}</span>
                        <span> - </span>
                        <span>{row.cointo}</span>
                      </Box>
                      {row.coinFrom}
                    </TableCell>
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
              count={swap?.transactionsCount}
              rowsPerPage={swap?.limit}
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

export default SwapTable;
