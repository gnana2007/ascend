import { Camera, Check, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";

const glowHabits = [
  "Cleanser",
  "Moisturizer",
  "Sunscreen",
  "Lip care",
  "Hair oiling",
  "Scalp massage",
  "Silk pillowcase"
];

export function GlowUp() {
  const { dashboardData, loading } = useData();

  if (loading || !dashboardData) {
    return <div className="flex items-center justify-center py-20">Loading glow-up data...</div>;
  }

  const totals = dashboardData.totals || {};
  const skincareLogs = (totals.skincare || 0) + (totals.haircare || 0);

  return (
    <div className="space-y-5">
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-ink/45 dark:text-white/45">Glow-Up Tracker</p>
            <h2 className="mt-2 text-3xl font-black">Skincare, haircare, and visible confidence.</h2>
            <p className="mt-2 text-sm font-semibold text-ink/60 dark:text-white/60">Total care sessions: {skincareLogs}</p>
          </div>
          <Button><Camera size={18} /> Add Progress Photo</Button>
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h3 className="text-xl font-black">Today Routine</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {glowHabits.map((habit, index) => (
              <button key={habit} className="flex items-center gap-3 rounded-2xl bg-white/50 p-4 text-left font-bold transition hover:-translate-y-0.5 hover:bg-white dark:bg-white/10">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sage/35">{index < 4 ? <Check size={17} /> : <Sparkles size={17} />}</span>
                {habit}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-black">Progress Milestones</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {["Week 1", "Week 4", "Week 8"].map((label, index) => (
              <div key={label} className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-sage/50 via-lilac/40 to-coral/40 p-4">
                <div className="flex h-full flex-col justify-end rounded-xl bg-white/35 p-4 backdrop-blur-sm dark:bg-white/10">
                  <p className="text-sm font-bold text-ink/55 dark:text-white/55">{label}</p>
                  <p className="text-2xl font-black">Glow {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
