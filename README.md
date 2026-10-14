# saianirudhB.github.io

Personal portfolio website for **Sai Anirudh Boorla** — DevOps Engineer (AWS, Docker, Kubernetes, Terraform, CI/CD).

Live at **https://saianirudhb.github.io/**

## Tech stack

Plain, dependency-free static web — no framework, no build step:

- **HTML5** — a single semantic `index.html` (header/nav, hero, about, skills, experience, projects, education, contact)
- **CSS3** — custom styles in `styles.css` (CSS variables, Flexbox/Grid, a Google Font, scroll-reveal transitions, a mobile breakpoint). No CSS framework.
- **Vanilla JavaScript** — `script.js` handles the mobile nav toggle, scroll-reveal via `IntersectionObserver`, and the footer year. No libraries, no bundler.
- **GitHub Actions** — `.github/workflows/ci.yml` runs on every push/PR: HTML validation (`html-validate`) and an internal link/anchor check (`scripts/check-links.js`).

## Deployment

This repo is a `<username>.github.io` repository, so GitHub Pages serves it directly from the `main` branch root — there is no build step and no publish branch to manage. Pushing to `main` is the deploy.

## Local development

No install required. From the project root, serve the directory with any static file server, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or, with Node:

```bash
npx serve .
```

## Project structure

```
.
├── index.html                  # page content/structure
├── styles.css                  # all styling
├── script.js                   # nav toggle, scroll-reveal, footer year
├── assets/
│   └── favicon.svg             # SVG "SB" monogram favicon
├── scripts/
│   └── check-links.js          # CI: verifies internal anchors & local refs resolve
├── .github/workflows/ci.yml    # CI: html-validate + link check on push/PR
├── LICENSE
└── README.md
```

## Contact

- Email: saianirudhboorla2001@gmail.com
- GitHub: [github.com/saianirudhB](https://github.com/saianirudhB)
- LinkedIn: [linkedin.com/in/sai-anirudh-boorla2001](https://linkedin.com/in/sai-anirudh-boorla2001)
