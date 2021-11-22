import React from "react";
import styled, { css } from "styled-components/macro";
import { rgba } from "polished";
import {
  Box,
  Button,
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

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  span {
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const Percentage = styled(MuiTypography)`
  span {
    color: ${(props) => props.percentagecolor};
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    background: ${(props) => rgba(props.percentagecolor, 0.1)};
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => props.theme.spacing(2)};
  }

  ${(props) =>
    props.illustration &&
    props.theme.palette.mode !== "dark" &&
    css`
      color: ${(props) => rgba(props.theme.palette.primary.main, 0.85)};
    `}
`;

const IllustrationImage = styled.img`
  height: 100px;
  position: absolute;
  right: ${(props) => props.theme.spacing(1)};
  bottom: ${(props) => props.theme.spacing(1)};
  display: none;

  ${(props) => props.theme.breakpoints.between("xs", "lg")} {
    display: block;
  }

  @media (min-width: 1600px) {
    display: block;
  }
`;

const Stats = ({
  title,
  amount,
  chip,
  percentagetext,
  percentagecolor,
  illustration,
  view,
  ViewMore,
  className,
}) => {
  return (
    <Card illustration={illustration} sx={className}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        <Typography variant="h3" mb={3}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Percentage
            variant="subtitle2"
            color="textSecondary"
            percentagecolor={percentagecolor}
            illustration={illustration}
          >
            <span>{percentagetext}</span> Since last month
          </Percentage>
          {!view && (
            <Button
              size="small"
              type="button"
              children="View"
              onClick={ViewMore}
            />
          )}
        </Box>

        {!illustration && <Chip label={chip} />}
      </CardContent>

      {!!illustration && (
        <IllustrationImage src={illustration} alt="Illustration" />
      )}
    </Card>
  );
};

export default Stats;
