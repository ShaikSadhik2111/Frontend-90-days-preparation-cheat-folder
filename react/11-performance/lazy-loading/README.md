# Lazy loading (components, images, data)

> Load things **when they're needed**, not up front: components (code splitting), images/iframes (native lazy loading), and data (on scroll/visibility).

## Images
```html
<img src="plant.webp" alt="Pune plant" width="800" height="450" loading="lazy" decoding="async" />
<!-- hero image: DON'T lazy load it; prioritise it -->
<img src="hero.avif" alt="" fetchpriority="high" width="1200" height="600" />
```
- Always set `width`/`height` (or `aspect-ratio`) → prevents layout shift (CLS).
- Responsive images: `srcset` + `sizes`, modern formats (WebP/AVIF).

## Components on visibility
```tsx
function LazyOnVisible({ children, minHeight = 300 }: { children: React.ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ minHeight }}>{visible ? children : null}</div>;
}
// <LazyOnVisible><Suspense fallback={<Skeleton/>}><HeavyChart/></Suspense></LazyOnVisible>
```

## Data
Infinite scroll / "load more" with IntersectionObserver (see `code/machine-coding/src/components/InfiniteList`), fetch tab content only when the tab is opened, prefetch on hover.

**Interview:** *Lazy loading vs code splitting?* Code splitting = splitting JS into chunks; lazy loading = deferring any resource (chunk, image, data) until needed.

Next → [Virtualization](../virtualization/README.md)
