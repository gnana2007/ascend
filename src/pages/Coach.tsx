import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const starters = [
  "Create a study timetable for placements",
  "I feel burned out. Adjust my day",
  "Suggest a night skincare and sleep routine",
  "What should I revise before my mock interview?"
];

export function Coach() {
  const [messages, setMessages] = useState([
    { from: "coach", text: "I noticed your study consistency is high, but sleep is slightly fragile. Want a gentler high-output plan for today?" }
  ]);
  const [input, setInput] = useState("");

  function send(text = input) {
    if (!text.trim()) return;
    setMessages((items) => [
      ...items,
      { from: "you", text },
      { from: "coach", text: "Here is a balanced plan: one hard focus block, one recovery walk, skincare before 9:45 PM, and lights out by 11:15 PM. Keep the win small enough to repeat." }
    ]);
    setInput("");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <Bot size={32} />
        <h2 className="mt-3 text-3xl font-black">AI Coach</h2>
        <p className="mt-3 leading-7 text-ink/65 dark:text-white/65">Motivation, routine tuning, productivity advice, burnout warnings, reflection summaries, and gentle accountability.</p>
        <div className="mt-5 space-y-2">
          {starters.map((starter) => (
            <button key={starter} onClick={() => send(starter)} className="w-full rounded-2xl bg-white/50 p-3 text-left text-sm font-bold transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15">
              {starter}
            </button>
          ))}
        </div>
      </Card>
      <Card className="flex min-h-[620px] flex-col">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={19} />
          <h3 className="text-xl font-black">Transformation Chat</h3>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-white/35 p-4 dark:bg-white/5">
          {messages.map((message, index) => (
            <div key={index} className={message.from === "you" ? "ml-auto max-w-[82%]" : "mr-auto max-w-[82%]"}>
              <div className={message.from === "you" ? "rounded-2xl bg-ink p-4 text-white" : "rounded-2xl bg-white p-4 shadow-sm dark:bg-white/10"}>
                <p className="text-sm leading-6">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            className="min-w-0 flex-1 rounded-full border border-white/50 bg-white/70 px-5 py-3 font-semibold outline-none transition focus:ring-2 focus:ring-sage dark:border-white/10 dark:bg-white/10"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && send()}
            placeholder="Ask your coach..."
          />
          <Button size="icon" onClick={() => send()}><Send size={18} /></Button>
        </div>
      </Card>
    </div>
  );
}
