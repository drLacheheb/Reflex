import Vapi from "@vapi-ai/web";
import {useEffect, useRef, useState} from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const vapiRef = useRef<Vapi | null>(null);

    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        const vapi = new Vapi("0f7b8bfb-8f62-4378-8c06-9c60f5e71843");
        vapiRef.current = vapi;

        vapi.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(true);
            setTranscript([]);
        });

        vapi.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapi.on("speech-start", () => setIsSpeaking(true));
        vapi.on("speech-end", () => setIsSpeaking(false));

        vapi.on("error", (error) => {
            console.error(error, "VAPI_ERROR");
            setIsConnected(false);
        });

        vapi.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript(prev => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ]);
            }
        });

        return () => {
            vapi.stop();
        };
    }, []);

    const startCall = () => {
        setIsConnecting(true);
        vapiRef.current?.start("eec47b95-d8f9-4bf3-8150-3b1ca0c74b3b");
    };

    const endCall = () => {
        vapiRef.current?.stop();
    };

    return {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall
    };
};