# Layout Standards & Guidelines

This document defines the standard layout values used across the application to ensure consistency in max-width, padding, and responsiveness.

## Global Variables

Defined in `globals.css`:

| Variable | Value | Description |
| :--- | :--- | :--- |
| `--layout-max-width` | `1920px` | The maximum width for all page content (Header, Footer, Sections). |
| `--layout-padding-x-mobile` | `1.5rem` (24px) | Horizontal padding for mobile devices. |
| `--layout-padding-x-desktop` | `3rem` (48px) | Horizontal padding for desktop devices (screen width >= `md`). |

## Usage in Components

### Tailwind Arbitrary Values

Use `max-w-[var(--layout-max-width)]` and `px-[var(--layout-padding-x-mobile)]` / `md:px-[var(--layout-padding-x-desktop)]`.

### SectionWrap Component

The `SectionWrap` component automatically applies these standards to its content container while keeping the background full-width.

**Do NOT add max-width or horizontal padding to the `className` prop of `SectionWrap`.**

Correct:
```tsx
<SectionWrap variant="light" className="py-24">
  {/* Content automatically constrained and padded */}
</SectionWrap>
```

Incorrect:
```tsx
<SectionWrap className="max-w-[1920px] px-6"> ... </SectionWrap>
```

### Header & Footer

The Header and Footer components also strictly follow these variables to ensure vertical alignment with the content.

## Breakpoints

Default Tailwind breakpoints are used. Any custom breakpoints should be added to `tailwind.config.ts` and documented here.

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
