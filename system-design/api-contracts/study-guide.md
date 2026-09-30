# API Contracts

Define resource shape, identifiers, nullable versus optional fields, pagination, filtering, sorting, errors, authorization, versioning and idempotency.

Prefer API DTO → mapper → domain/view model → UI. This prevents backend nesting and naming details from leaking into components.

Example error:
{
  "error": {
    "code": "ORDER_CONFLICT",
    "message": "Order was modified",
    "details": {}
  }
}

Use stable machine-readable codes. Treat server messages as untrusted display data.

Filtering and sorting should use an explicit allow-list of fields and directions. Never convert arbitrary client strings into backend queries without validation.

Idempotency keys can prevent duplicate effects for retryable operations such as submissions or payments.

Prefer additive API evolution where possible; deprecate deliberately and coordinate breaking changes.

Interview drill: if customerName becomes customer.name, the UI should change only at the data mapping boundary, not in every component.

Challenge: design an order-table contract supporting filters, sorting, cursor pagination and field-level validation.