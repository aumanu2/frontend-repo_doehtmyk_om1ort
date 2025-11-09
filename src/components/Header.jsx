import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 grid place-items-center">
            <Rocket className="text-indigo-300" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">ISL Live Bridge</h1>
            <p className="text-xs text-slate-300/80">Real-time Indian Sign Language interview assistant</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-300/80">
          <span className="px-2 py-1 rounded-md border border-white/10">Bidirectional</span>
          <span className="px-2 py-1 rounded-md border border-white/10">Webcam</span>
          <span className="px-2 py-1 rounded-md border border-white/10">Speech & Text</span>
        </div>
      </div>
    </header>
  );
}
