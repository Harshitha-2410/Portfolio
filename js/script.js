const WHATSAPP_NUMBER = "919948604044";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a section.
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Filter the project cards by category.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.filter;
    projectCards.forEach(card => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

// The contact form opens WhatsApp with the visitor's enquiry.
// A backend is not required for this simple static-site workflow.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const phone = form.get("phone").trim();
  const message = form.get("message").trim();

  const text = `Hello, I would like to enquire about your construction services.\\n\\nName: ${name}\\nPhone: ${phone}\\nProject details: ${message}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();
