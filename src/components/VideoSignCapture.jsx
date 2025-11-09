import { useEffect, useRef, useState } from "react";
import { Mic, Camera, Volume2, Loader2 } from "lucide-react";

// This component accesses the webcam, shows a live preview, and simulates
// sending frames to a sign recognizer. In a real app, hook this up to the backend.
export default function VideoSignCapture({ onRecognized }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    let stream;
    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (e) {
        console.error("Webcam error", e);
      }
    }
    start();
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Demo recognizer: emits a fake transcript when user toggles the capture button
  const simulateRecognition = () => {
    setListening((v) => !v);
    if (!listening) {
      // Simulate async recognition result
      setTimeout(() => {
        onRecognized?.("Hello, I am ready for the interview.");
      }, 1200);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
      <div className="relative aspect-video bg-black">
        <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
        {!ready && (
          <div className="absolute inset-0 grid place-items-center text-white/80 text-sm">
            <div className="flex items-center gap-2"><Loader2 className="animate-spin" size={18}/> Opening camera…</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-3 text-slate-200">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10"><Camera size={14}/> Webcam</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10"><Mic size={14}/> ISL → Text</span>
        </div>
        <button onClick={simulateRecognition} className={`px-3 py-1.5 rounded-md text-sm font-medium border ${listening ? "bg-red-600/80 border-red-500 text-white" : "bg-emerald-600/80 border-emerald-500 text-white"}`}>
          {listening ? "Stop" : "Start"} capture
        </button>
      </div>
    </div>
  );
}
