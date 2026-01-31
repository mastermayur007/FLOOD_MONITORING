import { useEffect, useState, useRef } from "react";
import alertSound from "../assets/alert.mp3";
import { fetchLiveData } from "../api/api";
import "../styles/activity.css";
import EnvChart from "../components/EnvChart";


export default function Activity() {
  const [data, setData] = useState([]);
  const latest = data[0];
  const audioRef = useRef(new Audio(alertSound));
  const [alertActive, setAlertActive] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveData()
        .then(setData)
        .catch(() => {});
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  if (latest?.stage === "DANGER") {
    if (!alertActive) {
      audioRef.current.play().catch(() => {});
      setAlertActive(true);
    }
  } else {
    setAlertActive(false);
  }
}, [latest, alertActive]);


  return (
    <main className="activity-page">
      {latest?.stage === "DANGER" && (
  <div className="alert-banner">
    🚨 DANGER ALERT: Water level critical! Drainage system activated.
  </div>
)}
      {/* HEADER */}
      <section className="activity-header">
        <h1>Live Flood Activity</h1>
        <p>Real-time monitoring of flood and environmental conditions</p>
      </section>

      {/* STATUS CARDS */}
      {latest && (
        <section className="status-grid">

          <div className="status-card">
            <h4>Water Level</h4>
            <p>{latest.water_level_cm} cm</p>
          </div>

          <div className="status-card">
            <h4>Flood Stage</h4>
            <span className={`badge ${latest.stage.toLowerCase()}`}>
              {latest.stage}
            </span>
          </div>

          <div className="status-card">
            <h4>Temperature</h4>
            <p>{latest.temperature ?? "--"} °C</p>
          </div>

          <div className="status-card">
            <h4>Humidity</h4>
            <p>{latest.humidity ?? "--"} %</p>
          </div>

          <div className="status-card">
            <h4>Motor Status</h4>
            <span
              className={`badge ${
                latest.motor_status === "ON" ? "danger" : "normal"
              }`}
            >
              {latest.motor_status}
            </span>
          </div>

        </section>
      )}

      {/* ACTIVITY TABLE */}
      <section className="activity-table-section">
        <h2>Recent Activity Log</h2>

        <table className="activity-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Water (cm)</th>
              <th>Stage</th>
              <th>Temp (°C)</th>
              <th>Humidity (%)</th>
              <th>Motor</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{new Date(row.timestamp).toLocaleTimeString()}</td>
                <td>{row.water_level_cm}</td>
                <td>
                  <span className={`badge ${row.stage.toLowerCase()}`}>
                    {row.stage}
                  </span>
                </td>
                <td>{row.temperature ?? "--"}</td>
                <td>{row.humidity ?? "--"}</td>
                <td>
                  <span
                    className={`badge ${
                      row.motor_status === "ON" ? "danger" : "normal"
                    }`}
                  >
                    {row.motor_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* ENVIRONMENT GRAPH */}
<section className="activity-table-section">
  <h2>Temperature & Humidity Trend</h2>
  <EnvChart data={data.slice().reverse().slice(-12)} />
</section>


    </main>
  );
}
