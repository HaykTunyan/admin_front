import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Typography as MuiTypography,
  Card as MuiCard,
  CardContent,
  Box,
  Tab,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  InputBase,
  Toolbar,
  Grid,
  Chip as MuiChip,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TablePagination,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CSVButton from "../../components/CSVButton";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { darken } from "polished";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
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

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SavingTab = ({ rowLocked, rowFlexible }) => {
  // hooks.
  const { t } = useTranslation();
  const [panel, setPanel] = useState("1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // Locked Pages.
  const [pageLocked, setLockedPage] = useState(0);
  const [rowsLockedPage, setRowsLockedPage] = useState(5);
  // Flexible.
  const [pageFlexible, setFlexiblePage] = useState(0);
  const [rowsFlexiblePage, setRowsFlexiblePage] = useState(5);

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  const handleChangePanel = (event, newPanel) => {
    setPanel(newPanel);
  };

  // Locked Pagination.
  const handleLockedPage = (event, newLockedPage) => {
    setLockedPage(newLockedPage);
  };

  const handleRowsLockedPage = (event) => {
    setRowsLockedPage(+event.target.value);
    setLockedPage(0);
  };

  // Flexible Pagination.
  const handleFlexiblePage = (event, newFlexiblePage) => {
    setFlexiblePage(newFlexiblePage);
  };

  const handleRowsFlexiblePage = (event) => {
    setRowsFlexiblePage(+event.target.value);
    setFlexiblePage(0);
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={panel}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangePanel}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Locked" value="1" />
                  <Tab label="Flexible" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <TableContainer component={Paper}>
                  <Toolbar alignItems="center">
                    <Grid item md={3}>
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <Input placeholder={t("Search")} />
                      </Search>
                    </Grid>
                    <Spacer mx={5} />
                    <Grid item md={1}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel id="select-from-label">Status</InputLabel>
                        <Select
                          labelId="select-from-label"
                          id="select-from-label"
                          value={from}
                          onChange={handleChangeFrom}
                          label="From"
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value={10}>Active </MenuItem>
                          <MenuItem value={20}>In Active</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Toolbar>
                  <Table aria-label="simple table" mt={6}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="">
                          <Typography variant="h6" gutterBottom>
                            Coin Name
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Amount
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Coin
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" gutterBottom>
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" gutterBottom>
                            Popularity
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowLocked
                        .slice(
                          pageLocked * rowsLockedPage,
                          pageLocked * rowsLockedPage + rowsLockedPage
                        )
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
                              {row.coin_name}
                              <span> &#x20BF;</span>
                            </TableCell>
                            <TableCell align="center">
                              {row.coin}
                              <span> &#x20BF;</span>
                            </TableCell>
                            <TableCell align="center">
                              {row.bonus}
                              <span>&#8364;</span>
                            </TableCell>
                            <TableCell align="right">
                              {row.status === "active" ? (
                                <Chip label="Active" color="success" />
                              ) : (
                                <Chip label="Completed" color="primary" />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {row.coin}
                              <span>%</span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rowLocked.length}
                    rowsPerPage={rowsLockedPage}
                    page={pageLocked}
                    onPageChange={handleLockedPage}
                    onRowsPerPageChange={handleRowsLockedPage}
                  />
                </TableContainer>
                <Box
                  mt={8}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    component="div"
                  >
                    Export Data
                  </Typography>
                  <CSVButton data={rowLocked} />
                </Box>
              </TabPanel>
              <TabPanel value="2">
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
                    <Spacer mx={5} />
                    <Grid item md={1}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel id="select-from-label">Status</InputLabel>
                        <Select
                          labelId="select-from-label"
                          id="select-from-label"
                          value={from}
                          onChange={handleChangeFrom}
                          label="From"
                        >
                          <MenuItem value="all">
                            <em> All</em>
                          </MenuItem>
                          <MenuItem value={10}>Active</MenuItem>
                          <MenuItem value={20}>In Active</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Toolbar>
                  <Table aria-label="simple table" mt={6}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="">
                          <Typography variant="h6" gutterBottom>
                            Coin Name
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Amount
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Coin
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" gutterBottom>
                            Popularity
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowFlexible
                        .slice(
                          pageFlexible * rowsFlexiblePage,
                          pageFlexible * rowsFlexiblePage + rowsFlexiblePage
                        )
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
                              {row.coin_name}
                              <span> &#x20BF;</span>
                            </TableCell>
                            <TableCell align="center">
                              {row.min_amount}
                            </TableCell>
                            <TableCell align="center">
                              {row.coin}
                              <span> &#x20BF;</span>
                            </TableCell>
                            <TableCell align="center">
                              {row.status === "active" ? (
                                <Chip label="Active" color="success" />
                              ) : (
                                <Chip label="Completed" color="primary" />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {row.coin}
                              <span> %</span>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rowFlexible.length}
                    rowsPerPage={rowsFlexiblePage}
                    page={pageFlexible}
                    onPageChange={handleFlexiblePage}
                    onRowsPerPageChange={handleRowsFlexiblePage}
                  />
                </TableContainer>
                <Box
                  mt={8}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    component="div"
                  >
                    Export Data
                  </Typography>
                  <CSVButton data={rowFlexible} />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SavingTab;
