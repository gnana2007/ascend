import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Brain,
  ChevronRight,
  Droplets,
  Flower2,
  Home,
  LogOut,
  Menu,
  Moon,
  Palette,
  Settings,
  Sparkles,
  User,
  X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import { DataProvider } from "@/contexts/DataContext";
import { mascots } from "@/data/mock";
import { Dashboard } from "@/pages/Dashboard";
import { Study } from "@/pages/Study";
import { Sleep } from "@/pages/Sleep";
import { GlowUp } from "@/pages/GlowUp";
import { Wellness } from "@/pages/Wellness";
import { Hydration } from "@/pages/Hydration";
import { Analytics } from "@/pages/Analytics";
import { Coach } from "@/pages/Coach";
import { Profile } from "@/pages/Profile";
import { Auth } from "@/pages/Auth";
import { SettingsPage } from "@/pages/SettingsPage";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/study", label: "Study", icon: Brain },
  { to: "/sleep", label: "Sleep", icon: Moon },
  { to: "/glow-up", label: "Glow-Up", icon: Sparkles },
  { to: "/wellness", label: "Wellness", icon: Flower2 },
  { to: "/hydration", label: "Hydration", icon: Droplets },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/coach", label: "AI Coach", icon: Bot },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const mascot = useMemo(() => mascots[Math.floor(Math.random() * mascots.length)], []);
  const location = useLocation();

  return (
    <DataProvider>
      <div className={cn(dark && "dark")}>
      <div className="min-h-screen overflow-hidden bg-mist text-ink transition-colors duration-500 dark:bg-[#0e1514] dark:text-white">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(157,217,200,0.42),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(255,158,143,0.24),transparent_30%),linear-gradient(135deg,#f6fbf8_0%,#f3f0ff_45%,#e9fbff_100%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.15),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(255,158,143,0.10),transparent_30%),linear-gradient(135deg,#0e1514_0%,#17162a_48%,#071a1d_100%)]" />
        <div className="lg:flex">
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-72 -translate-x-full border-r border-white/40 bg-white/55 p-4 shadow-glass backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-ink/60 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
              open && "translate-x-0"
            )}
          >
            <div className="mb-7 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white shadow-glow">
                  <Sparkles size={21} />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight">Ascend</p>
                  <p className="text-xs font-semibold text-ink/55 dark:text-white/55">Build your next self</p>
                </div>
              </Link>
              <Button className="lg:hidden" size="icon" variant="ghost" onClick={() => setOpen(false)}>
                <X size={19} />
              </Button>
            </div>
            <nav className="space-y-2">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-ink/65 transition-all dark:text-white/65",
                      "hover:bg-white/65 hover:text-ink dark:hover:bg-white/10 dark:hover:text-white",
                      isActive && "bg-white text-ink shadow-sm dark:bg-white/15 dark:text-white"
                    )
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" size={16} />
                </NavLink>
              ))}
            </nav>
            <Card className="mt-6 p-4">
              <div className="flex items-center gap-3">
                <Mascot type={mascot.type} className="h-16 w-16 shrink-0 scale-75" />
                <div>
                  <p className="text-sm font-black">{mascot.name}</p>
                  <p className="text-xs leading-relaxed text-ink/60 dark:text-white/60">{mascot.line}</p>
                </div>
              </div>
            </Card>
          </aside>

          <main className="min-h-screen flex-1 px-4 py-4 sm:px-6 lg:px-8">
            <header className="sticky top-3 z-30 mb-5 flex items-center justify-between rounded-2xl border border-white/50 bg-white/55 px-3 py-3 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-ink/55">
              <div className="flex items-center gap-2">
                <Button className="lg:hidden" size="icon" variant="ghost" onClick={() => setOpen(true)}>
                  <Menu size={19} />
                </Button>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/45 dark:text-white/45">Transformation OS</p>
                  <h1 className="text-lg font-black sm:text-xl">Your calm productivity companion</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="soft" title="Theme" onClick={() => setDark((value) => !value)}>
                  <Palette size={18} />
                </Button>
                <Button size="icon" variant="soft" title="Settings">
                  <Settings size={18} />
                </Button>
                <Button size="icon" variant="soft" title="Logout">
                  <LogOut size={18} />
                </Button>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Dashboard mascot={mascot} />} />
                  <Route path="/study" element={<Study />} />
                  <Route path="/sleep" element={<Sleep />} />
                  <Route path="/glow-up" element={<GlowUp />} />
                  <Route path="/wellness" element={<Wellness />} />
                  <Route path="/hydration" element={<Hydration />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/coach" element={<Coach />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/login" element={<Auth mode="login" />} />
                  <Route path="/signup" element={<Auth mode="signup" />} />
                  <Route path="/forgot-password" element={<Auth mode="forgot" />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  </DataProvider>
  );
}
