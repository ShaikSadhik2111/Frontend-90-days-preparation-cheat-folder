# Flagship: Virtualized Feed

## Requirements
Large feed, scroll, pagination and item interaction.

## Architecture
Cursor API + cache + virtualization window + overscan.

## Correctness
Stable keys, deduplicated pages and correct scroll restoration.

## Advanced
Variable heights, image loading, live inserts, reverse scrolling and accessibility.

## Follow-ups
What happens when a new item arrives above the user’s current position?