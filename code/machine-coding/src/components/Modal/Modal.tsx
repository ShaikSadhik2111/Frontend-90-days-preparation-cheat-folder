import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type Props = { open: boolean; onClose: () => void; title: string; children: React.ReactNode };

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal:
 * - rendered in a portal (escapes overflow/z-index of parents)
 * - role="dialog" aria-modal aria-labelledby
 * - Escape closes, backdrop click closes, click inside doesn't
 * - focus moves into the dialog, Tab is trapped, focus returns to the opener on close
 * - body scroll locked while open
 */
export function Modal({ open, onClose, title, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current!;
    (dialog.querySelector<HTMLElement>(FOCUSABLE) ?? dialog).focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onCloseRef.current(); return; }
      if (e.key !== "Tab") return;
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) { e.preventDefault(); return; }
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus(); // return focus to the button that opened it
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="modal__backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="modal">
        <header className="modal__header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" aria-label="Close dialog" onClick={onClose}>✕</button>
        </header>
        {children}
      </div>
    </div>,
    document.body
  );
}
