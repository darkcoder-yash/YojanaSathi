import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useSpeech } from "../hooks/useSpeech";

interface VoiceControlsProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ onTranscript, disabled }) => {
  const [isListening, setIsListening] = useState(false);
  const { startListening } = useSpeech();

  const handleMicClick = () => {
    if (disabled) return;
    
    setIsListening(true);
    startListening((transcript: string) => {
      onTranscript(transcript);
      setIsListening(false);
    });
  };

  return (
    <button
      onClick={handleMicClick}
      disabled={disabled}
      className={`p-2 rounded-full transition-all flex items-center justify-center
        ${isListening 
          ? "bg-red-100 text-red-500 animate-pulse" 
          : "bg-muted text-muted-foreground hover:bg-muted/80"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      title={isListening ? "Listening..." : "Speak now"}
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
};

export default VoiceControls;
