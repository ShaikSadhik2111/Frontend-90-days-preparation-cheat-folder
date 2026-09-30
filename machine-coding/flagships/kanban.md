# Flagship: Kanban Board

## Requirements
Columns, cards, drag/drop, create/edit/delete and reorder.

## State
Normalized cards, column order, drag state and pending mutation.

## Correctness
Stable IDs, valid target position, optimistic reorder rollback on failure.

## Advanced
Keyboard movement, server conflict, real-time collaboration, undo and virtualization.

## Interview follow-ups
What if two users move the same card? What if save fails? What if there are 50k cards?