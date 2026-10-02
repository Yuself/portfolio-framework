# Architecture

Portfolio Framework separates public content, validation, interaction logic, presentation, and publication safety. The boundary keeps customization straightforward and makes the repository's claims independently testable.

## System flow

```text
demo-content.ts -> schema validation -> page composition -> reusable sections
                                           |
                                           +-> pure project filter

tracked files  -> public-safety scanner -> publication gate
Git history    -----------^
```

## Responsibilities

| Layer | Location | Responsibility |
| --- | --- | --- |
| Content | `content/demo-content.ts` | Holds one fictional portfolio configuration. |
| Contract | `lib/portfolio-schema.ts` | Defines public types and reports invalid or unsafe demo values. |
| Domain logic | `lib/project-filter.ts` | Returns projects for one stable category without mutating input. |
| Composition | `app/page.tsx` | Connects validated content to the page sections. |
| Presentation | `components/portfolio/` | Renders navigation, narrative, projects, experience, skills, and contact. |
| UI primitive | `components/ui/` | Encapsulates shared headings and reduced-motion-aware reveal behavior. |
| Publication safety | `scripts/check-public-safety.mjs` | Scans current files and reachable Git blobs for selected blockers. |
| Verification | `tests/` and `e2e/` | Exercises content contracts, filtering, semantics, responsive behavior, keyboard access, and motion preferences. |

## Key decisions

### Configuration before presentation

Components consume `PortfolioContent` rather than embedding identity data. A new portfolio can replace one configuration while keeping the layout and interaction system intact.

### Runtime validation alongside TypeScript

TypeScript protects authored code, but imported or edited data can still violate publication rules. `validatePortfolioContent` checks required fields and constrains the safe demo contact address at runtime.

### Pure filtering

Category selection delegates to `filterProjects`. Keeping this behavior outside React makes it deterministic, mutation-free, and cheap to test across known and unknown filters.

### Progressive enhancement

The complete project collection exists in the initial document. Client-side controls improve browsing, while headings, links, and core content remain meaningful without decorative motion. Reduced-motion preferences disable the reveal transition.

### Two publication scans

The working-tree scan checks what could be committed now. The history scan checks every reachable blob, because a value removed from the current tree may still be exposed when the repository becomes public. Matches report the rule and location without echoing possible secret values.

## Verification boundary

Automated checks provide evidence for the local source tree, production compilation, configured Chromium viewports, and selected privacy patterns. They do not prove a hosted deployment, ownership of substituted assets, or complete detection of all sensitive information. Those remain explicit pre-publication review responsibilities.
