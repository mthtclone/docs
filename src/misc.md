---
title: Misc
layout: layouts/doc.njk
---

The Misc page serves as a centralized repository for general-purpose resources, reusable templates, and utility code snippets that do not belong to a specific section of the documentation. It includes common HTML structures, reference layouts, and other supporting materials used across the college website

## Template

Copy this generic HTML template when adding new pages.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta
      name="title"
      content="### | International Leadership Collège"
    />
    <meta
      name="description"
      content="###"
    />
    <meta
      name="keywords"
      content="International Leadership Collège, admissions, apply, college application, leadership education, international school"
    />
    <meta name="author" content="International Leadership Collège" />

    <meta name="robots" content="index, follow" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ilu.edu.mm/#" />
    <meta
      property="og:title"
      content="### | International Leadership Collège"
    />
    <meta
      property="og:description"
      content="Start your application to International Leadership Collège. Learn about requirements, deadlines, and how to apply."
    />
    <meta property="og:image" content="https://ilu.edu.mm/img/og-image.jpg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://ilu.edu.mm/#" />
    <meta
      name="twitter:title"
      content="placehold. | International Leadership Collège"
    />
    <meta
      name="twitter:description"
      content="###"
    />
    <meta name="twitter:image" content="https://ilu.edu.mm/img/og-image.jpg" />

    <meta name="theme-color" content="#ff8c31" />

    <link rel="canonical" href="https://ilu.edu.mm/#" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&amp;display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lily+Script+One&amp;display=swap"
    />
    <link rel="stylesheet" href="/src/assets/global.css" />
    <link
      rel="preload"
      href="/src/assets/admission.css"
      as="style"
      onload="this.rel = 'stylesheet'"
    />
    <link rel="preload" href="./assets/apply_resp.css" />

    <link rel="icon" href="/img/favicon.png" type="image/png" />
    <title> placehold. | International Leadership Collège</title>
    <style>
      .no-js-warning {
        background-color: var(--surface-variant);
        color: var(--on-surface);
        padding: var(--space-4);
        text-align: center;
        font-size: var(--text-body);
        font-weight: 500;
        border: 1px solid var(--outline);
        margin: var(--space-4);
      }

      .no-js-warning p {
        margin: 0;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollegeOrUniversity",
            "@id": "https://ilu.edu.mm/#institution",
            "name": "International Leadership Collège",
            "url": "https://ilu.edu.mm/",
            "description": "International Leadership Collège (ILC) is Myanmar’s leading private institution offering internationally accredited degrees in various fields, focused on ASEAN research.",
            "telephone": "+959979515199",
            "email": "communication.department@ilu.edu.mm",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "No.(293), Nguwar Street, Thapyaegone Quarter",
              "addressLocality": "Zabuthiri Township",
              "addressRegion": "Naypyitaw",
              "postalCode": "15011",
              "addressCountry": "MM"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Myanmar"
            }
          },

          {
            "@type": "WebSite",
            "@id": "https://ilu.edu.mm/#website",
            "url": "https://ilu.edu.mm/",
            "name": "International Leadership Collège",
            "publisher": {
              "@id": "https://ilu.edu.mm/#institution"
            }
          },

          {
            "@type": "WebPage",
            "@id": "https://ilu.edu.mm/#webpage",
            "url": "https://ilu.edu.mm/#",
            "name": "### | International Leadership Collège",
            "description": "###",
            "inLanguage": "en",

            "isPartOf": {
              "@id": "https://ilu.edu.mm/#website"
            },

            "about": {
              "@id": "https://ilu.edu.mm/#institution"
            },

            "publisher": {
              "@id": "https://ilu.edu.mm/#institution"
            }
          },

          {
            "@type": "ContactPoint",
            "contactType": "Admissions Office",
            "telephone": "+959979515199",
            "email": "communication.department@ilu.edu.mm",
            "availableLanguage": ["English", "Burmese"]
          },

          {
            "@type": "BreadcrumbList",
            "@id": "https://ilu.edu.mm/admissions#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ilu.edu.mm/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Admissions",
                "item": "https://ilu.edu.mm/#"
              }
            ]
          }
        ]
      }
    </script>
  </head>
  <body>
    <noscript>
      <div class="no-js-warning">
        <p>
          This site might fail to render some components with JavaScript
          disabled. Please enable it to browse International Leadership Collège
          website.
        </p>
      </div>
    </noscript>
    <div id="app">
      <navbar-component></navbar-component>
      <main>
        <nav id="breadcrumb" aria-label="Breadcrumb"></nav>
        
      </main>

      <footer-component></footer-component>
    </div>
    <script type="module" src="/main.js"></script>
    <script type="module" src="/src/js/muv.js"></script>
  </body>
</html>
```