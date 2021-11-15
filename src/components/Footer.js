import * as React from "react";
import styled from "styled-components/macro";
import {
  Grid,
  Hidden,
  List,
  ListItemText as MuiListItemText,
  ListItemButton as MuiListItemButton,
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(0.25)}
    ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItemButton = styled(MuiListItemButton)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};

  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden mdDown>
          <Grid container item xs={12} md={6}>
            <List>
              <ListItemButton component="a" href="#">
                <ListItemText primary="Contact Us" />
              </ListItemButton>
              <ListItemButton component="a" href="#">
                <ListItemText primary="Privacy Policy" />
              </ListItemButton>
            </List>
          </Grid>
        </Hidden>
      </Grid>
    </Wrapper>
  );
};

export default Footer;
