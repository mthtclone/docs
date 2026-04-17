---
layout: layouts/doc.njk
title: Accessibility 
---
## Semantics

Semantic structure is the foundation of web accessibility. It allows assistive technologies (like screen readers) to understand the structure and meaning of a page without relying on visual layout.

A correct semantic structure should always be implemented before adding **ARIA** attributes or custom accessibility workarounds.

All pages must follow a clear and logical document structure:

- Use a single `<h1>` per page to define the main topic
- Follow a consistent heading hierarchy (h1 > h2 > h3 > h4, without skipping levels)
- Group content using meaningful sectioning elements such as `<section>`, `<article>`, and `<aside>` where appropriate
- Avoid using `<div>` for structural meaning when a semantic element exists

Correct semantic structure ensures that assistive technologies can build an accurate outline of the page.

### Landmarks

Landmarks define the main regions of a page and allow users to navigate quickly using assistive technologies.

Every page should include the following primary landmarks, when applicable:

- `<header>` for site or page-level branding/navigation
- `<nav>` for navigation menus
- `<main>` for the primary page content
- `<footer>` for site-wide footer information

Additional landmarks using `role="region"` should only be used when:

- A section is important enough to be navigated independently
- There is a need for an accessible name using aria-label or aria-labelledby
- No appropriate semantic element already exists

Overuse of landmarks should be avoided because it can make navigation more confusing instead of easier.

### Interactive elements

All interactive behavior must use native HTML elements whenever possible.

- Use `<button>` for actions (e.g., toggles, dialogs, dropdowns)
- Use `<a>` for navigation between pages or sections
Avoid using `<div>` or `<span>` as interactive controls

This ensures keyboard support, focus handling, and screen reader behavior work by default. 

Custom interactive elements should only be created when absolutely necessary, and ***must fully replicate native behavior***.

### Forms

All form controls must be properly labeled to ensure they are accessible.

- Every input must have an associated `<label>`
- Labels can be linked using for and id, or by wrapping the input inside the label
- Placeholder text must never be the only label
- Group related inputs using `<fieldset>` and `<legend>` when appropriate

This ensures screen readers can correctly announce form fields and their purpose.

## ARIA (Accessible Rich Internet Applications)

**ARIA** is a set of attributes that helps assistive technologies understand the meaning, structure, and behavior of web content when native HTML alone is not enough.

To understand why **ARIA** exists, you need to understand a basic problem:

Browsers and assistive technologies rely on semantics — meaning — to interpret a page. When you use proper HTML (like `<button>`, `<nav>`, `<main>`), that meaning is already built in. A screen reader knows what a button is, how it behaves, and how users can interact with it.

But modern web development often creates custom UI components using `<div>`, CSS, and JavaScript. Visually, these can look and behave like real UI elements, but to assistive technologies, they are just meaningless containers.

For example, a developer might build:

- a dropdown menu
- a collapsible section
- a tab interface

using only `<div>` elements and JavaScript. To a sighted user, everything works fine. But to a screen reader, there is no indication that these elements are interactive, what their purpose is, or how to use them.

This is where **ARIA** comes in.

**ARIA** allows developers to add roles, states, and properties to elements so that assistive technologies can understand them correctly. In simple terms, **ARIA** adds the missing meaning that HTML does not provide in these situations.

You can think of **ARIA** as a communication layer between your UI and assistive technologies. It tells the browser, “this thing is a button,” or “this section is expanded,” or “this item is the current page,” even when the underlying HTML does not express that clearly.

### How ARIA works conceptually

When a page is loaded, the browser (user agent) builds a representation of the page and exposes it to the operating system’s accessibility API. Assistive technologies like screen readers then read from that API.

**ARIA** plays a role in this process by defining:

- Roles — what something is (e.g., button, navigation, tab) 
- States — what condition it is in (e.g., expanded, selected, disabled)
- Properties — additional relationships or descriptions (e.g., labels, controls)

This information allows assistive technologies to present content properly and enable interaction using alternative inputs like keyboards, screen readers, or speech commands.

For example, when a collapsible section is built with JavaScript, **ARIA** can communicate whether it is currently expanded or collapsed. Without that, a screen reader user would have no idea what is happening.

### Why ARIA must be used carefully

**ARIA** is powerful, but it is also easy to misuse.

The most important rule is that **ARIA** is a supplement to HTML, not a replacement.

If HTML already provides the correct semantics, you must use it instead of **ARIA**.

For example:

- A real `<button>` is always better than a `<div role="button">`
- A real `<nav>` is better than a `<div role="navigation">`

