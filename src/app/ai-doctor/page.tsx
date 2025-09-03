// There is no file at this path.
"use client";
import { ChatInterface } from "./chat-interface";
import { Bot } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";

export default function AiDoctorPage() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-8">
            <Bot className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">{t('aiHealthAssistantTitle')}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                {t('aiHealthAssistantDescPage')}
            </p>
        </div>
        <ChatInterface />
    </div>
  );
}
