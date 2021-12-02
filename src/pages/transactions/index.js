import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Divider,
  Grid,
  Typography,
  Box,
  Tab,
  InputBase,
  Card as MuiCard,
} from "@material-ui/core";

import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import SendTable from "./SendTable";
import SwapTable from "./SwapTable";
import SavingsTable from "./SavingsTable";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { darken } from "polished";
import { spacing } from "@material-ui/system";

// Spacing.
const Card = styled(MuiCard)(spacing);

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
    width: 100%;
  }
`;

const Transaction = () => {
  // hooks.
  const [value, setValue] = useState("1");
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Helmet title="Transaction" />

      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Transaction
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6} mt={6}>
        <Grid item sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value} sx={{ width: "100%" }}>
              <Box
                sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ width: "100%" }}
                >
                  <Tab
                    label="Send/Receive"
                    value="1"
                    sx={{ width: "33.33%" }}
                  />
                  <Tab label="Swap" value="2" sx={{ width: "33.33%" }} />
                  <Tab label="Savings" value="3" sx={{ width: "33.33%" }} />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Card p={4}>
                  <Grid item xs={3}>
                    <Box component="div">
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <Input placeholder={t("searchList")} />
                      </Search>
                    </Box>
                  </Grid>
                </Card>
                <SendTable />
              </TabPanel>
              <TabPanel value="2">
                <Card p={4}>
                  <Grid item xs={3}>
                    <Box component="div">
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <Input placeholder={t("searchList")} />
                      </Search>
                    </Box>
                  </Grid>
                </Card>
                <SwapTable />
              </TabPanel>
              <TabPanel value="3">
                <Card p={4}>
                  <Grid item xs={3}>
                    <Box component="div">
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <Input placeholder={t("searchList")} />
                      </Search>
                    </Box>
                  </Grid>
                </Card>
                <SavingsTable />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Transaction;
