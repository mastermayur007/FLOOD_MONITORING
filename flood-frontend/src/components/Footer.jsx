import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h4>FloodMonitor</h4>
          <p>Simple IoT flood detection demo</p>
        </div>

        <div className="footer-right">
          © 2026 FloodMonitor — Built with React + Django
        </div>
      </div>
    </footer>
  );
}
