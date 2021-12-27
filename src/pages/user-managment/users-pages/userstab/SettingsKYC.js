import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { spacing } from "@material-ui/system";
import { useLocation } from "react-router-dom";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  IconButton,
  Grid as MuiGrid,
  Alert as MuiAlert,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  Avatar as MuiAvatar,
  Tab,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box,
  Chip as MuiChip,
} from "@material-ui/core";
import moment from "moment";
import {
  getUserKYC_req,
  updateUserKYC_req,
} from "../../../../api/userSettingskycAPI";
import RequestVerificationModal from "../../../../modal/RequestVerificationModal";
import DocumentsModal from "../../../../modal/DocumentsModal";
import RejectKYCModal from "../../../../modal/RejectKYCModal";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Avatar = styled(MuiAvatar)``;
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SettingsKYC = () => {
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;

  const [userKYC, setUserKYC] = useState({});

  async function getUserKYC() {
    try {
      const response = await getUserKYC_req(userId);
      if (response) {
        console.log("GET USER KYC RESPONSE ==>", response);
        setUserKYC(response.userKyc);
      }
    } catch (e) {
      console.log("GET USER KYC ==>", e.response);
    }
  }

  async function updateUserKYC(status) {
    let data = {
      user_id: userId, // is required
      status_kyc: status,
      content: "",
      title: "",
      // 1-email, 2 - phone 3 - only notification
      notification_type: [],
    };
    try {
      const response = await updateUserKYC_req(data);
      if (response) {
        console.log("UPDATE USER KYC RESPONSE ==>", response);
      }
    } catch (e) {
      console.log("UPDATE USER KYC ERROR ==>", e.response);
    }
  }

  useEffect(() => {
    getUserKYC();
  }, []);

  return (
    <>
      <Card mb={6}>
        <CardContent>
          <Spacer mb={4} />
          <Grid item container direction="row" alignItems="center">
            <Grid item sx={6} md={2}>
              <Typography variant="inherit" fontWeight="bold">
                User Status
              </Typography>
            </Grid>
            <Spacer mx={4} />
            <Grid item sx={6} md={2}>
              <Chip
                label={
                  userKYC.status_kyc === 1 || userKYC.status_kyc === 3
                    ? "Pending"
                    : userKYC.status_kyc === 2
                    ? "Verified"
                    : "Not Verified"
                }
                color={userKYC.status_kyc === 2 ? "success" : "error"}
              />
            </Grid>
            <Spacer mx={4} />
            <Grid item sx={6} md={2}>
              <RequestVerificationModal />
            </Grid>
          </Grid>
          {userKYC.status_kyc &&
            Object.keys(userKYC.status_kyc).length !== 0 &&
            userKYC.status_kyc !== 4 && (
              <>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Name
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">{userKYC.name}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Surname
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">
                      {userKYC.surname}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Date of birth
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">
                      {moment(userKYC.date_of_birth).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Address
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">
                      {userKYC.address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Zip code
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">
                      {userKYC.zip_code}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      City
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">{userKYC.city}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Country
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">
                      {userKYC.country}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Document Type
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item item sx={6} md={2}>
                    <Typography variant="subtitle1">ID</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <Grid item sx={6} md={2}>
                    <Typography variant="inherit" fontWeight="bold">
                      Date Registration
                    </Typography>
                  </Grid>
                  <Spacer mx={4} />
                  <Grid item sx={6} md={2}>
                    <Typography variant="subtitle1">
                      {moment(userKYC.created_date).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  mb={2}
                  xs={10}
                >
                  <DocumentsModal document={userKYC} />
                </Grid>
              </>
            )}
          {(userKYC.status_kyc === 1 || userKYC.status_kyc === 3) && (
            <Grid container direction="row" alignItems="center" mb={2}>
              <Button variant="contained" onClick={() => updateUserKYC(2)}>
                Approve
              </Button>
              <Spacer mx={2} />
              <RejectKYCModal />
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsKYC;
