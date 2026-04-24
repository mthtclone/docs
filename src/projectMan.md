---
title: Project Management
layout: layouts/doc.njk
---

This section is equally important — if not more so — than the development guidelines that all maintainers must be familiar with.

We use GitHub Projects as our project management (PM) tool because:

1. It is free and widely accessible.
2. Each project can be linked to specific repositories, enabling clear traceability between tasks and code.
3. It provides sufficient features for a typical PM workflow, including issue tracking, task boards, and progress visualization.
4. The GitHub GraphQL API allows integration with external tools for automation, notifications, and bot-based workflow management.

## Kanban Board

In this project, we use the terms Kanban and Backlog interchangeably, even though they have distinct meanings in standard project management practice.

In our context, Backlog refers to a general to-do space, but we extend its meaning to represent the full lifecycle flow of issues across the board.

The following columns are used in our workflow:

- **Backlog** - Used only for drafting. This is where informal ideas, notes, or early concepts are recorded before being refined into actionable issues or discussed with other maintainers.

- **Anticipated** - The starting point for concrete issues. Items here are not yet in progress but are considered viable candidates for implementation or may later be rejected during review.

- **Bug** - A dedicated column for tracking known defects or issues. This is not strictly part of the feature lifecycle and serves as a centralized space for problem tracking.

- **In Progress** - Contains issues that are actively being worked on. These items are currently under development or investigation and may still evolve or be dropped depending on findings.

- **Pending** - This is an important column for procedual workflow, and for collaborative authoring. Items that have been submitted but has not reviewed belong to this column. (WIP issues do not necessarily mean it would not have rollback in its lifecycle. Thus, this column is to purely distinguish approved and disapproved issues.)

- **Staging** - Items in this column have been reviewed and approved. They are ready to be merged, deployed, or included in batch updates.

- **Done** - Represents completed and fully resolved issues. Items here are considered closed.

- **wontfix** - Issues that have been reviewed but intentionally will not be addressed.

- **Rejected** - This is not so different from the above column, but this distinction is to tell apart that issues that have been definitively declined and will not be reconsidered under any circumstances.

## Labels

- **atty** - General internal tracking label for accessibility-related issues. Used as a catch-all for miscellaneous tasks that have not yet been categorized.

- **bug** - Indicates something is broken or not functioning as intended. This is a generic label and may be applied before further classification or specification is available.

- **compliance** - Work related to legal, regulatory, standards, or policy compliance requirements.

- **documentation** - Tasks involving creation, updates, or improvements to documentation content.

- **duplicate** - Indicates that the issue already exists and is redundant.

- **enhancement** - Improvements to existing functionality or user experience. This may be used alongside other labels to indicate what is being improved.

- **experimental** - Prototype or trial features that are not guaranteed to be permanent. Typically used for significant or exploratory changes.

- **feature** - A generic label for new functionality or additions to the system.

- **feature-propose** - Proposed supporting features required to enable or complement a primary feature. This should not be confused with experimental.

- **help wanted** - Indicates that the issue is open, unassigned, and available for contribution.

- **incomplete** - Work that is partially completed or does not yet meet the required scope.

- **Need REVIEW!** - Issues requiring urgent review prior to merging or final approval.

- **needs-info** - Additional information is required before work can proceed.

- **overdue** - Tasks or issues that have exceeded their expected deadline or timeline.

- **regression** - Issues where previously working functionality has broken due to recent changes.

- **research** - Investigation or exploration required before implementation.

- **rework** - Work that requires redesign or revision, often as a rollback or correction of prior implementation.

- **tech-debt** - Refactoring or maintenance work aimed at improving code quality, structure, or maintainability without adding new features.

- **ui/ux** - Issues related to interface design and user experience.

## Issue Lifecyle Rules

1. Issues should only move one column at a time. Avoid skipping stages or making non-sequential transitions. In general, issue movement must reflect the actual progression of work performed.

