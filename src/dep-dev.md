---
layout: layouts/doc.njk
title: Development
---
## Accessibility

**Accessibility** means designing and building the website so that everyone can use it, including people with disabilities. This includes users who rely on screen readers, keyboard navigation, voice control, or other assistive technologies.

In simple terms, if a user cannot see the screen, cannot use a mouse, or has difficulty reading content, the website must still remain usable and understandable.

**Accessibility** is not optional. Many regions enforce legal requirements that require websites, ***especially educational institutions***, to meet defined accessibility standards. These requirements are commonly based on the WCAG 2.1 (Web Content Accessibility Guidelines), which define how web content should be made accessible.

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

The goal is to separate *layout*, *typography*, and *component-specific styling* so that changes in one area do not unintentionally break others.

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

**ESLint** uses the modern flat configuration system (eslint.config.*), which is required for **ESLint** v9+.

In the `eslint.config.cjs` file,

The project uses **ESLint** v10+, which requires `eslint.config.*` instead of .eslintrc.*

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
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    commit-message:
      prefix: "deps"
    rebase-strategy: "auto"
    ignore:
      - dependency-name: "vue"
        update-types: ["version-update:semver-major"]
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
dependency-name: "vue"
update-types: ["version-update:semver-major"]
```
Major version updates often introduce breaking changes that require manual code modifications and testing. By ignoring these updates, the system avoids automatically generating pull requests that may destabilize the project.

Minor and patch updates for Vue are still allowed and will be proposed by Dependabot.

For additional configuration options and advanced usage, refer to the documentation below.

[Official Dependabot Documentation](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file){.link-special}

## Vite Bundling

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

-   `0_startup.py` → orchestrator and logger
-   `1_process_links.py` → cleans and rewrites HTML links
-   `2_generate_sitemap.py` → generates `sitemap.xml`

Each script is executed in order and is designed to be **idempotent**, meaning it only performs work when necessary.

### HTML Link Processing

It scans every HTML file inside the dist/ directory and rewrites internal links so that they match the production server’s URL structure.

The production server uses “pretty URLs,” meaning it does not expose .html files directly.

Instead of `/src/about.html`, the final URL must be `/about`.

This requires rewriting links after the build, because Vite itself generates files based on source structure, not server routing rules.

The script parses each HTML file inside dist/, finds all internal links, and rewrites them according to a defined mapping rule.

Examples:

-   `/src/about.html` → `/about`
-   `/src/apply.html` → `/apply`

To avoid reprocessing everything every time, the script uses content hashing.

Each file is processed like this:

First, the file content is read and an MD5 hash is generated. Then the script compares this hash to a cached version stored from previous runs. If the file has not changed, it is skipped completely.

-   Each file is hashed using MD5
-   Only modified files are processed
-   Results are cached in a dedicated cache directory

A cache directory is used to store these hash values so future runs can quickly determine what needs processing.

This avoids reprocessing unchanged files, which is critical when working with a large number of pages.

### **Sitemap Generation**

After links are rewritten, the system generates a sitemap.

The sitemap generator creates a clean `sitemap.xml` file inside `dist/`.

It includes all public-facing routes such as:

-   `/`
-   `/about`
-   `/apply`
-   `/contact`

The sitemap is primarily used for search engines and auditing tools. It helps external systems understand the structure of the website.

It is not required for the site to function. If it fails, the site will still work normally, but search engine indexing and structural visibility may be reduced.

### **Logging System**

All post-processing activity is logged by `0_startup.py`.

Each day generates a single log file:

    logs/YYYY-MM-DD.log

Format:

    Author: >John Doe<  
    2026-03-31 14:25:12  
      
    [2026-03-31 14:25:13] Started 1_process_links.py  
    [2026-03-31 14:25:14] Finished 1_process_links.py successfully


-   Automatically detects the Git author (`git config user.name`)
-   Appends logs if run multiple times on the same day
-   Records failures and exit codes
-   Provides traceability for administrative auditing


## Crafting New Scripts

When extending the pipeline, follow these principles to maintain performance and reliability:

 - Each script should do one task only. Avoid combining unrelated logic.
 - Avoid unnecessary computation: use file hashes (MD5 or similar) to
   detect changes, store  cache in a dedicated folder (not root), skip
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
