# Bolt's Performance Journal ⚡

## 2026-05-30 - Throttling React Render & Caching Scroll Height **Learning:** Reading `document.documentElement.scrollHeight` inside scroll event handlers forces synchronous layout reflows (layout thrashing) on every scroll tick. Combining this with un-rounded state updates causes continuous full-component React re-renders, causing severe scrolling lag. **Action:** Cache the scrollable height on mount/resize, throttle state updates by rounding/comparing values, and apply passive event listeners.
