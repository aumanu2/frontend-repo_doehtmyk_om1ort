import { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";

// Simple 3D assistant avatar container. For now we animate with CSS pulses to
// suggest signing feedback. Replace with a rigged 3D character later.
export default function ISLAvatar({ phrase }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!phrase) return;
    // Flash background to indicate a new sign animation cue
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove("ring-emerald-400");
    void el.offsetWidth; // reflow
    el.classList.add("ring-emerald-400");
    const t = setTimeout(() => el.classList.remove("ring-emerald-400"), 600);
    return () => clearTimeout(t);
  }, [phrase]);

  return (
    <div ref={containerRef} className="relative w-full rounded-2xl border border-white/10 ring-0 transition-all">
      <div className="aspect-video overflow-hidden rounded-2xl">
        <Spline scene="https://prod.spline.design/6mD2rHk19bI9x8N0/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200/90">
        {phrase ? (
          <p className="px-2 py-1 rounded-md bg-black/40 border border-white/10 inline-block">Animating: “{phrase}”</p>
        ) : (
          <p className="px-2 py-1 rounded-md bg-black/30 border border-white/10 inline-block">Waiting for message…</p>
        )}
      </div>
    </div>
  );
}
