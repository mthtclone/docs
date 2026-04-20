---
title: Site-Wide Structured Data Architecture for International Leadership Collège
layout: layouts/doc.njk
--- 

This document defines the structured data (JSON-LD) architecture used across the International Leadership Collège website. Its purpose is to ensure that every page contributes to a single, consistent, machine-readable knowledge graph that search engines (especially Google) can interpret as one coherent institutional entity rather than isolated pages.

The goal of this system is not only SEO compliance, but entity consolidation so that International Leadership Collège is understood by search engines as a single authoritative organization with clearly connected web properties, locations, and informational pages.

### Core Entity Model

At the center of this architecture is one principle: everything connects back to a single canonical institution entity.

We define a primary entity representing the college, and every page on the website references it instead of redefining it independently. This avoids duplication, fragmentation, and conflicting signals.

The core entity is always:

```json
{
  "@type": "CollegeOrUniversity",
  "@id": "https://ilu.edu.mm/#institution",
  "name": "International Leadership Collège"
}
```

This `@id` acts as the global identity key across the entire site. Every schema object that refers to the college must reference this identifier rather than recreating the institution details.

```json
"@id": "https://ilu.edu.mm/#institution"
```

This ensures that Google does not treat pages as separate entities, but instead consolidates all signals under one institutional identity.

### Website Layer (Root Graph Node)

Every page on the site is connected through a shared WebSite entity. This represents the domain-level structure and serves as a parent container for all web pages

```json
{
  "@type": "WebSite",
  "@id": "https://ilu.edu.mm/#website",
  "url": "https://ilu.edu.mm/",
  "name": "International Leadership Collège",
  "publisher": {
    "@id": "https://ilu.edu.mm/#institution"
  }
}
```

The `WebSite` node ensures that all pages belong to a unified digital ecosystem rather than independent documents.

### WebPage Layer (Page-Level Identity)

Each page defines itself as a WebPage entity. This layer describes the page’s purpose while linking it to both the website and the institution.

A standard page structure follows this pattern:

```json
{
  "@type": "WebPage",
  "@id": "https://ilu.edu.mm/admissions#webpage",
  "url": "https://ilu.edu.mm/admissions",
  "name": "Admissions | International Leadership Collège",
  "isPartOf": {
    "@id": "https://ilu.edu.mm/#website"
  },
  "about": {
    "@id": "https://ilu.edu.mm/#institution"
  },
  "publisher": {
    "@id": "https://ilu.edu.mm/#institution"
  }
}
```

This tri-linking approach strengthens entity clarity for search engines.

### Supporting Entities

#### ContactPoint

Each page (or globally in the graph) may include a contact node for structured communication data.

```json
{
  "@type": "ContactPoint",
  "contactType": "Admissions Office",
  "telephone": "+959979515199",
  "email": "communication.department@ilu.edu.mm",
  "availableLanguage": ["English", "Burmese"]
}
```

This is not page-specific and is typically reused across the entire site graph.

#### Breadcrumb Structure

Breadcrumbs are implemented per page but must remain consistent in structure. They define navigational hierarchy rather than entity relationships.

```json
{
  "@type": "BreadcrumbList",
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
      "item": "https://ilu.edu.mm/admissions"
    }
  ]
}
```

Breadcrumbs should never be used to represent entities; they only represent navigation.

#### FAQPage 

FAQ schemas are only used on pages where the content is also visible to users. Each FAQPage must remain independent per page and should not reference unrelated entities.

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I apply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can apply through the admissions page."
      }
    }
  ]
}
```
FAQ data is intentionally localized to the page level and is not part of the global entity graph.

<hr>

<div class="note">
These schemas are extensive and cannot be fully covered in a single document. For implementation of new or advanced schema types, it is strongly recommended to regularly refer to the official documentation.
</div>

[Schema.org](https://schema.org/){.link-special}
[Schema validator](https://validator.schema.org/){.link-special}  [Google Rich Results Test](https://search.google.com/test/rich-results){.link-special}