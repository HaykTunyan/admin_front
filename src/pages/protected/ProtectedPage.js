import React, { Fragment } from "react";
import styled from "styled-components/macro";
import {
  Alert as MuiAlert,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Typography,
  Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { NavLink } from "react-router-dom";

const Alert = styled(MuiAlert)(spacing);

const Card = styled(MuiCard)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export const RowList = [
  {
    key: 0,
    name: "Dashboard",
    url: "/dashboard-list",
  },
  {
    key: 1,
    name: "Device Management",
    url: "/device-management",
  },
  {
    key: 2,
    name: "User List",
    url: "/user-list",
  },
  {
    key: 3,
    name: "Affiliate Users",
    url: "/affiliate-users",
  },
  {
    key: 4,
    name: "View User",
    url: "/view-user",
  },
  {
    key: 5,
    name: "News",
    url: "/news",
  },
  {
    key: 6,
    name: "Referral",
    url: "/referral",
  },
  {
    key: 7,
    name: "Transactions",
    url: "/transactions",
  },
];

const ProtectedPage = () => {
  return (
    <Fragment>
      <Alert mb={4} severity="info">
        This page is only visible by authenticated users.
      </Alert>

      <Grid contained>
        <Box
          xs={12}
          spacing={6}
          sx={{
            display: "grid",
            gap: 5,
            gridTemplateColumns: "repeat(3, 3fr)",
          }}
        >
          {RowList.map((item) => (
            <Card key={item.key} m={5}>
              <CardContent>
                <Box flex>
                  <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                    <Typography variant="h5">{item.name}</Typography>
                    <Link variant="h5" component={NavLink} to={item.url}>
                      Link
                    </Link>
                  </Breadcrumbs>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Grid>
    </Fragment>
  );
};

export default ProtectedPage;
