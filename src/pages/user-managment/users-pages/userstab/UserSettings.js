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
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Eye, EyeOff } from "react-feather";
import { useLocation } from "react-router-dom";
import { editUserData_req, getUserData_req } from "../../../../api/userAPI";
import RequestVerificationModal from "../../../../modal/RequestVerificationModal";
import {
  editUserWallets_req,
  getUserWallets_req,
} from "../../../../api/userWalletsAPI";
import TransferAccountModal from "../../../../modal/Confirmations/TransferAccountModal";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const UserSettings = () => {
  const [loading, setLoading] = useState(true);
  const [editedData, setEditedData] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
  });
  const [affiliateUser, setAffiliateUser] = useState(false);
  const [blockedUser, setBlockedUser] = useState(false);
  const [values, setValues] = useState({
    phone: false,
    password: false,
    email: false,
    full_name: false,
    showPassword: false,
    reset: 0,
  });
  const [errors, setErrors] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
  });

  const [limit, setLimit] = useState(false);
  const [limitAmount, setLimitAmount] = useState(0);
  const [walletsValue, setWalletsValue] = useState("");
  const [wallets, setWallets] = useState([]);

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

  const handleCheckbox = async () => {
    setLimit(!limit);

    try {
      const response = await getUserWallets_req(userId);
      if (response) {
        console.log("GET USER WALLETS RESPONSE ==>", response);
        setWallets(response.result);
      }
    } catch (e) {
      console.log("GET USER WALLETS ERROR ==>", e.response);
    }
  };

  const handleWalletChoice = (event) => {
    setWalletsValue(event.target.value);
  };

  const handleLimitChange = (event) => {
    console.log("LIMIT ==>", event.target.value);
    setLimitAmount(event.target.value);
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
        };
        setEditedData(data);
        setAffiliateUser(response.userAccountInfo.is_affiliate);
        setBlockedUser(response.userAccountInfo.block_status);
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

  async function confirmLimit() {
    if (walletsValue !== "" && limitAmount > 0) {
      try {
        const response = await editUserWallets_req(
          userId,
          wallets[walletsValue - 1].id,
          limitAmount
        );
        if (response) {
          console.log("SET LIMIT FOR WALLET RESPONSE ==>", response);
          setWalletsValue("");
          setLimit(false);
        }
      } catch (e) {
        console.log("SET LIMIT FOR WALLET ERROR ==>", e.response);
        setWalletsValue("");
        setLimitAmount(0);
      }
    }
  }

  async function editData(e) {
    setValues({ ...values, [`${e.target.id}`]: !values[`${e.target.id}`] });

    if (values[`${e.target.id}`]) {
      try {
        const response = await editUserData_req(
          userId,
          e.target.id,
          editedData[`${e.target.id}`]
        );
        if (response) {
          console.log("EDIT USER DATA RESPONSE ==>", response);
          getUserData();
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

  async function transferAccount(e) {
    setAffiliateUser(!affiliateUser);

    try {
      const response = await editUserData_req(
        userId,
        e.target.id,
        !affiliateUser
      );
      if (response) {
        console.log("TRANSFER ACCOUNT RESPONSE ==>", response);
        getUserData();
        setErrors({ ...errors, [`${e.target.id}`]: "" });
      }
    } catch (error) {
      console.log("TRANSFER ACCOUNT ERROR ==>", error.response.data);
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

  if (loading) {
    return <></>;
  }

  return (
    <>
      <Card>
        <CardContent sx={{ px: { xs: "16px" }, py: { xs: "20px" } }}>
          {/* Password */}
          <Grid container sx={{ alignItems: { md: "center" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              xl={2}
              sx={{ mx: "5px", mb: { xs: "10px", md: "0" } }}
            >
              <Typography variant="inherit"> Password </Typography>
            </Grid>
            <Grid item xs={12} md={3} xl={3} sx={{ mx: { md: "5px" } }}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  disabled={values.password === false}
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
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                textAlign: { xs: "center", md: "start" },
                mt: { xs: "10px" },
                mx: { md: "25px" },
              }}
            >
              <Button
                id={"password"}
                variant="contained"
                onClick={(e) => editData(e)}
                sx={{ width: "100px" }}
              >
                {values.password === true ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
          <Spacer my={6} />
          {/* Email */}
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={3} xl={2} sx={{ mx: { md: "5px" } }}>
              <Typography variant="inherit"> Email </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              xl={3}
              sx={{ mt: { xs: "10px" }, mx: { md: "5px" } }}
            >
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="email"
                  label={"Email"}
                  type="email"
                  variant="outlined"
                  defaultValue={editedData.email}
                  disabled={!affiliateUser || values.email === false}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            {affiliateUser && (
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  textAlign: { xs: "center", md: "start" },
                  mt: { xs: "10px" },
                  mx: { md: "25px" },
                }}
              >
                <Button
                  id={"email"}
                  variant="contained"
                  onClick={(e) => editData(e)}
                  sx={{ width: "100px" }}
                >
                  {values.email === true ? "Save" : "Edit"}
                </Button>
              </Grid>
            )}
          </Grid>
          <Spacer my={6} />
          {/* Phone Number */}
          <Grid container sx={{ alignItems: { md: "center" } }}>
            <Grid item xs={12} md={3} xl={2} sx={{ mx: { md: "5px" } }}>
              <Typography variant="inherit"> Phone Number </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              xl={3}
              sx={{
                textAlign: { xs: "center", md: "start" },
                mt: { xs: "10px" },
                mx: { md: "5px" },
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="phone"
                  label="Phone"
                  type="tel"
                  variant="outlined"
                  defaultValue={editedData.phone}
                  disabled={!affiliateUser || values.phone === false}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            {affiliateUser && (
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  textAlign: { xs: "center", md: "start" },
                  mt: { xs: "10px" },
                  mx: { md: "25px" },
                }}
              >
                <Button
                  id={"phone"}
                  variant="contained"
                  onClick={(e) => editData(e)}
                  sx={{ width: "100px" }}
                >
                  {values.phone === true ? "Save" : "Edit"}
                </Button>
              </Grid>
            )}
          </Grid>
          <Spacer my={6} />
          {/* User Name */}
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={3} xl={2} sx={{ mx: { md: "5px" } }}>
              <Typography variant="inherit"> User Name </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              xl={3}
              sx={{ mt: { xs: "10px" }, mx: { md: "5px" } }}
            >
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  defaultValue={editedData.full_name}
                  disabled={!affiliateUser || values.userName === false}
                  onChange={(e) =>
                    setEditedData({ ...editedData, full_name: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            {affiliateUser && (
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  textAlign: { xs: "center", md: "start" },
                  mt: { xs: "10px" },
                  mx: { md: "25px" },
                }}
              >
                <Button
                  id={"full_name"}
                  variant="contained"
                  onClick={(e) => editData(e)}
                  sx={{ width: "100px" }}
                >
                  {values.userName === true ? "Save" : "Edit"}
                </Button>
              </Grid>
            )}
          </Grid>
          <Spacer my={6} />
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={3} xl={2} sx={{ mx: { md: "5px" } }}>
              <FormControlLabel
                control={<Checkbox checked={limit} onChange={handleCheckbox} />}
                label="Limit on Send"
              />
            </Grid>
            {limit && (
              <>
                <Grid
                  item
                  container
                  xs={12}
                  md={3}
                  xl={3}
                  sx={{ mx: { md: "5px" }, alignItems: "center" }}
                >
                  <Grid item xs={12} md={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="select-from-label">Wallets</InputLabel>
                      <Select
                        labelId="select-from-label"
                        id="select-from-label"
                        value={walletsValue}
                        onChange={handleWalletChoice}
                        label="Wallets"
                      >
                        <MenuItem value="all">
                          <em>From All</em>
                        </MenuItem>
                        {wallets.map((wallet, key) => (
                          <MenuItem key={wallet.id} value={key + 1}>
                            {wallet.coin_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ mt: { xs: "10px" } }}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Limit"
                        id="limit"
                        variant="outlined"
                        onChange={handleLimitChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    textAlign: { xs: "center", md: "start" },
                    mt: { xs: "10px" },
                    mx: "25px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ width: "100px" }}
                    onClick={() => confirmLimit()}
                  >
                    Confirm
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
          <Spacer my={6} />
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={3} xl={2} sx={{ mx: { md: "5px" } }}>
              <RequestVerificationModal
                id={"blockUser"}
                blockedUser={blockedUser}
                getUserData={getUserData}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              xl={3}
              sx={{ mt: { xs: "10px", md: "0" }, mx: { md: "10px" } }}
            >
              <Button
                id={"is_affiliate"}
                variant="contained"
                sx={{ width: "100%" }}
                onClick={(e) => transferAccount(e)}
              >
                {`Transfer account to ${affiliateUser ? "real" : "Affiliate"}`}
              </Button>

              {/* <TransferAccountModal
                setAffiliateUser={setAffiliateUser}
                affiliateUser={affiliateUser}
                userId={userId}
                getUserData={getUserData}
                setErrors={setErrors}
                errors={errors}
              /> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserSettings;
