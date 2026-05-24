import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/55 bg-white/62 p-5 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.075]",
        className
      )}
      {...props}
    />
  );
}
