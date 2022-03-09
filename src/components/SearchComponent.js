import React, { Fragment } from "react";
import styled from "styled-components/macro";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { Search as SearchIcon } from "react-feather";
import { InputBase } from "@material-ui/core";

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => darken(0.05, props.theme.header.background)};
  display: block;
  position: relative;

  &:hover {
    background-color: ${(props) => darken(0.08, props.theme.header.background)};
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

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(4)};
    padding-right: ${(props) => props.theme.spacing(4)};
    padding-bottom: ${(props) => props.theme.spacing(4)};
    padding-left: ${(props) => props.theme.spacing(11)};
    width: 160px;
  }
`;

const SearchComponent = ({ onChange }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Search sx={{ display: "block" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Input
          placeholder={t("searchList")}
          sx={{ display: "block" }}
          className="input-search"
          onChange={onChange}
        />
      </Search>
    </Fragment>
  );
};

export default SearchComponent;
