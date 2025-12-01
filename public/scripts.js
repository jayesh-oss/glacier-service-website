// ✅ BOOKING FORM SUBMIT HANDLER

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !address || !message) {
      alert("❌ Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          message
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Booking submitted successfully!");
        bookingForm.reset();
      } else {
        alert("❌ Booking failed. Try again.");
      }

    } catch (error) {
      console.error(error);
      alert("❌ Server error. Try later.");
    }
  });
}


// ✅ OPTIONAL: CONTACT FORM (If you have a separate one)

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("cname").value.trim();
    const email = document.getElementById("cemail").value.trim();
    const message = document.getElementById("cmessage").value.trim();

    if (!name || !email || !message) {
      alert("❌ Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone: "N/A",
          address: "N/A",
          message
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      } else {
        alert("❌ Failed to send message.");
      }

    } catch (error) {
      console.error(error);
      alert("❌ Server error. Try later.");
    }
  });
}
