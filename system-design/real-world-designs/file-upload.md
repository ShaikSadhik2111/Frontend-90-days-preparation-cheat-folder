# Case Study: Large File Upload

## Requirements
Upload large files, show progress, cancel/retry, process asynchronously and download results.

## Architecture
Browser → upload session → object storage → processing queue → worker → status API/events.

## Client state
idle, selecting, uploading, paused, processing, complete, error.

## Upload strategy
Chunk file, upload parts concurrently within a limit, persist completed parts, finalize upload.

## Correctness
Idempotent part identifiers prevent duplicate effects. Retry only failed parts.

## Security
Validate size/type server-side, scan content when required, authorize object access and use scoped downloads.

## UX
Show upload progress separately from server processing progress.

## Follow-ups
Resume after tab close, duplicate file detection, virus scanning and multi-file concurrency.