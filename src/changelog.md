---
title: Changelog
layout: layouts/doc.njk
---
This document records technical observations, fixes, and decisions made during routine maintenance and optimization of the college website.  

All fixes and changes must be documented here and be verifiable via commit logs and issue tracking.

Changes/commits for the internal documentation itself does not belong here.{.warning}

> Implementation details are available in the source code.  
> Repository history and issue records are maintained under the **[ILC-Website Project](https://github.com/ILC-IT-department/ILC-Website)**.

---

## Jan 30, 2026

- Fix broken /home.html link in navbar
- Correct phone number on Contact Us page
- Add PhD, MBA, and Language options in admission dropdown
- Add abbreviation tags to program options in admission dropdown
- Add meta tags to home page
- Generate sitemap.xml for userflow at build time
- Create status pages
- Add favicons
- Refine `footer.vue` for modern look

---

## Jan 24, 2026

- Reusable Navbar and Footer Vue Components
- Animate sections with `muv.js` library
- Incorporate Vite build tools and produce `/dist` folder for deployment
- Edit `.htaccess` for pretty URLs

---

## Jan 17, 2026

- Fix the footer of Apply, Contact, and Academic (programmes) pages

---

## Jan 15, 2026

- Remove pictures related to Rector and Chairman temporarily

---

## Jan 14, 2026

- Initial Commit