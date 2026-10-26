import { useRef, useState } from "react";

type Props = { length?: number; onComplete?: (code: string) => void };

/**
 * N single-digit inputs: auto-advance, Backspace goes back, arrow keys move,
 * paste fills all boxes. Refs stored in an array (useRef<(HTMLInputElement|null)[]>).
 */
export function OtpInput({ length = 6, onComplete }: Props) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (i: number) => inputs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  function update(next: string[]) {
    setDigits(next);
    if (next.every((d) => d !== "")) onComplete?.(next.join(""));
  }

  function onChange(i: number, raw: string) {
    const d = raw.replace(/\D/g, "").slice(-1); // keep only the last typed digit
    if (!d) return;
    const next = [...digits];
    next[i] = d;
    update(next);
    focus(i + 1);
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...digits];
      if (next[i]) { next[i] = ""; setDigits(next); }
      else if (i > 0) { next[i - 1] = ""; setDigits(next); focus(i - 1); }
    } else if (e.key === "ArrowLeft") focus(i - 1);
    else if (e.key === "ArrowRight") focus(i + 1);
  }

  function onPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    if (!pasted.length) return;
    const next = Array.from({ length }, (_, i) => pasted[i] ?? digits[i]);
    update(next);
    focus(pasted.length);
  }

  return (
    <fieldset className="otp">
      <legend>Enter the {length}-digit code</legend>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          value={d}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${i + 1}`}
          maxLength={1}
          onChange={(e) => onChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </fieldset>
  );
}
