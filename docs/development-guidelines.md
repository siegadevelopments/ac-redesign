# Development Guidelines

## General Principles

Prefer:

* Existing project patterns
* Simple solutions
* Reusable components
* Clear naming
* Small focused components

Avoid:

* Premature abstraction
* Large monolithic components
* Unnecessary dependencies
* Duplicate logic
* Unused code

## Component Rules

A component should have one clear responsibility.

Extract components when:

* They are reused
* They represent a distinct UI concept
* They significantly improve readability

Do not extract tiny components solely for abstraction.

## Styling

Follow the existing project's styling system.

Maintain:

* Consistent spacing
* Consistent typography
* Responsive behavior
* Accessible contrast

Avoid arbitrary values unless necessary.

## Responsive Design

Design mobile-first.

Check:

* Small mobile
* Large mobile
* Tablet
* Desktop
* Large desktop

Do not assume desktop layouts will automatically work on mobile.

## Accessibility

Use:

* Semantic HTML
* Proper heading hierarchy
* Accessible labels
* Keyboard navigation
* Visible focus states

Respect:

prefers-reduced-motion

Animations must not be required to understand content.

## Performance

Avoid:

* Large unnecessary JavaScript bundles
* Heavy animation libraries when CSS is sufficient
* Unoptimized images
* Blocking resources
* Unnecessary client-side rendering

## Dependencies

Before adding a dependency:

1. Check package.json.
2. Check whether the capability already exists.
3. Prefer existing project dependencies.
4. Prefer native browser capabilities where appropriate.

Document any newly added dependency and why it was required.

## Validation

Before completion:

* Run lint
* Run type check
* Run tests if available
* Check production build if practical
* Fix all introduced warnings and errors

Do not report completion while known implementation errors remain.
