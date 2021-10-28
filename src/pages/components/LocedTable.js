import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import {
  Card as MuiCard,
  CardHeader,
  InputBase,
  IconButton as MuiIconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteModal from "../modal/DeleteModal";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

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

const DashboardTable = ({ title, rowList, rowBody }) => {
  const { t } = useTranslation();

  const dialog = "Locked Item";
  const description = "Delete Item in this list";
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
                {rowBody?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.coin_name}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>{item.air}</TableCell>
                    <TableCell>{item.min_amount}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.bonus}</TableCell>
                    <TableCell>
                      <DeleteModal dialog={dialog} description={description} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Paper>
      </Card>
    </Fragment>
  );
};

export default DashboardTable;
