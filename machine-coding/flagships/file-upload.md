# Flagship: File uploader (60–75 min)

## Requirements
Multiple files via picker and drag & drop · validate type and size (show errors per file) · image previews · progress per file · cancel and retry · max 3 concurrent uploads · overall summary (3/5 uploaded).

## State
`items: UploadItem[]` with `status: queued | uploading | done | error | canceled`, `progress`, `error`, `controller`. A queue runner starts next queued item when a slot frees.

## Implementation notes
XHR for upload progress; AbortController/`xhr.abort()` for cancel; `URL.createObjectURL` previews with cleanup; `<input type="file" multiple accept="image/*,.pdf">` stays available for keyboard users; `aria-live` for completion.

## Follow-ups
Chunked & resumable uploads (large files), pre-signed URLs, pause/resume, checksum, background upload continuing across routes (global upload manager), retry with backoff.

Notes: [21 file upload](../21-file-upload/README.md).
