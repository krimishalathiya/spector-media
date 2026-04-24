import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", background: "#0f0f0f", color: "white" }}>
      
      {/* 🔴 HERO SECTION */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", color: "#ff3b3b" }}>
          SPECTOR MEDIA
        </h1>
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Digital Marketing That Actually Brings Results 🚀
        </p>
        <button style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#ff3b3b",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}>
          Book Appointment
        </button>
      </section>

      {/* 🧠 ABOUT */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>About Us</h2>
        <p style={{ maxWidth: "700px", margin: "auto" }}>
          We help brands grow using powerful digital strategies.
          From social media marketing to performance ads,
          we turn attention into revenue.
        </p>
      </section>

      {/* ⚙️ SERVICES */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Our Services</h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          {["Social Media Marketing", "Paid Ads", "Branding"].map((s, i) => (
            <div key={i} style={{
              background: "#1a1a1a",
              padding: "20px",
              width: "250px",
              borderRadius: "10px"
            }}>
              <h3>{s}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 📅 BOOKING FORM */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Book a Meeting</h2>
        <BookingForm />
      </section>

    </div>
  );
}