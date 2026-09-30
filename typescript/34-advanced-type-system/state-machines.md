# Type-Safe State Machines

Model application states explicitly rather than combining independent booleans.

Bad model:

`isLoading + isError + data`

This permits contradictory states.

Better model:

`idle | loading | success(data) | error(error)`

## Frontend uses

- async requests
- multi-step forms
- authentication
- file upload
- payment flows
- AI streaming

## Exercise

Design a typed file-upload state machine with idle, validating, uploading(progress), success(url), cancelled and error states.
