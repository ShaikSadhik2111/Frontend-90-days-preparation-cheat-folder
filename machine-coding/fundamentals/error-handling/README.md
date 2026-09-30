# Error Handling
Classify validation, authorization, not-found, conflict, rate-limit, transient-server, network/offline and runtime errors.

Every async component needs recovery behavior. Do not turn errors into empty arrays.

Challenge: add retry and stale-data recovery to a server table.