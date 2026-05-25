import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/contexts/AuthContext";

import { model } from "@/lib/gemini";

export function Onboarding() {
  const { user } = useAuth();

  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================

  const [goal, setGoal] =
    useState("Study");

  const [wakeTime, setWakeTime] =
    useState("6:00 AM");

  const [sleepTime, setSleepTime] =
    useState("10:30 PM");

  const [studyStyle, setStudyStyle] =
    useState("Deep Work");

  const [intensity, setIntensity] =
    useState("Balanced");

  const [freeHours, setFreeHours] =
    useState("6");

  const [
    workoutPreference,
    setWorkoutPreference,
  ] = useState("Evening");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // TIME ENGINE
  // =========================

  const addMinutes = (
    time: string,
    minsToAdd: number
  ) => {
    const [timePart, modifier] =
      time.split(" ");

    let [hours, minutes] =
      timePart.split(":").map(Number);

    if (
      modifier === "PM" &&
      hours !== 12
    ) {
      hours += 12;
    }

    if (
      modifier === "AM" &&
      hours === 12
    ) {
      hours = 0;
    }

    const date = new Date();

    date.setHours(hours);

    date.setMinutes(
      minutes + minsToAdd
    );

    return date.toLocaleTimeString(
      [],
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // =========================
  // FALLBACK GENERATOR
  // =========================

  const generateSchedule = () => {
    const schedule: any[] = [];

    let currentTime = wakeTime;

    // WAKE
    schedule.push({
      time: currentTime,
      task: "Wake up",
    });

    // HYDRATION
    currentTime = addMinutes(
      currentTime,
      30
    );

    schedule.push({
      time: currentTime,
      task:
        "Hydration & sunlight",
    });

    // BREAKFAST
    currentTime = addMinutes(
      currentTime,
      45
    );

    schedule.push({
      time: currentTime,
      task:
        "Breakfast & planning",
    });

    // PRODUCTIVITY
    const totalHours =
      Number(freeHours);

    for (
      let i = 0;
      i < totalHours;
      i++
    ) {
      currentTime = addMinutes(
        currentTime,
        90
      );

      if (
        studyStyle ===
        "Deep Work"
      ) {
        schedule.push({
          time: currentTime,
          task: `${goal} deep work session`,
        });

        currentTime =
          addMinutes(
            currentTime,
            20
          );

        schedule.push({
          time: currentTime,
          task:
            "Recovery break",
        });
      }

      if (
        studyStyle ===
        "Pomodoro"
      ) {
        schedule.push({
          time: currentTime,
          task: `${goal} pomodoro session`,
        });

        currentTime =
          addMinutes(
            currentTime,
            10
          );

        schedule.push({
          time: currentTime,
          task:
            "Short break",
        });
      }

      if (
        studyStyle ===
        "Flexible"
      ) {
        schedule.push({
          time: currentTime,
          task: `${goal} flexible session`,
        });

        currentTime =
          addMinutes(
            currentTime,
            30
          );

        schedule.push({
          time: currentTime,
          task:
            "Relaxation break",
        });
      }
    }

    // GOALS
    if (goal === "Fitness") {
      currentTime = addMinutes(
        currentTime,
        60
      );

      schedule.push({
        time: currentTime,
        task:
          "Workout session",
      });

      currentTime = addMinutes(
        currentTime,
        45
      );

      schedule.push({
        time: currentTime,
        task:
          "Protein-rich meal",
      });
    }

    if (goal === "Wellness") {
      currentTime = addMinutes(
        currentTime,
        45
      );

      schedule.push({
        time: currentTime,
        task:
          "Meditation & journaling",
      });

      currentTime = addMinutes(
        currentTime,
        30
      );

      schedule.push({
        time: currentTime,
        task:
          "Digital detox",
      });
    }

    if (
      goal === "Discipline"
    ) {
      currentTime = addMinutes(
        currentTime,
        60
      );

      schedule.push({
        time: currentTime,
        task:
          "Cold shower challenge",
      });

      currentTime = addMinutes(
        currentTime,
        90
      );

      schedule.push({
        time: currentTime,
        task:
          "Daily reflection",
      });
    }

    // WORKOUT
    if (
      workoutPreference ===
      "Morning"
    ) {
      schedule.unshift({
        time: addMinutes(
          wakeTime,
          60
        ),
        task:
          "Morning workout",
      });
    }

    if (
      workoutPreference ===
      "Evening"
    ) {
      currentTime = addMinutes(
        currentTime,
        60
      );

      schedule.push({
        time: currentTime,
        task:
          "Evening workout",
      });
    }

    // INTENSITY
    if (
      intensity === "Hardcore"
    ) {
      currentTime = addMinutes(
        currentTime,
        90
      );

      schedule.push({
        time: currentTime,
        task:
          "Extra focus sprint",
      });
    }

    if (
      intensity === "Gentle"
    ) {
      currentTime = addMinutes(
        currentTime,
        45
      );

      schedule.push({
        time: currentTime,
        task:
          "Relaxed recovery walk",
      });
    }

    // SLEEP
    schedule.push({
      time: sleepTime,
      task:
        "Sleep & recovery",
    });

    return schedule;
  };

  // =========================
  // SAVE
  // =========================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // AUTH USER
      const {
        data: { user: authUser },
      } =
        await supabase.auth.getUser();

      if (!authUser) {
        alert(
          "User not authenticated"
        );

        return;
      }

      // =========================
      // AI GENERATION
      // =========================

      let finalSchedule = [];

      try {
        const prompt = `
Create a personalized daily productivity routine.

User details:

Goal: ${goal}

Wake time: ${wakeTime}

Sleep time: ${sleepTime}

Productivity style: ${studyStyle}

Intensity: ${intensity}

Free hours: ${freeHours}

Workout preference: ${workoutPreference}

Return ONLY valid JSON.

Format:

[
  {
    "time": "6:00 AM",
    "task": "Wake up and hydrate"
  }
]
`;

        const result =
          await model.generateContent(
            prompt
          );

        const response =
          await result.response;

        const text =
          response.text();

        const cleaned =
          text
            .replace(
              /```json/g,
              ""
            )
            .replace(
              /```/g,
              ""
            )
            .trim();

        finalSchedule =
          JSON.parse(cleaned);

        console.log(
          "AI Schedule:",
          finalSchedule
        );
      } catch (error) {
        console.log(
          "AI failed — using fallback generator"
        );

        // FALLBACK
        finalSchedule =
          generateSchedule();
      }

      // =========================
      // SAVE TO DB
      // =========================

      const { error } =
        await supabase
          .from("timetables")
          .insert({
            user_id: authUser.id,

            title:
              "Personalized Routine",

            wake_time:
              wakeTime,

            sleep_time:
              sleepTime,

            study_style:
              studyStyle,

            intensity,

            schedule:
              finalSchedule,
          });

      if (error) {
        console.log(error);

        throw error;
      }

      // SUCCESS
      navigate("/planner");
    } catch (error: any) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-5xl font-black leading-tight">
          Build your
          <br />
          lifestyle system
        </h1>

        <p className="mt-4 text-lg text-ink/60 dark:text-white/60">
          Ascend creates a
          personalized routine
          based on your goals,
          energy, and lifestyle.
        </p>
      </div>

      <div className="grid gap-5 rounded-[2rem] bg-white/70 p-8 shadow-glass backdrop-blur-2xl dark:bg-white/5">
        {/* GOAL */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Main Goal
          </label>

          <select
            className="field"
            value={goal}
            onChange={(e) =>
              setGoal(
                e.target.value
              )
            }
          >
            <option>Study</option>

            <option>
              Fitness
            </option>

            <option>
              Wellness
            </option>

            <option>
              Discipline
            </option>
          </select>
        </div>

        {/* WAKE */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Wake Time
          </label>

          <input
            className="field"
            value={wakeTime}
            onChange={(e) =>
              setWakeTime(
                e.target.value
              )
            }
          />
        </div>

        {/* SLEEP */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Sleep Time
          </label>

          <input
            className="field"
            value={sleepTime}
            onChange={(e) =>
              setSleepTime(
                e.target.value
              )
            }
          />
        </div>

        {/* STYLE */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Productivity Style
          </label>

          <select
            className="field"
            value={studyStyle}
            onChange={(e) =>
              setStudyStyle(
                e.target.value
              )
            }
          >
            <option>
              Deep Work
            </option>

            <option>
              Pomodoro
            </option>

            <option>
              Flexible
            </option>
          </select>
        </div>

        {/* INTENSITY */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Intensity
          </label>

          <select
            className="field"
            value={intensity}
            onChange={(e) =>
              setIntensity(
                e.target.value
              )
            }
          >
            <option>
              Gentle
            </option>

            <option>
              Balanced
            </option>

            <option>
              Hardcore
            </option>
          </select>
        </div>

        {/* FREE HOURS */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Free Hours Per Day
          </label>

          <input
            type="number"
            className="field"
            value={freeHours}
            onChange={(e) =>
              setFreeHours(
                e.target.value
              )
            }
          />
        </div>

        {/* WORKOUT */}
        <div>
          <label className="mb-2 block text-sm font-black">
            Workout Preference
          </label>

          <select
            className="field"
            value={
              workoutPreference
            }
            onChange={(e) =>
              setWorkoutPreference(
                e.target.value
              )
            }
          >
            <option>
              Morning
            </option>

            <option>
              Evening
            </option>

            <option>
              None
            </option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 rounded-2xl bg-black py-4 text-lg font-black text-white transition hover:scale-[1.01]"
        >
          {loading
            ? "Generating..."
            : "Generate My Personalized Routine"}
        </button>
      </div>
    </div>
  );
}