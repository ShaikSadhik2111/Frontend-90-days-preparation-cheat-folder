# Flagship: Resumable File Upload

## Requirements
Select, validate, progress, cancel, retry and process.

## State machine
idle → selecting → uploading → paused/error → processing → complete.

## Advanced
Chunking, concurrent-part limit, per-part retry, resume metadata, checksum/content identity and async processing.

## Correctness
A completed part is not uploaded again unnecessarily; obsolete progress cannot move backwards.

## Follow-ups
2 GB file, network drop, duplicate upload, tab close and secure download.