This is because native HTML elements come with built-in behavior, keyboard support, and accessibility mappings. **ARIA** only adds meaning — it does not add functionality.

If you misuse **ARIA**, you can actually make accessibility worse instead of better.

## Core ARIA principles

**ARIA** should only be used when there is a clear gap that HTML cannot solve.

Do not add **ARIA** just for the sake of it. If an element already has correct semantics, adding **ARIA** is redundant and unnecessary.

**ARIA** also does not provide interaction. If you create a custom button using a `<div>`, adding `role="button"` will tell a screen reader it is a button, but it will not automatically make it keyboard accessible. You would still need to implement all keyboard behavior manually.

Because of this, the best practice is always:
Use native HTML first, then use **ARIA** only to refine or clarify meaning when needed.

### Common ARIA attributes and their purpose

**aria-label** is used when an element needs a label but does not have visible text. This is common for icon-only controls, such as social media links or buttons that only contain an SVG. It provides a name that screen readers can announce.  

**aria-hidden="true"** is used to hide elements from assistive technologies. This is important for decorative content like icons or visual separators. Anything marked as hidden must not contain meaningful information, otherwise that information becomes inaccessible.  

**aria-current="page"** is used to indicate the current item within a set, such as the active page in a navigation menu or breadcrumb. This helps users understand their current location.  

**aria-label** on landmarks is used when there are multiple regions of the same type. For example, if a page has more than one navigation area, labels like “Primary navigation” and “Breadcrumb” help distinguish them.  

**aria-expanded** is used for elements that show or hide content, such as dropdowns or accordions. It tells assistive technologies whether the content is currently visible or hidden, and must be updated dynamically.  

**aria-controls** defines a relationship between a control and the element it affects. For example, a button that opens a panel can use this attribute to indicate which panel it controls.

## WAI-ARIA Roles

A **WAI-ARIA role** defines what an element is supposed to represent in the user interface.

In standard HTML, most elements already come with built-in meaning. For example, a `<button>` is understood as a clickable control, and a `<nav>` is understood as a navigation region. Assistive technologies rely on this meaning to correctly interpret and present content.

Problems begin when developers build custom UI components using generic elements like `<div>` and `<span>`. Visually, these components may look like buttons, tabs, or menus, but to a screen reader they are just meaningless containers.

WAI-ARIA roles exist to fix this gap.

By applying a role, you are explicitly telling assistive technologies how an element should be interpreted, regardless of what HTML element is used underneath.

```
<li role="menuitem">Open file…</li>
```
Here, a list item is being treated as a menu item. Without the role, assistive technologies would only understand it as part of a list, not as an interactive control.

Each role in WAI-ARIA comes with a defined model. This includes:

- A description of what the role represents
- Its relationship to other roles (for example, a listitem must exist inside a list)
- What states and properties are allowed (for example, a checkbox supports aria-checked)

This model allows assistive technologies to treat custom components as if they were native UI elements.

It is important to understand that roles do not change how the page looks or behaves in the browser. They only affect the accessibility tree, which is what assistive technologies read and interact with.

Another important detail is how roles are processed. If multiple role values are provided, browsers will use the first valid role they recognize and ignore the rest. This means role definitions must be deliberate and correct.

The most important rule when working with roles is simple:

If a native HTML element already provides the correct meaning, do not use ARIA to replace it.

**Bad Example** - `<button role="button">Submit</button>`
**Good Example** - `<button>Submit</button>`

Using ARIA in this way is redundant and can sometimes introduce conflicts or unexpected behavior.

ARIA should only be used when HTML does not provide a suitable semantic equivalent. It is a fallback tool, not a primary on

## WAI-ARIA States and Properties

If roles define what something is,
states and properties define what is happening to it.

Modern interfaces are dynamic. Elements can expand, collapse, toggle, or change selection. These changes are often visual and driven by JavaScript, but assistive technologies cannot detect them unless that information is explicitly provided.

This is where ARIA states and properties come in.

```
<li role="menuitemcheckbox" aria-checked="true">
  Sort by Last Modified
</li>
```

In this example:

- The role defines the element as a checkable menu item
- The aria-checked property communicates its current state

Without aria-checked, a screen reader would not know whether the item is selected or not.

States and properties allow you to communicate important interaction details such as:

- Whether content is expanded or collapsed (**aria-expanded**)
- Whether an item is selected (**aria-selected**)
- Whether a control is disabled (**aria-disabled**)
- Which element is currently active (**aria-current**)

A critical requirement when using these attributes is that they must always reflect the actual UI state.

If a dropdown opens visually but aria-expanded remains "false", the interface becomes misleading and unusable for assistive technology users.

