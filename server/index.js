import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("Server is Running ✅");
});

/* ===== BOOKING API ===== */
app.post("/api/bookings", async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  const { data, error } = await supabase.from("bookings").insert([
    { name, email, phone, address, message }
  ]);

  if (error) return res.status(500).json(error);
  res.json({ success: true });
});

/* ===== GET BOOKINGS FOR ADMIN ===== */
app.get("/api/bookings", async (req, res) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json(error);
  res.json(data);
});

/* ===== SAVE REVIEW ===== */
app.post("/api/reviews", async (req, res) => {
  const { name, review } = req.body;

  const { data, error } = await supabase.from("reviews").insert([
    { name, review }
  ]);

  if (error) return res.status(500).json(error);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
