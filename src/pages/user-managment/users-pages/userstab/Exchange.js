import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useLocation } from "react-router-dom";
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
  Button,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { darken } from "polished";
import {
  deleteAffiliateExchanges_req,
  editAffiliateExchanges_req,
  getUserExchanges_req,
} from "../../../../api/userExchangesAPI";
import NoData from "../../../../components/NoData";
import AddAffiliateSwap from "../../../../modal/AddAffiliateSwap";
import EditAffiliateSwap from "../../../../modal/EditAffiliateSwap";

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

const Spacer = styled.div(spacing);

let searchTimeout = 0;

const Exchange = ({ rowExchange }) => {
  // hooks.
  const { t } = useTranslation();
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const { id, affiliate } = location.state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [exchange, setExchange] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    getUserExchanges(newPage + 1);
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
      if (event.target.value.length > 2) {
        try {
          getUserExchanges(1, rowsPerPage, event.target.value);
        } catch (e) {
          console.log("ERROR in search", e);
        }
      }
    }, 100);
  };

  async function deleteExchange(id) {
    let data = {
      userId: userId,
      transactionId: id,
    };

    console.log("DELETE EXCHANGE DATA ==>", data);

    try {
      const response = await deleteAffiliateExchanges_req(userId, id);
      if (response) {
        console.log("DELETE AFFILIATE EXCHANGES RESPONSE ==>", response);
        getUserExchanges();
      }
    } catch (e) {
      console.log("DELETE AFFILIATE EXCHANGES ERROR==>", e.response);
    }
  }

  async function getUserExchanges(page, rowsPerPage, coinName) {
    try {
      const response = await getUserExchanges_req(
        userId,
        page,
        rowsPerPage,
        coinName
      );
      if (response) {
        console.log("GET USER EXCHANGES RESPONSE ==>", response);
        setExchange(response);
      }
    } catch (e) {
      console.log("GET USER EXCHANGES ERROR==>", e);
    }
  }

  useEffect(() => {
    getUserExchanges();
  }, []);

  if (!exchange.exchanges) {
    return <NoData />;
  }

  return (
    <>
      <Fragment>
        <TableContainer component={Paper}>
          <Toolbar>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item md={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input
                    value={search}
                    placeholder={"Search by coin name"}
                    onChange={onSearchChange}
                  />
                </Search>
              </Grid>
              {affiliate && (
                <Grid item md={3} sx={{ mx: "40px" }}>
                  <AddAffiliateSwap
                    userId={userId}
                    getUserExchanges={getUserExchanges}
                  />
                </Grid>
              )}
            </Grid>
          </Toolbar>
          <Table aria-label="simple table" mt={6}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Send Coin</TableCell>
                <TableCell align="center">Receive Coin</TableCell>
                <TableCell align="center">Amount</TableCell>
                {affiliate && <TableCell align="center">Action</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {(exchange.exchanges || []).map((row) => (
                <TableRow
                  key={row.exchange_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{row.exchange_id}</TableCell>
                  <TableCell align="center">{row.coin_from}</TableCell>
                  <TableCell align="center">{row.coin_to}</TableCell>
                  <TableCell align="center">
                    {`${row.amount_sent}${row.coin_from} --> ${row.amount_received}${row.coin_to}`}
                    <Spacer my={3} />
                    {`${row.amount_usd_sent}$ --> ${row.amount_usd_received}$`}
                  </TableCell>
                  {affiliate && (
                    <TableCell align="center">
                      <EditAffiliateSwap
                        userId={userId}
                        exchange={row}
                        getUserExchanges={getUserExchanges}
                      />
                      <Button
                        variant="contained"
                        sx={{ width: "50px", mx: "15px" }}
                        onClick={() => deleteExchange(row.exchange_id)}
                      >
                        {"Delete"}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={exchange?.allCount}
            rowsPerPage={exchange?.limit}
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
