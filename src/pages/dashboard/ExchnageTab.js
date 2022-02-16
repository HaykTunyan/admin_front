import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import {
  Typography as MuiTypography,
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  Toolbar,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import { getDashboardExchanges_req } from "../../api/dashboardAPI";
import { getCoins_req } from "../../api/userWalletsAPI";
import { ArrowDown, ArrowUp } from "react-feather";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const ExchnageTab = ({ startDate, endDate }) => {
  // Hooks.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [exchanges, setExchanges] = useState([]);
  const [coins, setCoins] = useState([]);
  const [sortBy, setSortBy] = useState("increasing");

  const handleCellClick = (sortType) => {
    setSortBy(sortBy === "increasing" ? "decreasing" : "increasing");
    getExchanges(Number(from), Number(to), "popularity", sortType);
  };

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
    getExchanges(Number(event.target.value), Number(to), "popularity", sortBy);
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
    getExchanges(
      Number(from),
      Number(event.target.value),
      "popularity",
      sortBy
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getExchanges(coinFrom, coinTo, sortParam, sortType) {
    let data = {
      start_date: startDate,
      end_date: endDate,
      coin_from_id: coinFrom,
      coin_to_id: coinTo,
      sort_param: sortParam,
      sort_type: sortType,
    };
    try {
      const response = await getDashboardExchanges_req(data);
      if (response) {
        setExchanges(response.result);
      }
    } catch (e) {}
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
    getCoins();
  }, []);

  useEffect(() => {
    getExchanges(Number(from), Number(to), "popularity", sortBy);
  }, [startDate, endDate]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Toolbar
          sx={{
            paddingY: "12px",
            display: { xs: "grid", sm: "flex" },
          }}
        >
          <Grid item xs={12} sm={3} md={2} m={2}>
            <FormControl fullWidth>
              <InputLabel id="exchange-label">Exchanged Coin</InputLabel>
              <Select
                labelId="exchange-label"
                id="exchange-label"
                value={from}
                onChange={handleChangeFrom}
                label="Exchanged Coin"
              >
                <MenuItem value="all">
                  <em>From All</em>
                </MenuItem>
                {coins.map((coin) => (
                  <MenuItem value={coin.id}>{coin.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={2} m={2}>
            <FormControl fullWidth>
              <InputLabel id="received-label">Received Coin</InputLabel>
              <Select
                labelId="received-label"
                id="received-label"
                value={to}
                onChange={handleChangeTo}
                label="Received Coin"
              >
                <MenuItem value="all">
                  <em>To All</em>
                </MenuItem>
                {coins.map((coin) => (
                  <MenuItem value={coin.id}>{coin.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Toolbar>
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell>Exchanged Coin</TableCell>
              <TableCell>Received Coin</TableCell>
              <TableCell align="center">Exchange</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell
                align="center"
                onClick={() =>
                  handleCellClick(
                    sortBy === "decreasing" ? "increasing" : "decreasing"
                  )
                }
              >
                Popularity of Exchange
                <IconButton
                  onClick={() =>
                    handleCellClick(
                      sortBy === "decreasing" ? "increasing" : "decreasing"
                    )
                  }
                >
                  {sortBy === "increasing" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchanges
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, key) => (
                <TableRow
                  key={key}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {`${row.coin_from_name}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {`${row.coin_to_name}`}
                  </TableCell>
                  <TableCell align="center">
                    {`${row.exchange_amount} ${row.coin_from} - ${row.received_amount} ${row.coin_to}`}
                  </TableCell>
                  <TableCell align="center">
                    {`$${row.exchange_usd_amount} - $${row.received_usd_amount}`}
                  </TableCell>
                  <TableCell align="center">{`${row.popularity}%`}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={exchanges?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={exchanges} />
      </Box>
    </Fragment>
  );
};

export default ExchnageTab;
