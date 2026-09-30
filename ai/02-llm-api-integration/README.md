# 02 — LLM API Integration

## Connection
The model is now understood as a probabilistic external dependency. The next step is designing a reliable boundary between your application and the provider.

## Architecture

`React UI → Backend/BFF → Model Provider`

Do not place privileged provider API keys in browser bundles. The backend owns credentials, policy, rate limiting, request validation, and provider-specific integration.

## Request lifecycle
A production request should account for:

1. authentication and authorization
2. input validation
3. model/request configuration
4. timeout and cancellation
5. streaming or non-streaming response handling
6. provider errors and rate limits
7. response validation
8. telemetry

## Failure handling
Distinguish:

- network failure
- timeout
- rate limit
- provider outage
- invalid request
- malformed structured output
- application authorization failure
- user cancellation

Retries should be bounded and selective. Retrying a validation error is usually pointless. Retrying transient infrastructure failures may be appropriate.

## Provider abstraction
An abstraction can isolate provider-specific SDK calls, but do not create a lowest-common-denominator interface that hides capabilities your application actually needs. Keep model name, token limits, streaming behavior, and structured-output semantics observable.

## Frontend pattern
Use a request ID per generation. If the user starts request B before request A finishes, the UI must not let a late A response overwrite B.

## Interview reasoning
**Why not call the model directly from React?** Credentials and policy belong in a trusted environment. Direct browser calls also make centralized authorization, quotas, auditing, and provider switching harder.

## Practical challenge
Build a backend endpoint that accepts a typed chat request, validates it, calls a provider, streams output, handles cancellation, and returns a normalized error contract.

## Next
Once the API boundary is reliable, the next problem is specifying what the model should do.