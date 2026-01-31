import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4>FloodMonitor</h4>
          <p>IoT-based flood detection and awareness platform.</p>
        </div>

        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/activity">Activity</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5>Disclaimer</h5>
          <p>
            This system is for educational and monitoring purposes.
            Always follow official disaster management advisories.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FloodMonitor | Built with React & Django
      </div>
    </footer>
  );
}
