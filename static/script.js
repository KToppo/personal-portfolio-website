let lastScrollY = window.scrollY;
let hasScrolled = false;

const heroText = document.querySelector(".hero-text");
const heroImage = document.querySelector(".hero-image");
const aboutSection = document.querySelector(".about");

// Allow hero to animate only after first scroll
window.addEventListener(
    "scroll",
    () => {
        hasScrolled = true;
        heroText.classList.remove("no-animate");
        heroImage.classList.remove("no-animate");
    },
    { once: true }
);

// HERO: correct direction-based logic
window.addEventListener("scroll", () => {
    if (!hasScrolled) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY + 10) {
        // scrolling DOWN → hero should GO AWAY
        heroText.classList.remove("animate");
        heroImage.classList.remove("animate");
    }

    if (currentScrollY < lastScrollY - 10 && currentScrollY < 120) {
        // scrolling UP near top → hero should COME BACK
        heroText.classList.add("animate");
        heroImage.classList.add("animate");
    }

    lastScrollY = currentScrollY;
});


const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            } else {
                entry.target.classList.remove("animate");
            }
        });
    },
    { threshold: 0.25 }
);

// Observe sections
document
    .querySelectorAll(".about, .projects")
    .forEach(el => observer.observe(el));

// Observe project cards individually
document
    .querySelectorAll(".project-card")
    .forEach(card => observer.observe(card));



document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const link = card.getAttribute("data-link");
        if (link) {
            window.location.href = link;
        }
    });
});


document.querySelectorAll(".back-to-top").forEach(btn => {
    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


/* ===============================
   NAVBAR TOGGLE (MOBILE)
   =============================== */

const navToggle = document.querySelector(".nav-toggle");
// const navLinks = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}
