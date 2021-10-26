import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Checkbox,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const rows = [
  {
    key: 1,
    id: "001",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 2,
    id: "002",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 3,
    id: "003",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 4,
    id: "004",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 5,
    id: "005",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 6,
    id: "006",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 7,
    id: "007",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 8,
    id: "008",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
  {
    key: 9,
    id: "009",
    email: "admin@elsteam.com",
    phone: "011000000",
    balance: "100",
    flexible_saving: "100",
    locked_saving: "100",
    total_profit: "500",
    status_kyc: "status",
    date_register: "01/10/2021",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  { id: "id", alignment: "left", label: "Order ID" },
  { id: "email", alignment: "left", label: "Email" },
  { id: "phone", alignment: "left", label: "Phone" },
  { id: "balance", alignment: "left", label: "Balance" },
  { id: "flexible_saving", alignment: "left", label: "Flexible Saving" },
  { id: "locked_saving", alignment: "left", label: "Locked Saving" },
  { id: "total_profit", alignment: "left", label: "Total Profit" },
  { id: "status_kyc", alignment: "left", label: "Status KYC" },
  { id: "date_register", alignment: "left", label: "Date Register" },
  { id: "action", alignment: "right", label: "Action" },
];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props) => {
  // Here was 'let'
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Orders
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" size="large">
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" size="large">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customer");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.key)}
                        />
                      </TableCell>

                      <TableCell align="left">#{row.id}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.balance}</TableCell>
                      <TableCell align="left">{row.flexible_saving}</TableCell>
                      <TableCell align="left">{row.locked_saving}</TableCell>
                      <TableCell align="left">{row.total_profit}</TableCell>
                      <TableCell align="left">{row.status_kyc}</TableCell>
                      <TableCell align="left">{row.date_register}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="details" size="large">
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rows} />
      </Box>
    </div>
  );
}

const AffiliateUsers = () => {
  return (
    <Fragment>
      <Helmet title="Affilate Users" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Affilate Users
          </Typography>
        </Grid>
        <Grid item>
          <div>{/* <AddAffiliateUser /> */}</div>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AffiliateUsers;
