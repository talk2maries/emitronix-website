---
name: website-engineer
description: Build, fix, or improve this Next.js and Tailwind website. Use for website UI, content, accessibility, performance, Core Web Vitals, responsive pages, browser testing, production build validation, and repo-safe implementation work.
---

# Website Engineer

## Workflow

1. Inspect the existing project before changing files: `package.json`, app routes, components, data files, Tailwind config, and nearby patterns.
2. Follow the detected stack, package manager, framework conventions, and reusable components. For this repository, expect Next.js App Router, TypeScript, Tailwind CSS, and npm.
3. Build mobile-first responsive pages and keep layouts stable with explicit dimensions, responsive constraints, and accessible semantics.
4. Reuse the current design language, spacing, typography, navigation patterns, and brand assets unless the user asks for a redesign.
5. Prefer server components and static rendering where possible. Add client components only when interactivity requires them.

## Quality Checks

- Check accessibility: semantic landmarks, headings, labels, focus states, color contrast, keyboard access, and meaningful alt text.
- Check security: no secrets in browser code, no unsafe external scripts, no unvalidated form assumptions, and no leaked environment values.
- Check speed and Core Web Vitals: optimized images, stable layout, lazy loading for non-critical media, limited client JavaScript, and no avoidable render blockers.
- Run the available validation commands after meaningful changes: `npm run lint` when usable, tests when configured, and `npm run build`.
- Test important pages in a real browser when UI changes are visible. Cover desktop and mobile viewports, hero images, navigation, forms, and key CTAs.

## Deployment Boundary

- Never deploy automatically.
- Never restart production, run `deploy-emitronix`, or push production changes without explicit user confirmation.
- If a deployment is requested, confirm the target, branch, and expected production behavior before taking action.
