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
  createFilterOptions,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import DateRange from "../../components/date-picker/DateRange";
import { ArrowDown, ArrowUp } from "react-feather";
import Loader from "../../components/Loader";

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

const SwapTable = () => {
  // Hooks.
  const [swap, setSwap] = useState([]);
  // State.
  const rows = swap?.transactions;
  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // limit.
  //Filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [time, setTime] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");
  const [coinSettings, getCoinSettings] = useState([]);
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

    getSwap(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(from),
      Number(to),
      statusValue,
      sort.type === "decreasing" ? "increasing" : "decreasing",
      param,
      inputValue
    );
  };

  // Date Range Picker.
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setTime(newValue);

    if (newValue[1]) {
      getSwap(
        1,
        rowsPerPage,
        moment(newValue[0]).format("YYYY-MM-DD"),
        moment(newValue[1]).format("YYYY-MM-DD"),
        Number(from),
        Number(to),
        statusValue,
        sort.type,
        sort.param,
        inputValue
      );
    }
  };

  // Filter Search.
  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
    getSwap(
      page,
      rowsPerPage,
      startDate,
      endDate,
      Number(event.target.value),
      Number(to),
      statusValue,
      sort.type,
      sort.param,
      inputValue
    );
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
    getSwap(
      page,
      rowsPerPage,
      startDate,
      endDate,
      Number(from),
      Number(event.target.value),
      statusValue,
      sort.type,
      sort.param,
      inputValue
    );
  };

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);

    getSwap(
      page,
      rowsPerPage,
      startDate,
      endDate,
      Number(from),
      Number(to),
      event.target.value,
      sort.type,
      sort.param,
      inputValue
    );
  };

  // Table Pagination.
  const handleChangePage = (event, newPage) => {
    getSwap(
      newPage + 1,
      rowsPerPage,
      startDate,
      endDate,
      Number(from),
      Number(to),
      statusValue,
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

    getSwap(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(from),
      Number(to),
      statusValue,
      sort.type,
      sort.param,
      value
    );
  };

  // get getSettingCoin Data.
  const getSettingCoin = () => {
    return instance.get("/admin/settings/coins").then((data) => {
      getCoinSettings(data.data);
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

  // get Swap.
  const getSwap = (
    page,
    rowsPerPage,
    start_date,
    end_date,
    coin_from,
    coin_to,
    status,
    sort_type,
    sort_param,
    code
  ) => {
    let params = {
      type: "swap",
      page: page,
      limit: rowsPerPage,
      start_date: start_date,
      end_date: end_date,
      coin_from_id: coin_from,
      coin_to_id: coin_to,
      status: status,
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

    console.log("PARAMS ==>", params);

    return instance
      .get("/admin/transaction/all", {
        params: params,
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

  // Use Effect.
  useEffect(() => {
    getSwap();
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
