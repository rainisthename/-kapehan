"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement, // Required for line charts
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const LineCharts = () => {
  // Data for Daily User Visitors
  const dailyData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Daily Visitors",
        data: [150, 200, 180, 220, 250, 240, 230],
        borderColor: "#9CA3AF", // Lighter gray border
        backgroundColor: "rgba(156, 163, 175, 0.2)", // Light gray fill
        fill: true,
        tension: 0.4, // Smooth curves
        pointBackgroundColor: "#4B5563", // Medium gray points
        pointBorderColor: "#9CA3AF",
      },
    ],
  };

  // Options for responsiveness and styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4B5563", // Gray legend text
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Daily User Visitors",
        font: {
          size: 18,
        },
        color: "#1F2937", // Dark gray title
        padding: {
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(229, 231, 235, 0.5)", // Light gray gridlines
        },
        ticks: {
          color: "#6B7280", // Gray axis labels
        },
      },
      y: {
        grid: {
          color: "rgba(229, 231, 235, 0.5)", // Light gray gridlines
        },
        ticks: {
          color: "#6B7280", // Gray axis labels
        },
      },
    },
  };

  return (
      <div className="bg-gray-50 p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-inter-black text-gray-800 mb-4">
          Daily User Visitors
        </h3>
        <div className="w-full h-64">
          <Line data={dailyData} options={options} />
        </div>
      </div>
  );
};

export default LineCharts;
