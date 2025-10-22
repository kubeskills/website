
document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL path
    var path = window.location.pathname;

    // Remove the leading slash (if present) from the path
    var page = path.replace(/^\/+/g, '');

    // Get all the navigation links
    var navLinks = document.querySelectorAll("nav ul li a");

    // Loop through the links and add the "selected" class to the active link
    navLinks.forEach(function (link) {
        var linkPath = link.getAttribute("href");

        // Remove the leading slash (if present) from the linkPath
        linkPath = linkPath.replace(/^\/+/g, '');

        // Check if the current page exactly matches the link path
        if (page === linkPath) {
            link.classList.add("selected");
        }
    });
});
