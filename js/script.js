// Navbar Scroll Effect
window.addEventListener("scroll", () => {
    document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// Initialize AOS Animations
AOS.init({
    duration: 1200,
    easing: "ease-in-out",
    once: true,
    mirror: false,
});

// Initialize EmailJS
(function () {
    emailjs.init("1Kt_XjMUrudNXcecR");
})();

// Handle Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = this.querySelector("button");
    submitButton.innerHTML = "Sending...";
    submitButton.disabled = true;

    const formData = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        message: this.message.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
        document.getElementById("status-message").innerHTML = "<span class='text-danger'>Please fill out all fields.</span>";
        submitButton.innerHTML = "Send Message";
        submitButton.disabled = false;
        return;
    }

    emailjs.send("service_nlr7o39", "template_uaxzsee", formData)
        .then(() => {
            document.getElementById("status-message").innerHTML = "<span class='text-success'>Message Sent Successfully!</span>";
        })
        .catch(() => {
            document.getElementById("status-message").innerHTML = "<span class='text-danger'>Failed to Send Message!</span>";
        })
        .finally(() => {
            submitButton.innerHTML = "Send Message";
            submitButton.disabled = false;
            document.getElementById("contact-form").reset();
        });
});

// Typing Effect
const words = ["Full Stack Engineer", "MERN | Spring Boot", "Problem Solver"];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
    const textElement = document.getElementById("typing-text");
    const word = words[i];

    textElement.textContent = word.substring(0, j);

    if (!isDeleting && j < word.length) {
        j++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && j > 0) {
        j--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        i = isDeleting ? i : (i + 1) % words.length;
        setTimeout(typeEffect, 2000);
    }
}
typeEffect();

// Theme Toggle
const toggleButton = document.getElementById("theme-toggle");
const navBorder = document.querySelector(".navbar");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const isDarkMode = theme === "dark";
    toggleButton.classList.toggle("btn-outline-dark", !isDarkMode);
    toggleButton.classList.toggle("btn-outline-light", isDarkMode);
    toggleButton.textContent = isDarkMode ? "☀️" : "🌙";
    navBorder.style.borderBottom = isDarkMode ? "1px solid white" : "none";
}

toggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// Apply saved theme
applyTheme(localStorage.getItem("theme") || "light");

// Navbar Auto-Collapse on Mobile
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        document.querySelector(".navbar-collapse").classList.remove("show");
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
