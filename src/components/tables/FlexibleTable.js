import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import {
  Card as MuiCard,
  CardHeader,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputBase,
  IconButton as MuiIconButton,
  ToggleButton,
  ToggleButtonGroup,
  TablePagination,
} from "@material-ui/core";
import DeleteModal from "../../modal/DeleteModal";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

// Custom Style.
const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const FlexibleTable = ({ title, rowList, rowBody }) => {
  const { t } = useTranslation();
  const dialog = "Flexible Item";
  const description = "Delete Item in this list";

  const [alignment, setAlignment] = useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardHeader
          action={
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder={t("Search")} />
            </Search>
          }
          title={title}
        />
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  {rowList?.map((item) => (
                    <TableCell key={item.id}>{item.head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowBody
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.coin_name}</TableCell>
                      <TableCell>
                        <ToggleButtonGroup
                          value={alignment}
                          exclusive
                          onChange={handleAlignment}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="30" aria-label="left aligned">
                            {item.week_price_one}
                          </ToggleButton>
                          <ToggleButton value="60" aria-label="centered">
                            {item.week_price_two}
                          </ToggleButton>
                          <ToggleButton value="90" aria-label="right aligned">
                            {item.week_price_three}
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </TableCell>
                      <TableCell>{item.min_amount}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <DeleteModal
                          dialog={dialog}
                          description={description}
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
              count={rowBody.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableWrapper>
        </Paper>
      </Card>
    </Fragment>
  );
};

export default FlexibleTable;
