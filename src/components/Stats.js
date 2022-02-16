import React from "react";
import styled, { css } from "styled-components/macro";
import { rgba } from "polished";
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const Card = styled(MuiCard)`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing(6)};

  ${(props) =>
    props.illustration &&
    props.theme.palette.mode !== "dark" &&
    css`
      background: ${(props) => rgba(props.theme.palette.primary.main, 0.125)};
      color: ${(props) => props.theme.palette.primary.main};
    `}
`;

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const Stats = ({ title, amount, ViewMore, className, color }) => {
  return (
    <Card sx={{ cursor: "pointer", background: className }}>
      <CardContent onClick={ViewMore}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" sx={{ color: color }}>
            {title}
          </Typography>
        </Box>

        <Typography variant="h3" mb={3}>
          {amount ? (
            <Box fontWeight="fontWeightRegular" sx={{ color: color }}>
              {amount}%
            </Box>
          ) : (
            <Box py={4} />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Stats;
