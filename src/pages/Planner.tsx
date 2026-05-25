import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/contexts/AuthContext";

export function Planner() {
  const { user } = useAuth();

  const [schedule, setSchedule] =
    useState<any[]>([]);

  const [completed, setCompleted] =
    useState<number[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH SCHEDULE
  // =========================

  useEffect(() => {
    if (user) {
      fetchSchedule();
    }
  }, [user]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);

      // FETCH LATEST TIMETABLE
      const { data, error } =
        await supabase
          .from("timetables")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1);

      if (error) {
        console.log(error);
        return;
      }

      // NO DATA
      if (
        !data ||
        data.length === 0
      ) {
        return;
      }

      // SET SCHEDULE
      setSchedule(
        data[0].schedule || []
      );

      // FETCH COMPLETIONS
      const {
        data: completionData,
      } = await supabase
        .from("task_completions")
        .select("*")
        .eq("user_id", user.id);

      if (completionData) {
        setCompleted(
          completionData.map(
            (item) => item.task_index
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // TOGGLE COMPLETE
  // =========================

  const toggleComplete = async (
    index: number
  ) => {
    if (!user) return;

    const isCompleted =
      completed.includes(index);

    // REMOVE
    if (isCompleted) {
      setCompleted(
        completed.filter(
          (i) => i !== index
        )
      );

      await supabase
        .from("task_completions")
        .delete()
        .eq("user_id", user.id)
        .eq("task_index", index);
    }

    // ADD
    else {
      setCompleted([
        ...completed,
        index,
      ]);

      await supabase
        .from("task_completions")
        .insert({
          user_id: user.id,

          task_index: index,

          completed: true,
        });
    }
  };

  // =========================
  // PROGRESS
  // =========================

  const progress = useMemo(() => {
    if (!schedule.length) return 0;

    return Math.round(
      (completed.length /
        schedule.length) *
        100
    );
  }, [completed, schedule]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <p className="text-xl font-bold">
          Loading your routine...
        </p>
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================

  if (!schedule.length) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 p-8 text-center">
        <h1 className="text-5xl font-black">
          No routine yet
        </h1>

        <p className="text-lg text-ink/60 dark:text-white/60">
          Generate your first
          personalized lifestyle
          system.
        </p>

        <Link
          to="/onboarding"
          className="inline-flex rounded-2xl bg-black px-8 py-4 text-lg font-black text-white"
        >
          Create My Routine
        </Link>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-ink/50 dark:text-white/50">
            <Sparkles size={16} />
            Personalized System
          </p>

          <h1 className="text-5xl font-black">
            Your Daily Routine
          </h1>
        </div>

        {/* PROGRESS */}
        <div className="rounded-3xl bg-white/70 p-6 shadow-glass backdrop-blur-2xl dark:bg-white/5">
          <p className="text-sm font-bold text-ink/50 dark:text-white/50">
            Daily Progress
          </p>

          <h2 className="mt-2 text-5xl font-black">
            {progress}%
          </h2>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="space-y-5">
        {schedule.map(
          (item, index) => {
            const isDone =
              completed.includes(
                index
              );

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                className={`group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 ${
                  isDone
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                    : "border-white/40 bg-white/70 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
                }`}
              >
                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sage/20 blur-3xl" />
                </div>

                <div className="relative z-10 flex items-center justify-between gap-5">
                  {/* LEFT */}
                  <div className="flex items-start gap-4">
                    {/* ICON */}
                    <button
                      onClick={() =>
                        toggleComplete(
                          index
                        )
                      }
                      className={`mt-1 transition ${
                        isDone
                          ? "text-emerald-500"
                          : "text-ink/35 dark:text-white/35"
                      }`}
                    >
                      <CheckCircle2
                        size={28}
                      />
                    </button>

                    {/* CONTENT */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-ink/45 dark:text-white/45">
                        <Clock3
                          size={15}
                        />

                        {item.time}
                      </div>

                      <h2
                        className={`mt-2 text-2xl font-black transition ${
                          isDone
                            ? "opacity-50 line-through"
                            : ""
                        }`}
                      >
                        {item.task}
                      </h2>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div>
                    {isDone ? (
                      <div className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white">
                        Completed
                      </div>
                    ) : (
                      <div className="rounded-full bg-black px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-black">
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          }
        )}
      </div>
    </div>
  );
}