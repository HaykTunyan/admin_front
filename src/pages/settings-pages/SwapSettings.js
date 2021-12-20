import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
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
  InputBase,
  TablePagination,
  Breadcrumbs,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import AddSwapModal from "../../modal/AddSwapModal";
import CSVButton from "../../components/CSVButton";
import EditSwapModal from "../../modal/EditSwapModal";
import { instance } from "../../services/api";
import DeleteSwapModal from "./DeleteSwapModal";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);
const Table = styled(MuiTable)(spacing);

// Custom Style.
const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
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

const SwapSettings = () => {
  // hooks.
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [swap, setSwap] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // get Swap.
  const getSwap = () => {
    return instance
      .get("/admin/swap-settings")
      .then((data) => {
        setSwap(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getSwap();
  }, []);

  console.log("swap", swap);

  return (
    <Fragment>
      <Paper>
        <Toolbar pt={5}>
          <Grid flex justifyContent="space-between" container spacing={6}>
            <Grid item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder={t("Search")} />
              </Search>
            </Grid>
            <Grid item>
              <AddSwapModal />
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
                          minSwap={row.min}
                          limitSwap={row.limit}
                          limitEnabledSwap={row.limitEnabled}
                          fromCoin={row.fromCoin}
                          toCoin={row.toCoin}
                        />
                        <DeleteSwapModal swapId={row.id} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={swap.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableWrapper>
      </Paper>

      <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={swap} />
      </Box>
    </Fragment>
  );
};

export default SwapSettings;
