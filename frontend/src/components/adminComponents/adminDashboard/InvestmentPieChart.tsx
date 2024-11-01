// components/InvestmentPieChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

interface InvestmentPieChartProps {
    data: { id: string; name: string; amountRaised: number }[]; // Adjusted to match the expected data structure
    className: string;
}

const InvestmentPieChart: React.FC<InvestmentPieChartProps> = ({ data , className}) => {
    const chartData = {
        labels: data.map(item => item.name), // Use the name for labels
        datasets: [
            {
                data: data.map(item => item.amountRaised), // Use amountRaised for data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={className}>
            <Pie data={chartData} />
        </div>
    );
};

export default InvestmentPieChart;