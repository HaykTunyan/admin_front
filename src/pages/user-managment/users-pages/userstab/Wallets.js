import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card as MuiCard,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  IconButton,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import WalletsModal from "../../../../modal/WalletsModal";
import {
  getUserWallets_req,
  blockUserWallet_req,
} from "../../../../api/userWalletsAPI";
import { ArrowDown, ArrowUp } from "react-feather";
import ConfirmationNotice from "../../../../components/ConfirmationNotice";
import ActionConfirmationModal from "../../../../modal/Confirmations/ActionConfirmationModal";

// Spacing.
const Card = styled(MuiCard)(spacing);

const TableWrapper = styled.div`s
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const Wallets = () => {
  // hooks.
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const [wallets, setWallets] = useState([]);
  const [sortBy, setSortBy] = useState("increasing");
  const [message, setMessage] = useState({
    open: false,
    error: false,
  });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    wallet: {},
  });

  const handleCellClick = (sortType) => {
    setSortBy(sortBy === "increasing" ? "decreasing" : "increasing");
    getUserWallets("total_balance_usd", sortType);
  };

  async function getUserWallets(sortParam, sortType) {
    try {
      const response = await getUserWallets_req(userId, sortParam, sortType);
      if (response) {
        setWallets(response.result);
      }
    } catch (e) {}
  }

  async function blockUserWallet(wallet) {
    setMessage({ ...message, open: false, error: false });

    try {
      const response = await blockUserWallet_req(userId, wallet.id);
      if (response) {
        getUserWallets("total_balance_usd", sortBy);
        setConfirmModal({ ...confirmModal, open: false });
        setMessage({ ...message, open: true });
      }
    } catch (e) {
      setConfirmModal({ ...confirmModal, open: false, wallet: {} });
      setMessage({ ...message, open: true, error: true });
    }
  }

  useEffect(() => {
    getUserWallets();
  }, []);

  return (
    <>
      <Card mb={6}>
        <CardHeader title="Wallets Tables" />
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="25%">Wallet Name</TableCell>
                  <TableCell align="center" width="25%">
                    Coin
                  </TableCell>
                  <TableCell
                    align="center"
                    width="25%"
                    onClick={() =>
                      handleCellClick(
                        sortBy === "decreasing" ? "increasing" : "decreasing"
                      )
                    }
                  >
                    Price Dollars
                    <IconButton
                      onClick={() =>
                        handleCellClick(
                          sortBy === "decreasing" ? "increasing" : "decreasing"
                        )
                      }
                    >
                      {sortBy === "increasing" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallets.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" width="25%">
                        {row.coin_name}
                      </TableCell>
                      <TableCell align="center" width="25%">
                        {row.total_balance}
                      </TableCell>
                      <TableCell align="center" width="25%">
                        {row.total_balance_usd}
                      </TableCell>
                      <TableCell align="right">
                        <Box display="flex" justifyContent="flex-end">
                          <Box mx={2}>
                            <WalletsModal
                              wallet={row}
                              id={"topUp"}
                              userId={userId}
                            />
                          </Box>
                          <Box mx={2}>
                            <WalletsModal
                              wallet={row}
                              id={"withdraw"}
                              userId={userId}
                            />
                          </Box>
                          <Box mx={2}>
                            <Button
                              variant="contained"
                              onClick={() =>
                                setConfirmModal({
                                  ...confirmModal,
                                  open: true,
                                  wallet: row,
                                })
                              }
                              sx={{ width: "max-content" }}
                            >{`${
                              row.block_status === true ? "Unblock" : "Block"
                            } withdrawal`}</Button>
                            {confirmModal.open === true && (
                              <ActionConfirmationModal
                                onClose={() =>
                                  setConfirmModal({
                                    ...confirmModal,
                                    open: false,
                                    wallet: {},
                                  })
                                }
                                onConfirm={() => {
                                  blockUserWallet(confirmModal.wallet);
                                }}
                              />
                            )}
                            {message.open === true && (
                              <ConfirmationNotice
                                error={message.error}
                                title={
                                  message.error === true
                                    ? "An error occurred, try again"
                                    : `Withdrawal ${
                                        confirmModal.wallet.block_status ===
                                        true
                                          ? "unblocked"
                                          : "blocked"
                                      }`
                                }
                              />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableWrapper>
        </Paper>
      </Card>
    </>
  );
};

export default Wallets;
