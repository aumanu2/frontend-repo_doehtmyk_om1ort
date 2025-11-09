import { useEffect, useRef, useState } from "react";
import { Send, Mic, Volume2 } from "lucide-react";

export default function TextSpeechInput({ onSend }) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  // Optional: basic Web Speech API for speech → text (browser support varies)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-IN";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (e) => {
        const transcript = Array.from(e.results).map(r => r[0].transcript).join(" ");
        setText((prev) => (prev ? prev + " " : "") + transcript);
      };
      recognitionRef.current.onend = () => setRecording(false);
    }
  }, []);

  const handleRecord = () => {
    if (!recognitionRef.current) return;
    if (!recording) {
      setRecording(true);
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
    }
  };

  const submit = () => {
    if (!text.trim()) return;
    onSend?.(text.trim());
    setText("");
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3">
      <div className="flex items-center gap-2">
        <button onClick={handleRecord} className={`shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium ${recording ? "bg-red-600/80 border-red-500 text-white" : "bg-indigo-600/80 border-indigo-500 text-white"}`}>
          <Mic size={16}/> {recording ? "Stop" : "Speak"}
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or use mic to compose a message…"
          className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-400"
        />
        <button onClick={submit} className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium bg-emerald-600/80 border-emerald-500 text-white">
          <Send size={16}/> Send
        </button>
      </div>
    </div>
  );
}
