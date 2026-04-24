const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// ✅ CREATE booking (Public)
router.post("/", async (req, res) => {
  try {
    const { name, email, type, city, date, time } = req.body;

    // Basic validation
    if (!name || !email || !type || !city || !date || !time) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Rajkot rule for offline booking
    if (type === "offline" && city.toLowerCase() !== "rajkot") {
      return res.status(400).json({
        msg: "Offline meeting only available in Rajkot"
      });
    }

    const booking = new Booking({
      name,
      email,
      type,
      city,
      date,
      time
    });

    await booking.save();

    res.status(201).json({
      msg: "Booking successful",
      booking
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET all bookings (Protected - Admin only)
router.get("/", auth, async (req, res) => {
  try {
    const data = await Booking.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE booking (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE booking (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ msg: "Booking deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;