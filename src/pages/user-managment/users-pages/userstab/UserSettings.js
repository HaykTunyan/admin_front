import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Typography as MuiTypography,
  IconButton,
  Grid as MuiGrid,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Eye, EyeOff } from "react-feather";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const UserSettings = () => {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Card>
        <CardContent p={5}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Typography>Admin Password</Typography>
              <Spacer mt={5} />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <EyeOff /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography>Sending Admin</Typography>
              <Spacer mt={5} />
              <FormControl fullWidth>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <Spacer mt={5} />
              <Button variant="contained">Send</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserSettings;
