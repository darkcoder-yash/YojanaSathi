import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { X, Send, MessageCircle, Bot, User, Loader2 } from "lucide-react";
import { sendMessage } from "../services/chatService";
import { useSpeech } from "../hooks/useSpeech";
import VoiceControls from "./VoiceControls";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].chat;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { speakText } = useSpeech();

  useEffect(() => {
    setMessages([
      {
        id: "initial",
        text: translations[language].chat.initialMessage,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();

    if (!messageText || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await sendMessage(messageText, "chat");

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 group">
          <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-[#1a237e] text-white text-sm font-medium px-3 py-2 rounded-full shadow-lg whitespace-nowrap">
            {t.openAssistant}
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-orange-400/40 blur-xl scale-125"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>

            <button
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white"
              aria-label={t.openAssistant}
              style={{ boxShadow: "0 12px 30px rgba(249, 115, 22, 0.35)" }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col z-[100] border border-gray-100 overflow-hidden animate-slide-up"
          style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)" }}
        >
          <div className="bg-[#1a237e] text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-wide">
                  {t.assistantTitle}
                </h3>

                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-gray-300">
                    {t.assistantStatus}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-[#1a237e] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#ff9800] text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 leading-relaxed">{children}</p>
                        ),
                        li: ({ children }) => (
                          <li className="ml-4 list-disc mb-1">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-base font-bold mt-2 mb-1">
                            {children}
                          </h2>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#1a237e] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>

                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="text-xs text-gray-400 font-medium">
                    {t.thinking}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1 border border-transparent focus-within:border-[#1a237e] transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.inputPlaceholder}
                  disabled={isLoading}
                  className="flex-1 bg-transparent py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
                />

                <VoiceControls
                  onTranscript={handleVoiceTranscript}
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
                  input.trim() && !isLoading
                    ? "bg-[#1a237e] text-white hover:scale-105 active:scale-95"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;