import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";

type AuthProps = {
  mode: "login" | "signup" | "forgot";
};

export function Auth({ mode }: AuthProps) {
  const title = mode === "login" ? "Welcome back" : mode === "signup" ? "Begin your ascent" : "Reset password";

  return (
    <div className="mx-auto grid max-w-5xl gap-5 py-8 lg:grid-cols-[1fr_0.9fr]">
      <Card className="p-8">
        <Sparkles size={28} />
        <h2 className="mt-4 text-4xl font-black">{title}</h2>
        <p className="mt-3 text-ink/65 dark:text-white/65">Your transformation dashboard is waiting with study goals, glow-up streaks, sleep recovery, and a gentle AI coach.</p>
        <form className="mt-7 space-y-4">
          {mode === "signup" && <input className="field" placeholder="Name" />}
          <input className="field" placeholder="Email" type="email" />
          {mode !== "forgot" && <input className="field" placeholder="Password" type="password" />}
          <Button className="w-full">{mode === "forgot" ? "Send Reset Link" : mode === "signup" ? "Create Account" : "Login"}</Button>
        </form>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-ink/60 dark:text-white/60">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/forgot-password">Forgot password</Link>
        </div>
      </Card>
      <Card className="grid place-items-center p-8 text-center">
        <Mascot type="bunny" className="scale-125" />
        <h3 className="mt-8 text-2xl font-black">Small rituals. Real momentum.</h3>
        <p className="mt-3 text-ink/60 dark:text-white/60">A peaceful place to rebuild discipline without becoming harsh with yourself.</p>
      </Card>
    </div>
  );
}
