
document.addEventListener("DOMContentLoaded", function () {
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            var isOpen = navLinks.classList.toggle("is-open");
            navToggle.classList.toggle("active", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                if (navLinks.classList.contains("is-open")) {
                    navLinks.classList.remove("is-open");
                    navToggle.classList.remove("active");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }
});
