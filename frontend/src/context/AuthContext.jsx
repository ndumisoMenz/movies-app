import { createContext, useContext, useState, useEffect, useCallback } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------
  // API wrapper (auto refresh on 401)
  // ------------------------------------
  const apiFetch = useCallback(async (url, options = {}) => {
    let res = await fetch(`${API}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    // Try refresh token if access token expired
    if (res.status === 401) {
      const refresh = await fetch(`${API}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refresh.ok) {
        logout(); // Force logout
        return res;
      }

      // Retry original request
      res = await fetch(`${API}${url}`, {
        ...options,
        credentials: "include",
      });
    }

    return res;
  }, []);

  // ------------------------------------
  // Load user on page load
  // ------------------------------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await apiFetch("/auth/me");

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to load /auth/me:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [apiFetch]);

  // ------------------------------------
  // Login
  // ------------------------------------
  const login = async (email, password) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return { ok: false };

    const data = await res.json();
    setUser(data.user); // User info from backend
    return { ok: true };
  };

  // ------------------------------------
  // Logout
  // ------------------------------------
  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        apiFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
