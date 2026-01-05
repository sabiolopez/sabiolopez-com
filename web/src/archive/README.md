# Features Archive

This directory contains features and components that have been removed from the main production flow but are being preserved for future iterations.

## Preserved Features

### Thinking (Pensamentos)
- **Path**: `src/archive/thinking`
- **Description**: A blog-like section for sharing thoughts and structured writing.
- **Reason for Archiving**: Part of the strategy to streamline the first release. The idea is excellent and will be revisited in future deliveries.
- **CMS Evolution**: The MDX schema in `src/lib/mdx.ts` has been evolved to include `status` and `publishedAt` fields to support a more robust publishing workflow in the future.

### Methodology (Metodologia)
- **Status**: Deleted (`src/app/[locale]/how-i-work/page.tsx`).
- **Note**: The user requested deletion as it wasn't adding enough value at this stage.

## CMS Schema Update (2025-12-31)
The `ArticleMetadata` interface in `src/lib/mdx.ts` now includes:
- `status`: `'draft' | 'published'`
- `publishedAt`: ISO string for the actual publication date.
