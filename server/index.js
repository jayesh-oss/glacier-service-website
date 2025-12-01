require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Supabase Connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ TEST ROUTE
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend working ✅" });
});

// ✅ SAVE BOOKING
app.post("/api/booking", async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  const { error } = await supabase.from("bookings").insert([
    { name, email, phone, address, message }
  ]);

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  res.json({ success: true });
});

// ✅ GET ALL BOOKINGS (ADMIN)
app.get("/api/bookings", async (req, res) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  res.json(data);
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