This is one of the most common accessibility failures in modern web applications.

### Managed vs. Unmanaged States

Not all states need to be handled manually.

Some states are automatically managed by the browser. These include 

1. Keyboard focus 
2. Text Selection

These are called managed states, and they are exposed through CSS pseudo-classes like :focus.

ARIA introduces additional states that are not handled automatically. These are called unmanaged states, and developers must update them manually.

Examples include:

- aria-expanded
- aria-checked
- aria-selected

If these are used, your JavaScript must update them whenever the UI changes.

Failing to do so results in incorrect information being communicated to assistive technologies.

## Using ARIA with CSS 

ARIA attributes can also be used as hooks for styling.

```
[aria-checked="true"] {
  font-weight: bold;
}
```

This allows visual styling to stay in sync with accessibility state without requiring additional classes or JavaScript logic.

> However, styling alone is not enough. ARIA must always reflect real interaction state, not just visual appearance.

## Managing Focus and Keyboard Navigation

Accessibility is not only about structure and meaning. It is also about how users interact with the interface.

Many users cannot rely on a mouse and instead use:

1. Keyboard navigation
2. Screen readers
3. Speech input systems

or these users, predictable and consistent focus behavior is essential.

With standard HTML elements, keyboard behavior is already built in. Users can press the Tab key to move between interactive elements, and controls like buttons and links respond automatically.

Problems arise when building custom components.

Elements like tab systems, dropdown menus, and expandable panels often require custom interaction patterns. These patterns must be implemented manually to remain accessible.

### Keyboard Access 

All functionality must be fully operable using a keyboard.

Some users rely on keyboards instead of a mouse, including users with motor disabilities and screen reader users.

1. All interactive elements must be reachable using the `Tab` key.

2. Users must be able to activate controls using standard keys:

    - Enter for links and buttons
    - Space for buttons and toggles
    - The tab order must follow a logical and predictable sequence

3. Users must not get “trapped” inside components (e.g., modals, dropdowns)

Do not remove keyboard functionality from native elements.

Avoid using tabindex values greater than 0, as this creates unpredictable navigation order.

Custom components must implement full keyboard interaction patterns, including (i) focus management, (ii) key bindings (optional), (iii) escape behavior where approrpriate.

If a feature cannot be used with a keyboard, it is not accessible.

### Focus Visibility

Keyboard users rely on visible focus indicators to understand where they are on the page.

All interactive elements must have a clearly visible focus state.

1. Do not remove the default browser outline unless you replace it with a custom focus style.

2. Focus styles must have sufficient contrast against the background.

3. Focus indicators must be visible in all states (default, hover, active).

Use `:focus-visible` to apply focus styles only when needed, without affecting mouse users. If users cannot see where focus is, they cannot navigate.

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

## Form Errors and Validation 

Forms must clearly communicate errors and validation states to all users. This includes both visual users and users of assistive technologies.

1. Errors must be described in text, not just colors.
2. Error messages must be associated with the relevant input.
3. Inputs with error should be programmatically identifiable (e.g `aria-invalid=true`).

When validation fails, move focus to the first invalid field, or provide a clear error summary at the top of form.

Use `aria-live` regions to announce errors when they appear. 

Do not rely on placeholder text or visual cues alone to communicate errors.

## Contrast

Text and interactive elements must have sufficient contrast against their background.

Low contrast makes content difficult or impossible to read for many users, including those with low vision or color blindness.

Minimum guidelines:

- Normal text should have a contrast ratio of at least 4.5:1
- Large text (18px+ or bold 14px+) should have at least 3:1
- Interactive elements (buttons, links, inputs) must be clearly distinguishable

Do not rely on color alone to convey meaning.

When in doubt, use tools to verify contrast ratios.

## Skip Links

Skip links allow keyboard users to bypass repetitive navigation and go directly to the main content.

This is especially important for users who navigate using the keyboard or screen readers.

Every page should include a skip link as the first focusable element.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

The target must match the id of the main content container:

```html
<main id="main-content">
```

Skip links can be visually hidden by default, but must become visible when focused.

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
}

.skip-link:focus {
  top: 0;
}
```

## Remember this rule..

Partial or incorrect use of ARIA roles is worse than not using ARIA at all.

Using ARIA incorrectly can create a misleading experience for assistive technologies, where elements appear to behave differently than they actually do. This can break navigation, confuse users, and make interfaces unusable.

If a component cannot be implemented fully with correct roles, states, keyboard behavior, and focus management, it should not use ARIA.

Always prefer no ARIA over broken ARIA.