import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Slider,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const SavingsSetting = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [values, setValues] = useState({
    amount: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={8}>
              <Box sx={{ display: "flex", flexDirection: "column", my: 5 }}>
                <FormControlLabel
                  label="Active Limit"
                  control={<Checkbox {...label} />}
                />

                <Slider
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  my={5}
                />

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Amount
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    value={values.amount}
                    onChange={handleChange("amount")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary">
            Confirmed
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SavingsSetting;
