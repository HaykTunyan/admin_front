import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";
import { CardContent, Card as MuiCard, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { orange, red } from "@material-ui/core/colors";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
const ChartWrapper = styled.div`
  height: 300px;
`;

const PieChart = ({ theme, title, description }) => {
  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: [
          theme.palette.secondary.main,
          orange[500],
          red[500],
          theme.palette.grey[300],
        ],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Chart type="pie" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);
