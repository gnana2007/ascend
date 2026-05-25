import {
  createContext,
  useContext,
  useEffect,
 useState,
  ReactNode,
} from "react";

import {
  apiClient,
  User,
} from "@/lib/api";

// =========================
// DASHBOARD TYPE
// =========================

export interface DashboardDataType {
  _id?: string;

  name?: string;

  email?: string;

  level?: number;

  xp?: number;

  transformation?: number;

  routines?: any[];

  reminders?: any[];

  weeklyFocus?: {
    day: string;

    study: number;

    sleep: number;

    wellness: number;
  }[];

totals?: {
  study?: number;

  sleep?: number;

  hydration?: number;

  skincare?: number;

  haircare?: number;

  wellness?: number;
};

  modules?: {
    wellness?: number;

    study?: number;

    sleep?: number;

    hydration?: number;
  };

  completedTasks?: number;

  totalTasks?: number;

  streak?: number;
}

// =========================
// CONTEXT TYPE
// =========================

interface DataContextType {
  dashboardData:
    | DashboardDataType
    | null;

  user: User | null;

  loading: boolean;

  error: string | null;

  refreshData: () => Promise<void>;

  setDashboardData: React.Dispatch<
    React.SetStateAction<DashboardDataType | null>
  >;
}

// =========================
// CONTEXT
// =========================

const DataContext =
  createContext<
    DataContextType | undefined
  >(undefined);

// =========================
// PROVIDER
// =========================

export function DataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    dashboardData,
    setDashboardData,
  ] = useState<DashboardDataType | null>(
    null
  );

  const [user, setUser] =
    useState<User | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );

  // =========================
  // LOAD DATA
  // =========================

  const loadData =
    async () => {
      try {
        setLoading(true);

        setError(null);

        const data: any =
          await apiClient.getDashboard();

        // =========================
        // SAFE DASHBOARD DATA
        // =========================

        const safeData: DashboardDataType =
          {
            _id:
              data?._id ||
              "",

            name:
              data?.name ||
              localStorage.getItem(
                "username"
              ) ||
              "User",

            email:
              data?.email ||
              "",

            level:
              data?.level ||
              1,

            xp:
              data?.xp ||
              0,

            transformation:
              data?.transformation ||
              0,

            routines:
              data?.routines ||
              [],

            reminders:
              data?.reminders ||
              [],

            weeklyFocus:
              data?.weeklyFocus ||
              [],

            totals:
              data?.totals ||
              {
                study: 0,

                sleep: 0,

                hydration: 0,
              },

            modules:
              data?.modules ||
              {
                wellness: 0,

                study: 0,

                sleep: 0,

                hydration: 0,
              },

            completedTasks:
              data?.completedTasks ||
              0,

            totalTasks:
              data?.totalTasks ||
              0,

            streak:
              data?.streak ||
              0,
          };

        // =========================
        // SET DASHBOARD
        // =========================

        setDashboardData(
          safeData
        );

        // =========================
        // SET USER
        // =========================

        setUser({
          _id:
            safeData._id ||
            "",

          name:
            safeData.name ||
            "User",

          email:
            safeData.email ||
            "",

          level:
            safeData.level ||
            1,

          xp:
            safeData.xp ||
            0,

          transformation:
            safeData.transformation ||
            0,

          routines:
            safeData.routines ||
            [],
        });
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load data"
        );

        setDashboardData(
          null
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const token =
      localStorage.getItem(
        "authToken"
      );

    if (token) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  // =========================
  // AUTO REFRESH
  // =========================

  useEffect(() => {
    const interval =
      setInterval(() => {
        const token =
          localStorage.getItem(
            "authToken"
          );

        if (token) {
          loadData();
        }
      }, 60000);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  // =========================
  // PROVIDER
  // =========================

  return (
    <DataContext.Provider
      value={{
        dashboardData,

        user,

        loading,

        error,

        refreshData:
          loadData,

        setDashboardData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// =========================
// HOOK
// =========================

export function useData() {
  const context =
    useContext(DataContext);

  if (!context) {
    throw new Error(
      "useData must be used within DataProvider"
    );
  }

  return context;
}