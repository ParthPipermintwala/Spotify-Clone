// Support page JavaScript functionality
document
  .getElementById("supportForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      document.getElementById(
        "responseMsg"
      ).textContent = `Thanks, ${name}. We'll get back to you shortly.`;
      document.getElementById("supportForm").reset();
    } else {
      document.getElementById("responseMsg").textContent =
        "Please fill out all fields.";
    }
  });
