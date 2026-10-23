const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const statusMessage = document.getElementById("status-message");
const togglePassword = document.getElementById("toggle-password");

function showError(element, shouldShow) {
  element.hidden = !shouldShow;
}

function setStatus(message, isError) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("is-error", Boolean(isError));
}

togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  togglePassword.textContent = showing ? "Show" : "Hide";
  togglePassword.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  showError(usernameError, username.length === 0);
  showError(passwordError, password.length === 0);

  if (!username || !password) {
    setStatus("Please fill in both fields.", true);
    return;
  }

  // Database aur authentication abhi connect nahi hai.
  // Next phases mein yeh form backend API ko call karega.
  setStatus("Login form ready. Backend authentication next phases mein add hogi.", false);
});
