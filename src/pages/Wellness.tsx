import { Pause, Play, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";

const routines = [
  { name: "Morning Mobility", length: "12 min", focus: "Posture and neck release" },
  { name: "Exam Calm Flow", length: "18 min", focus: "Breath, hips, hamstrings" },
  { name: "Desk Reset", length: "7 min", focus: "Wrists, shoulders, spine" },
  { name: "Sleepy Stretch", length: "10 min", focus: "Slow exhale and recovery" }
];

export function Wellness() {
  const { dashboardData, loading } = useData();

  if (loading || !dashboardData) {
    return <div className="flex items-center justify-center py-20">Loading wellness data...</div>;
  }

  const totals = dashboardData.totals || {};
  const wellnessScore = dashboardData.modules?.wellness || 0;

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
      <Card className="p-6">
        <h2 className="text-3xl font-black">Yoga, breath, posture, and calm focus.</h2>
        <p className="mt-2 text-sm font-semibold text-ink/60 dark:text-white/60">Wellness Score: {wellnessScore}%</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {routines.map((routine) => (
            <div key={routine.name} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
              <div className="mb-6 h-28 rounded-2xl bg-[linear-gradient(135deg,rgba(157,217,200,0.75),rgba(201,184,255,0.6))]">
                <div className="grid h-full place-items-center">
                  <Wind className="animate-pulse" size={34} />
                </div>
              </div>
              <p className="text-lg font-black">{routine.name}</p>
              <p className="text-sm font-semibold text-ink/55 dark:text-white/55">{routine.length} - {routine.focus}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-xl font-black">Meditation Timer</h3>
        <div className="my-8 grid place-items-center">
          <div className="grid h-52 w-52 place-items-center rounded-full border border-white/60 bg-white/45 shadow-glow dark:border-white/10 dark:bg-white/10">
            <div className="text-center">
              <p className="text-5xl font-black">08:00</p>
              <p className="mt-2 text-sm font-bold text-ink/55 dark:text-white/55">Deep focus mode</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Button size="icon"><Play size={18} /></Button>
          <Button size="icon" variant="soft"><Pause size={18} /></Button>
        </div>
      </Card>
    </div>
  );
}
