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

- Fix broken /home.html link in navbar <span class="pill fix">FIX</span><span class="pill frontend">FRONTEND</span><span class="pill bug">BUG</span>
- Correct phone number on Contact Us page <span class="pill content">CONTENT</span><span class="pill fix">FIX</span>
- Add PhD, MBA, and Language options in admission dropdown <span class="pill ui">UI</span><span class="pill feature">FEATURE</span><span class="pill frontend">FRONTEND</span>
- Add abbreviation tags to program options in admission dropdown <span class="pill ui">UI</span><span class="pill frontend">FRONTEND</span><span class="pill accessibility">ACCESSIBILITY</span>
- Add meta tags to home page <span class="pill infra">INFRA</span><span class="pill frontend">FRONTEND</span>
- Generate sitemap.xml for userflow at build time <span class="pill infra">INFRA</span><span class="pill data">DATA</span>
- Create status pages <span class="pill doc">DOC</span><span class="pill feature">FEATURE</span><span class="pill frontend">FRONTEND</span>
- Add favicons <span class="pill ui">UI</span><span class="pill frontend">FRONTEND</span>
- Refine `footer.vue` for modern look <span class="pill ui">UI</span><span class="pill frontend">FRONTEND</span><span class="pill design">DESIGN</span>

---

## Jan 28, 2026

- Fix ilu.edu.mm/site/userlogin/ routing error from internal PHP error <span class="pill fix">FIX</span><span class="pill backend">BACKEND</span><span class="pill bug">BUG</span><span class="pill infra">INFRA</span>
- Modified .htaccess to check site2/login is working <span class="pill infra">INFRA</span><span class="pill backend">BACKEND</span><span class="pill fix">FIX</span>
- Modified .htaccess to check site2/login is working <span class="pill infra">INFRA</span><span class="pill backend">BACKEND</span><span class="pill fix">FIX</span>

## Jan 24, 2026

- Reusable Navbar, and Footer Vue components <span class="pill frontend">FRONTEND</span><span class="pill refactor">REFACTOR</span><span class="pill feature">FEATURE</span>
- Animation sections with muv.js library <span class="pill frontend">FRONTEND</span><span class="pill feature">FEATURE</span><span class="pill experiment">EXPERIMENT</span>
- Incorporate Vite build tool, and produce /dist folder to host on the server <span class="pill infra">INFRA</span><span class="pill devops">DEVOPS</span><span class="pill frontend">FRONTEND</span>
- Edit .htacess for pretty URLs <span class="pill infra">INFRA</span><span class="pill backend">BACKEND</span>

---

## Jan 17, 2026

- Fix the footer of Apply, Contact, and Academic (programmes) pages <span class="pill fix">FIX</span><span class="pill frontend">FRONTEND</span><span class="pill bug">BUG</span>

---

## Jan 15, 2026

- Remove pictures related to Rector and Chairman temporarily <div class="pill-group"><span class="pill content">CONTENT</span><span class="pill frontend">FRONTEND</span><span class="pill fix">FIX</span></div>

- Remove all JS files, and use dump-down muv.js library for animation <span class="pill frontend">FRONTEND</span><span class="pill refactor">REFACTOR</span><span class="pill infra">INFRA</span><span class="pill performance">PERFORMANCE</span>

- All dropdown for interested programme in Admission Form <span class="pill ui">UI</span><span class="pill frontend">FRONTEND</span><span class="pill feature">FEATURE</span>

- Remove Name, Phone Number, Interested Programme fields from the Contact Us Form <span class="pill content">CONTENT</span><span class="pill frontend">FRONTEND</span><span class="pill fix">FIX</span>

- Change all phone number and email to that of Communication Department <span class="pill content">CONTENT</span><span class="pill frontend">FRONTEND</span><span class="pill fix">FIX</span>

---

## Jan 14, 2026

- Initial Commit <span class="pill doc">DOC</span>
