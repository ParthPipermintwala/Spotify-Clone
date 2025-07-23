// Signup page JavaScript functionality
const popup = document.querySelector(".popup");
const popup2 = document.querySelector(".exist");
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
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
}

document
  .getElementById("signupForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");

    let valid = true;

    document.getElementById("nameError").textContent = name.value
      ? ""
      : "Please enter your name.";
    document.getElementById("emailError").textContent =
      email.value.includes("@") ? "" : "Enter a valid email.";
    document.getElementById("passwordError").textContent =
      password.value.length >= 6 ? "" : "At least 6 characters.";
    document.getElementById("confirmError").textContent =
      confirm.value === password.value ? "" : "Passwords do not match.";

    if (
      !name.value ||
      !email.value.includes("@") ||
      password.value.length < 6 ||
      password.value !== confirm.value
    ) {
      valid = false;
    }

    if (valid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const newEmail = email.value.trim().toLowerCase();
      const newUser = {
        name: name.value,
        email: newEmail,
        password: password.value,
      };

      const emailExists = users.some((user) => user.email === newEmail);
      // return true or false
      if (emailExists) {
        popup2.classList.remove("hidden");
        container.classList.add("blur");
        document.body.style.overflow = "hidden";
        localStorage.setItem("isLoggedIn", "false");
      } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        popup.classList.remove("hidden");
        container.classList.add("blur");
        document.body.style.overflow = "hidden";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentName", name.value);
      }
    }
  });
