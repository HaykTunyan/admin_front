import React, { Fragment } from "react";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const SwapSettings = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={8}>
              <Box sx={{ display: "flex", flexDirection: "column", my: 5 }}>
                <FormControlLabel
                  label="All Swap List"
                  control={<Checkbox {...label} />}
                />

                <Slider
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </Box>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary">
            Download
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SwapSettings;
