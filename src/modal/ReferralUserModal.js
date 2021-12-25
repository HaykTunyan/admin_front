import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { ChevronDown, ChevronUp } from "react-feather";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const style = {
  width: 360,
  bgcolor: "background.paper",
};

const ReferralUserModal = ({
  id,
  totalReceived,
  detaild,
  detailedReceived,
  walletsFriends,
  usesTheSistem,
  usesTheSavings,
  usesTheSavingsPercent,
  amountOfSavings,
  usesTheSystemPercent,
}) => {
  //  hooks.
  const [open, setOpen] = useState(false);
  const [viewFriends, SetViewFriends] = useState(false);
  const [viewWallet, setViewWallet] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const viewOpen = () => {
    SetViewFriends(!viewFriends);
  };

  const openWallet = () => {
    setViewWallet(!viewWallet);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <RemoveRedEyeIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Information of Referral User
        </DialogTitle>
        <DialogContent>
          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel-one"
              id="panel-one"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          <List sx={style} component="nav" aria-label="mailbox folders">
            {/* Received Friends */}
            <ListItem>
              <ListItemText children="Received Friends" />
              <Typography variant="inherit">${totalReceived}</Typography>
              <Spacer mx={2} />
              <IconButton component="span" onClick={viewOpen}>
                {viewFriends ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            </ListItem>
            {viewFriends && (
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="inherit">
                  {detailedReceived.bic}%{" "}
                </Typography>
                <Spacer mx={2} />
                <Typography variant="inherit">
                  {detailedReceived.btc}%
                </Typography>
                <Spacer mx={2} />
                <Typography variant="inherit">
                  {detailedReceived.xrp}%
                </Typography>
              </ListItem>
            )}
            <Divider />
            <ListItem>
              <ListItemText children="Wallets Friends" />
              <Typography variant="inherit">${walletsFriends}</Typography>
              <Spacer mx={2} />
              <IconButton component="span" onClick={openWallet}>
                {viewWallet ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            </ListItem>
            {viewWallet && (
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="inherit">{detaild.bic}%</Typography>
                <Spacer mx={2} />
                <Typography variant="inherit">{detaild.btc}%</Typography>
                <Spacer mx={2} />
                <Typography variant="inherit">{detaild.xrp}%</Typography>
              </ListItem>
            )}
            <Divider />
            <ListItem>
              <ListItemText children="Uses the system" />
              <Typography variant="inherit">{usesTheSistem}</Typography>
              <Spacer mx={2} />
              <Typography variant="inherit">{usesTheSystemPercent}%</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText children="Uses the Savings" />
              <Typography variant="inherit">{usesTheSavings}</Typography>
              <Spacer mx={2} />
              <Typography variant="inherit">
                {" "}
                {usesTheSavingsPercent}%{" "}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText children="Amount of Savings" />
              <Typography variant="inherit">${amountOfSavings}</Typography>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReferralUserModal;
