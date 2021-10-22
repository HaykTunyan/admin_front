import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
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
  Typography,
  Divider,
  InputBase,
  InputLabel,
  TableSortLabel,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { getUserList_req } from "../../../redux/actions/users";

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
    phone: "01111000",
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
    phone: "01111000",
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
    phone: "01111000",
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
    phone: "01111000",
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
    phone: "01111000",
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
  const [age, setAge] = useState("Verify");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const ViewUser = () => {
    navigate("/view-user");
  };

  useEffect(() => {
    dispatch(getUserList_req());
  }, []);

  return (
    <Fragment>
      <Helmet title="User List" />

      {/*  */}
      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item alignItems="center">
          <Typography variant="h3" gutterBottom mb={0}>
            Users
          </Typography>
        </Grid>
        <Grid display="flex" pb={5} alignItems="center">
          <Box
            component="div"
            sx={{
              display: "inline",
              p: 1,
              m: 1,
            }}
          >
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
                <MenuItem value="Awaiting Documents">
                  Awaiting Documents
                </MenuItem>
                <MenuItem value="Documents Under Review">
                  Documents Under Review
                </MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Sent a Second Request">
                  Sent a Second Request
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            component="div"
            sx={{
              display: "inline",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder={t("searchList")} />
            </Search>
          </Box>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper} className={classes.rootTable}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Flexible Saving</TableCell>
                    <TableCell>Locked Saving</TableCell>
                    <TableCell>Total Profile</TableCell>
                    <TableCell>Status KYC</TableCell>
                    <TableCell>Date Register</TableCell>
                    <TableCell>Geo Position</TableCell>
                    <TableCell>View Position</TableCell>
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
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                      <TableCell>{row.flexible_saving}</TableCell>
                      <TableCell>{row.locked_saving}</TableCell>
                      <TableCell>{row.total_profile}</TableCell>
                      <TableCell>{row.status_kyc}</TableCell>
                      <TableCell>{row.date_register}</TableCell>
                      <TableCell>{row.geo_positon}</TableCell>
                      <TableCell padding="none" align="right">
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UsersList;
