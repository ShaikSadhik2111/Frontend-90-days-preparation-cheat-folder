# 21 — File upload

## Requirements
Select or drag & drop files · validate type/size · preview images · per-file progress · cancel · retry failed · limit concurrent uploads · overall status.

## Progress needs XHR (fetch has no upload progress)
```ts
function uploadFile(file: File, url: string, onProgress: (pct: number) => void, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(`HTTP ${xhr.status}`)));
    xhr.onerror = () => reject(new Error("Network error"));
    signal?.addEventListener("abort", () => { xhr.abort(); reject(new DOMException("Aborted", "AbortError")); });
    const body = new FormData(); body.append("file", file);
    xhr.send(body);
  });
}
```
## State per file
```ts
type UploadItem = { id: string; file: File; status: "queued" | "uploading" | "done" | "error" | "canceled"; progress: number; error?: string; controller?: AbortController };
```
Concurrency limit (e.g. 3) → see `promisePool` in [code/polyfills/src/promise-utils.js](../../code/polyfills/src/promise-utils.js).
Image preview: `URL.createObjectURL(file)` and `URL.revokeObjectURL` on cleanup.
Drag & drop: `onDragOver={e => e.preventDefault()}` + `onDrop={e => add(e.dataTransfer.files)}`; keep a normal `<input type="file" multiple>` for keyboard users.
Large files (design follow-up): chunked/resumable uploads, pre-signed URLs, checksum, resume after refresh.

Next → [22 Drag & drop](../22-drag-drop/README.md)
