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
  Typography,
  Box,
} from "@material-ui/core";
import ReferralUserModal from "../../modal/ReferralUserModal";
import CSVButton from "../../components/CSVButton";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const ReferralTable = () => {
  const classes = useStyles();

  const callRow = useSelector((state) => state.referral);

  const rows = callRow.referralRow;
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
          <Box
            mt={8}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography variant="subtitle1" color="inherit" component="div">
              Export Data
            </Typography>
            <CSVButton data={rows} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ReferralTable;
