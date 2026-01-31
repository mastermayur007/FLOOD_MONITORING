import "../styles/contact.css";

export default function Contact() {
  return (
    <main className="contact-page">
      
      {/* HEADER */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Reach out for feedback, collaboration, or emergency-related
          information regarding the flood monitoring system.
        </p>
      </section>

      {/* FORM SECTION */}
      <section className="contact-section">
        <div className="contact-container">

          {/* FORM */}
          <form className="contact-form">
            <h2>Send a Message</h2>

            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email address" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here"
              ></textarea>
            </div>

            <button type="submit" className="btn primary">
              Submit Message
            </button>
          </form>

          {/* INFO */}
          <div className="contact-info">
            <h3>Why Contact Us?</h3>
            <p>
              This platform is designed to support flood monitoring,
              early warning, and disaster awareness.
            </p>

            <ul>
              <li>📍 Project Type: IoT & Web System</li>
              <li>📡 Data Source: Sensors & Simulation</li>
              <li>🛠 Technology: ESP32, Django, React</li>
            </ul>
          </div>

        </div>
      </section>

    </main>
  );
}
