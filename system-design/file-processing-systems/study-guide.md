# Large File Upload and Processing

Architecture: Browser → upload-session API → object storage → processing queue → worker → status API/events.

Keep large binaries out of the application server when direct object-storage upload is appropriate.

Resumable upload: file → chunks → upload parts → finalize. Persist upload ID and completed parts.

Client states: idle, selecting, uploading, paused, processing, complete/error. Track bytes, active requests, failed chunks, cancellation and processing status.

Never trust filename, extension or client MIME type. Enforce authorization, size limits, validation and scanning where required.

Long processing should be asynchronous with a job ID and status endpoint or event stream.

Challenge: design Excel upload with progress, validation errors, asynchronous processing and downloadable result.