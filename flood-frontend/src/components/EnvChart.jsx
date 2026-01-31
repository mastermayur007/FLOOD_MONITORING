import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EnvChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(t) =>
            new Date(t).toLocaleTimeString()
          }
        />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          name="Temperature (°C)"
        />

        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          name="Humidity (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
