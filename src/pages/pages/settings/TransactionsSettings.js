import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { spacing } from "@material-ui/system";
// import { styled, alpha } from "@mui/material/styles";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import CSVButton from "../../components/CSVButton";
import { XCircle } from "react-feather";
import { useSelector } from "react-redux";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);
const Button = styled(MuiButton)(spacing);

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

const TransactionsSettings = () => {
  const transactionList = useSelector((state) => state.settings);

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

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Paper className={classes.root}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" color="inherit" component="div">
                Transaction Settings List
              </Typography>
            </Toolbar>
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Min Send amount</TableCell>
                  <TableCell align="left">Fee(%)</TableCell>
                  <TableCell align="left">Decimals</TableCell>
                  <TableCell align="left">Suspend Transactions</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <CustomTableCell {...{ row, name: "min_send", onChange }} />
                    <CustomTableCell {...{ row, name: "fee", onChange }} />
                    <CustomTableCell {...{ row, name: "decimals", onChange }} />
                    <CustomTableCell {...{ row, name: "suspend", onChange }} />
                    <TableCell className={classes.selectTableCell}>
                      {row.isEditMode ? (
                        <>
                          <IconButton
                            aria-label="done"
                            onClick={() => onToggleEditMode(row.id)}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            aria-label="revert"
                            onClick={() => onRevert(row.id)}
                          >
                            <XCircle />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rows} />
      </Box>
    </Fragment>
  );
};

export default TransactionsSettings;
