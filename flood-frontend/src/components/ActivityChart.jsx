import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default function ActivityChart({ data }) {
  const chartData = {
    labels: data.map(d =>
      new Date(d.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Water Level (cm)",
        data: data.map(d => d.water_level_cm),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="chart-card">
      <Line data={chartData} />
    </div>
  );
}
