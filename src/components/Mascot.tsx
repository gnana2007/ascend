import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// =========================
// TYPES
// =========================

type MascotObject = {
  name?: string;
  type?: string;
};

type MascotProps = {
  type?: string;

  mascot?: MascotObject;

  className?: string;
};

// =========================
// COMPONENT
// =========================

export function Mascot({
  type,

  mascot,

  className,
}: MascotProps) {
  // SUPPORT BOTH:
  // <Mascot type="fox" />
  // <Mascot mascot={{ type: "fox" }} />

  const mascotType =
    mascot?.type ||
    type ||
    "kitten";

  const mascotName =
    mascot?.name ||
    "Nova";

  // CONDITIONS

  const isLongEar =
    mascotType === "bunny";

  const isFox =
    mascotType === "fox";

  const isPanda =
    mascotType === "panda";

  const isKitten =
    mascotType === "kitten";

  return (
    <motion.div
      aria-label={`${mascotType} mascot`}
      className={cn(
        "relative h-32 w-32",
        className
      )}
      animate={{
        y: [0, -8, 0],

        rotate: [
          -1,
          1,
          -1,
        ],
      }}
      transition={{
        duration: 4,

        repeat:
          Infinity,

        ease:
          "easeInOut",
      }}
    >
      {/* BODY */}
      <div
        className={cn(
          "absolute left-1/2 top-5 h-24 w-24 -translate-x-1/2 rounded-[42%] border border-white/70 shadow-glass",

          isFox
            ? "bg-coral"
            : isPanda
            ? "bg-white"
            : isKitten
            ? "bg-lilac"
            : "bg-sage"
        )}
      />

      {/* BUNNY EARS */}
      <div
        className={cn(
          "absolute left-7 top-1 h-12 w-6 rounded-full bg-white/80",

          isLongEar
            ? "block"
            : "hidden"
        )}
      />

      <div
        className={cn(
          "absolute right-7 top-1 h-12 w-6 rounded-full bg-white/80",

          isLongEar
            ? "block"
            : "hidden"
        )}
      />

      {/* FOX EARS */}
      <div
        className={cn(
          "absolute left-5 top-4 h-10 w-10 rotate-45 rounded-sm",

          isFox
            ? "bg-coral"
            : "hidden"
        )}
      />

      <div
        className={cn(
          "absolute right-5 top-4 h-10 w-10 rotate-45 rounded-sm",

          isFox
            ? "bg-coral"
            : "hidden"
        )}
      />

      {/* EYES */}
      <div className="absolute left-10 top-14 h-3 w-3 rounded-full bg-ink" />

      <div className="absolute right-10 top-14 h-3 w-3 rounded-full bg-ink" />

      {/* PANDA */}
      {isPanda && (
        <>
          <div className="absolute left-7 top-12 h-8 w-8 rounded-full bg-ink/90" />

          <div className="absolute right-7 top-12 h-8 w-8 rounded-full bg-ink/90" />

          <div className="absolute left-10 top-14 h-3 w-3 rounded-full bg-white" />

          <div className="absolute right-10 top-14 h-3 w-3 rounded-full bg-white" />
        </>
      )}

      {/* NOSE */}
      <div className="absolute left-1/2 top-[73px] h-2 w-3 -translate-x-1/2 rounded-full bg-ink/75" />

      {/* MOUTH */}
      <div className="absolute left-[51px] top-[83px] h-2 w-7 rounded-b-full border-b-2 border-ink/60" />

      {/* CHEST */}
      <div className="absolute bottom-2 left-1/2 h-7 w-16 -translate-x-1/2 rounded-full bg-white/55" />

      {/* NAME */}
      <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm font-black text-ink/60 dark:text-white/60">
        {mascotName}
      </p>
    </motion.div>
  );
}