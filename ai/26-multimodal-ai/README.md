# 26 — Multimodal AI

## Connection
AI applications increasingly combine text with images, audio, documents, and other modalities.

## Pipeline
A multimodal request often looks like:

`upload → validate → preprocess → model → structured result → application`

Each modality has different limits and failure modes.

## Frontend concerns
Handle:

- file type validation
- size limits
- upload progress
- previews
- accessibility
- cancellation
- retry
- privacy
- large payloads

Never trust a browser-provided MIME type alone for security-sensitive processing.

## Model reasoning
An image model's interpretation is probabilistic. For consequential decisions, require evidence, validation, or human review rather than treating visual inference as ground truth.

## Production architecture
Large files may be uploaded to object storage and referenced by the backend rather than sent directly through a normal JSON request. Preprocessing can include resizing, OCR, transcription, or metadata extraction.

## Interview reasoning
**What changes when adding images to an AI system?** Payload size, preprocessing, privacy, model capability, latency, cost, and validation all change.

## Practical challenge
Build a React document/image upload flow with validation, progress, cancellation, preview, and a backend analysis job.