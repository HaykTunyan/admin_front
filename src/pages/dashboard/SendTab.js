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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { getDashboardSend_req } from "../../api/dashboardAPI";
import { getCoins_req } from "../../api/userWalletsAPI";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const SendTab = ({ startDate, endDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [send, setSend] = useState([]);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
    getSend(Number(event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getSend(coinId) {
    let data = {
      start_date: startDate,
      end_date: endDate,
      coin_id: coinId,
    };
    try {
      const response = await getDashboardSend_req(data);
      if (response) {
        setSend(response);
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
    getSend(Number(selectedCoin));
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
                  Sent Balance
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" gutterBottom>
                  Sent Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {send.result &&
              send.result
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
                    <TableCell>{`${row.name}`}</TableCell>
                    <TableCell align="center">{`${row.total_balance} ${row.coin}`}</TableCell>
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
          count={send?.result?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default SendTab;
