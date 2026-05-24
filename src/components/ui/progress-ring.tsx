import { clamp } from "@/lib/utils";

type ProgressRingProps = {
  value: number;
  label: string;
  color?: string;
  size?: number;
};

export function ProgressRing({ value, label, color = "#9dd9c8", size = 118 }: ProgressRingProps) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamp(value) / 100) * circumference;

  return (
    <div className="grid place-items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.18)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <span className="text-2xl font-black text-ink dark:text-white">{value}%</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-ink/65 dark:text-white/65">{label}</span>
    </div>
  );
}
