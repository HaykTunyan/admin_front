import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Grid,
} from "@material-ui/core";
import ReferralUserModal from "../../modal/ReferralUserModal";

const rows = [
  {
    key: 0,
    name: "User One",
    link: "https://coin.com",
    reg_user: " 100",
    imp_user: " 50 ",
    big_price: " 10 000 ",
    all_coin: " 100 000 ",
  },
  {
    key: 1,
    name: "User Two",
    link: "https://coin.com",
    reg_user: " 100",
    imp_user: " 50 ",
    big_price: " 10 000 ",
    all_coin: " 100 000 ",
  },
  {
    key: 2,
    name: "User Three",
    link: "https://coin.com",
    reg_user: " 100",
    imp_user: " 50 ",
    big_price: " 10 000 ",
    all_coin: " 100 000 ",
  },
  {
    key: 3,
    name: "User Four",
    link: "https://coin.com",
    reg_user: " 100",
    imp_user: " 50 ",
    big_price: " 10 000 ",
    all_coin: " 100 000 ",
  },
  {
    key: 4,
    name: "User Five",
    link: "https://coin.com",
    reg_user: " 100",
    imp_user: " 50 ",
    big_price: " 10 000 ",
    all_coin: " 100 000 ",
  },
];

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const ReferralTable = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper} className={classes.rootTable}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Users Name</TableCell>
                    <TableCell align="center">URL link</TableCell>
                    <TableCell align="center">Register Users</TableCell>
                    <TableCell align="center">Import Users</TableCell>
                    <TableCell align="center">Big Coin/Price</TableCell>
                    <TableCell align="center">
                      All Coint/Price Friends{" "}
                    </TableCell>
                    <TableCell align="center">Action </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.link}</TableCell>
                      <TableCell align="center">{row.reg_user}</TableCell>
                      <TableCell align="center">{row.imp_user}</TableCell>
                      <TableCell align="center">{row.big_price}</TableCell>
                      <TableCell align="center">{row.all_coin}</TableCell>

                      <TableCell padding="none" align="center">
                        <ReferralUserModal />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ReferralTable;
