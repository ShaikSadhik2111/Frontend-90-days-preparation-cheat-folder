# Streaming UI and Tool-Call State Machines

## Streaming state

Model a stream explicitly:

`idle → connecting → streaming → completed`

with terminal alternatives:

`cancelled | failed`

Keep partial output separate from final output and handle disconnects.

## Tool calls

A tool invocation should have explicit state:

`requested → validated → executing → succeeded | failed`

Never treat model-generated tool arguments as trusted input. Validate the arguments before execution.

## Race protection

Track request identity so an older stream cannot overwrite a newer user intent.

## Exercise

Build a React chat state model that supports token streaming, cancel, retry, tool execution and stale-response protection.
