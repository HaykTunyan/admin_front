import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import {
  Card as MuiCard,
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
  IconButton as MuiIconButton,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import EditIcon from "@material-ui/icons/EditOutlined";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import AddSwapModal from "../../modal/AddSwapModal";
import CSVButton from "../../components/CSVButton";

const Paper = styled(MuiPaper)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);
const Table = styled(MuiTable)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
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

// Moke Data
const rows = [
  {
    id: 0,
    pair: "BTCNGN",
  },
  {
    id: 1,
    pair: "BTCNGN",
  },
  {
    id: 2,
    pair: "BTCNGN",
  },
  {
    id: 3,
    pair: "BTCNGN",
  },
  {
    id: 4,
    pair: "BTCNGN",
  },
  {
    id: 5,
    pair: "BTCNGN",
  },
];

const SwapSettings = () => {
  const { t } = useTranslation();

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
                <TableCell>Pair</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.pair}
                  </TableCell>
                  <TableCell align="right">
                    <Box flex justifyContent="space-between">
                      <IconButton aria-label="done">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="done">
                        <RevertIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>

      <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rows} />
      </Box>
    </Fragment>
  );
};

export default SwapSettings;
