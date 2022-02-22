import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { instance } from "../../services/api";
import { Search as SearchIcon } from "react-feather";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Breadcrumbs,
  Toolbar as MuiToolbar,
  Typography,
  Box,
  TablePagination,
  Chip as MuiChip,
  Grid,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  InputBase,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import EditTransactionModal from "../../modal/EditTransactionModal";
import NoData from "../../components/NoData";

// Spacing.
const Toolbar = styled(MuiToolbar)(spacing);

// Custom Style.

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

// Custom Style.
const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

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

let searchTimeout = 0;

const TransactionsSettings = () => {
  // hooks.
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [coins, setCoins] = useState([]);
  const [filterCoin, setFilterCoin] = useState([]);
  const [coinIds, setCoinIds] = useState([]);
  const [coinSettings, getCoinSettings] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilterCoin = (event) => {
    const {
      target: { value },
    } = event;

    setFilterCoin(typeof value === "string" ? value.split(" ,") : value);
  };

  const handleCoinChange = (item) => {
    let from = [...coinIds];

    from.indexOf(item.id) === -1
      ? from.push(item.id)
      : from.splice(from.indexOf(item.id), 1);

    setCoinIds(from);
    console.log("FROM ==>", from);
    getCoins(from);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearch(event.target.value);

    searchTimeout = setTimeout(async () => {
      if (event.target.value.length > 2 || event.target.value.length === 0) {
        try {
          getSettingCoin(event.target.value);
        } catch (e) {
          console.log("ERROR in search", e);
        }
      }
    }, 100);
  };

  //  Get Coins
  const getCoins = (coinIds, coinName) => {
    let coinIdsString = coinIds ? coinIds.toString() : null;

    let params = {
      coin_ids: coinIdsString,
      coin_name: coinName ? coinName : null,
    };

    Object.keys(params).map((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    return instance
      .get("/admin/coin-settings", { params: params })
      .then((data) => {
        setCoins(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // get getSettingCoin.
  const getSettingCoin = (coinName) => {
    let params = {};

    if (coinName) {
      params.coin_name = coinName;
    }

    return instance
      .get("/admin/settings/coins", { params: params })
      .then((data) => {
        getCoinSettings(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getCoins();
    getSettingCoin();
  }, []);

  if (!coins) {
    return <NoData />;
  }

  const onKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      <Paper>
        <Toolbar sx={{ paddingY: "10px" }}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={4} xl={3}>
              <FormControl sx={{ m: 1 }} fullWidth>
                <InputLabel id="coin-checkbox-label">Coin Filter</InputLabel>
                <Select
                  labelId="coin-checkbox-label"
                  id="coin-checkbox-label"
                  multiple
                  value={filterCoin}
                  onChange={handleFilterCoin}
                  input={<OutlinedInput label="Coin Filter" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <Input
                      placeholder={"Search coin"}
                      fullWidth
                      value={search}
                      onChange={onSearchChange}
                      onKeyDown={onKeyDown}
                    />
                  </Search>
                  {coinSettings.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.name}
                      onClick={() => handleCoinChange(item)}
                    >
                      <Checkbox checked={filterCoin.indexOf(item.name) > -1} />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Coin Name</TableCell>
                <TableCell align="center">Fee</TableCell>
                <TableCell align="center">Min Send Amount</TableCell>
                <TableCell align="center">
                  Suspend Transaction
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    display="flex"
                    justifyContent="space-around"
                    align="center"
                  >
                    <Typography color="text.primary">
                      Suspend Receive
                    </Typography>
                    <Typography color="text.primary">Suspend Send</Typography>
                  </Breadcrumbs>
                </TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins &&
                coins
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="center">{row.fee}%</TableCell>
                      <TableCell align="center">{row.minSendAmount}</TableCell>
                      <TableCell align="center">
                        <Breadcrumbs
                          aria-label="breadcrumb"
                          display="flex"
                          justifyContent="space-around"
                          align="center"
                        >
                          <Typography color="text.primary">
                            {row.suspendReceiveTransaction === true ? (
                              <Chip label=" Enable" color="success" />
                            ) : (
                              <Chip label="Disable" color="error" />
                            )}
                          </Typography>
                          <Typography color="text.primary">
                            {row.suspendSendTransaction === true ? (
                              <Chip label="Enable" color="success" />
                            ) : (
                              <Chip label="Disable" color="error" />
                            )}
                          </Typography>
                        </Breadcrumbs>
                      </TableCell>
                      <TableCell padding="none" align="right">
                        <EditTransactionModal
                          coinId={row.id}
                          name={row.name}
                          coin={row.coin}
                          minSendAmount={row.minSendAmount}
                          decimals={row.decimals}
                          fee={row.fee}
                          price={row.price}
                          priceChange={row.priceChange}
                          priceChangePercent={row.priceChangePercent}
                          suspendSendTransaction={row.suspendSendTransaction}
                          suspendReceiveTransaction={
                            row.suspendReceiveTransaction
                          }
                          getCoins={getCoins}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          {coins && (
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={coins?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableWrapper>
      </Paper>
      {coins && (
        <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
          <CSVButton data={coins} />
        </Box>
      )}
    </Fragment>
  );
};

export default TransactionsSettings;
