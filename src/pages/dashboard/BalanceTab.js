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
  Grid,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import { getDashboardCoins_req } from "../../api/dashboardAPI";
import { getCoins_req } from "../../api/userWalletsAPI";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const BalanceTab = ({ startDate, endDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [balance, setBalance] = useState([]);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
    getBalance(Number(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getBalance(coinId) {
    let data = {
      start_date: startDate,
      end_date: endDate,
      coin_id: coinId,
    };

    console.log("Data ==>", data);

    try {
      const response = await getDashboardCoins_req(data);
      if (response) {
        console.log("GET BALANCE RESPONSE ==>", response);
        setBalance(response.result);
      }
    } catch (e) {
      console.log("GET BALANCE ERROR ==>", e.response);
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
    getCoins();
  }, []);

  useEffect(() => {
    getBalance(Number(selectedCoin));
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
          <Grid item xs={6} sm={4} md={3}>
            <Box component="div">
              <FormControl fullWidth sx={{ marginTop: "15px" }}>
                <InputLabel id="coin-label">Coin</InputLabel>
                <Select
                  labelId="coin-label"
                  id="coin-label"
                  value={selectedCoin}
                  onChange={handleCoinChange}
                  label="Coin"
                >
                  <MenuItem value="all">
                    <em>From All</em>
                  </MenuItem>
                  {coins.map((coin) => (
                    <MenuItem value={coin.id}>{coin.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Toolbar>
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  Coin
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" gutterBottom>
                  Balance
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" gutterBottom>
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balance
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.coin_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography gutterBottom>{`${row.name}`}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography gutterBottom>
                      {`${row.total_balance} ${row.coin}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {`$${row.total_balance_usd}`}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={balance?.length}
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
        <CSVButton data={balance} />
      </Box>
    </Fragment>
  );
};

export default BalanceTab;
