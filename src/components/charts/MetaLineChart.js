import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";
import { Card as MuiCard, CardContent } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { alpha } from "@material-ui/core/styles";

// Spacing.
const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 100px;
  width: 220px;
  margin-right: auto;
  margin-left: auto;
`;

const LineChart = ({ theme }) => {
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, alpha(theme.palette.secondary.main, 0.0875));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    return {
      labels: ["Start", "progress", "Change End"],
      datasets: [
        {
          label: "Sales ($)",
          fill: true,
          backgroundColor: gradient,
          borderColor: theme.palette.secondary.main,
          tension: 0.4,
          data: [15, 62, 84],
        },
        {
          label: "Orders",
          fill: true,
          backgroundColor: "transparent",
          borderColor: theme.palette.grey[500],
          borderDash: [4, 4],
          tension: 0.4,
          data: [19, 24, 29],
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.0)",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.0375)",
          fontColor: "#fff",
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <ChartWrapper>
          <Chart type="line" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};
export default withTheme(LineChart);
