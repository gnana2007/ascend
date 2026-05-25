import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
  Palette,
  Volume2,
  WifiOff,
  Moon,
  Sun,
  Sparkles,
  ArrowRight,
  User,
  ShieldCheck,
  Droplets,
  Brain,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import { Card } from "@/components/ui/card";

export function SettingsPage() {
  // =========================
  // GENERAL SETTINGS
  // =========================

  const [notifications, setNotifications] =
    useState(true);

  const [offlineMode, setOfflineMode] =
    useState(false);

  const [sounds, setSounds] =
    useState(true);

  const [theme, setTheme] =
    useState("dark");

  // =========================
  // AI SETTINGS
  // =========================

  const [voiceEnabled, setVoiceEnabled] =
    useState(true);

  const [
    hydrationReminder,
    setHydrationReminder,
  ] = useState(true);

  const [
    sleepReminder,
    setSleepReminder,
  ] = useState(true);

  const [
    studyReminder,
    setStudyReminder,
  ] = useState(true);

  // =========================
  // LOAD SETTINGS
  // =========================

  useEffect(() => {
    const voice =
      localStorage.getItem(
        "voiceEnabled"
      );

    const hydration =
      localStorage.getItem(
        "hydrationReminder"
      );

    const sleep =
      localStorage.getItem(
        "sleepReminder"
      );

    const study =
      localStorage.getItem(
        "studyReminder"
      );

    if (voice !== null) {
      setVoiceEnabled(
        JSON.parse(voice)
      );
    }

    if (hydration !== null) {
      setHydrationReminder(
        JSON.parse(hydration)
      );
    }

    if (sleep !== null) {
      setSleepReminder(
        JSON.parse(sleep)
      );
    }

    if (study !== null) {
      setStudyReminder(
        JSON.parse(study)
      );
    }
  }, []);

  // =========================
  // SAVE SETTINGS
  // =========================

  const toggleVoice = () => {
    const updated =
      !voiceEnabled;

    setVoiceEnabled(updated);

    localStorage.setItem(
      "voiceEnabled",
      JSON.stringify(updated)
    );
  };

  const toggleHydration =
    () => {
      const updated =
        !hydrationReminder;

      setHydrationReminder(
        updated
      );

      localStorage.setItem(
        "hydrationReminder",
        JSON.stringify(updated)
      );
    };

  const toggleSleep = () => {
    const updated =
      !sleepReminder;

    setSleepReminder(updated);

    localStorage.setItem(
      "sleepReminder",
      JSON.stringify(updated)
    );
  };

  const toggleStudy = () => {
    const updated =
      !studyReminder;

    setStudyReminder(updated);

    localStorage.setItem(
      "studyReminder",
      JSON.stringify(updated)
    );
  };

  // =========================
  // SETTINGS OPTIONS
  // =========================

  const options = [
    {
      title:
        "Notifications",

      text:
        "Hydration, sleep, study, and wellness reminders.",

      icon: Bell,

      enabled:
        notifications,

      toggle:
        () =>
          setNotifications(
            !notifications
          ),
    },

    {
      title:
        "Offline Mode",

      text:
        "Cache planner and analytics locally on this device.",

      icon: WifiOff,

      enabled:
        offlineMode,

      toggle:
        () =>
          setOfflineMode(
            !offlineMode
          ),
    },

    {
      title:
        "Soundscapes",

      text:
        "Lo-fi, rain, deep focus, and calming environments.",

      icon: Volume2,

      enabled: sounds,

      toggle:
        () =>
          setSounds(
            !sounds
          ),
    },
  ];

  // =========================
  // AI REMINDERS
  // =========================

  const aiOptions = [
    {
      title:
        "Voice Assistant",

      text:
        "AI speaks reminders and motivational guidance.",

      icon: Sparkles,

      enabled:
        voiceEnabled,

      toggle:
        toggleVoice,
    },

    {
      title:
        "Hydration Reminder",

      text:
        "AI reminds you to drink water.",

      icon: Droplets,

      enabled:
        hydrationReminder,

      toggle:
        toggleHydration,
    },

    {
      title:
        "Study Reminder",

      text:
        "AI reminds you to focus and study.",

      icon: Brain,

      enabled:
        studyReminder,

      toggle:
        toggleStudy,
    },

    {
      title:
        "Sleep Reminder",

      text:
        "AI reminds you to sleep and recover.",

      icon: Moon,

      enabled:
        sleepReminder,

      toggle:
        toggleSleep,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-ink/50 dark:text-white/50">
            Personalization Hub
          </p>

          <h1 className="text-5xl font-black">
            Settings
          </h1>

          <p className="mt-3 text-lg text-ink/60 dark:text-white/60">
            Customize your AI
            productivity ecosystem.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-black px-5 py-3 text-sm font-black text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/coach"
            className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-black shadow-glass dark:bg-white/10"
          >
            AI Coach
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        {/* LEFT */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Sparkles />

            <h2 className="text-3xl font-black">
              App Preferences
            </h2>
          </div>

          {/* GENERAL SETTINGS */}
          <div className="mt-6 grid gap-4">
            {options.map(
              (option) => (
                <div
                  key={
                    option.title
                  }
                  className="flex items-center gap-4 rounded-3xl bg-white/50 p-5 dark:bg-white/10"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white dark:bg-white/10">
                    <option.icon
                      size={22}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-black">
                      {
                        option.title
                      }
                    </p>

                    <p className="text-sm font-semibold text-ink/55 dark:text-white/55">
                      {
                        option.text
                      }
                    </p>
                  </div>

                  <button
                    onClick={
                      option.toggle
                    }
                    className={`relative h-8 w-14 rounded-full transition ${
                      option.enabled
                        ? "bg-sage"
                        : "bg-ink/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                        option.enabled
                          ? "right-1"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              )
            )}
          </div>

          {/* AI SETTINGS */}
          <div className="mt-10">
            <h3 className="text-2xl font-black">
              AI Reminder System
            </h3>

            <div className="mt-5 grid gap-4">
              {aiOptions.map(
                (option) => (
                  <div
                    key={
                      option.title
                    }
                    className="flex items-center gap-4 rounded-3xl bg-white/50 p-5 dark:bg-white/10"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white dark:bg-white/10">
                      <option.icon
                        size={22}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-black">
                        {
                          option.title
                        }
                      </p>

                      <p className="text-sm font-semibold text-ink/55 dark:text-white/55">
                        {
                          option.text
                        }
                      </p>
                    </div>

                    <button
                      onClick={
                        option.toggle
                      }
                      className={`relative h-8 w-14 rounded-full transition ${
                        option.enabled
                          ? "bg-sage"
                          : "bg-ink/20"
                      }`}
                    >
                      <div
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                          option.enabled
                            ? "right-1"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* THEME */}
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <Palette />

              <h3 className="text-2xl font-black">
                Theme
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Light",

                  icon: Sun,
                },

                {
                  label: "Dark",

                  icon: Moon,
                },

                {
                  label:
                    "Aurora",

                  icon:
                    Sparkles,
                },
              ].map((item) => (
                <button
                  key={
                    item.label
                  }
                  onClick={() =>
                    setTheme(
                      item.label.toLowerCase()
                    )
                  }
                  className={`rounded-3xl border p-5 transition ${
                    theme ===
                    item.label.toLowerCase()
                      ? "border-sage bg-sage/10"
                      : "border-white/20 bg-white/40 dark:bg-white/5"
                  }`}
                >
                  <item.icon
                    size={24}
                  />

                  <p className="mt-3 font-black">
                    {
                      item.label
                    }
                  </p>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* RIGHT */}
        <div className="space-y-5">
          {/* ACCOUNT */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <User />

              <h3 className="text-2xl font-black">
                Account
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
                <p className="text-sm font-bold text-ink/50 dark:text-white/50">
                  Subscription
                </p>

                <p className="mt-1 text-xl font-black">
                  Free Plan
                </p>
              </div>

              <div className="rounded-2xl bg-white/50 p-4 dark:bg-white/10">
                <p className="text-sm font-bold text-ink/50 dark:text-white/50">
                  AI Voice
                </p>

                <p className="mt-1 text-xl font-black">
                  {voiceEnabled
                    ? "Enabled"
                    : "Disabled"}
                </p>
              </div>
            </div>
          </Card>

          {/* SECURITY */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck />

              <h3 className="text-2xl font-black">
                Security
              </h3>
            </div>

            <div className="mt-5 rounded-2xl bg-white/50 p-5 dark:bg-white/10">
              <p className="font-black">
                Your AI settings
                remain private and
                personalized.
              </p>

              <p className="mt-3 text-sm font-semibold text-ink/55 dark:text-white/55">
                Reminder behavior
                changes dynamically
                based on your
                preferences.
              </p>
            </div>
          </Card>

          {/* QUICK LINKS */}
          <Card className="p-6">
            <h3 className="text-2xl font-black">
              Quick Navigation
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/planner"
                className="flex items-center justify-between rounded-2xl bg-black p-4 text-sm font-black text-white"
              >
                Open Planner

                <ArrowRight
                  size={18}
                />
              </Link>

              <Link
                to="/analytics"
                className="flex items-center justify-between rounded-2xl bg-white/70 p-4 text-sm font-black dark:bg-white/10"
              >
                View Analytics

                <ArrowRight
                  size={18}
                />
              </Link>

              <Link
                to="/coach"
                className="flex items-center justify-between rounded-2xl bg-white/70 p-4 text-sm font-black dark:bg-white/10"
              >
                AI Coach

                <ArrowRight
                  size={18}
                />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}