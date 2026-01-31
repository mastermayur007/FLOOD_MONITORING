import { useEffect, useState } from "react";
import { fetchLiveData } from "../api/api";
import ActivityChart from "../components/ActivityChart";

export default function Activity() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetchLiveData();
        setData(res);
        setError(null);
      } catch (err) {
        setError("Backend not reachable");
      }
    }, 1000); // 🔥 every second

    return () => clearInterval(interval);
  }, []);

  const latest = data[0];

  return (
    <div className="page">
      <h2>Live Flood Activity</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {latest && (
        <div className={`status-card ${latest.stage.toLowerCase()}`}>
          <h3>{latest.stage}</h3>
          <p><strong>Water Level:</strong> {latest.water_level_cm} cm</p>
          <p><strong>Percentage:</strong> {latest.percentage.toFixed(1)}%</p>
          <small>
            Updated: {new Date(latest.timestamp).toLocaleTimeString()}
          </small>
        </div>
      )}

      <ActivityChart data={data.slice().reverse()} />
    </div>
  );
}
