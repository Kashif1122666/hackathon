import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Send, Bot } from "lucide-react";
import { mockAIResponse } from "@/lib/aiResponses"; // you can later replace this with real API
import { askGemini } from "@/lib/geminiClient";  // <-- instead of mockAIResponse

export default function AskNova() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "Kaif", text: "Hello! 👋 I'm Kaif — your AI shopping assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { from: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  // 💬 Call real Gemini model
  const reply = await askGemini(
    `You are Kaif, an AI shopping assistant for Ecom kaif. 
     Answer helpfully but concisely.
     User asked: "${input}".`
  );

  setMessages((prev) => [...prev, { from: "Kaif", text: reply }]);
  setLoading(false);
};

  return (
    <>
      {/* Floating button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]"
        >
          <Bot className="mr-2 h-5 w-5" /> Ask Kaif
        </Button>
      </motion.div>

      {/* Chat Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-card/80 backdrop-blur-xl border border-border shadow-[0_0_35px_rgba(99,102,241,0.25)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="text-primary" /> Kaif AI Assistant
            </DialogTitle>
          </DialogHeader>

          {/* Chat Messages */}
          <div className="h-72 overflow-y-auto p-3 space-y-3 rounded-md border border-border bg-muted/20 scrollbar-thin scrollbar-thumb-primary/50">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-accent text-accent-foreground rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {loading && (
              <p className="text-sm text-muted-foreground italic">
                Kaif is thinking...
              </p>
            )}
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="grow"
            />
            <Button onClick={handleSend} disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
