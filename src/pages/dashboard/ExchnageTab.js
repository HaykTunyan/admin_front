import React, { Fragment, useState } from "react";
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
  InputBase,
  Toolbar,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { darken } from "polished";
import MetaLineChart from "../../components/charts/MetaLineChart";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Spacer = styled.div(spacing);

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

const ExchnageTab = ({ rowExchange }) => {
  // hooks
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Toolbar>
          <Grid item md={3} px={5}>
            <Search sx={{ paddingX: 5 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder={t("Search")} />
            </Search>
          </Grid>
          <Grid item md={1}>
            <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="select-from-label">Exchanged Coin</InputLabel>
              <Select
                labelId="select-from-label"
                id="select-from-label"
                value={from}
                onChange={handleChangeFrom}
                label="From"
              >
                <MenuItem value="all">
                  <em>From All</em>
                </MenuItem>
                <MenuItem value={10}>Coin - 10 000 </MenuItem>
                <MenuItem value={20}> Coin - 50 000 </MenuItem>
                <MenuItem value={30}> Coin - 1 000 000 </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Spacer mx={5} />
          <Grid item md={1}>
            <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="select-to-label">Received Coin</InputLabel>
              <Select
                labelId="select-to-label"
                id="select-to-label"
                value={to}
                onChange={handleChangeTo}
                label="To"
              >
                <MenuItem value="all">
                  <em>To All</em>
                </MenuItem>
                <MenuItem value={10}>Coin - 10 000 </MenuItem>
                <MenuItem value={20}> Coin - 50 000 </MenuItem>
                <MenuItem value={30}> Coin - 1 000 000 </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Toolbar>
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell>Exchange Coin</TableCell>
              <TableCell align="center">Exchange</TableCell>
              <TableCell align="center">
                Amount <span> &#36;</span>
              </TableCell>
              <TableCell align="right">Popularity of Exchange</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowExchange
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.receive_coin}
                    <span> &#x20BF;</span>
                  </TableCell>
                  <TableCell align="center">
                    {row.receive_coin} <span> &#36;</span>
                  </TableCell>
                  <TableCell align="right">
                    {row.receive_bit} <span>%</span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rowExchange.length}
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
        <CSVButton data={rowExchange} />
      </Box>
    </Fragment>
  );
};

export default ExchnageTab;
