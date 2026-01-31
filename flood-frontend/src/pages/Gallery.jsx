export default function Gallery() {
  return (
    <div className="page">
      <h2>Gallery</h2>

      <div className="gallery-grid">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="gallery-item">
            gallery-{i}
          </div>
        ))}
      </div>
    </div>
  );
}
