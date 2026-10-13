
const pageButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

function showPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target) return;

  pages.forEach((page) => {
    const isActive = page.id === pageId;

    page.classList.toggle("active", isActive);
    page.hidden = !isActive;
  });

  pageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });

  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Navigation buttons
pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// Buttons inside the home page
document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

// German and Russian translations
function setLanguage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-de][data-ru]").forEach((element) => {
    element.textContent =
      language === "ru"
        ? element.dataset.ru
        : element.dataset.de;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === language;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

// Language buttons
document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

// Mobile menu
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Current year in the footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Start in German
setLanguage("de");
