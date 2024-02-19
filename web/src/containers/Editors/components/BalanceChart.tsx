import * as React from "react";
import { Line } from "react-chartjs-2";

export const BalanceChart = ({ id, balanceChartData }: any) => {
  if (balanceChartData === undefined) balanceChartData = [];

  //const [chartData, setChartData] = React.useState(balanceChartData);
  // console.log("CHART DATA HERE");
  // console.log(balanceChartData);
  // console.log(chartData);
  const timeArray = [];
  const valueArray = [];

  if (balanceChartData.length) {
    balanceChartData.forEach((data) => timeArray.push(data.time));
    balanceChartData.forEach((data) => valueArray.push(data.value));
  }

  const data = {
    labels: timeArray,
    datasets: [
      {
        borderWidth: 2,
        label: "Value",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#4BC0C0",
        borderColor: "#4BC0C0",
        pointBackgroundColor: "#4BC0C0",
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 10,
        data: valueArray,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgb(204, 204, 204)",
            borderDash: [3, 3],
            display: false,
            drawTicks: false,
            offsetGridLines: true,
          },
          ticks: {
            display: false,
            fontColor: "rgb(204, 204, 204)",
          },
        },
      ],
      yAxes: [
        {
          position: "right",
          gridLines: {
            color: "rgb(204, 204, 204)",
            borderDash: [3, 3],
            offsetGridLines: true,
          },
          ticks: {
            fontColor: "#616060",
          },
        },
      ],
    },
  };

  React.useEffect(() => {});

  return (
    <Line key={id} type="scatter" data={data} options={options} redraw={true} />
  );
};
