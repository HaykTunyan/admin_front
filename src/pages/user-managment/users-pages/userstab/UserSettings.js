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
          {/* Password */}
          <Grid container>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> Password </Typography>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <FormControl variant="outlined" sx={{ width: "250px" }}>
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
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Button variant="contained">Edit</Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* Email */}
          <Grid container>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> Email </Typography>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <FormControl sx={{ width: "250px" }}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Button variant="contained">Edit</Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* Phone Number */}
          <Grid container>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> Phone Number </Typography>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <FormControl sx={{ width: "250px" }}>
                <TextField
                  id="phone"
                  label="Phone"
                  type="tel"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Button variant="contained">Edit</Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* User Name */}
          <Grid container>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> User Name </Typography>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <FormControl sx={{ width: "250px" }}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "5px" }}>
              <Button variant="contained">Edit</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserSettings;
