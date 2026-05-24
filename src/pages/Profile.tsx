import { Bell, Brush, Camera, Moon, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";

export function Profile() {
  const { dashboardData, loading } = useData();

  if (loading || !dashboardData) {
    return <div className="flex items-center justify-center py-20">Loading profile...</div>;
  }

  const user = dashboardData.user || { name: "User" };
  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="text-center">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-sage to-lilac text-4xl font-black shadow-glow">
          {initials}
        </div>
        <h2 className="mt-4 text-3xl font-black">{user.name}</h2>
        <p className="font-bold text-ink/55 dark:text-white/55">Level {dashboardData.level}</p>
        <Button className="mt-5">
          <Camera size={18} /> Customize Profile
        </Button>
      </Card>
      <Card>
        <h3 className="text-xl font-black">Settings</h3>
        <div className="mt-4 grid gap-3">
          {[
            ["Local notifications", "Study, skincare, hydration, sleep", Bell],
            ["Theme customization", "Soft, night, focus, glow", Brush],
            ["Privacy mode", "Keep journal entries locked", ShieldCheck],
            ["Night peace mode", "Lower contrast after 9 PM", Moon]
          ].map(([title, text, Icon]) => (
            <div key={title as string} className="flex items-center gap-3 rounded-2xl bg-white/50 p-4 dark:bg-white/10">
              <Icon size={20} />
              <div className="flex-1">
                <p className="font-black">{title as string}</p>
                <p className="text-sm font-semibold text-ink/55 dark:text-white/55">{text as string}</p>
              </div>
              <div className="h-7 w-12 rounded-full bg-sage p-1">
                <div className="ml-auto h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
