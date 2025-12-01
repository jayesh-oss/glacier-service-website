async function submitBooking() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !phone || !address || !message) {
    alert("Please fill all fields ❌");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, address, message })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Booking Successful");
      document.getElementById("bookingForm").reset();
    } else {
      alert("❌ Booking Failed");
    }
  } catch (err) {
    alert("❌ Server Error");
  }
}
