import { Bell, Palette, Volume2, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SettingsPage() {
  const options = [
    ["Theme", "Light, dark, night peace, and focus palettes", Palette],
    ["Notifications", "Hydration, sleep, skincare, and study reminders", Bell],
    ["Offline mode", "Cache dashboard shell and logs on this device", WifiOff],
    ["Soundscapes", "Rain, lo-fi, deep focus, and silence", Volume2]
  ];

  return (
    <Card>
      <h2 className="text-3xl font-black">Settings</h2>
      <div className="mt-5 grid gap-3">
        {options.map(([title, text, Icon]) => (
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
  );
}
