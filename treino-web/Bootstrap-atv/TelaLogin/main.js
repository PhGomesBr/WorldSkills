// Pega elementos do HTML
const html = document.getElementById("htmlPage");
const checkbox = document.getElementById("checkbox");
const btnLogin = document.getElementById("btnLogin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Alterna Dark / Light Mode
checkbox.addEventListener("change", () => {
  html.setAttribute(
    "data-bs-theme",
    checkbox.checked ? "dark" : "light"
  );
});

// Validação simples de login
btnLogin.addEventListener("click", () => {
  if (
    emailInput.value === "admin@exemple" &&
    passwordInput.value === "admin"
  ) {
    // Login correto → vai para outra página
    window.location.href = "home.html";
  } else {
    // Login incorreto
    alert("Email ou senha incorretos");
  }
});
