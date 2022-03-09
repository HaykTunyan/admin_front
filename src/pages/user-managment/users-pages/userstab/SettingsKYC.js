import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useLocation } from "react-router-dom";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Grid as MuiGrid,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Box,
  Alert as MuiAlert,
} from "@material-ui/core";
import moment from "moment";
import {
  getUserKYC_req,
  updateUserKYC_req,
} from "../../../../api/userSettingskycAPI";
import RequestVerificationModal from "../../../../modal/RequestVerificationModal";
import DocumentsModal from "../../../../modal/DocumentsModal";
import RejectKYCModal from "../../../../modal/RejectKYCModal";
import ConfirmationNotice from "../../../../components/ConfirmationNotice";

// Spacing.
const Alert = styled(MuiAlert)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

let searchTimeout = 0;

const SettingsKYC = () => {
  // hooks.
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [userKYC, setUserKYC] = useState({});
  const [message, setMessage] = useState({
    open: false,
    error: false,
  });

  async function getUserKYC() {
    try {
      const response = await getUserKYC_req(userId);
      if (response) {
        setUserKYC(response.userKyc);
      }
    } catch (e) {}
  }

  async function updateUserKYC(status) {
    setMessage({ ...message, open: false, error: false });

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
        setMessage({ ...message, open: true });
        getUserKYC();
      }
    } catch (e) {
      setMessage({ ...message, open: true, error: true });
    }
  }

  useEffect(() => {
    getUserKYC();
  }, []);

  function timeCount() {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      setAlert(false);
    }, 10000);
  }

  useEffect(() => {
    timeCount();

    return () => {
      // This is the cleanup function
      clearTimeout(searchTimeout);
    };
  }, [alert]);

  return (
    <>
      {message.open === true && (
        <ConfirmationNotice
          error={message.error}
          title={
            message.error === true
              ? "An error occurred, try again"
              : `Verification approved`
          }
        />
      )}
      <Card mb={6}>
        <CardContent>
          {alert && (
            <Alert
              severity={alertType === "success" ? "success" : "error"}
              my={3}
            >
              {alertType === "success"
                ? `Request Verification sent`
                : `An error occured! Try again.`}
            </Alert>
          )}
          <Spacer mb={4} />
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={8} md={2}>
              <Typography variant="inherit" fontWeight="bold">
                User Status
              </Typography>
            </Grid>
            {/* <Spacer mx={4} /> */}
            <Grid item xs={4} md={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-end", md: "start" },
                }}
              >
                <Chip
                  label={
                    userKYC.status_kyc === 1 || userKYC.status_kyc === 3
                      ? "Pending"
                      : userKYC.status_kyc === 4
                      ? "Verified"
                      : "Not Verified"
                  }
                  color={userKYC.status_kyc === 4 ? "success" : "error"}
                />
              </Box>
            </Grid>
            <Grid item xs={8} md={4}>
              <Box sx={{ mt: { xs: "10px", md: "0" } }}>
                <RequestVerificationModal
                  id={"kyc"}
                  setAlert={setAlert}
                  setAlertType={setAlertType}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider my={3} />
          {userKYC.status_kyc &&
            Object.keys(userKYC).length !== 0 &&
            userKYC.status_kyc !== 2 && (
              <>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  my={2}
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
            <Grid container direction="row" alignItems="center" my={2}>
              <Grid xs={6} md={2}>
                <Box>
                  <Button variant="contained" onClick={() => updateUserKYC(4)}>
                    Approve
                  </Button>
                </Box>
              </Grid>
              <Grid xs={6} md={2}>
                <Box display="flex" justifyContent="flex-end">
                  <RejectKYCModal getUserKYC={getUserKYC} />
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsKYC;
