import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { instance } from "../../services/api";
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
  InputBase,
  Card as MuiCard,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import moment from "moment";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import CSVButton from "../../components/CSVButton";
import Loader from "../../components/Loader";
import { Search as SearchIcon } from "react-feather";
import DatePickerFilter from "../../components/date-picker/DatePickerFilter";

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

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const SavingsTable = () => {
  // hooks.
  const { t } = useTranslation();
  const classes = useStyles();
  const [savings, setSavings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [coinAll, setCoinAll] = useState("");
  const [depositType, setDepositeType] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const rows = savings?.transactions;

  const handleCoinAll = (event) => {
    setCoinAll(event.target.value);
  };

  const handleDepositeType = (event) => {
    setDepositeType(event.target.value);
  };

  const handleTransactionType = (event) => {
    setTransactionType(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // get Savings.
  const getSavings = () => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          limit: null,
          page: 1,
          type: "Savings",
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

  // Use Effect.
  useEffect(() => getSavings(), []);

  // Loader.
  if (savings.transactionsCount === 0) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Card p={4} sx={{ display: "flex" }}>
        <Grid item md={2}>
          <Box component="div">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder={t("searchList")} />
            </Search>
          </Box>
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
          <DatePickerFilter />
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
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
              <MenuItem value="btc">btc</MenuItem>
              <MenuItem value="cxc"> cxc </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Spacer mx={2} />
        <Grid item md={2}>
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
        <Spacer mx={2} />
        <Grid item md={2}>
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
              <MenuItem value="internal">Internal</MenuItem>
              <MenuItem value="real"> Real </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Card>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>TX ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Type of operations</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
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

                      <TableCell>{row.coinFrom}</TableCell>

                      <TableCell>{row.typeFromat}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.isReal}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      {rows && (
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
      )}
    </Fragment>
  );
};

export default SavingsTable;
