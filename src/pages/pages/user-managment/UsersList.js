import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { getUserList_req } from "../../../redux/actions/users";
import { spacing } from "@material-ui/system";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Select,
  FormControl,
  MenuItem,
  IconButton,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  InputBase,
  InputLabel,
  Card as MuiCard,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const rows = [
  {
    key: 1,
    number: "001",
    email: "email@email.com",
    phone: "011113494830",
    balance: " 100 ",
    flexible_saving: " 100 ",
    locked_saving: " 100 ",
    total_profile: " 100 ",
    status_kyc: " 100 ",
    date_register: "01.10.2021",
    geo_positon: " Yerevan ",
  },
  {
    key: 2,
    number: "002",
    email: "email@email.com",
    phone: "89439394",
    balance: " 100 ",
    flexible_saving: " 100 ",
    locked_saving: " 100 ",
    total_profile: " 100 ",
    status_kyc: " 100 ",
    date_register: "01.10.2021",
    geo_positon: " Yerevan ",
  },
  {
    key: 3,
    number: "003",
    email: "email@email.com",
    phone: "89348938",
    balance: " 100 ",
    flexible_saving: " 100 ",
    locked_saving: " 100 ",
    total_profile: " 100 ",
    status_kyc: " 100 ",
    date_register: "01.10.2021",
    geo_positon: " Yerevan ",
  },
  {
    key: 4,
    number: "004",
    email: "email@email.com",
    phone: "987934334",
    balance: " 100 ",
    flexible_saving: " 100 ",
    locked_saving: " 100 ",
    total_profile: " 100 ",
    status_kyc: " 100 ",
    date_register: "01.10.2021",
    geo_positon: " Yerevan ",
  },
  {
    key: 5,
    number: "005",
    email: "email@email.com",
    phone: "879350935",
    balance: " 100 ",
    flexible_saving: " 100 ",
    locked_saving: " 100 ",
    total_profile: " 100 ",
    status_kyc: " 100 ",
    date_register: "01.10.2021",
    geo_positon: " Yerevan ",
  },
];

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

const UsersList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [age, setAge] = useState("");

  const [sortModel, setSortModel] = useState([
    {
      field: "commodity",
      sort: "asc",
    },
  ]);

  const [position, setPosition] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangePosition = (event) => {
    setPosition(event.target.value);
  };

  const ViewUser = () => {
    navigate("/view-user");
  };

  useEffect(() => {
    dispatch(getUserList_req());
  }, []);

  return (
    <Fragment>
      <Helmet title="Users" />

      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Users
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container alignItems="center">
        <Grid item xs={3}>
          <FormControl
            sx={{
              minWidth: 218,
            }}
            pb={4}
          >
            <InputLabel id="select-position">Geo Position</InputLabel>
            <Select
              labelId="select-position"
              id="select-position"
              value={position}
              onChange={handleChangePosition}
              displayEmpty
              label="Geo Position"
              inputProps={{ "aria-label": "Without label" }}
              pb={6}
            >
              <MenuItem value="Russian">Russian</MenuItem>
              <MenuItem value="England">England</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="France">France</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl
            sx={{
              minWidth: 218,
            }}
            pb={4}
          >
            <InputLabel id="select-kyc">KYC Type</InputLabel>
            <Select
              labelId="select-kyc"
              id="select-kyc"
              value={age}
              onChange={handleChange}
              displayEmpty
              label="KYC Type"
              inputProps={{ "aria-label": "Without label" }}
              pb={6}
            >
              <MenuItem value="Verified">Verified</MenuItem>
              <MenuItem value="Unverified">Unverified</MenuItem>
              <MenuItem value="Awaiting Documents">Awaiting Documents</MenuItem>
              <MenuItem value="Documents Under Review">
                Documents Under Review
              </MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Sent a Second Request">
                Sent a Second Request
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input placeholder={t("searchList")} />
          </Search>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper} className={classes.rootTable}>
              <Table
                aria-label="simple table"
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Balance</TableCell>
                    <TableCell align="center">Flexible Saving</TableCell>
                    <TableCell align="center">Locked Saving</TableCell>
                    <TableCell align="center">Total Profile</TableCell>
                    <TableCell align="center">Status KYC</TableCell>
                    <TableCell align="center">Date Register</TableCell>
                    <TableCell align="center">Geo Position</TableCell>
                    <TableCell align="center">View Position</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.number}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.balance}</TableCell>
                      <TableCell align="center">
                        {row.flexible_saving}
                      </TableCell>
                      <TableCell v>{row.locked_saving}</TableCell>
                      <TableCell align="center">{row.total_profile}</TableCell>
                      <TableCell align="center">{row.status_kyc}</TableCell>
                      <TableCell align="center">{row.date_register}</TableCell>
                      <TableCell align="center">{row.geo_positon}</TableCell>
                      <TableCell padding="none" align="center">
                        <Box mr={2}>
                          <IconButton
                            aria-label="details"
                            size="large"
                            onClick={ViewUser}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box
            mt={8}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography variant="subtitle1" color="inherit" component="div">
              Export Data
            </Typography>
            <CSVButton data={rows} />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UsersList;
