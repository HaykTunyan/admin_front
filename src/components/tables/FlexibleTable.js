import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { instance } from "../../services/api";
import {
  Card as MuiCard,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputBase,
  TablePagination,
  Toolbar,
  Grid,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@material-ui/core";
import AddFlexibleSavingModal from "../../modal/AddFlexibleSavingModal";
import EditFlexibleSavingModal from "../../modal/EditFlexibleSavingModal";
import NoData from "../NoData";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

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

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

let searchTimeout = 0;

const FlexibleTable = ({ title, rowList, rowBody, getFlexible }) => {
  // Hooks.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterCoin, setFilterCoin] = useState([]);
  const [coinIds, setCoinIds] = useState([]);
  const [coinSettings, getCoinSettings] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilterCoin = (event) => {
    const {
      target: { value },
    } = event;
    setFilterCoin(typeof value === "string" ? value.push(" ") : value);
  };

  const handleCoinChange = (item) => {
    let from = [...coinIds];

    from.indexOf(item.id) === -1
      ? from.push(item.id)
      : from.splice(from.indexOf(item.id), 1);

    setCoinIds(from);
    getFlexible(from);
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
        getSettingCoin(event.target.value);
      } catch (e) {}
      // if (event.target.value.length > 2 || event.target.value.length === 0) {
      //   try {
      //     getSettingCoin(event.target.value);
      //   } catch (e) {}
      // }
    }, 0);
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

  useEffect(() => {
    getSettingCoin();
  }, []);

  if (!rowBody) {
    return <NoData />;
  }

  const onKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      <Card mb={6}>
        <Paper>
          <Toolbar sx={{ paddingY: "10px" }}>
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
                    renderValue={(selected) => selected.push(" ")}
                    // MenuProps={MenuProps}
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
                        <Checkbox
                          checked={filterCoin.indexOf(item.name) > -1}
                        />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                item
                xs={12}
                md={2}
                sx={{
                  display: "flex",
                  marginLeft: { lg: "auto" },
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <AddFlexibleSavingModal getFlexible={getFlexible} />
              </Grid>
            </Grid>
          </Toolbar>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  {rowList?.map((item) => (
                    <TableCell key={item.id} align={item.align}>
                      {item.head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowBody
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.coinName}</TableCell>
                      <TableCell>{item.fromPercent}%</TableCell>
                      <TableCell>{item.toPercent}%</TableCell>
                      <TableCell>{item.max}</TableCell>
                      <TableCell>{item.min}</TableCell>
                      <TableCell align="right">
                        <EditFlexibleSavingModal
                          savingId={item._id}
                          min={item.min}
                          max={item.max}
                          fromPercent={item.fromPercent}
                          toPercent={item.toPercent}
                          getFlexible={getFlexible}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={rowBody?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableWrapper>
        </Paper>
      </Card>
    </Fragment>
  );
};

export default FlexibleTable;
