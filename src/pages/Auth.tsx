import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";

import { supabase } from "@/lib/supabase";

type AuthProps = {
  mode: "login" | "signup" | "forgot";
};

export function Auth({
  mode,
}: AuthProps) {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const title =
    mode === "login"
      ? "Welcome back"
      : mode === "signup"
      ? "Begin your ascent"
      : "Reset password";

  const handleAuth = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      // =========================
      // SIGNUP
      // =========================
      if (mode === "signup") {
        if (!name.trim()) {
          alert("Enter your name");
          return;
        }

        const {
          data,
          error,
        } = await supabase.auth.signUp({
          email,
          password,

          options: {
            data: {
              name,
            },
          },
        });

        if (error) {
          throw error;
        }

        const user = data.user;

        // CREATE PROFILE
        if (user) {
          const { error: profileError } =
            await supabase
              .from("profiles")
              .insert({
                id: user.id,
                name,
                email,
              });

          if (profileError) {
            console.error(
              profileError
            );
          }
        }

        alert(
          "Account created successfully!"
        );

        navigate("/planner");
      }

      // =========================
      // LOGIN
      // =========================
      if (mode === "login") {
        const { error } =
          await supabase.auth.signInWithPassword(
            {
              email,
              password,
            }
          );

        if (error) {
          throw error;
        }

        alert("Login successful!");

        navigate("/dashboard");
      }

      // =========================
      // FORGOT PASSWORD
      // =========================
      if (mode === "forgot") {
        const { error } =
          await supabase.auth.resetPasswordForEmail(
            email
          );

        if (error) {
          throw error;
        }

        alert(
          "Password reset email sent!"
        );
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-4 py-10 lg:grid-cols-[1fr_0.95fr]">
      {/* LEFT */}
      <Card className="rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
        <Sparkles size={28} />

        <h2 className="mt-5 text-5xl font-black tracking-tight">
          {title}
        </h2>

        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/60 dark:text-white/60">
          Your transformation dashboard
          is waiting with study goals,
          glow-up streaks, sleep
          recovery, hydration tracking,
          and a gentle AI coach.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleAuth}
          className="mt-8 space-y-5"
        >
          {/* NAME */}
          {mode === "signup" && (
            <input
              className="field"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />
          )}

          {/* EMAIL */}
          <input
            className="field"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          {/* PASSWORD */}
          {mode !== "forgot" && (
            <input
              className="field"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-2xl text-base font-black"
          >
            {loading
              ? "Please wait..."
              : mode === "signup"
              ? "Create Account"
              : mode === "forgot"
              ? "Send Reset Link"
              : "Login"}
          </Button>
        </form>

        {/* LINKS */}
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-bold text-ink/60 dark:text-white/60">
          <Link
            to="/login"
            className="hover:opacity-70"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hover:opacity-70"
          >
            Signup
          </Link>

          <Link
            to="/forgot-password"
            className="hover:opacity-70"
          >
            Forgot password
          </Link>
        </div>
      </Card>

      {/* RIGHT */}
      <Card className="grid place-items-center rounded-[2rem] border border-white/40 bg-white/70 p-10 text-center shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
        <div>
          <Mascot
            type="bunny"
            className="mx-auto scale-[1.35]"
          />

          <h3 className="mt-10 text-3xl font-black">
            Small rituals.
            <br />
            Real momentum.
          </h3>

          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink/60 dark:text-white/60">
            A peaceful place to rebuild
            discipline, improve wellness,
            and become the version of
            yourself you keep imagining.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <div className="h-3 w-3 rounded-full bg-sage" />

            <div className="h-3 w-3 rounded-full bg-coral" />

            <div className="h-3 w-3 rounded-full bg-lilac" />
          </div>
        </div>
      </Card>
    </div>
  );
}