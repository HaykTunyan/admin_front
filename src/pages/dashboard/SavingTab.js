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

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  const handleChangePanel = (event, newPanel) => {
    setPanel(newPanel);
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
                        <InputLabel id="select-from-label">
                          From Coin
                        </InputLabel>
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
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel id="select-to-label">To Coin</InputLabel>
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
                        <TableCell>&#35;</TableCell>
                        <TableCell align="center">Coint Name</TableCell>
                        <TableCell align="center">Bonus</TableCell>
                        <TableCell align="center">Couin</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Amounts Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowLocked.map((row) => (
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
                          <TableCell align="center">
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
                          <TableCell align="right">{row.amount_day}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                        <InputLabel id="select-from-label">
                          From Coin
                        </InputLabel>
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
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel id="select-to-label">To Coin</InputLabel>
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
                        <TableCell>&#35;</TableCell>
                        <TableCell align="center">Coint Name</TableCell>
                        <TableCell align="center">Min Amount</TableCell>
                        <TableCell align="center">Coin</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowFlexible.map((row) => (
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
                          <TableCell align="center">
                            {row.coin_name}
                            <span> &#x20BF;</span>
                          </TableCell>
                          <TableCell align="center">{row.min_amount}</TableCell>
                          <TableCell align="center">
                            {row.coin}
                            <span> &#x20BF;</span>
                          </TableCell>
                          <TableCell align="right">
                            {row.status === "active" ? (
                              <Chip label="Active" color="success" />
                            ) : (
                              <Chip label="Completed" color="primary" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
