---
title: Changelog
layout: layouts/doc.njk
---

This document records technical observations, fixes, and decisions made during routine maintenance and optimization of the college website.

All fixes and changes must be documented here and be verifiable via commit logs and issue tracking.

<div class="note">
<img src="/assets/img/notes.svg" />

Changes/commits for the internal documentation itself does not belong here.

</div>

> Implementation details are available in the source code.  
> Repository history and issue records are maintained under the **[ILC-Website Project](https://github.com/ILC-IT-department/ILC-Website)**.

---

# Jan 30, 2026

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

## Jan 28, 2026

- Fix ilu.edu.mm/site/userlogin/ routing error from internal PHP error
- Modified .htaccess to check site2/login is working
- Modified .htaccess to check site2/login is working

## Jan 24, 2026

- Reusable Navbar, and Footer Vue components
- Animation sections with muv.js library
- Incorporate Vite build tool, and produce /dist folder to host on the server
- Edit .htacess for pretty URLs

---

## Jan 17, 2026

- Fix the footer of Apply, Contact, and Academic (programmes) pages

---

## Jan 15, 2026

- Remove pictures related to Rector and Chairman temporarily
- Remove all JS files, and use dump-down muv.js library for animation
- All dropdown for interested programme in Admission Form
- Remove Name, Phone Number, Interested Programme fields from the Contact Us Form
- Change all phone number and email to that of Communication Department

---

## Jan 14, 2026

- Initial Commit
