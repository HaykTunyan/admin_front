import React, { Fragment } from "react";
import { Box, Card, Typography } from "@material-ui/core";

const NoData = () => {
  return (
    <Fragment>
      <Card
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginY: "50px", padding: "20px", alignItems: "center" }}
      >
        <Typography component="h2" fontWeight="bold" textAlign="center">
          No available data
        </Typography>
      </Card>
    </Fragment>
  );
};

export default NoData;
