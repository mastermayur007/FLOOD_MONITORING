import { useEffect, useState } from "react";
import { fetchLiveData } from "../api/api";
import StatusCard from "../components/StatusCard";

export default function Home() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchLiveData();
      setLatest(data[0]);
    }, 1000); // 🔥 live like Activity

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>Simple flood-risk monitoring for small sites</h1>
          <p>
            Real-time water level monitoring using ESP32 and
            Django backend.
          </p>
        </div>

        <StatusCard data={latest} />
      </section>
    </div>
  );
}
