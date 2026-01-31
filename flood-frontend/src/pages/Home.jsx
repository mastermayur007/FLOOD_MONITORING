import { useEffect, useState } from "react";
import { fetchLiveData } from "../api/api";
import StatusCard from "../components/StatusCard";
import ActivityChart from "../components/ActivityChart";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const latest = data[0];

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetchLiveData();
        setData(res);
      } catch (err) {
        console.error("Backend not reachable");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="home">

        {/* HERO */}
<section className="hero">
  <div className="hero-container">

    <div className="hero-left">
      <h1>Flood Monitoring & Disaster Awareness System</h1>
      <p>
        Real-time monitoring of water levels using IoT sensors,
        backend analytics, and live dashboards.
      </p>

      <div className="hero-actions">
        <a href="/activity" className="btn primary">View Live Activity</a>
        <a href="/contact" className="btn secondary">Safety Guidelines</a>
      </div>
    </div>

    <div className="hero-right">
      <h3>Why This Matters</h3>
      <p>
        Early flood detection helps reduce damage, save lives,
        and support faster emergency response.
      </p>
    </div>

  </div>
</section>
        {/* LIVE STATUS */}
       {/* CURRENT STATUS */}
<section className="dashboard-section status-section">
  <div className="section-inner">
    <h2 className="section-title">Current Flood Status</h2>

    {latest ? (
      <div className="card-grid">
        <StatusCard data={latest} />
      </div>
    ) : (
      <p className="section-muted">Waiting for live data…</p>
    )}
  </div>
</section>

{/* LIVE GRAPH */}
<section className="dashboard-section trend-section">
  <div className="section-inner">
    <h2 className="section-title">Live Water Level Trend</h2>
    <p className="section-desc">
      Real-time visualization of water level changes captured by the system.
    </p>

    <div className="chart-wrapper">
      <ActivityChart data={data.slice().reverse().slice(-12)} />
    </div>
  </div>
</section>

{/* SAFETY INSTRUCTIONS */}
<section className="dashboard-section safety-section">
  <div className="section-inner">
    <h2 className="section-title">Flood Safety Guidelines</h2>

    <div className="info-grid">
      <div className="info-card">
        <h3>Before Flood</h3>
        <ul>
          <li>Monitor official flood alerts regularly</li>
          <li>Prepare emergency kits and documents</li>
          <li>Identify safe evacuation routes</li>
        </ul>
      </div>

      <div className="info-card">
        <h3>During Flood</h3>
        <ul>
          <li>Move to higher ground immediately</li>
          <li>Avoid walking or driving through water</li>
          <li>Turn off electricity and gas supply</li>
        </ul>
      </div>

      <div className="info-card">
        <h3>After Flood</h3>
        <ul>
          <li>Avoid contaminated floodwater</li>
          <li>Inspect structures before entering</li>
          <li>Follow official recovery instructions</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* AWARENESS */}
<section className="dashboard-section awareness-section">
  <div className="section-inner">
    <h2 className="section-title">Why This System Matters</h2>

    <div className="feature-grid">
      <div className="feature-card">
        <h4>Early Warning</h4>
        <p>
          Timely flood alerts significantly reduce loss of life and damage.
        </p>
      </div>

      <div className="feature-card">
        <h4>Community Safety</h4>
        <p>
          Helps authorities and citizens take informed, preventive actions.
        </p>
      </div>

      <div className="feature-card">
        <h4>Scalable Design</h4>
        <p>
          Designed to support multiple sensors and large geographic regions.
        </p>
      </div>
    </div>
  </div>
</section>
      </main>

      <Footer />
    </>
  );
}
