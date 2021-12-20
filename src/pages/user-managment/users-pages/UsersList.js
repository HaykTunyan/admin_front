import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import { instance } from "../../../services/api";
import {
  Box,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  InputBase,
} from "@material-ui/core";
import UsersListTable from "./UserListTable";
import DatePickerFilter from "../../../components/date-picker/DatePickerFilter";
import Loader from "../../../components/Loader";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  // width: 100%;

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
  const { t } = useTranslation();
  const [rowUserList, setRowUserList] = useState([]);

  const getUserList_req = () => {
    return instance
      .get("/admin/user/all", { mode: "no-cors" })
      .then((data) => {
        setRowUserList(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getUserList_req();
  }, []);

  if (!rowUserList?.users) {
    return <Loader />;
  }
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

      <Grid container display="flex" alignItems="center">
        <Grid item md={3}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input placeholder={t("searchList")} />
          </Search>
        </Grid>

        <Grid item md={3}>
          <DatePickerFilter />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        {console.log("rorrrr", rowUserList)}
        <Grid item xs={12}>
          {rowUserList ? (
            <UsersListTable rowUserList={rowUserList} />
          ) : (
            <Loader />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UsersList;
