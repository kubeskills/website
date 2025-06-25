[![Netlify Status](https://api.netlify.com/api/v1/badges/bb8fc772-9629-49e3-8b59-518d73ad803e/deploy-status)](https://app.netlify.com/projects/jolly-babbage-df8b7b/deploys)

# KubeSkills.com — The #1 Kubernetes Learning Community

Welcome to the GitHub repository for [KubeSkills.com](https://kubeskills.com), an open, community-driven platform designed to help learners and professionals skill up in Kubernetes and Cloud Native technologies.

This site is built with [Hugo](https://gohugo.io), styled with Bootstrap, and deployed on [Netlify](https://netlify.com). It features a custom theme and is designed for performance, accessibility, and clarity.

---

## 🚀 Overview

KubeSkills.com provides:

- 🧠 **Educational content** on Kubernetes, containers, DevOps, and cloud-native tools
- 📬 A **newsletter signup** via ConvertKit for community updates
- 🎥 Embedded **video hero section**
- 💡 A pricing and courses page with detailed offerings
- 🌐 External redirects to the [blog](https://blog.kubeskills.com) and [community platform](https://community.kubeskills.com)

---

## 📂 Project Structure

```bash
.
├── content/                # Markdown content files
│   └── courses/            # Course descriptions and pricing
├── layouts/               # Custom HTML templates
│   ├── _default/          # baseof.html, single.html
│   ├── courses/           # list.html for courses landing page
│   └── partials/          # nav.html, footer.html, etc.
├── static/                # Static assets (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── themes/                # Custom theme (optional)
├── netlify.toml           # Netlify deployment config
└── hugo.toml              # Site configuration
