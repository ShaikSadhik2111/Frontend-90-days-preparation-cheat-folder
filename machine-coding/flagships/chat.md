# Flagship: Chat UI (75 min)

## Requirements
Conversation list + message pane · send message (Enter, Shift+Enter newline) · optimistic send with status (sending → sent → failed + retry) · incoming messages from a mock real-time source · auto-scroll to bottom only if user is already at bottom · "new messages" indicator otherwise · load older messages on scroll up.

## State
`messagesByConversation: Record<id, Message[]>`, `draftByConversation`, `activeConversationId`. Message: `{ id | tempId, text, author, createdAt, status }`.

## Edge cases
Ordering by server time/sequence · duplicate on retry (dedupe by tempId/idempotency key) · keeping scroll position when prepending older messages · switching conversations keeps drafts · long messages/links (escape HTML) · offline queue.

## Follow-ups
WebSocket with reconnect · typing indicators (throttled) · read receipts · virtualization for long histories · attachments · accessibility (`role="log"`, `aria-live="polite"`).
