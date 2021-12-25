import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography as MuiTypography,
  Divider as MuiDivider,
  InputBase,
  Card as MuiCard,
  CardContent,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import ReferralTable from "./referralTable";
import ReferralUsers from "./referralUsers";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
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
      </Grid>

      <Divider my={6} />

      <Grid item xs={12}>
        <ReferralUsers />
      </Grid>
      <Divider my={6} />
      {/* Referral Table */}
      {/* <Grid item xs={12}>
        <Card xs={12}>
          <CardContent>
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              spacing={6}
            >
              <Grid item alignItems="center">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input placeholder={t("Search")} />
                </Search>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}

      <Grid item xs={12}>
        <ReferralTable />
      </Grid>
    </>
  );
};

export default Referral;
