import React, { useState } from "react";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";
import { Hidden, CssBaseline, Paper as MuiPaper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { spacing } from "@material-ui/system";
import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import dashboardItems from "../components/sidebar/dashboardItems";
import Sidebar from "../components/sidebar/Sidebar";
import SettingsCom from "../components/SettingsCom";

const drawerWidth = 254;

// Spacing.
const Paper = styled(MuiPaper)(spacing);

// Custom Style.

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  // Hooks.
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Hidden lgUp implementation="js">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            onClose={handleDrawerToggle}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            items={dashboardItems}
          />
        </Hidden>
        <Hidden lgDown implementation="css">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={dashboardItems}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Hidden>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 6 : 3}>
          {children}
          <Outlet />
        </MainContent>
      </AppContent>
    </Root>
  );
};

export default Dashboard;
