import { useState } from "react";
import Header from "./components/Header";
import VideoSignCapture from "./components/VideoSignCapture";
import TextSpeechInput from "./components/TextSpeechInput";
import ISLAvatar from "./components/ISLAvatar";
import TranscriptPanel from "./components/TranscriptPanel";

function App() {
  const [avatarPhrase, setAvatarPhrase] = useState("");
  const [transcript, setTranscript] = useState([]);

  // Called when ISL is recognized from webcam
  const handleRecognized = (text) => {
    setTranscript((arr) => [{ role: "signer", text }, ...arr]);
  };

  // Called when interviewer sends text/speech to be shown as ISL
  const handleSend = (text) => {
    setAvatarPhrase(text);
    setTranscript((arr) => [{ role: "interviewer", text }, ...arr]);
    // In a real app, also trigger TTS and sign animation via backend model here.
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8 grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-100">Interviewee (ISL → Text/Audio)</h2>
          <VideoSignCapture onRecognized={handleRecognized} />
          <TranscriptPanel items={transcript} />
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-100">Interviewer (Text/Audio → ISL)</h2>
          <ISLAvatar phrase={avatarPhrase} />
          <TextSpeechInput onSend={handleSend} />
        </section>
      </main>
      <footer className="py-8 text-center text-xs text-slate-400/80">
        Designed for ISL interview scenarios. This demo shows the real-time flow; models can be attached to power recognition and animated signing.
      </footer>
    </div>
  );
}

export default App;
