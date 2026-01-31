import "../styles/gallery.css";

// Import images
import img1 from "../assets/gallery/img1.jpg";
import img2 from "../assets/gallery/img2.jpg";
import img3 from "../assets/gallery/img3.jpg";
import img4 from "../assets/gallery/img4.jpeg";
import img5 from "../assets/gallery/img5.jpeg";
import img6 from "../assets/gallery/img6.jpg";
import img7 from "../assets/gallery/img7.jpg";
// import img8 from "../assets/gallery/img8.jpg";
// import img9 from "../assets/gallery/img9.jpg";
// import img10 from "../assets/gallery/img10.jpg";
// import img11 from "../assets/gallery/img11.jpg";
// import img12 from "../assets/gallery/img12.jpg";

const images = [
  { src: img1, title: "Sensor Installation" },
  { src: img2, title: "River Monitoring Point" },
  { src: img3, title: "ESP32 Hardware Setup" },
  { src: img4, title: "Ultrasonic Sensor Testing" },
  { src: img5, title: "Backend Dashboard" },
  { src: img6, title: "Live Water Level Graph" },
  { src: img7, title: "Flood Alert Status" },
  // { src: img8, title: "Admin Panel Records" },
  // { src: img9, title: "Project Deployment" },
  // { src: img10, title: "System Architecture" },
  // { src: img11, title: "Data Visualization" },
  // { src: img12, title: "Final Prototype Demo" },
];

export default function Gallery() {
  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <h1>Project Gallery</h1>
        <p>
          Visual documentation of hardware setup, system development,
          and real-time flood monitoring implementation.
        </p>
      </section>

      <section className="gallery-section">
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-card" key={index}>
              <img src={img.src} alt={img.title} />
              <div className="gallery-caption">
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
