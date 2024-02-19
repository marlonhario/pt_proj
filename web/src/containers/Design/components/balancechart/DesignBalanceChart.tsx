import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { ContextDesign } from "../../../../hooks/context/Context";

export const DesignBalanceChart: React.FC = () => {
    const {
        designState: { balance_chart, computation },
    } = useContext(ContextDesign);

    const timeArray = [];
    const valueArray = [];

    if (balance_chart?.length) {
        balance_chart.forEach((data) => timeArray.push(data.time));
        balance_chart.forEach((data) => valueArray.push(data.value));
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

    return React.useMemo(() => {
        return <Line key={computation?.timestamp} type="scatter" data={data} options={options} />;
    }, [computation?.timestamp]);
};
