import { ChatInterface } from "./chat-interface";
import { Bot } from "lucide-react";

export default function AiDoctorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-8">
            <Bot className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">AI Health Assistant</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Get general health guidance from our AI. This is not a substitute for professional medical advice.
            </p>
        </div>
        <ChatInterface />
    </div>
  );
}
