import { useState } from "react";
import axios from "axios";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "online",
    city: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // Rajkot warning
    if (updated.type === "offline" && updated.city.toLowerCase() !== "rajkot") {
      alert("⚠️ Offline meeting only available in Rajkot");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/booking",
        form
      );

      alert("✅ " + res.data.msg);

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: "400px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />

      <select name="type" onChange={handleChange}>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      <input name="city" placeholder="City" onChange={handleChange} required />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />

      <button style={{
        background: "#ff3b3b",
        color: "white",
        padding: "10px",
        border: "none",
        cursor: "pointer"
      }}>
        Book Now
      </button>
    </form>
  );
}