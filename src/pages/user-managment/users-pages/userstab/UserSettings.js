import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { editUserData_req, getUserData_req } from "../../../../api/userAPI";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const UserSettings = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    phone: false,
    password: false,
    email: false,
    full_name: false,
    showPassword: false,
    reset: 0,
  });
  const [editedData, setEditedData] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
    is_affiliate: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
  });

  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;

  const handleReset = (event) => {
    setValues({ ...values, reset: event.target.value });
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

  async function getUserData() {
    //setLoading(true);
    try {
      const response = await getUserData_req(userId);
      if (response) {
        console.log("GET USER DATA RESPONSE ==>", response);
        let data = {
          email: response.userAccountInfo.email,
          full_name: response.userAccountInfo.full_name,
          phone: response.userAccountInfo.phone,
          password: response.userAccountInfo.password,
          is_affiliate: response.userAccountInfo.is_affiliate,
        };
        setEditedData(data);
        setLoading(false);
        //setUserData(response.userAccountInfo);
      }
    } catch (e) {
      console.log("GET USER DATA ==>", e.response);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function editData(e) {
    console.log("VALUE ==>", values[`${e.target.id}`]);
    setValues({ ...values, [`${e.target.id}`]: !values[`${e.target.id}`] });

    if (values[`${e.target.id}`]) {
      try {
        const response = await editUserData_req(
          userId,
          e.target.id,
          editedData[`${e.target.id}`],
          editedData.is_affiliate
        );
        if (response) {
          console.log("EDIT USER DATA RESPONSE ==>", response);
          setErrors({ ...errors, [`${e.target.id}`]: "" });
        }
      } catch (error) {
        console.log("EDIT USER DATA ERROR ==>", error.response.data);
        if (Array.isArray(error.response.data.message)) {
          setErrors({
            ...errors,
            [`${error.response.data.message[0].property}`]:
              error.response.data.message[0].messages,
          });
        } else {
          setErrors({
            ...errors,
            [`${e.target.id}`]: error.response.data.message,
          });
        }
      }
    }
  }

  if (loading) {
    return <></>;
  }

  return (
    <>
      <Card>
        <CardContent p={5}>
          {/* Password */}
          <Grid container sx={{ alignItems: "center" }}>
            <Grid xs={12} md={3} xl={2} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> Password </Typography>
            </Grid>
            <Grid xs={12} md={3} xl={3} sx={{ mx: "5px" }}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  disabled={values.password === false}
                  //value={editedData.password}
                  onChange={(e) =>
                    setEditedData({ ...editedData, password: e.target.value })
                  }
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
              {errors.password && (
                <div style={{ width: "400px" }}>
                  <span style={{ color: "red" }}>{errors.password}</span>
                </div>
              )}
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "25px" }}>
              <Button
                id={"password"}
                variant="contained"
                onClick={(e) => editData(e)}
              >
                {values.password === true ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* Email */}
          <Grid container sx={{ alignItems: "center" }}>
            <Grid xs={12} md={3} xl={2} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> Email </Typography>
            </Grid>
            <Grid xs={12} md={3} xl={3} sx={{ mx: "5px" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="email"
                  label={"Email"}
                  type="email"
                  variant="outlined"
                  defaultValue={editedData.email}
                  disabled={values.email === false}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "25px" }}>
              <Button
                id={"email"}
                variant="contained"
                onClick={(e) => editData(e)}
              >
                {values.email === true ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* Phone Number */}
          <Grid container sx={{ alignItems: "center" }}>
            <Grid xs={12} md={3} xl={2} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> Phone Number </Typography>
            </Grid>
            <Grid xs={12} md={3} xl={3} sx={{ mx: "5px" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="phone"
                  label="Phone"
                  type="tel"
                  variant="outlined"
                  defaultValue={editedData.phone}
                  disabled={values.phone === false}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "25px" }}>
              <Button
                id={"phone"}
                variant="contained"
                onClick={(e) => editData(e)}
              >
                {values.phone === true ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* User Name */}
          <Grid container sx={{ alignItems: "center" }}>
            <Grid xs={12} md={3} xl={2} sx={{ mx: "5px" }}>
              <Typography variant="inherit"> User Name </Typography>
            </Grid>
            <Grid xs={12} md={3} xl={3} sx={{ mx: "5px" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  defaultValue={editedData.full_name}
                  disabled={values.userName === false}
                  onChange={(e) =>
                    setEditedData({ ...editedData, full_name: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ mx: "25px" }}>
              <Button
                id={"full_name"}
                variant="contained"
                onClick={(e) => editData(e)}
              >
                {values.userName === true ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserSettings;
