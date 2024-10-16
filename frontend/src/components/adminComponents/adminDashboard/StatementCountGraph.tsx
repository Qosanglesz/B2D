'use client'

import React from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface StatementCountData {
    date: string;
    count: number;
}

interface StatementCountGraphProps {
    data: StatementCountData[];
}

const StatementCountGraph: React.FC<StatementCountGraphProps> = ({data}) => {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Number of Statements',
                data: data.map(item => item.count),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Number of Statements Over Last 7 Days',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Statements',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    };

    return <Bar data={chartData} options={options}/>;
};

export default StatementCountGraph;
