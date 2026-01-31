import "../styles/card.css";

export default function StatusCard({ data }) {
  if (!data) return null;

  return (
    <div className={`status-card ${data.stage.toLowerCase()}`}>
      <h3>{data.stage}</h3>
      <p className="level">{data.water_level_cm} cm</p>
      <p className="label">Water Level</p>

      <div className="bar">
        <div
          className="fill"
          style={{ width: `${data.percentage}%` }}
        ></div>
      </div>

      <small>
        Updated at {new Date(data.timestamp).toLocaleTimeString()}
      </small>
    </div>
  );
}
