const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface DashboardData {
  transformation: number;
  level: number;
  xp: number;
  nextLevel: number;
  totals: Record<string, number>;
  logs: Log[];
}

export interface Log {
  _id: string;
  category: "study" | "sleep" | "skincare" | "haircare" | "hydration" | "wellness" | "mood" | "career";
  value: number;
  note?: string;
  meta?: Record<string, unknown>;
  loggedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  transformation: number;
  routines: Array<{
    type: string;
    title: string;
    completed: boolean;
    streak: number;
  }>;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class ApiClient {
  private token: string | null = localStorage.getItem("authToken");

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` })
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        window.location.href = "/auth";
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // Auth endpoints
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  }

  // Dashboard endpoints
  async getDashboard(): Promise<DashboardData> {
    return this.request("/dashboard");
  }

  async createLog(
    category: Log["category"],
    value: number = 1,
    note?: string,
    meta?: Record<string, unknown>
  ): Promise<Log> {
    return this.request("/dashboard/logs", {
      method: "POST",
      body: JSON.stringify({ category, value, note, meta })
    });
  }

  async getCoachAdvice(message: string): Promise<{ reply: string }> {
    return this.request("/dashboard/coach", {
      method: "POST",
      body: JSON.stringify({ message })
    });
  }

  // Health check
  async healthCheck(): Promise<{ ok: boolean; name: string }> {
    return this.request("/health");
  }
}

export const apiClient = new ApiClient();
