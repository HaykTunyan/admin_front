import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { spacing } from "@material-ui/system";
import {
  Card as MuiCard,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Toolbar as MuiToolbar,
  Typography,
  Box,
  TablePagination,
  Chip as MuiChip,
  Grid,
} from "@material-ui/core";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import CSVButton from "../../components/CSVButton";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import EditTransactionModal from "../../modal/EditTransactionModal";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

// Custom Style.
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
  rootTable: {
    margin: "10px",
  },
  toolbar: {
    justifyContent: "space-between",
    display: "flex",
    padding: "10px",
  },
});

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;

  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const TransactionsSettings = ({ coins }) => {
  const transactionList = useSelector((state) => state.settings);
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: "0",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "1",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "2",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "3",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "4",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "5",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "6",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
    {
      id: "7",
      min_send: "300",
      fee: "400",
      decimals: "12 000",
      suspend: "400",
    },
  ]);
  const [previous, setPrevious] = useState({});
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rowTransaction, getRowTransaction] = useState([]);

  console.log("coins  data", coins);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const onToggleEditMode = (id) => {
  //   setRows((state) => {
  //     return rows.map((row) => {
  //       if (row.id === id) {
  //         return { ...row, isEditMode: !row.isEditMode };
  //       }
  //       return row;
  //     });
  //   });
  // };

  // const onChange = (e, row) => {
  //   if (!previous[row.id]) {
  //     setPrevious((state) => ({ ...state, [row.id]: row }));
  //   }
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   const { id } = row;
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, [name]: value };
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  // };

  // const onRevert = (id) => {
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return previous[id] ? previous[id] : row;
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  //   setPrevious((state) => {
  //     delete state[id];
  //     return state;
  //   });
  //   onToggleEditMode(id);
  // };

  if (!coins) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Paper>
        <Toolbar pt={5}>
          <Grid flex justifyContent="space-between" container spacing={6}>
            <Grid item>
              <Typography variant="h6" color="inherit" component="div">
                Transaction Settings List
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                {/* <TableCell align="center"> Update </TableCell> */}
                {/* <TableCell align="center">Coin</TableCell> */}
                <TableCell align="">Coin Name</TableCell>
                {/* <TableCell align="center">Decimals</TableCell> */}
                <TableCell align="center">Fee</TableCell>
                {/* <TableCell align="center">Alt Coin</TableCell> */}
                <TableCell align="center">Min Send Amount</TableCell>

                {/* <TableCell align="center">Price</TableCell>
                <TableCell align="center">Price Change</TableCell>
                <TableCell align="center">Price Change Percent </TableCell> */}
                <TableCell align="center">Suspend Transaction</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins &&
                coins
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell> */}
                      {/* <TableCell align="center">
                        {row.autoUpdate === true ? (
                          <Chip label="Active" color="success" />
                        ) : (
                          <Chip label="Passive" color="error" />
                        )}
                      </TableCell> */}
                      {/* <TableCell align="center">{row.coin}</TableCell> */}
                      <TableCell align="">{row.name}</TableCell>
                      {/* <TableCell align="center">{row.decimals}</TableCell> */}
                      <TableCell align="center">{row.fee}%</TableCell>
                      {/* <TableCell align="center">
                        {row.isAltCoin === true ? (
                          <Chip label="Active" color="success" />
                        ) : (
                          <Chip label="Passive" color="error" />
                        )}
                      </TableCell> */}
                      <TableCell align="center">{row.minSendAmount}</TableCell>

                      {/* <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.priceChange}</TableCell>
                      <TableCell align="center">
                        {row.priceChangePercent}
                      </TableCell>
                      */}
                      <TableCell align="center">
                        {row.suspendSendTransaction === true ? (
                          <Chip label="Enable" color="success" />
                        ) : (
                          <Chip label="Disable" color="error" />
                        )}
                      </TableCell>

                      <TableCell padding="none" align="right">
                        <EditTransactionModal
                          coinId={row.id}
                          name={row.name}
                          coin={row.coin}
                          minSendAmount={row.minSendAmount}
                          decimals={row.decimals}
                          fee={row.fee}
                          price={row.price}
                          priceChange={row.priceChange}
                          priceChangePercent={row.priceChangePercent}
                          suspendSendTransaction={row.suspendSendTransaction}
                          suspendReceiveTransaction={
                            row.suspendReceiveTransaction
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableWrapper>
      </Paper>

      <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={coins} />
      </Box>
    </Fragment>
  );
};

export default TransactionsSettings;
