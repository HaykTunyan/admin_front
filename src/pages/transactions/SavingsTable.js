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
  Chip as MuiChip,
  Tooltip,
  Button,
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

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
          limit: rowsPerPage,
          page: page,
          type: "savings",
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
  useEffect(() => {
    getSavings();
  }, []);

  // Loader.
  if (savings.transactionsCount === 0) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Card p={4} sx={{ display: "flex" }}>
        <Grid item xs={2} md={2} mx={1}>
          <Box component="div">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder={t("searchList")} />
            </Search>
          </Box>
        </Grid>
        <Grid item xs={2} md={2} mx={1}>
          <DatePickerFilter />
        </Grid>
        <Grid item xs={2} md={2} mx={1}>
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
        <Grid item xs={2} md={2} mx={1}>
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
        <Grid item xs={2} md={2} mx={1}>
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
              <MenuItem value="Deposit">Deposit</MenuItem>
              <MenuItem value="Refunds"> Refunds </MenuItem>
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
                    <TableCell>{row.coinFrom}</TableCell>
                    <TableCell>
                      <Tooltip title={row.transaction_id} arrow>
                        <Button>{row.transaction_id.substring(0, 9)}</Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {row.type === "fake" ? (
                        <Chip label={row.type} color="error" />
                      ) : (
                        <Chip label={row.type} color="success" />
                      )}
                    </TableCell>
                    <TableCell>{row.operation_type}</TableCell>
                    <TableCell>
                      {row.status === "accepted" ? (
                        <Chip label={row.status} color="success" />
                      ) : (
                        <Chip label={row.status} color="error" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={savings?.transactionsCount}
            rowsPerPage={savings?.limit}
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
