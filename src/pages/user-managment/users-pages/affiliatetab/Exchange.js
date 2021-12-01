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
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { darken } from "polished";
import MetaLineChart from "../../../../components/charts/MetaLineChart";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

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

const Exchange = ({ rowExchange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Fragment>
        <TableContainer component={Paper}>
          <Toolbar>
            <Grid item md={3}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder={t("Search")} />
              </Search>
            </Grid>
          </Toolbar>
          <Table aria-label="simple table" mt={6}>
            <TableHead>
              <TableRow>
                <TableCell>&#35;</TableCell>
                <TableCell align="center">Users Name</TableCell>
                <TableCell align="center">Exchange Bit</TableCell>
                <TableCell align="center">EXchange Coin</TableCell>
                <TableCell align="center">EXchange Chart</TableCell>
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
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {row.receive_bit}
                      <span> &#x20BF;</span>
                    </TableCell>
                    <TableCell align="center">
                      {row.receive_coin} <span>&#8364;</span>{" "}
                    </TableCell>
                    <TableCell align="center">
                      <MetaLineChart />
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
        <Box
          mt={8}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
        </Box>
      </Fragment>
    </>
  );
};

export default Exchange;
