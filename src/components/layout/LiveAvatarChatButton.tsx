"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IoChatbubblesOutline, IoClose, IoMic, IoMicOff, IoSend, IoPause } from "react-icons/io5";

interface TranscriptLine {
  role: "user" | "avatar";
  text: string;
}

export default function LiveAvatarChatButton({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionState, setSessionState] = useState("INACTIVE");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/liveavatar/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Failed to create session");
      }

      const { sessionToken } = await res.json();

      // Dynamic import — loads SDK only when user opens chat (better perf, avoids SSR issues)
      const { LiveAvatarSession, SessionEvent, AgentEventsEnum } =
        await import("@heygen/liveavatar-web-sdk");

      const session = new LiveAvatarSession(sessionToken, {
        voiceChat: { defaultMuted: true },
      });

      session.on(SessionEvent.SESSION_STATE_CHANGED, (state: string) => {
        setSessionState(state);
      });

      session.on(SessionEvent.SESSION_STREAM_READY, () => {
        if (videoRef.current) {
          session.attach(videoRef.current);
        }
        setIsLoading(false);
      });

      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        setSessionState("DISCONNECTED");
        setIsLoading(false);
        sessionRef.current = null;
      });

      session.on(
        AgentEventsEnum.USER_TRANSCRIPTION,
        (event: { text: string }) => {
          setTranscript((prev) => [...prev, { role: "user", text: event.text }]);
        }
      );

      session.on(
        AgentEventsEnum.AVATAR_TRANSCRIPTION,
        (event: { text: string }) => {
          setTranscript((prev) => [
            ...prev,
            { role: "avatar", text: event.text },
          ]);
        }
      );

      session.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () =>
        setIsAvatarSpeaking(true)
      );
      session.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () =>
        setIsAvatarSpeaking(false)
      );

      await session.start();
      sessionRef.current = session;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection failed";
      setError(msg);
      setIsLoading(false);
    }
  }, [locale]);

  const stopSession = useCallback(async () => {
    if (sessionRef.current) {
      try {
        await sessionRef.current.stop();
      } catch {
        // ignore stop errors
      }
      sessionRef.current = null;
    }
    setSessionState("INACTIVE");
    setTranscript([]);
    setIsMicOn(false);
    setIsAvatarSpeaking(false);
    setIsLoading(false);
    setError(null);
  }, []);

  const handleOpen = useCallback(async () => {
    setIsOpen(true);
    await startSession();
  }, [startSession]);

  const handleClose = useCallback(async () => {
    setIsOpen(false);
    await stopSession();
  }, [stopSession]);

  const toggleMic = useCallback(() => {
    if (!sessionRef.current) return;
    if (isMicOn) {
      sessionRef.current.stopListening();
      setIsMicOn(false);
    } else {
      sessionRef.current.startListening();
      setIsMicOn(true);
    }
  }, [isMicOn]);

  const sendMessage = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const msg = textInput.trim();
      if (!sessionRef.current || !msg) return;
      sessionRef.current.message(msg);
      setTextInput("");
    },
    [textInput]
  );

  const handleInterrupt = useCallback(() => {
    sessionRef.current?.interrupt();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const isConnected = sessionState === "CONNECTED";
  const isConnecting = sessionState === "CONNECTING" || isLoading;

  return (
    <>
      {/* Floating trigger button — positioned above the WhatsApp button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Chat with AI Property Consultant"
          className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          style={{ backgroundColor: "var(--primary, #0D3158)" }}
        >
          <IoChatbubblesOutline className="h-7 w-7 text-[#C9A84C]" />
          {/* Live indicator */}
          <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-white animate-ping" />
          <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-white" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white"
          style={{
            width: "min(380px, calc(100vw - 32px))",
            height: "min(580px, calc(100vh - 48px))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ backgroundColor: "var(--primary, #0D3158)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 flex-shrink-0" />
              <div className="leading-tight">
                <p className="text-white font-semibold text-sm leading-none">
                  AI Property Consultant
                </p>
                <p className="text-white/60 text-[10px] mt-0.5">
                  {isConnecting
                    ? "Connecting…"
                    : isConnected
                    ? "Live"
                    : sessionState === "DISCONNECTED"
                    ? "Session ended"
                    : "Starting…"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>

          {/* Avatar video */}
          <div
            className="relative bg-black flex-shrink-0"
            style={{ height: "220px" }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Loading overlay */}
            {isConnecting && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3">
                <div className="h-10 w-10 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
                <p className="text-white/80 text-xs text-center px-4">
                  Connecting to your AI consultant…
                </p>
              </div>
            )}

            {/* Error overlay */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 gap-3 px-4 text-center">
                <p className="text-red-400 text-xs">⚠ {error}</p>
                <button
                  onClick={startSession}
                  className="text-xs text-white bg-white/15 hover:bg-white/25 px-4 py-1.5 rounded-full transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Speaking indicator */}
            {isAvatarSpeaking && !isConnecting && (
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5 bg-black/50 rounded-full px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-bounce" />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            )}
          </div>

          {/* Transcript */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 min-h-0">
            {transcript.length === 0 && isConnected && (
              <p className="text-center text-gray-400 text-xs pt-1">
                Ask me anything about Gulf Estates properties!
              </p>
            )}
            {transcript.map((line, i) => (
              <div
                key={i}
                className={`flex ${
                  line.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                    line.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                  }`}
                  style={
                    line.role === "user"
                      ? { backgroundColor: "var(--primary, #0D3158)" }
                      : {}
                  }
                >
                  {line.text}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>

          {/* Controls */}
          <div className="bg-white border-t border-gray-100 p-3 space-y-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMic}
                disabled={!isConnected}
                aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
                title={isMicOn ? "Mute mic" : "Enable mic for voice chat"}
                className={`flex items-center justify-center h-9 w-9 rounded-full border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  isMicOn
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
              >
                {isMicOn ? (
                  <IoMic className="h-4 w-4" />
                ) : (
                  <IoMicOff className="h-4 w-4" />
                )}
              </button>

              {isAvatarSpeaking && (
                <button
                  onClick={handleInterrupt}
                  title="Interrupt avatar"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <IoPause className="h-3 w-3" />
                  Stop
                </button>
              )}

              <p className="ml-auto text-[10px] text-gray-400">
                {isConnected ? "Connected" : isConnecting ? "…" : sessionState}
              </p>
            </div>

            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={!isConnected}
                placeholder={
                  isConnected ? "Type a message…" : "Connecting…"
                }
                className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-[#0D3158] disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!isConnected || !textInput.trim()}
                aria-label="Send message"
                className="flex items-center justify-center h-9 w-9 rounded-full text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: "var(--primary, #0D3158)" }}
              >
                <IoSend className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
