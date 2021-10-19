import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  Typography as MuiTypography,
  Divider as MuiDivider,
  InputBase,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import ReferralTable from "./referralTable";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

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

const Referral = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet children="Referral" />
      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item alignItems="center">
          <Typography variant="h3" gutterBottom mb={0}>
            Referral
          </Typography>
        </Grid>
        <Grid display="flex" pb={5} alignItems="center">
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
      <ReferralTable />
    </>
  );
};

export default Referral;
