---
layout: layouts/doc.njk
title: Development
---

## <img src="/assets/img/asterisk.svg" alt="" class="heading-icon" /> Network Dependency Graph (Draft)

**The Network Dependency Graph** represents the full chain of resources required for a webpage to load and render, including all direct and indirect network requests made during the initial page load. <span class="tag k"></span> This includes HTML, CSS, JavaScript, fonts, images, third-party scripts, and any additional assets that are fetched as a result of those initial resources executing.

Each resource can introduce further dependencies, meaning that one file may trigger additional requests, creating a cascading structure of network activity. In practice, this forms a graph-like relationship where the initial document is the root node, and every subsequent request becomes a dependent node connected through execution or reference.

Understanding this structure is important because it directly reflects how efficiently or inefficiently a page loads in real-world conditions. Even if individual assets are small or optimized in isolation, the way they are connected and requested can significantly affect performance. A deeply nested or overly fragmented dependency graph increases latency, as the browser must repeatedly resolve, request, and process resources before rendering the final page. <span class="tag x"></span> This can lead to delayed first paint, slower interactivity, and increased variability in performance across different network conditions.

Conversely, a shallow and well-structured dependency graph reduces the number of sequential requests required, allowing the browser to parallelize loading more effectively and reach a usable state faster.

From an optimization standpoint, the Network Dependency Graph is critical because it shifts the focus from individual file optimization to system-level loading behavior. <span class="tag k"></span> A page is not just the sum of its assets, but also the structure in which those assets are discovered and executed.

Poor dependency design can negate the benefits of minification, compression, or caching, while a well-structured dependency graph can significantly improve performance even without aggressive optimization techniques.

### Measurement

**The Network Dependency Graph** can be analyzed using performance auditing tools that simulate how a browser loads and processes a page. One of the primary tools for this is **Lighthouse**, which is integrated into Chrome DevTools. <span class="tag t"></span>

**Lighthouse** generates a performance report that includes a visual representation of the network activity during page load, showing how resources are requested, when they are discovered, and how long they take to load. This allows maintainers to observe not only which assets are being loaded, but also how they are interconnected through the loading process.

In addition to **Lighthouse**, Chrome DevTools’ Network tab provides a more granular, real-time view of all requests made by the page. It allows inspection of request timing, blocking behavior, and resource prioritization, making it possible to identify bottlenecks or unnecessary sequential dependencies.

Together, these tools make it possible to reconstruct and understand the effective dependency graph as experienced by the browser, rather than as it is written in code. <span class="tag k"></span> This distinction is important, because the runtime dependency graph can differ significantly from the developer’s mental model due to dynamic imports, third-party scripts, and framework-level bundling behavior.

