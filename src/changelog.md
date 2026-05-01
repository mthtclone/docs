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

<details class="archived-accordion">
  <summary>Archived Issues</summary>

  <ul>
    <li>
      Replace Rubik with Inter for consistent typography in UI headings
      <a class="issue-tag archived" href="https://github.com/ILC-IT-department/ILC-Website/issues/48">#48</a>
    </li>

    <li>
      Prefer System Fonts over League Spartan for Readability in Body Text
      <a class="issue-tag archived" href="https://github.com/ILC-IT-department/ILC-Website/issues/54">#54</a>
    </li>

  </ul>
</details>

---

## April 29, 2026 

<div class="branch-tag">direct on main</div>

- <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/commit/37fee423289c51aa7a4525efa8c8458ba09c5783"> fix: format HTML files and with Prettier </a> <span class="build-success"></span>  

<div class="branch-tag">direct on main</div>

- <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/commit/b903d96d6fd82c4872f2863fae090c727e512731"> fix: npm ci failure caused by mismatched package-lock.json and transitive dependencies and remove vendor/ from git tracking</a>  <span class="build-failed"></span>

<div class="branch-tag">from experimental -> on main</div>

- <a class="issue-merge" href="https://github.com/ILC-IT-department/ILC-Website/commit/c53cd3753319d38f932a3840f94ebc405073c4b5"> Merge pull request #55 from ILC-IT-department/experimental </a>  <span class="build-failed"></span>
    - Refer to Pull Request <a href="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/pull/55"> "4/29/2026/ batch update" #55 </a>

---
<div class="branch-tag"> on experimental </div>

[Batch Update] <span class="build-failed"></span>
- Make a custom redirect page for form confirmation <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/8">issue #8</a>
- Refine navbar.vue with secondary navbar (this is version 1) <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/23">issue #23</a>
- Breadcrumb Navigation <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/34">issue #34</a>
- Make a general README file for the repository <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/35">issue #35</a>
- Create a separate layout/design for UFY page specifically <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/36">issue #36</a>
- Add default WIP page for incomplete pages <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/37">issue #37</a>
- Setup ESLint and Prettier for code quality and formatting <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/38">issue #38</a>
- Setup pre-commit hooks (Husky + lin-staged) to enforce code quality <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/39">issue #39</a>
- Setup automated dependency updates using Dependabot <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/40">issue #40</a>
- Accessibility and WAI-ARIA Compliance <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/41">issue #41</a>
- Build custom dropdown web component for admission form <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/43">issue #43</a>
- CSS Tokenization and Design Formalization <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/46">issue #46</a>
- Replace Rubik with Inter for consistent typography in UI headings (ARCHIVED) <a class="issue-tag archived" href="https://github.com/ILC-IT-department/ILC-Website/issues/46">issue #48</a>
- Split Admission Flow and Move Application Form to Dedicated Page <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/49">issue #49</a>
- Draft Accessibility Statement and Footer Improvements <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/52">issue #52</a>
- Prefer System Fonts over League Spartan for Readability in Body Text (ARCHIVED) <a class="issue-tag" href="https://github.com/ILC-IT-department/ILC-Website/issues/54">issue #54</a>

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
