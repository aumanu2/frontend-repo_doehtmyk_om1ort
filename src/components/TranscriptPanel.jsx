export default function TranscriptPanel({ items = [] }) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200 space-y-2 max-h-64 overflow-auto">
      {items.length === 0 && (
        <p className="text-slate-400 text-sm">No messages yet. Start the interview to see the live transcript.</p>
      )}
      {items.map((m, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className={`mt-1 h-2 w-2 rounded-full ${m.role === 'signer' ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">{m.role === 'signer' ? 'ISL → Text' : 'Text → ISL'}</p>
            <p className="text-sm leading-relaxed">{m.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
