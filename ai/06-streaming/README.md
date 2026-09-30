# 06 — AI Streaming

## Connection
A normal API returns a complete response. LLM generation can take long enough that users benefit from receiving output incrementally.

## Mental model
Streaming changes the response from:

`request → wait → response`

to:

`request → chunks → chunks → ... → completion`

The frontend must therefore model a state machine.

## UI state

`idle → connecting → streaming → completed`

with exits to:

`cancelled` or `failed`

## Production concerns
Handle:

- partial UTF-8/text boundaries where applicable
- disconnected streams
- user cancellation
- navigation cleanup
- duplicate events
- provider-specific event formats
- final metadata
- retry behavior
- stale request IDs

AbortController is useful for user-initiated cancellation. Cancellation and stale-response protection are separate concerns.

## React architecture
Keep transport logic outside presentation where possible. The UI should consume a normalized stream state rather than knowing every provider's event format.

## UX
Streaming is not automatically better. If the answer is tiny, a normal response may be simpler. For long generations, stream content and provide a visible stop action.

## Interview reasoning
**How do you prevent an old stream from updating the current chat?** Give each generation a unique request ID and accept chunks only for the active request.

## Practical challenge
Build a streaming chat component with stop, retry, partial output, error recovery, and request identity.

## Next
AI systems often need semantic similarity, which leads to embeddings.