[Lighthouse Overview](https://developer.chrome.com/docs/lighthouse/overview/){.link-special} [Network features reference](https://developer.chrome.com/docs/devtools/network/reference/){.link-special}

[PageSpeed Insight](https://pagespeed.web.dev/){.link-special}

### Optimization

Optimizing the **Network Dependency Graph** involves reducing unnecessary complexity in how resources are discovered, loaded, and executed. The primary goal is to minimize chained or sequential dependencies so that the browser can retrieve and render critical resources as early and efficiently as possible. <span class="tag k"></span> This often involves reducing reliance on runtime-loaded scripts that trigger further network requests, and instead favoring build-time resolution of dependencies where possible.

Another important principle is controlling resource criticality, ensuring that only essential assets are required for the initial render, while non-critical resources are deferred or lazy-loaded. This reduces the initial depth of the dependency graph and allows the page to reach an interactive state more quickly.

It is also important to avoid redundant or duplicated dependencies, as repeated imports or overlapping libraries can artificially inflate the graph and increase network overhead without providing functional benefit. <span class="tag x"></span>

[Critical Rendering Path](https://web.dev/articles/critical-rendering-path){.link-special} [Eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources){.link-special}

[Lazy Loading](https://web.dev/articles/browser-level-image-lazy-loading){.link-special} [Code Splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting){.link-special}

#### Lazy Loading

Lazy loading is a performance optimization technique where resources are not loaded immediately when a page starts, but instead are deferred until they are actually needed. <span class="tag k"></span> In the context of the Network Dependency Graph, it directly reduces the initial number of nodes in the graph by postponing the creation of certain branches until user interaction or viewport visibility triggers them.

Instead of treating all assets as part of the initial dependency chain, lazy loading effectively splits the graph into a “critical” portion (needed for first render) and a “deferred” portion (loaded on demand).

In practical terms, lazy loading is most commonly applied to images, non-critical components, and secondary JavaScript modules. The browser is instructed to skip fetching these resources until certain conditions are met, such as scrolling, clicking, or route changes in single-page applications.

For images, modern browsers support native lazy loading using the `loading="lazy"` attribute:

```html
<img src="/images/example.jpg" loading="lazy" alt="Example image" />
```

This tells the browser not to request the image until it is close to entering the viewport. It is the simplest and most effective form of lazy loading because it requires no JavaScript and integrates directly with the browser’s rendering engine.

Lazy loading is also commonly applied to UI elements that are not immediately visible or required, such as modals, secondary panels, or feature-heavy sections. These are only fetched or initialized when the user actually triggers them.

```js
button.addEventListener('click', async () => {
  const module = await import('./feature.js');
  module.init();
});
```

This pattern ensures that the resource does not participate in the initial dependency graph and is only introduced when needed.

However, lazy loading must be used deliberately. If too many resources are deferred without structure, the application can feel responsive initially but become inconsistent during interaction as multiple hidden requests fire at once. <span class="tag x"></span> This often results in sudden network spikes or delayed responses when users engage with features for the first time.

A well-structured lazy loading strategy therefore focuses on balancing initial render speed with predictable on-demand loading. Critical above-the-fold resources should remain part of the initial graph, while secondary or conditional resources are safely deferred.

#### Code Splitting

Code splitting is a build-time optimization technique where the application is divided into smaller, independently loadable bundles instead of being delivered as a single large JavaScript payload. <span class="tag k"></span> In the context of the Network Dependency Graph, this changes the structure of the initial graph itself by reducing the size of the root bundle and introducing multiple potential branches that can be loaded separately.

Unlike lazy loading, which controls when a resource is fetched at runtime, code splitting defines how the codebase is partitioned before it ever reaches the browser. The goal is to avoid forcing the browser to download and parse unnecessary code for routes, features, or components that are not immediately required.

In modern tooling such as Vite, code splitting is largely automatic when dynamic imports are used. Any module imported via import() becomes a separate chunk in the output bundle:

```js
const module = await import('./feature.js');
```

<span class="tag k"></span> At build time, this instruction tells the bundler to isolate feature.js into its own file. During runtime, that file is only requested when the import expression is executed, meaning it no longer contributes to the initial payload or blocking dependency chain.

From a network perspective, this transforms a single heavy request into multiple smaller, conditional requests. The initial dependency graph becomes shallower, while secondary nodes are only introduced based on execution paths. This improves initial load performance but also distributes network cost more evenly across user interaction.

In component-based architectures, code splitting is often applied at the route level. Each route becomes its own entry point, ensuring that users only download what is required for the current view.

```js
const Home = await import('./pages/Home.js');
const About = await import('./pages/About.js');
```

However, code splitting is not automatically beneficial in every situation. Over-splitting can lead to excessive small chunks, increasing request overhead and potentially harming performance on high-latency networks. <span class="tag x"></span> If too many boundaries are created, the browser may spend more time resolving and fetching modules than executing meaningful application logic.

he objective is to reduce unnecessary initial load without fragmenting the application into inefficient micro-chunks.

#### \<picture> element

The `<picture>` element is a native HTML feature that allows the browser to choose between multiple image sources based on conditions such as screen size, resolution, or supported formats. <span class="tag k"></span> Instead of delivering a single fixed image, it enables the browser to select the most appropriate asset at request time, reducing unnecessary bandwidth usage and improving rendering efficiency.

In the context of the Network Dependency Graph, <picture> prevents redundant image downloads by ensuring that only one optimized resource is fetched per rendering condition. This reduces overall network cost while improving perceived performance, especially on mobile devices or slow connections.

A typical use case is serving different image sizes for different viewport widths:

```html
<picture>
  <source srcset="/images/hero-large.jpg" media="(min-width: 1024px)" />
  <source srcset="/images/hero-medium.jpg" media="(min-width: 640px)" />
  <img src="/images/hero-small.jpg" alt="Hero image" />
</picture>
```

In this structure, the browser evaluates media conditions and selects the first matching source. Only that selected file becomes part of the active network request chain. This prevents smaller devices from downloading unnecessarily large assets, which would otherwise increase initial load time and memory usage.

Another important use case is **_format negotiation_**. Modern image formats such as WebP or AVIF can significantly reduce file size compared to traditional JPEG or PNG formats. <picture> allows fallback-based delivery depending on browser support:

```html
<picture>
  <source srcset="/images/photo.avif" type="image/avif" />
  <source srcset="/images/photo.webp" type="image/webp" />
  <img src="/images/photo.jpg" alt="Optimized image" />
</picture>
```

This ensures that the most efficient format is used when available, while still maintaining compatibility for older browsers. From a dependency perspective, this avoids unnecessary fallback chains and ensures only one asset is fetched.

#### Preloading and Preconnecting Critical Resources

Modern pages often depend on external resources such as fonts, CDNs, analytics scripts, or third-party APIs. These dependencies are not always part of the main application code, but they still affect the initial network path and can introduce hidden latency. <span class="tag k"></span>

Two low-level techniques used to reduce this latency are preloading and preconnecting, both of which influence how the browser prepares the Network Dependency Graph before actual requests are made.

##### Preloading critical fonts

Fonts are a common source of render delay because they are required for text rendering but are often discovered late in the loading process. Without optimization, the browser may first render with a fallback font and then swap once the real font arrives, or worse, delay rendering entirely depending on configuration.

Preloading allows the browser to fetch font files earlier in the network lifecycle, making them available before they are strictly needed for rendering.

```html
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

This explicitly tells the browser that the font is a high-priority resource. It is pulled into the early part of the dependency graph instead of being discovered later through CSS parsing.

However, preloading fonts must be used carefully. Overusing it or preloading unused font weights can increase bandwidth usage and degrade performance instead of improving it. <span class="tag x"></span>

<div class="caution">
<img src="/assets/img/frame_exclamation.svg">

The `@import` rule in CSS allows stylesheets to load other stylesheets, but it introduces a hidden and delayed dependency chain that negatively affects performance. <span class="tag k"></span> Unlike <link> elements in HTML, which are discovered early in the document parsing phase, `@import` statements are only resolved after the initial CSS file has been fetched and parsed.

This creates a sequential loading pattern where stylesheets are blocked behind other stylesheets, effectively deepening the Network Dependency Graph in an unnecessary and unpredictable way.

```css
@import url('/styles/extra.css');
```

In this model, the browser cannot begin fetching the imported file until it has already downloaded and processed the parent stylesheet. This delays rendering and prevents parallelization of network requests.

</div>

##### Preconnecting to external origins

Many performance bottlenecks are not caused by the resource itself, but by the connection setup phase before the resource is even requested. This includes DNS lookup, TCP handshake, and TLS negotiation.

Preconnecting allows the browser to perform these steps early for known external origins, effectively warming up the connection before the actual request happens.

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

This is especially important for services like Google Fonts, where the stylesheet and font files are served from different domains. Without preconnect, the browser must establish multiple connections only after discovering the requests, which delays the dependency graph traversal.

From a network perspective, preconnect reduces the “startup cost” of external nodes in the graph, making subsequent requests faster and more predictable.

#### DNS prefetch

In cases where full preconnection is too aggressive, DNS prefetch can be used as a lighter optimization. It only resolves the domain name early without establishing a full connection.

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

This is less powerful than preconnect but also less resource-intensive. It is useful when you want minimal overhead but still want to reduce initial lookup delays. <span class="tag k"></span>

#### Render-Blocking CSS

CSS is inherently render-blocking because the browser must construct the full CSSOM (CSS Object Model) before it can safely render the page. <span class="tag k"></span> This behavior exists to prevent “flash of unstyled content,” but it also means that any CSS included in the critical path directly delays first paint.

In terms of the Network Dependency Graph, render-blocking CSS acts as a gatekeeper node: the browser will not proceed to layout and paint until it has discovered, downloaded, and processed all required stylesheets for the initial render. If a stylesheet is large, slow to download, or contains unnecessary rules, it increases the time before the page becomes visible.

A typical blocking stylesheet looks like this:

```html
<link rel="stylesheet" href="/styles/main.css" />
```

When the browser encounters this during HTML parsing, it pauses rendering until the CSS file is fully downloaded and parsed. This is why CSS in the critical path has a disproportionate impact on performance compared to many other asset types.

One of the most common performance issues is shipping a single large global stylesheet that contains rules for the entire application, regardless of whether they are needed for the initial view. <span class="tag x"></span> This inflates the render-blocking surface area and forces the browser to process unused styles before it can display anything.

A more optimized approach is to separate critical and non-critical styles. Critical CSS contains only what is needed for above-the-fold content, while non-critical CSS is loaded after initial render.

One way to improve loading behavior is to preload stylesheets so they are discovered earlier in the dependency graph:

```html
<link rel="preload" href="/styles/main.css" as="style" />
<link rel="stylesheet" href="/styles/main.css" />
```

This helps reduce discovery delay, but it does not remove the blocking nature of CSS itself. The browser still waits for the stylesheet before rendering, but it begins fetching it earlier, which reduces idle time in the critical path.

#### <img src="/assets/img/asterisk.svg" alt="" class="heading-icon" /> HTTP Caching

HTTP caching is a mechanism that allows the browser to store and reuse previously downloaded resources instead of requesting them again from the server. <span class="tag k"></span> In the context of the Network Dependency Graph, caching effectively collapses previously traversed nodes on repeat visits, meaning the graph does not need to be rebuilt from scratch every time a user returns to a page.

Instead of treating every page load as a full network traversal, caching introduces the concept of reused dependencies, where assets such as JavaScript bundles, stylesheets, fonts, and images can be served directly from local storage. This significantly reduces latency, server load, and total network transfer cost, especially for assets that do not change frequently.

At the core of HTTP caching is the Cache-Control header, which defines how and for how long a resource can be stored by the browser:

```
Cache-Control: public, max-age=31536000, immutable
```

In this example, the resource is marked as cacheable for a long duration (one year). The immutable directive indicates that the file will not change during that period, allowing the browser to skip revalidation entirely.

When caching is properly configured, subsequent page loads no longer need to re-fetch these resources over the network. Instead, the browser resolves them locally, effectively removing entire branches from the active dependency graph. This leads to dramatically faster repeat visits and reduced network variability across sessions.

Another important aspect is cache invalidation strategy. Since long-lived caching can lead to stale assets, modern workflows typically use content-based hashing in filenames:

```
app.8f3a91.js
styles.a12d9c.css
```

When the content changes, the hash changes, forcing the browser to treat it as a new resource. This allows aggressive caching without risking outdated files being served.

From a system perspective, caching is one of the most effective optimizations because it does not just improve performance, it fundamentally reduces the amount of work the network has to do on repeat interactions.

<hr>

One important clarification is that HTTP caching is not a frontend technique in itself. <span class="tag k"></span> While it directly affects how the browser behaves, the rules that control caching are almost entirely defined by the server (or CDN) through HTTP response headers. The frontend only benefits from it; it does not configure it at runtime.

In other words, caching is not something you “implement in JavaScript or HTML”.

In a traditional Apache setup, caching behavior is controlled through response headers set in the server configuration or `.htaccess` file. These headers determine whether a resource can be cached, for how long, and under what conditions it must be revalidated.

```
<FilesMatch "\.(js|css|png|jpg|woff2)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

This tells the browser that these asset types are safe to store locally for a long period and do not need to be revalidated on subsequent visits.

If caching headers are missing or misconfigured, no amount of frontend optimization (lazy loading, code splitting, or preloading) can prevent the browser from repeatedly re-downloading the same assets.

This is also why caching is often one of the highest-impact performance optimizations available.

<div class="important">
<img src="/assets/img/bolt.svg" />

Because caching is controlled server-side and can persist for long durations, it must be paired with a safe invalidation strategy. The most common approach is **_content-based fingerprinting_**, where file names change when content changes:

```
app.3f91c2.js
app.91bd44.js
```

When the filename changes, the browser treats it as a completely new resource, even if long-term caching is enabled. This allows aggressive caching rules without risking stale or broken assets being served

</div>

## Accessibility

**Accessibility** means designing and building the website so that everyone can use it, including people with disabilities. This includes users who rely on screen readers, keyboard navigation, voice control, or other assistive technologies.

In simple terms, if a user cannot see the screen, cannot use a mouse, or has difficulty reading content, the website must still remain usable and understandable.

**Accessibility** is not optional. Many regions enforce legal requirements that require websites, **_especially educational institutions_**, to meet defined accessibility standards. These requirements are commonly based on the WCAG 2.1 (Web Content Accessibility Guidelines), which define how web content should be made accessible.

Failure to meet these standards can result in legal consequences under regulations such as the **Americans with Disabilities Act (ADA)** and similar laws in other countries. More importantly, poor accessibility prevents users from accessing essential information and services.

While Myanmar does have disability rights legislation, including the **Rights of Persons with Disabilities Law 2015**, accessibility requirements,especially in digital systems, are still in the early stages of enforcement and adoption. Even if strict enforcement is not consistently applied in every context, accessibility is still treated as a necessary design practice. It ensures that systems remain usable for all users and aligns with widely accepted international standards defined by the **World Wide Web Consortium (W3C)**.

The technical guidelines for accessibility are defined by the **World Wide Web Consortium (W3C)**, through its Web Accessibility Initiative. These guidelines include specifications such as **WAI-ARIA (Accessible Rich Internet Applications)**, which provide additional tools for improving accessibility when standard HTML is not sufficient.

For full reference, consult:

[WCAG 2.1](https://www.w3.org/TR/wai-aria/){.link-special}
[WCAG 2.1 guidelines (W3C)](https://www.w3.org/TR/wai-aria/){.link-special}

Accessibility is treated as a core requirement of the project. The goal is to ensure that all users can navigate and interact with the website without barriers.

The implementation follows a structured and practical approach to avoid unnecessary complexity while still meeting essential accessibility standards.

### Scope

The implementation is guided by a set of constraints to maintain focus and efficiency.

Accessibility work is approached incrementally. Effort is concentrated on real issues encountered during development rather than exploring edge cases or advanced patterns prematurely. More complex solutions, including the use of ARIA, are only introduced when native HTML cannot adequately meet accessibility requirements.

Automated tooling is used to support the process. The WAVE Accessibility Extension is used to identify common accessibility issues such as missing labels, contrast problems, and structural inconsistencies. However, automated results are treated as guidance rather than a complete validation of accessibility.

This accessibility section deserves its own dedicated space, where we explain fundamental semantic guidelines, different types of ARIA attributes, and accessibility compliance standards.

[Accessibility Guidelines](/atty/){.link-card}

## CSS Styling Guidelines

This section defines the styling system used across the project. It establishes how structure, typography, layout, and reusable patterns should be handled to keep the codebase consistent, scalable, and easy to maintain.

### Styling Philosophy

The CSS architecture follows a layered approach. Each layer has a clear responsibility and should not overlap with others.

The goal is to separate _layout_, _typography_, and _component-specific styling_ so that changes in one area do not unintentionally break others.

Instead of writing repeated styles in every section, shared patterns are abstracted into base classes, while page-specific classes handle structure and positioning.

### Base Layer System

The base layer is the foundation of all styling. It defines reusable rules that apply globally across the site.

Take a look at `# about.css` file.

This includes layout primitives such as `.section` for consistent spacing and structural rhythm, as well as flex utilities like `.flex-row`, `.flex-column`, and `.flex-center` for alignment control.

Typography is handled through shared classes instead of repeated selectors. Headings use `.heading-primary`, body text uses `.text-body`, and emphasized text uses .text-accent.

Media elements are standardized using `.img-responsive`, ensuring images scale correctly without needing repeated rules in every section.

Buttons follow a shared `.btn` base class so that interaction styles remain consistent across the entire project.

```css
/* Layout system */
.section {
  padding: 80px 120px;
}

.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gap-sm {
  gap: 20px;
}

.gap-md {
  gap: 40px;
}

.gap-lg {
  gap: 50px;
}

/* Typography system */
.heading-primary {
  font-size: 40px;
  font-family: var(--title-font);
}

.text-body {
  font-size: var(--normal-font-size);
  font-family: var(--body-font);
  line-height: 1.4;
}

.text-accent {
  color: var(--main-color);
}

/* Image system */
.img-responsive {
  width: 100%;
  height: auto;
  display: block;
}

/* Button system */
.btn {
  display: inline-block;
  cursor: pointer;
  text-align: center;
}
```

These base classes should never contain page-specific styling. They are strictly reusable building blocks.

### Component Structure

Each page section is treated as a standalone component. Components are responsible for layout and structural design only, not global typography or reusable styling rules.

A component typically uses a block-style naming convention such as `.about__intro`, `.about__research`, or `.about__cta`.

```html
<section
  class="about__intro section"
  role="region"
  aria-labelledby="about-ilc-heading"
>
  <div class="about__intro-text">
    <h2 class="heading-primary" id="about_intro-heading">
      Let Us Introduce <span class="text-accent">Ourselves</span>
    </h2>
    ... ... ...
  </div>
</section>
```

Inside each component, child elements describe their role within that section rather than relying on generic tags or reused class names without context.

The responsibility of a component is to define how content is arranged, not how text or images are styled globally.

### Typography Rules

Typography is never hardcoded inside individual components unless it is a rare exception.

Headings, paragraphs, and highlighted text must use the shared base classes whenever possible. This ensures consistency in font sizing, spacing, and hierarchy across all pages.

If a component requires slight variation, it should extend a base class rather than redefining typography from scratch.

This prevents duplication of font rules and avoids inconsistencies between sections.

### Layout Rules

Spacing between sections should be controlled using the .section class rather than repeated padding declarations in every component.

Flexbox utilities should be used for alignment instead of redefining display rules repeatedly.

Each component is responsible for its internal layout only. Global spacing and structure should always be inherited from base utilities.

### Naming Conventions

All class names must be lowercase and use a consistent structured format.

Base classes remain simple and reusable, while component classes follow a block-style naming pattern with double underscores.

Component names describe meaning, not layout artifacts. Names like `div1`, `text-box`, or `section2` are not allowed because they do not represent semantic structure.

Instead, naming should reflect purpose, such as `about__intro`, `about__research`, or `about__cta`.

### When adding new pages...

As the project grows, new pages should reuse the existing base system rather than introducing new styling patterns.

Before writing new CSS, the first step should always be checking whether a base class already solves the problem.

If new patterns are introduced, they should be added to the base layer only if they are truly reusable across multiple sections or pages.

## Code Quality

The project uses two separate systems to keep the code clean and consistent.

**ESLint** is responsible for checking whether the code is logically correct and follows defined rules. **Prettier** is responsible for formatting the code so it always looks the same, regardless of who wrote it.

These tools are not optional. They are part of the development workflow and are designed specifically for a Vue 3 + Vite setup where Vue is used in a progressive enhancement style rather than a full single-page application.

This means Vue is applied in smaller, embedded sections rather than controlling the entire application structure.

[ESLint Documentation](https://eslint.org/docs/latest){.link-special}
[Prettier Documentation](https://prettier.io/docs/en/){.link-special}
[Vue 3 Guide](https://vuejs.org/guide/introduction.html){.link-special}
[Progressive Enhancement (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement){.link-special}

### ESLint

**ESLint** is a static analysis tool. It reads your code and reports problems, but it does not automatically rewrite your code unless explicitly told to do so.

Its main responsibility is to detect issues such as unused variables, broken patterns in JavaScript or Vue components, and general structural mistakes that could lead to bugs. It also enforces consistency rules defined by the project configuration so that multiple developers do not write code in conflicting styles.

To install **ESLint** and its dependencies, the project uses,
`npm run lint`

These are the required plugins/packages used for linter:

- eslint-plugin-vue
- eslint-config-prettier
- eslint-plugin-prettier

These are the core **ESLint** engine and the plugins required for Vue support and **Prettier** integration.

This command scans the entire project and reports any violations of the configured rules, `npm run lint`

If you want **ESLint** to automatically fix issues that can be safely corrected, you can run, `npm run lint -- -- fix`

This will modify files directly, but only for problems that **ESLint** is confident can be fixed without changing behavior.

[ESLint Documentation](https://eslint.org/docs/latest){.link-special}
[eslint-plugin-vue](https://eslint.vuejs.org/){.link-special}
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier){.link-special}
[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier){.link-special}

#### Configuration (Flag Config)

**ESLint** uses the modern flat configuration system (eslint.config.\*), which is required for **ESLint** v9+.

In the `eslint.config.cjs` file,

The project uses **ESLint** v10+, which requires `eslint.config.*` instead of .eslintrc.\*

```javascript
const vue = require('eslint-plugin-vue');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/js/jquery-*.min.js',
      'src/js/vue.esm-browser*.js',
    ],
  },

  // Vue 3 recommended rules (flat config)
  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',

      // Custom convention: allow kebab-case component names
      'vue/component-definition-name-casing': 'off',
    },
  },

  prettier,
];
```

The configuration starts by importing required plugins. One plugin adds Vue-specific linting rules, and another disables rule conflicts between **ESLint** and **Prettier**.

After that, the configuration defines ignored paths. These are files that **ESLint** will never check. This includes the dist folder because it is generated output, not source code. It also includes `node_modules` because those are third-party dependencies and not part of the project’s logic. Minified vendor files such as jQuery and Vue browser builds are also ignored because they are not meant to be edited or analyzed.

Next, the configuration extends Vue’s recommended rule set for the flat configuration system. This ensures that Vue components follow best practices without requiring manual rule definitions for everything.

After that, a project-specific rule section is applied. This section defines how JavaScript and Vue files should behave inside this project. It sets modern ECMAScript support, enables module syntax, and adjusts linting rules to match project preferences.

For example, unused variable warnings are enabled so developers are notified when code is left unused. Console logging is allowed because this project likely uses it for debugging or runtime inspection. Vue component naming rules are relaxed because the project uses a non-standard naming convention that does not follow typical Vue component casing rules.

Finally, **Prettier** is integrated into **ESLint** so that formatting rules do not conflict with linting rules.

- `.eslintignore` is no longer supported; ignores are defined inside the config

- Vue configuration uses `vue.configs['flat/recommended']` which is compatiable with the flat config system.

[ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new){.link-special}
[Vue ESLint Flat Config](https://eslint.vuejs.org/user-guide/#usage){.link-special}

#### Ignored Files

In the linter, these files are intentionally ignored as they are not part of the maintainable codebase and produce meaningless init warnings.

- `dist/` (compiled output)
- `node_modules/` (dependencies)
- `jquery-*.min.js` and `vue.esm-browser*.js` (minified vendor scripts)

The dist folder is excluded because it contains compiled output generated by Vite. It is not source code and will be overwritten every time you build.

The node_modules folder is excluded because it contains external dependencies. These packages are not part of your codebase and should never be modified.

Minified vendor scripts are also ignored because they are compressed production files from external libraries. Running linting on them would produce irrelevant warnings and would not improve code quality.

### Prettier

**Prettier** is responsible only for formatting. It does not check for bugs or enforce coding logic. It simply rewrites code so that it follows a consistent visual structure.

This includes indentation, spacing, quote style, semicolons, line width, and similar formatting rules.

Unlike **ESLint**, **Prettier** does not report problems. It directly rewrites files when run.

To install **Prettier**, `npm install -D prettier`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

The **Prettier** configuration defines a strict formatting standard for the entire project.

It ensures that semicolons are always used, single quotes are preferred for strings, trailing commas are included where valid, and line width is limited so code remains readable.

Indentation is set to two spaces, and line endings are automatically adjusted depending on the operating system.

The result is that every file in the project ends up looking structurally identical regardless of who wrote it.

To format the entire project, you run, `npm run format`.

**Prettier** rewrites files in-place and is idempotent, meaning repeated runs will not introduce further changes once formatting is correct.

[Prettier Configuration Options](https://prettier.io/docs/en/options.html){.link-special}
[Prettier CLI Usage](https://prettier.io/docs/en/cli.html){.link-special}

#### ESLint + Prettier Integration

**ESLint** and **Prettier** overlap in some areas, especially formatting. Without coordination, they would conflict with each other by trying to enforce different rules.

To prevent this, the project uses, `eslint-config-prettier`.

This disables **ESLint** rules that would interfere with **Prettier’s** formatting decisions. As a result, **ESLint** focuses only on code correctness and structure, while **Prettier** handles all visual formatting. This separation is intentional and ensures that developers never receive conflicting feedback from the two tools.

[ESLint + Prettier integration guide](https://prettier.io/docs/en/integrating-with-linters.html){.link-special}

### Pre-Commit

The project uses a pre-commit enforcement to ensure that all code committed to the respository meets the required quality and formatting standards.

This system is implemented using Husky and lint-staged, and operates automatically during the Git commit process.

Without enforcement, developers must remember to manually run:

`npm run lint`
`npm run format`

In practice, this steps may often skipped or forgetten, especially in collaborative environments. Over time, this leads to inconsistent formatting, unused code, and avoidable errors accumulating in the codebase.

When a commit is initiated using, `git commit -m "message"`.

Git triggers the pre-commit hook, which is managed by Husky.

At this stage, the system performs the following sequence:

- It identifies all staged files (files added using `git add`)
- It filters only relevant file types (.js and .vue)
- It runs **ESLint** with auto-fix enabled
- It runs **Prettier** to format the files
- It checks if any linting errors remain

If all checks pass, the commit proceeds normally.

If any errors remain that cannot be automatically fixed, the commit is aborted. The user must resolve the issues before attempting the commit again.

[Husky Documentation](https://typicode.github.io/husky/){.link-special}
[lint-staged Documentation](https://github.com/lint-staged/lint-staged){.link-special}
[Git Hooks Documentation](https://git-scm.com/docs/githooks){.link-special}

#### Setup & Configuration

The system requires two development dependencies, `husky` and `lint-staged`.

These are installed using, `npm install -D husky lint-staged`.

After installation, Husky must be initialized, `npx husky init`. This creates a `.husky/` directory in the project root, which contains Git hook definitions.

A prepare script is added to package.json, `"prepare": "husky"`. This ensures that Husky is automatically installed when dependencies are installed, which is necessary when the project is cloned on a new machine.

The pre-commit hook is defined in `.husky/pre-commit`, and its contents are `npx lint-staged`. This means that every time a commit is attempted, the lint-staged tool is executed.

The behavior of lint-staged is defined in `package-json`.

```json
"lint-staged": {
  "*.{js,vue}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

This configuration makes sure that only `.js` and `.vue` files are processed. **ESLint** is executed first, attempting to automatically fix issues or flag issues that need human intervention. **Prettier** is executed afterward to enforce formatting and detect some HTML errors if exist.

The use of staged files is critical for performance. Instead of scanning the entire project, only files being committed are processed.

### Project Specific Convention

The project uses a custom convention for Vue components that differs from standard Vue practices.

Instead of using JSX-style component tags or PascalCase components like `<NavBar />`, the project uses a more HTML-like structure such as `<navbar-component></navbar-component>`.

This approach is intentional because Vue is being used in a progressive enhancement style rather than a full SPA architecture. The goal is to keep components readable in static HTML and make them visually obvious when embedded in templates.

To support this, **ESLint** rules are adjusted so that this naming convention does not trigger warnings or errors.

## Dependency Management (Dependabot)

The project uses Dependabot to automatically monitor and update project dependencies.

Dependabot is a service provided by GitHub that scans the repository for dependency files (such as
`package.json`) and checks whether newer versions of those dependencies are available. When updates are found, it automatically creates pull requests with the proposed changes.

Dependabot is configured using the following file,
`.github/dependabot.yml`. This file must be placed inside the `.github/` directory at the root of the repository. If the directory does not exist, it must be created manually.

```yml
version: 2

updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 5
    commit-message:
      prefix: 'deps'
    rebase-strategy: 'auto'
    ignore:
      - dependency-name: 'vue'
        update-types: ['version-update:semver-major']
```

### Configuration

The configuration defines how Dependabot behaves when scanning and updating dependencies.

The `version: 2` field specifies the configuration schema used by Dependabot.

Under `updates`, each entry defines a dependency ecosystem to monitor. In this case, only the npm ecosystem is configured, which corresponds to the `package.json` file located in the root directory.

The `directory: "/"` setting indicates that Dependabot should scan the root of the repository for dependency definitions.

The `schedule` block defines how frequently Dependabot checks for updates. The interval is set to weekly, meaning the repository is scanned once per week.

The `open-pull-requests-limit` restricts the number of active Dependabot pull requests at any given time. This prevents excessive PR creation, which can overwhelm maintainers.

The `commit-message.prefix` field ensures that all Dependabot-generated commits begin with the prefix, `deps:`.

The `rebase-strategy: "auto"` setting ensures that Dependabot pull requests remain up to date with the main branch.

When new commits are added to the main branch after a Dependabot pull request is created, the pull request may become outdated. This can result in merge conflicts or require manual updates.

With this setting enabled, Dependabot automatically rebases its pull requests on top of the latest version of the main branch. This reduces manual intervention and helps maintain clean merge history.

The configuration explicitly ignores major version updates for the Vue dependency,

```yml
dependency-name: 'vue'
update-types: ['version-update:semver-major']
```

Major version updates often introduce breaking changes that require manual code modifications and testing. By ignoring these updates, the system avoids automatically generating pull requests that may destabilize the project.

Minor and patch updates for Vue are still allowed and will be proposed by Dependabot.

For additional configuration options and advanced usage, refer to the documentation below.

[Official Dependabot Documentation](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file){.link-special}

## <img src="/assets/img/asterisk.svg" alt="" class="heading-icon" /> Vite Bundling

The build system uses Vite strictly as a **bundler**. That means it takes your raw project files and turns them into a final, optimized version that a browser can load efficiently.

It is important to understand what Vite is not doing. It is not running a backend, it is not handling deployment, and it is not modifying your code after the build finishes. Once the build is done, Vite’s job is complete.

You can think of it as a tool that reads your project structure, processes everything, and outputs a clean production version of your site.

Nothing in the build process will work unless Node.js is installed correctly. Node is the runtime that allows npm and Vite to run.

To begin, ensure that Node.js is installed on your system. You can verify your version using:

```bash
node -v
```

In this project, the expected version is v22.16.0. If you see a version number that is significantly different, the build might still work, but there is a risk of incompatibility. If the command is not recognized at all, Node is not installed and nothing else will work until that is fixed.

All commands must be executed inside the root folder of the project. This is the folder that contains the `package.json` file. This file is extremely important because it defines everything the project depends on.

If you are not in this directory, the next steps will fail because npm will not know what to install or build.

Once you are in the correct folder, the first real step is installing dependencies using:

```bash
npm install
```

This command reads the `package.json` file and downloads every required package into a local folder called `node_modules`.

These packages fall into two categories. Some are required for the application to run in production, and others are only needed during development or build time. Vite itself is included as a development dependency because it is only needed to generate the final output, not to run the final site.

When this step finishes successfully, you will see a large number of packages installed and a new `node_modules` directory created. If this step fails, nothing else will work, and the build process should not be attempted.

After dependencies are installed, the next step is to generate the production version of the project. This is done with:

```bash
npm run build
```

At this point, Vite starts processing the entire project. It scans all relevant source files, including HTML files inside the `src` directory and also `home.html` in the project root. If the project uses Vue, those components are compiled as part of this process as well.

During the build, Vite resolves all imports in your JavaScript files, meaning it follows every dependency chain and includes only what is actually needed. It also removes unused code and compresses everything into smaller, optimized files. CSS and JavaScript are minified so they load faster in a browser.

Each HTML file that is treated as an entry point becomes its own output page. This means the structure of your source directory is partially preserved in the final output, but everything is rewritten into optimized static assets.

When the build finishes successfully, a new folder called `dist` is created in the project root.

This folder contains the entire production-ready version of your website. It includes compiled HTML files, bundled JavaScript, optimized CSS, and any processed assets like images or fonts.

The important thing to understand is that dist is not meant to be edited manually. It is a generated output, not a source folder. Any changes made inside it will be overwritten the next time you run the build command. If you want to change something in the project, you must always edit the source files and then rebuild.

[Vite Documentation](https://vite.dev/guide/){.link-special}
[Vite Build Guide](https://vite.dev/guide/build.html){.link-special}

## Post-Processing

This section describes everything that happens after Vite finishes building the project. It explains what runs, why it exists, how each script behaves, and what the final output is used for.

The key point is that this entire stage is completely separate from Vite. Vite only builds the project. Everything described here happens afterward.

Once Vite finishes building, it produces a dist/ folder containing the final static site. At this stage, the files are technically complete, but they are not yet in the exact format required by the production server.

Post-processing is the step that fixes and adapts those generated files so they match server requirements.

It is implemented using Python scripts instead of JavaScript or Vite plugins. This is intentional so that these steps remain independent from the build system and can be executed manually or in automation pipelines without modifying the bundler.

After the build completes, run:

```bash
python proofing/0_startup.py
```

This is the single entry point for the entire system. You do not run the other scripts manually. They are controlled by this startup script, which ensures everything runs in the correct order and under consistent conditions.

The post-processing system consists of multiple scripts:

- `0_startup.py` → orchestrator and logger
- `1_process_links.py` → cleans and rewrites HTML links
- `2_generate_sitemap.py` → generates `sitemap.xml`

Each script is executed in order and is designed to be **idempotent**, meaning it only performs work when necessary.

### HTML Link Processing

Last Update on 4/18/2026{.date}

It scans every HTML file inside the dist/ directory and rewrites internal links so that they match the production server’s URL structure.

The production server uses “pretty URLs,” meaning it does not expose .html files directly.

Instead of `/pages/about.html`, the final URL must be `/about`.

This rewriting step exists because the build output is generated as static files, while the server (Apache in production) applies routing rules that map clean URLs to those files.

The script parses each HTML file inside dist/, finds all internal href attributes, and rewrites them according to a normalization rule set. This ensures that all internal navigation remains consistent with the final deployed environment.

Examples:

- `/pages/about.html` → `/about`
- `/pages/admission/apply.html` → `/admission/apply`
- `/programs/bachelor-of-science.html` → `/programs/bachelor-of-science`

External links (e.g. https://...) and special protocols (mailto, tel, anchors) are ignored and left untouched.

To avoid reprocessing everything every time, the script uses content hashing.

Each file is processed like this:

First, the file content is read and an MD5 hash is generated. Then the script compares this hash to a cached version stored from previous runs. If the file has not changed, it is skipped completely.

- Each file is hashed using MD5
- Only modified files are processed
- Results are cached in a dedicated cache directory

A cache directory is used to store these hash values so future runs can quickly determine what needs processing.

This avoids reprocessing unchanged files, which is critical when working with a large number of pages.

This step is not a link validator. It does not check whether routes exist or are reachable; it only ensures that internal links are correctly formatted for the production routing model before deployment.

### **Sitemap Generation**

Last Update on 4/18/2026{.date}

After link processing is completed, the system generates a sitemap.xml file inside the dist/ directory.

The sitemap is built from a predefined set of routes that represent the public-facing structure of the website. These routes are defined at build time and reflect the intended navigation structure exposed to users and search engines.

The sitemap is built from a predefined set of routes that represent the public-facing structure of the website. These routes are defined at build time and reflect the intended navigation structure exposed to users and search engines.

The sitemap generator creates a clean `sitemap.xml` file inside `dist/`.

It includes all public-facing routes such as:

- `/`
- `/about`
- `/admission`
- `/admission/apply`
- `/contact`

All routes are normalized into “pretty URL” format, meaning file extensions such as .html are removed and /pages/ prefixes are stripped when applicable. This matches the production server behavior, where Apache rewrite rules serve clean URLs instead of direct file paths.

The final output is written as a standards-compliant XML sitemap (sitemap.xml) placed in the dist/ directory, making it ready for deployment without additional processing.

The sitemap is primarily used for search engines and external auditing tools. It helps them understand the structure and hierarchy of the site for indexing purposes.

It is not required for the site to function. If generation fails or is skipped, the website will still operate normally, but search engine visibility and structural discovery may be reduced.

## Crafting New Scripts

When extending the pipeline, follow these principles to maintain performance and reliability:

- Each script should do one task only. Avoid combining unrelated logic.
- Avoid unnecessary computation: use file hashes (MD5 or similar) to
  detect changes, store cache in a dedicated folder (not root), skip
  processing when inputs are unchanged.
- Disk operations are expensive:
  do not read/write files unless necessary, compare content before
  writing, batch operations when possible.
- Always write files safely.
  Write to a temporary file, and replace the original file only after
  success. This prevents corruption in case of crashes or
  interruptions.
- Running a script multiple times should not change the result after the first successful run.
- Name scripts sequentially (`1_`, `2_`, `3_`, etc.), and add them to `0_startup.py`.
- Ensure failure stops the pipeline.

#### Supplementary Readings

[Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle){.link-special}
[Atomic file write concept](https://en.wikipedia.org/wiki/Atomic_commit#File_systems){.link-special}
[Idempotence in computing](https://en.wikipedia.org/wiki/Idempotence){.link-special}

## Github Actions

Last Updated on 4/19/2026{.date}

GitHub Actions is a built-in automation system provided by GitHub that allows workflows to run automatically based on repository events such as pushes, pull requests, or scheduled triggers.

It is used in this project to automate the build process, enforce code quality checks, and generate deployable output without requiring manual execution on a local machine.

A workflow in GitHub Actions is defined using a YAML file placed inside the .github/workflows/ directory. Each workflow consists of one or more jobs, and each job contains a series of steps that run in sequence on a virtual machine environment provided by GitHub (in this case, Ubuntu).

Workflows are triggered by events. For example, the build workflow in this project runs automatically whenever code is pushed to the main branch or when a pull request is opened.

### Current Build Workflow

Last Updated on 4/19/2026{.date}

The main workflow used in this project is the build pipeline defined in `build.yml`.

This workflow is responsible for validating the codebase, building the project, and producing deployable static files stored in the dist/ directory.

It runs the following sequence of steps:

```yml
name: Build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install Node dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run Prettier check
        run: npx prettier --check .

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Build project
        run: npm run build

      - name: Upload artifact (latest)
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

      - name: Upload backup artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist-backup-${{ github.sha }}
          path: dist/
```

The workflow performs a full validation and build cycle every time code is updated.

It begins by checking out the repository so the workflow has access to the project files. It then sets up a Node.js environment and installs all required dependencies using a clean install (npm ci) to ensure consistency with the lockfile.

After dependencies are installed, the workflow runs code quality checks. This includes linting (to detect potential code issues) and Prettier formatting checks (to ensure consistent code style across the project).

Once the JavaScript environment is prepared, Python is also installed because parts of the build pipeline rely on Python-based scripts for post-processing tasks.

After all validations pass, the project is built using the configured build command (npm run build). This step generates the final static output in the dist/ directory.

Finally, the workflow uploads two artifacts:

1. A latest build artifact (dist), representing the most recent successful build
2. A backup artifact (dist-backup-${{ github.sha }}), which preserves a versioned snapshot of that build for historical reference and rollback purposes

<div class="note">
<img src="/assets/img/notes.svg" />

Each workflow run executes in a clean, isolated environment. This means no files or dependencies persist between runs unless explicitly restored or cached.

The workflow does not currently include deployment automation. Instead, it produces artifacts that are manually downloaded and uploaded to the production server (via cPanel).

Workflow chaining and advanced orchestration (such as separate validation or performance workflows) are not used in this setup. All checks are currently centralized within this single build pipeline for simplicity and predictability.

</div>

## Google Material Icons

All icons used on the website are sourced from <a href="" class="external_link">Google Material Icons</a>. For consistency across the site, maintainers should use icons from this library whenever possible.

These icons can be used by connecting to their Google API server, but this approach is discourged to reduce <a herf="" class="external_link"> Network Dependency Graph. </a>

Check the section explaining this optimization in details.

[Network Dependency Graph](#network-dependency-graph){.link-card}

Icons should be used by downloading the SVG files (\*.svg) or embedding them directly in HTML or CSS (e.g., using an SVG encoder). Prefer embedding SVGs directly in HTML, as browsers are highly optimized for rendering inline SVG content.

<div class="caution">
<img src="/assets/img/frame_exclamation.svg" />

Using them as files does not have any disadventage other than browser fetching those files, and downloading them. This obviously introduces the risks of incomplete downloads upon slow network or failure, but this is not a big issue.

</div>

These icons come in three flavors: **Outlined**, **Rounded**, and **Sharp**.

The icons currently used across the site are all `Outlined`, with a default size of `24px`.

Outlined icons are not filled, which means some may benefit from being paired with `padding` and `background-color`. Avoid assigning arbitrary colors to icons or their backgrounds unless they are tied to design tokens or serve a clear UI purpose.

All icons should be properly aligned and visually centered. The following are common CSS styles used to achieve this.

1. Inline with text

```css
.material-icons {
  font-size: 24px;
  vertical-align: middle;
}
```

2. Flexbox alignment

```css
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px; /* space between icon and text */
}
```

3. Icon inside a square / cirlce

```css
.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}
```

When icons are purely decorative (which is most of the time), make sure to include `aria-hidden="true"` so they are ignored by screen readers.

If an icon conveys meaning, provide an accessible label:

```html
<span class="material-icons" aria-label="Search">search</span>
```

Icons should be used as defined in the Google Material Icons library. If a perfectly matching icon is not available, maintainers may use an icon that is reasonably close in meaning, as long as it does not introduce confusion or misrepresent the intended action.

If no suitable icon exists, prefer using clear text labels instead, or adjust the UI so the meaning is communicated without relying on an icon.

<div class="warning">
<img src="/assets/img/not.svg">

Under no circumstances should custom icons be created, modified, or substituted to represent a missing symbol. This includes manually drawing icons, combining existing icons, or visually altering icons to imply new meanings.

</div>

## <img src="/assets/img/asterisk.svg" alt="" class="heading-icon" /> Backup

It is important to note that build artifacts (build bundles and generated output files hosted on the server) are not intended to be backed up. These files are optimized, minified, and automatically generated during the build process.

The actual source of truth for backups is the source code repository.

The following folders and files should be ignored for backup:

- `node_modules/` -
  This folder contains all installed project dependencies. It can be fully regenerated from `package.json` and `package-lock.json` (or `pnpm-lock.yaml` / `yarn.lock`, depending on the package manager in use). It is not required for backup and can often take up significant disk space (sometimes multiple gigabytes).

- `dist/` -
  This is the production build output generated by Vite. It is fully reproducible using the build command and should never be backed up or committed.

- `dist-ssr/` (if present) -
  Server-side rendering build output, also fully generated during build.

- `.vite/` -
  Temporary Vite cache used during development and build processes. It is safe to delete and regenerate at any time.

<div class="check-alert">
<img src="/assets/img/check-alert.svg">

Although the source code is stored in a GitHub repository, it is STILL mandatory to maintain a local copy of the latest commit on the development machine.

When pushing changes to the repository, a local working copy should always be kept in sync with the remote state. This ensures that development can continue even in cases of repository downtime, accidental deletion, or access issues.

Additionally, local backups or mirrored copies of the repository may be maintained as a precaution against data loss or unintended repository changes.

</div>

### Backup Schedule

Backups should be performed regularly to ensure that the latest working state of the project is always recoverable.

A backup is required in the following situations:

- After completing a meaningful set of changes or a feature implementation
- Before merging major changes into the main branch
- Before making structural or breaking changes to the codebase
- After resolving significant bugs or refactors
  Before performing any risky or irreversible operations

In general, at minimum, a backup should reflect the latest stable commit state of the repository.

There is no fixed time-based interval for backups (e.g., daily or weekly). Instead, backups are event-driven and tied to development milestones.

However, maintainers should ensure that no more than a small number of changes accumulate without being committed and backed up. Long periods without synchronization to the repository are discouraged.

In short, **_if the state of the project changes in a meaningful way, it should be backed up._**
