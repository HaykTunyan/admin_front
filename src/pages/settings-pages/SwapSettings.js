import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useTranslation } from "react-i18next";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import {
  Box,
  Paper as MuiPaper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar as MuiToolbar,
  Typography,
  Grid,
  TablePagination,
  Breadcrumbs,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  InputBase,
} from "@material-ui/core";
import AddSwapModal from "../../modal/AddSwapModal";
import CSVButton from "../../components/CSVButton";
import EditSwapModal from "../../modal/EditSwapModal";
import { instance } from "../../services/api";
import DeleteSwapModal from "./DeleteSwapModal";
import NoData from "../../components/NoData";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);
const Table = styled(MuiTable)(spacing);

// Custom Style.
const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
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
    width: 160px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: block;
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

const SwapSettings = () => {
  // hooks.
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [swap, setSwap] = useState([]);
  const [filterCoin, setFilterCoin] = useState([]);
  const [coinFromIds, setCoinFromIds] = useState([]);
  const [coinToIds, setCoinToIds] = useState([]);
  const [coinSettings, getCoinSettings] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilterCoin = (event) => {
    const {
      target: { value },
    } = event;

    setFilterCoin(typeof value === "string" ? value.split(",") : value);
  };

  const handlePairChange = (item) => {
    let from = [...coinFromIds];

    from.indexOf(item.fromCoinId) === -1
      ? from.push(item.fromCoinId)
      : from.splice(from.indexOf(item.fromCoinId), 1);

    setCoinFromIds(from);

    let to = [...coinToIds];

    to.indexOf(item.toCoinId) === -1
      ? to.push(item.toCoinId)
      : to.splice(to.indexOf(item.toCoinId), 1);

    setCoinToIds(to);

    getSwap(from, to);
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
      try {
        getSwap(coinFromIds, coinToIds, event.target.value);
      } catch (e) {
        console.log("ERROR in search", e);
      }
      // if (event.target.value.length > 2 || event.target.value.length === 0) {
      // try {
      //   getSwap(coinFromIds, coinToIds, event.target.value);
      // } catch (e) {
      //   console.log("ERROR in search", e);
      // }
      // }
    }, 0);
  };

  // get Swap.
  const getSwap = (coinFromIds, coinToIds, coinName) => {
    let coinFromIdsString = coinFromIds ? coinFromIds.toString() : null;
    let coinToIdsString = coinToIds ? coinToIds.toString() : null;

    let params = {
      coin_from_ids: coinFromIdsString,
      coin_to_ids: coinToIdsString,
      coin_name: coinName ? coinName : null,
    };

    Object.keys(params).map((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    return instance
      .get("/admin/swap-settings", { params: params })
      .then((data) => {
        console.log("SWAP ==>", data);
        setSwap(data.data);
        return data;
      })
      .catch((error) => {
        console.log("EEERRRORR ==>", error);
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  // get getSettingCoin.
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

  useEffect(() => {
    getSwap();
    getSettingCoin();
  }, []);

  if (!swap) {
    return <NoData />;
  }

  const onKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      <Paper>
        <Toolbar pt={5}>
          <Grid alignItems="center" container spacing={6}>
            <Grid item xs={12} md={6} lg={3}>
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
                  {swap.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      value={`${item.fromCoinName}/${item.toCoinName}`}
                      onClick={() => handlePairChange(item)}
                    >
                      <Checkbox
                        checked={
                          filterCoin.indexOf(
                            `${item.fromCoinName}/${item.toCoinName}`
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={`${item.fromCoinName}/${item.toCoinName}`}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                display: "flex",
                marginLeft: { lg: "auto" },
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <AddSwapModal getSwap={getSwap} />
            </Grid>
          </Grid>
        </Toolbar>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="text.primary" sx={{ marginLeft: "5px" }}>
                    Pair
                  </Typography>
                </TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {swap
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                          color="text.primary"
                          sx={{ marginRight: "5px" }}
                        >
                          {row.fromCoinName}
                        </Typography>

                        <Typography
                          color="text.primary"
                          sx={{ marginLeft: "5px" }}
                        >
                          {row.toCoinName}
                        </Typography>
                      </Breadcrumbs>
                    </TableCell>
                    <TableCell align="right">
                      <Box flex justifyContent="space-between">
                        <EditSwapModal
                          idSwap={row.id}
                          decimalsSwap={row.decimals}
                          feeSwap={row.fee}
                          minFrom={row.min_from}
                          minTo={row.min_to}
                          limitFrom={row.limit_from}
                          limitTo={row.limit_to}
                          limitSwap={row.limit}
                          limitEnabledSwap={row.limitEnabled}
                          fromCoin={row.fromCoin}
                          toCoin={row.toCoin}
                          getSwap={getSwap}
                        />
                        <DeleteSwapModal swapId={row.id} getSwap={getSwap} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          {swap && (
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={swap?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableWrapper>
      </Paper>
      {swap && (
        <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
          <CSVButton data={swap} />
        </Box>
      )}
    </Fragment>
  );
};

export default SwapSettings;
