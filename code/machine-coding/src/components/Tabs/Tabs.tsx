import { createContext, useContext, useId, useRef, useState } from "react";

/**
 * Compound-component pattern + WAI-ARIA tabs:
 *   <Tabs defaultValue="a">
 *     <Tabs.List><Tabs.Tab value="a">A</Tabs.Tab>…</Tabs.List>
 *     <Tabs.Panel value="a">…</Tabs.Panel>
 *   </Tabs>
 * Keyboard: ← → Home End move focus + selection (roving tabindex).
 */
type Ctx = { value: string; setValue: (v: string) => void; baseId: string };
const TabsContext = createContext<Ctx | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>");
  return ctx;
}

export function Tabs({ defaultValue, value: controlled, onChange, children }: {
  defaultValue?: string; value?: string; onChange?: (v: string) => void; children: React.ReactNode;
}) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const value = controlled ?? internal; // supports controlled AND uncontrolled usage
  const setValue = (v: string) => { if (controlled === undefined) setInternal(v); onChange?.(v); };
  const baseId = useId();
  return <TabsContext.Provider value={{ value, setValue, baseId }}>{children}</TabsContext.Provider>;
}

function List({ children, label }: { children: React.ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function onKeyDown(e: React.KeyboardEvent) {
    const tabs = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []);
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (index === -1) return;
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  }
  return <div role="tablist" aria-label={label} ref={ref} onKeyDown={onKeyDown} className="tabs__list">{children}</div>;
}

function Tab({ value, children, disabled }: { value: string; children: React.ReactNode; disabled?: boolean }) {
  const { value: selected, setValue, baseId } = useTabs();
  const isSelected = selected === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}

function Panel({ value, children }: { value: string; children: React.ReactNode }) {
  const { value: selected, baseId } = useTabs();
  if (selected !== value) return null;
  return (
    <div role="tabpanel" id={`${baseId}-panel-${value}`} aria-labelledby={`${baseId}-tab-${value}`} tabIndex={0}>
      {children}
    </div>
  );
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;
