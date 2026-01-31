export default function Contact() {
  return (
    <div className="page">
      <h2>Contact</h2>

      <form className="contact-form">
        <input placeholder="Name" />
        <input placeholder="Email" />
        <textarea placeholder="Message"></textarea>
        <button>Send</button>
      </form>
    </div>
  );
}
