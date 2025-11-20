
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

    var latestBlogCard = document.getElementById("latestBlogCard");

    if (latestBlogCard) {
        fetchLatestBlogPost(latestBlogCard);
    }

    function fetchLatestBlogPost(card) {
        var loadingEl = card.querySelector("[data-blog-loading]");
        var dateEl = card.querySelector("[data-blog-date]");
        var titleEl = card.querySelector("[data-blog-title]");
        var excerptEl = card.querySelector("[data-blog-excerpt]");
        var coverImg = card.querySelector("[data-blog-cover]");
        var linkEl = card.querySelector("[data-blog-link]");
        var fallbackUrl = "https://blog.kubeskills.com";
        var query = `
            query LatestKubeskillsPost {
              publication(host: "blog.kubeskills.com") {
                posts(first: 1) {
                  edges {
                    node {
                      title
                      brief
                      url
                      publishedAt
                      coverImage {
                        url
                      }
                    }
                  }
                }
              }
            }
        `;

        if (loadingEl) {
            loadingEl.removeAttribute("hidden");
        }

        fetch("https://gql.hashnode.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: query
            })
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.json();
            })
            .then(function (payload) {
                var edges = payload && payload.data && payload.data.publication && payload.data.publication.posts && payload.data.publication.posts.edges;

                if (!edges || !edges.length) {
                    throw new Error("No posts found");
                }

                var post = edges[0].node;

                if (titleEl && post.title) {
                    titleEl.textContent = post.title;
                }

                if (excerptEl && post.brief) {
                    excerptEl.textContent = truncateText(post.brief, 240);
                }

                if (dateEl) {
                    if (post.publishedAt) {
                        var formattedDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        });
                        dateEl.textContent = "Published " + formattedDate;
                    } else {
                        dateEl.textContent = "New on the blog";
                    }
                }

                if (coverImg && post.coverImage && post.coverImage.url) {
                    coverImg.setAttribute("src", post.coverImage.url);
                    coverImg.setAttribute("alt", "Cover art for " + post.title);
                    coverImg.classList.add("is-visible");
                }

                if (linkEl && post.url) {
                    linkEl.setAttribute("href", post.url);
                    linkEl.setAttribute("target", "_blank");
                    linkEl.setAttribute("rel", "noopener");
                }

                if (loadingEl) {
                    loadingEl.remove();
                }
            })
            .catch(function (error) {
                if (loadingEl) {
                    loadingEl.textContent = "We could not load the latest post. Visit blog.kubeskills.com to explore every article.";
                }

                if (linkEl) {
                    linkEl.setAttribute("href", fallbackUrl);
                    linkEl.textContent = "Visit the blog";
                }

                console.error("Latest blog fetch failed:", error);
            });
    }

    function truncateText(text, maxLength) {
        if (!text) {
            return "";
        }

        if (text.length <= maxLength) {
            return text;
        }

        return text.slice(0, maxLength - 1).trim() + "…";
    }
});
