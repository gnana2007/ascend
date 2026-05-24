import { Apple, Droplets, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HydrationBottle } from "@/components/HydrationBottle";

export function Hydration() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      <Card className="p-8">
        <h2 className="text-3xl font-black">Hydration Tracker</h2>
        <HydrationBottle />
        <Button className="mt-5 w-full"><Droplets size={18} /> Log 250 ml</Button>
      </Card>
      <div className="grid gap-5">
        <Card>
          <h3 className="text-xl font-black">Nutrition and Energy</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["Breakfast", "Protein oats", Apple],
              ["Energy", "Steady", Flame],
              ["Reminder", "Fruit at 5 PM", Droplets]
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
                <Icon size={20} />
                <p className="mt-3 text-sm font-bold text-ink/55 dark:text-white/55">{label as string}</p>
                <p className="text-xl font-black">{value as string}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-black">Hydration Streak</h3>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, index) => (
              <div key={index} className="aspect-square rounded-full bg-cyan-300/70 shadow-sm" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
