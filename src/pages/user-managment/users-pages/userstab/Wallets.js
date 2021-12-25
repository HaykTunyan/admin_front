import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import WalletsModal from "../../../../modal/WalletsModal";
import {
  getUserWallets_req,
  blockUserWallet_req,
} from "../../../../api/userWalletsAPI";

const Spacer = styled.div(spacing);
const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const Wallets = () => {
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;

  const [wallets, setWallets] = useState([]);

  async function getUserWallets() {
    try {
      const response = await getUserWallets_req(userId);
      if (response) {
        console.log("GET USER WALLETS RESPONSE ==>", response);
        setWallets(response.result);
      }
    } catch (e) {
      console.log("GET USER WALLETS ERROR ==>", e.response);
    }
  }

  async function blockUserWallet(wallet) {
    try {
      const response = await blockUserWallet_req(userId, wallet.id);
      if (response) {
        console.log("BLOCK USER WALLET RESPONSE ==>", response);
        getUserWallets();
      }
    } catch (e) {
      console.log("BLOCK USER WALLET ERROR ==>", e);
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
                  <TableCell align="center" width="25%">
                    Price Dollars
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallets.map((row) => (
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
                            onClick={() => blockUserWallet(row)}
                          >{`${
                            row.block_status === true ? "Unblock" : "Block"
                          } withdrawal`}</Button>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Paper>
      </Card>
    </>
  );
};

export default Wallets;
