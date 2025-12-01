function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u === "admin" && p === "123") {
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid Login");
  }
}
