import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiClient, DashboardData, User } from "@/lib/api";

interface DataContextType {
  dashboardData: DashboardData | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dashboard data which includes user info
      const data = await apiClient.getDashboard();
      setDashboardData(data);
      
      // Note: The User data is embedded in the dashboard response
      // In a full implementation, you might want a separate user endpoint
      // For now, we'll construct user data from the dashboard response
      if (data) {
        setUser({
          _id: "",
          name: "",
          email: "",
          level: data.level,
          xp: data.xp,
          transformation: data.transformation,
          routines: []
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        dashboardData,
        user,
        loading,
        error,
        refreshData: loadData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