2. Since **Backlog** is used strictly for drafting purposes, all actionable issues must begin in the **Anticipated** column.

3. Avoid illogical transitions (e.g., **Anticipated** → **Staging**) without passing through the necessary intermediate stages that justify the progression..

4. All issues moved into **In Progress** must include a start date, due date, and expected end date, regardless of task size.

5. Issues must not be moved from **Staging** to **Done** without an associated Pull Request and proper review process.

6. All issues must be closed through commits or merged work. They must not be closed manually without corresponding repository changes.

7. Issues should be treated as a traceable timeline of work. Their history must remain consistent, logical, and auditable throughout their lifecycle.

## Priority System

We use a standard priority scale (P0–P3) to classify task urgency and importance.

- P0 – Critical issues requiring immediate attention (system-breaking or blocking work)

- P1 – High-priority tasks that should be addressed soon

- P2 – Medium-priority tasks scheduled for normal development flow

- P3 – Low-priority or optional tasks that can be addressed when resources allow

As a general rule, all issues must have a defined priority level. Exceptions may be made for small, immediate changes where prioritization is implicitly understood.

## Review & Approval Rules

This is one of the more complex parts of the workflow, as different types of work require different evaluation criteria. A single universal review standard is not sufficient, so we group tasks into categories and define review expectations for each.

1. Functionality

Functional changes (features, UI components, and system behavior) are reviewed based on the following criteria:

- Semantics & Accessibility – The implementation should follow semantic HTML practices and accessibility standards.
  UI/UX Quality – The design should be intuitive, consistent, and user-friendly.

- Performance – The change should not introduce unnecessary performance overhead.

- Maintainability – The code should be clean, extensible, and easy to maintain.

2. Bug

Bug-related changes are evaluated not only on whether they resolve the issue, but also on long-term impact:

- Short-term fixes or patches are acceptable when necessary.

- However, any temporary or workaround-based fix should ideally be accompanied by a follow-up task for a more permanent solution.

- The solution should minimize regression risk and avoid introducing technical debt where possible.

3. Documentation

Documentation changes must ensure clarity, completeness, and maintainability of knowledge:

- All relevant changes should be clearly documented.

- Explanations should include what was changed and how it was changed.

- Documentation should be sufficient for a future maintainer to understand and continue work without prior context.

4. Security

Security review ensures that changes do not introduce vulnerabilities, expose sensitive data, or weaken system integrity

- Proper validation and sanitization of all user inputs to prevent injection attacks or malformed data handling.

- Ensuring only authorized users can perform restricted actions or access protected resources.

- Verifying that no sensitive information (credentials, internal endpoints, personal data) is unintentionally exposed in UI, logs, or API responses.

- Awareness of insecure or outdated libraries that may introduce vulnerabilities.

- Ensuring no unsafe logic is exposed or executable in the frontend in a way that compromises security.

Security concerns should always override feature convenience or implementation shortcuts.

5. Scope Validation

Scope validation ensures that each change aligns with the project’s intended purpose and boundaries.

If a change falls outside scope, it should be redirected to discussion or marked as a separate proposal

All proposed changes should be checked against:

- Relevance – The feature or fix must clearly belong to the system and not introduce unrelated functionality.

- Justification – The change should have a clear reason or requirement behind it.

- Boundaries – Avoid expanding the system beyond its agreed scope without explicit discussion or approval.

- Dependency awareness – Ensure the change does not unintentionally require large unrelated modifications elsewhere.

6. Data Integrity

Data integrity ensures that the system’s information remains accurate, consistent, and reliable throughout all operations.

- Data should remain uniform across components, databases, and UI representations.

- Updates must not introduce incorrect states or mismatched values.

- Any change in data state must follow defined and predictable rules.

- Ensure that stored data is not unintentionally overwritten, lost, or corrupted.

- All data modifications should respect existing constraints and schema rules.

At the time of writing, the approval authority and formal review assignment process have not yet been fully defined.{.warning}
