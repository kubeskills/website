
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
    var cookieBanner = document.getElementById("cookieBanner");
    var acceptButton = document.getElementById("cookieAcceptButton");
    var declineButton = document.getElementById("cookieDeclineButton");

    function hideCookieBanner() {
        if (!cookieBanner) {
            return;
        }

        if (!cookieBanner.classList.contains("is-hidden")) {
            cookieBanner.classList.add("is-hidden");
            cookieBanner.setAttribute("aria-hidden", "true");
        }
    }

    if (cookieBanner) {
        var storedConsent = localStorage.getItem("kubeskills-cookie-consent");

        if (!storedConsent) {
            requestAnimationFrame(function () {
                cookieBanner.classList.remove("is-hidden");
                cookieBanner.setAttribute("aria-hidden", "false");
            });
        } else {
            cookieBanner.setAttribute("aria-hidden", "true");
        }

        if (acceptButton) {
            acceptButton.addEventListener("click", function () {
                localStorage.setItem("kubeskills-cookie-consent", "accepted");
                hideCookieBanner();
            });
        }

        if (declineButton) {
            declineButton.addEventListener("click", function () {
                localStorage.setItem("kubeskills-cookie-consent", "declined");
                hideCookieBanner();
            });
        }
    }
});
