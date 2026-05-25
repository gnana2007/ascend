import {
  useState,
} from "react";

import {
  Bot,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { model } from "@/lib/gemini";

const starters = [
  "Create a study timetable for placements",

  "I feel burned out. Adjust my day",

  "Suggest a night skincare and sleep routine",

  "What should I revise before my mock interview?",

  "Help me stay disciplined for 30 days",
];

export function Coach() {
  const [messages, setMessages] =
    useState([
      {
        from: "coach",

        text: "Hey 👋 I'm your AI transformation coach. Ask me anything about productivity, discipline, routines, burnout, sleep, wellness, or self-improvement.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // SEND MESSAGE
  // =========================

  async function send(
    text = input
  ) {
    if (!text.trim()) return;

    // USER MESSAGE
    const userMessage = {
      from: "you",

      text,
    };

    setMessages((items) => [
      ...items,

      userMessage,
    ]);

    setInput("");

    setLoading(true);

    try {
      const prompt = `
You are an AI productivity and wellness coach.

Respond in a motivating, intelligent, calm, and practical tone.

User message:
${text}
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        await result.response;

      const aiText =
        response.text();

      setMessages((items) => [
        ...items,

        {
          from: "coach",

          text: aiText,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((items) => [
        ...items,

        {
          from: "coach",

          text: "I couldn't generate a response right now. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-ink/50 dark:text-white/50">
            AI Transformation System
          </p>

          <h1 className="text-5xl font-black">
            AI Coach
          </h1>

          <p className="mt-3 text-lg text-ink/60 dark:text-white/60">
            Motivation, planning,
            burnout prevention,
            routines, and life
            optimization.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-black px-5 py-3 text-sm font-black text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/analytics"
            className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-black shadow-glass dark:bg-white/10"
          >
            Analytics
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        {/* LEFT */}
        <Card className="p-6">
          <Bot size={36} />

          <h2 className="mt-4 text-3xl font-black">
            Personalized Guidance
          </h2>

          <p className="mt-3 leading-7 text-ink/65 dark:text-white/65">
            Your AI coach helps
            with productivity,
            routines, discipline,
            wellness, focus,
            burnout recovery, and
            mindset improvement.
          </p>

          {/* STARTERS */}
          <div className="mt-6 space-y-3">
            {starters.map(
              (starter) => (
                <button
                  key={starter}
                  onClick={() =>
                    send(starter)
                  }
                  className="w-full rounded-2xl bg-white/50 p-4 text-left text-sm font-bold transition hover:scale-[1.01] hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
                >
                  {starter}
                </button>
              )
            )}
          </div>

          {/* QUICK LINKS */}
          <div className="mt-6 space-y-3">
            <Link
              to="/planner"
              className="flex items-center justify-between rounded-2xl bg-black p-4 text-sm font-black text-white"
            >
              Open Planner

              <ArrowRight
                size={18}
              />
            </Link>

            <Link
              to="/analytics"
              className="flex items-center justify-between rounded-2xl bg-white/70 p-4 text-sm font-black dark:bg-white/10"
            >
              View Analytics

              <ArrowRight
                size={18}
              />
            </Link>
          </div>
        </Card>

        {/* CHAT */}
        <Card className="flex min-h-[700px] flex-col p-5">
          {/* TITLE */}
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={19} />

            <h3 className="text-xl font-black">
              Transformation Chat
            </h3>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl bg-white/35 p-4 dark:bg-white/5">
            {messages.map(
              (
                message,
                index
              ) => (
                <div
                  key={index}
                  className={
                    message.from ===
                    "you"
                      ? "ml-auto max-w-[82%]"
                      : "mr-auto max-w-[82%]"
                  }
                >
                  <div
                    className={
                      message.from ===
                      "you"
                        ? "rounded-3xl bg-black p-4 text-white"
                        : "rounded-3xl bg-white p-4 shadow-sm dark:bg-white/10"
                    }
                  >
                    <p className="whitespace-pre-wrap text-sm leading-7">
                      {
                        message.text
                      }
                    </p>
                  </div>
                </div>
              )
            )}

            {/* LOADING */}
            {loading && (
              <div className="mr-auto max-w-[82%]">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-white/10">
                  <p className="animate-pulse text-sm font-bold">
                    AI is thinking...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="mt-5 flex gap-3">
            <input
              className="min-w-0 flex-1 rounded-full border border-white/50 bg-white/70 px-5 py-4 font-semibold outline-none transition focus:ring-2 focus:ring-sage dark:border-white/10 dark:bg-white/10"
              value={input}
              onChange={(
                event
              ) =>
                setInput(
                  event.target
                    .value
                )
              }
              onKeyDown={(
                event
              ) =>
                event.key ===
                  "Enter" &&
                send()
              }
              placeholder="Ask your AI coach anything..."
            />

            <Button
              size="icon"
              onClick={() =>
                send()
              }
              disabled={loading}
            >
              <Send
                size={18}
              />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}