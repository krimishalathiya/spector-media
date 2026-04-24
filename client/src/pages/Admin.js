import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState([]);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      fetchData();
    }
  }, []);

  // 📥 Fetch bookings
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/booking",
        {
          headers: { Authorization: token }
        }
      );

      setData(res.data);
    } catch (err) {
      alert("Error fetching data");
    }
  };

  // ❌ Delete booking
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/booking/${id}`,
        {
          headers: { Authorization: token }
        }
      );

      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✏️ Update booking
  const handleUpdate = async (id) => {
    try {
      const newCity = prompt("Enter new city:");

      if (!newCity) return;

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/booking/${id}`,
        { city: newCity },
        {
          headers: { Authorization: token }
        }
      );

      fetchData();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#0f0f0f",
        color: "white",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {data.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          data.map((b) => (
            <div
              key={b._id}
              style={{
                background: "#1a1a1a",
                padding: "20px",
                borderRadius: "12px",
                width: "260px",
                boxShadow: "0 0 10px rgba(255,0,0,0.2)"
              }}
            >
              <p><b>{b.name}</b></p>
              <p>{b.email}</p>
              <p>{b.city}</p>
              <p>{b.type}</p>
              <p>
                {b.date?.slice(0, 10)} | {b.time}
              </p>

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleDelete(b._id)}
                  style={{
                    background: "red",
                    border: "none",
                    color: "white",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "5px"
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(b._id)}
                  style={{
                    background: "#ff3b3b",
                    border: "none",
                    color: "white",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "5px"
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}