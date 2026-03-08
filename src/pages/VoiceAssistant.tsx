import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, ArrowLeft, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVoiceRecognition } from "../hooks/useVoiceRecognition";
import { sendMessage } from "../services/chatService";
import orbVideo from "../assets/orb.mp4";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const VoiceAssistant: React.FC = () => {

  const navigate = useNavigate();
  const { transcript, isListening, startListening, stopListening } = useVoiceRecognition();

  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", text: "Namaste! Main aapka AI assistant hoon. Aap kya jaana chahte hain?" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevIsListening = useRef(false);

  /* ---------------- Load Voices ---------------- */

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  /* ---------------- Auto Scroll ---------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- Clean Speech Text ---------------- */

  const formatSpeechText = (text: string) => {

    let clean = text
      .replace(/#{1,6}\s?/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/-/g, " ")
      .replace(/₹/g, "rupees ")
      .replace(/:/g, " ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return clean;
  };

  /* ---------------- Best Voice Selector ---------------- */

  const getBestVoice = () => {

    const voices = window.speechSynthesis.getVoices();

    const preferredVoices = [
      "Google हिन्दी",
      "Google Hindi",
      "Microsoft Heera",
      "Microsoft Swara"
    ];

    for (const preferred of preferredVoices) {
      const found = voices.find(v => v.name.includes(preferred));
      if (found) return found;
    }

    return voices.find(v => v.lang === "hi-IN") || voices[0];
  };

  /* ---------------- Natural Speech ---------------- */

  const speakNaturally = (text: string, onEnd: () => void) => {

    const sentences = text
      .replace(/\./g, ".|")
      .replace(/\?/g, "?|")
      .replace(/\!/g, "!|")
      .split("|")
      .filter(Boolean);

    let index = 0;

    const speakNext = () => {

      if (index >= sentences.length) {
        onEnd();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(sentences[index]);

      const voice = getBestVoice();
      if (voice) utterance.voice = voice;

      utterance.lang = "hi-IN";

      /* Natural speech tuning */

      utterance.rate = 1;
      utterance.pitch = 1.0;
      utterance.volume = 1;

      utterance.onend = () => {
        index++;
        setTimeout(speakNext, 60);
      };

      window.speechSynthesis.speak(utterance);
    };

    window.speechSynthesis.cancel();
    speakNext();
  };

  /* ----------------Stop Ai Speech---------------- */
  const stopAISpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  /* ---------------- Stop Speech ---------------- */
  const isConversationEnd = (text: string) => {
    const lower = text.toLowerCase();

    return (
      lower.includes("thank you") ||
      lower.includes("thank") ||
      lower.includes("thank u") ||
      lower.includes("shukriya") ||
      lower.includes("thank") ||
      lower.includes("goodbye") ||
      lower.includes("bye") ||
      lower.includes("alvida") ||
      lower.includes("dhanyvad") ||
      lower.includes("dhanyavaad")
    );
  };

  /* ---------------- AI Response ---------------- */

  const handleAIResponse = async (userText: string) => {

    setIsThinking(true);

    try {

      const response: any = await sendMessage(userText, "voice");

      console.log("AI RESPONSE:", response);
      
      const responseText =
        response?.answer ||
        response?.response ||
        response?.message ||
        response;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: responseText
      };

      setMessages(prev => [...prev, aiMsg]);

      if (!isMuted) {

        setIsSpeaking(true);

        const speechText = formatSpeechText(responseText);

        const shouldEnd = isConversationEnd(responseText);
        
        speakNaturally(speechText, () => {

          setIsSpeaking(false);

          if (!shouldEnd && !isMuted) {
            startListening();
          }

        });

      }

    } catch (error) {

      console.error("Voice Assistant Error:", error);
      setIsSpeaking(false);

    } finally {

      setIsThinking(false);

    }

  };

  /* ---------------- Transcript Handling ---------------- */

  useEffect(() => {

    const processTranscript = async () => {

      if (prevIsListening.current && !isListening && transcript.trim()) {

        const userMsg: Message = {
          id: Date.now().toString(),
          role: "user",
          text: transcript.trim()
        };

        setMessages(prev => [...prev, userMsg]);

        await handleAIResponse(transcript.trim());
      }

      prevIsListening.current = isListening;

    };

    processTranscript();

  }, [isListening, transcript]);

  /* ---------------- Interrupt AI if user starts speaking ---------------- */

  useEffect(() => {

    if (isListening && isSpeaking) {

      stopAISpeech();

    }

  }, [isListening]);

  /* ---------------- Status Text ---------------- */

  const getStatusText = () => {

    if (isThinking) return "Thinking...";
    if (isSpeaking) return "Speaking...";
    if (isListening) return "Listening...";

    return "Tap the mic to start";

  };

  /* ---------------- Mic Toggle ---------------- */

  const handleMicToggle = () => {

    if (isListening) {

      stopListening();

    } else {

      stopAISpeech();

      startListening();

    }

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="min-h-screen bg-white text-black flex flex-col">

      <header className="px-10 py-10 flex items-center justify-between">

        <button 
          onClick={() => navigate(-1)}
          className="p-4 rounded-full bg-white/20 shadow-xl flex items-center justify-center hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-black-400" />
          Encrypted
        </div>

      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <video
           autoPlay
           loop
           muted
           playsInline
           className="w-[800px] max-w-[90vw] -translate-y-20"
        >
          <source src={orbVideo} type="video/mp4" />
        </video>

        <p className="-translate-y-16 text-2xl font-medium">{getStatusText()}</p>

      </div>

      <div className="px-6 pb-4 text-center opacity-60 -translate-y-12">

        {messages.slice(-2).map(msg => (

          <p key={msg.id} className="text-lg">
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.text}
          </p>

        ))}

        <div ref={messagesEndRef} />

      </div>

      <footer className="pb-16 flex items-center justify-center gap-8 -translate-y-8">

        <button
          onClick={() =>{ 
            setIsMuted(!isMuted)
            window.speechSynthesis.cancel();
          }}
          className="p-6 rounded-full bg-white/10 shadow-xl flex items-center justify-center"
        >
          {isMuted ? <VolumeX className="w-12 h-12" /> : <Volume2 className="w-12 h-12" />}
        </button>

        <button
          onClick={handleMicToggle}
          className="w-28 h-28 rounded-full bg-white text-black flex items-center justify-center shadow-xl"
        >
          {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
        </button>

      </footer>

    </div>

  );

};

export default VoiceAssistant;