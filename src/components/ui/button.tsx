import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft" | "outline";
  size?: "sm" | "md" | "icon";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-ink text-white shadow-glow hover:-translate-y-0.5 hover:bg-emerald-950",
        variant === "ghost" && "text-ink/70 hover:bg-white/60 hover:text-ink dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white",
        variant === "soft" && "bg-white/70 text-ink shadow-sm hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
        variant === "outline" && "border border-white/50 bg-white/20 text-ink hover:bg-white/60 dark:border-white/15 dark:text-white dark:hover:bg-white/10",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}
