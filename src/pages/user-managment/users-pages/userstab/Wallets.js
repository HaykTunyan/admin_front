import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { MoreVertical } from "react-feather";
import {
  Button,
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

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

export const rows = [
  {
    key: 1,
    wallet_name: "Wallet Name",
    coins: "100",
    dollars: "200",
  },
  {
    key: 2,
    wallet_name: "Wallet Name",
    coins: "100",
    dollars: "200",
  },
  {
    key: 3,
    wallet_name: "Wallet Name",
    coins: "100",
    dollars: "200",
  },
  {
    key: 4,
    wallet_name: "Wallet Name",
    coins: "100",
    dollars: "200",
  },
  {
    key: 5,
    wallet_name: "Wallet Name",
    coins: "100",
    dollars: "200",
  },
];

const Wallets = () => {
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
                {rows.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell component="th" scope="row" width="25%">
                      {row.wallet_name}
                    </TableCell>
                    <TableCell align="center" width="25%">
                      {row.coins}
                    </TableCell>
                    <TableCell align="center" width="25%">
                      {row.dollars}
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end">
                        <Box mx={2}>
                          <Button variant="contained">Пополнить</Button>
                        </Box>
                        <Box mx={2}>
                          <Button variant="contained"> Отправить </Button>
                        </Box>
                        <Box mx={2}>
                          <Button variant="contained"> Заблокировать </Button>
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
