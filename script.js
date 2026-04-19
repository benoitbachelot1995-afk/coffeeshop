const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const year = document.querySelector("#year");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-card");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((element) => observer.observe(element));

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = contactForm.querySelector("button");

    if (!button) return;

    button.textContent = "Merci, nous revenons vers vous";
    button.disabled = true;
  });
}
