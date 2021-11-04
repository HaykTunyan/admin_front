import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
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
  TablePagination,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import UsersListTable from "./UserListTable";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

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
  // hooks
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [age, setAge] = useState("");

  const rowUsers = useSelector((state) => state.allUser);

  const rowUserList = rowUsers.listData;

  const [sortModel, setSortModel] = useState([
    {
      field: "commodity",
      sort: "asc",
    },
  ]);

  const [position, setPosition] = useState("");

  // const accessToken = window.localStorage.getItem("accessToken");

  const [page, setPage] = useState("2");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangePosition = (event) => {
    setPosition(event.target.value);
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
          <UsersListTable rowUserList={rowUserList} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UsersList;
