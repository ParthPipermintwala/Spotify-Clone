// Login page JavaScript functionality
var userData = JSON.parse(localStorage.getItem("users")) || [];
const popup = document.querySelector(".popup");
const popup2 = document.querySelector(".not-exist");
const container = document.querySelector(".container");
const closeBtn = document.querySelectorAll(".close");

closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup2.classList.add("hidden");
    container.classList.remove("blur");
    document.body.style.overflow = "auto"; // Restore scrolling
  });
});

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const type =
    passwordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordInput.setAttribute("type", type);
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const emailvalue = document.querySelector("#email").value;
    const passwordvalue = document.querySelector("#password").value;

    let valid = true;

    if (!email.value || !email.value.includes("@")) {
      emailError.textContent = "Please enter a valid email.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    if (!password.value || password.value.length < 6) {
      passwordError.textContent =
        "Password must be at least 6 characters.";
      valid = false;
    } else {
      passwordError.textContent = "";
    }

    if (valid) {
      const userFound = userData.some((user) => {
        if (user.email == emailvalue && user.password == passwordvalue) {
          localStorage.setItem("currentNameLogin", user.name);
          popup.classList.remove("hidden");
          container.classList.add("blur");
          document.body.style.overflow = "hidden";
          localStorage.setItem("isLoggedIn", "true");
          return true;
        }
      });

      if (!userFound) {
        popup2.classList.remove("hidden");
        container.classList.add("blur");
        document.body.style.overflow = "hidden";
        localStorage.setItem("isLoggedIn", "false");
      }
    }
  });
