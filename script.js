const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const year = document.querySelector("#year");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-card");
const driftingBlocks = document.querySelectorAll("[data-drift]");

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

driftingBlocks.forEach((block) => {
  block.addEventListener("pointermove", (event) => {
    const bounds = block.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    const rotateY = (offsetX / bounds.width) * 4;
    const rotateX = (offsetY / bounds.height) * -4;

    block.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  block.addEventListener("pointerleave", () => {
    block.style.transform = "";
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = contactForm.querySelector("button");

    if (!button) return;

    button.textContent = "Merci, nous revenons vers vous";
    button.disabled = true;
  });
}
