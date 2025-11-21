import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const useStore = create((set, get) => ({
  // ---------------- AUTH STATE ----------------
  user: null,
  accessToken: null,
  refreshToken: null,
  loadingAuth: true,

  // Derived state
  isAuthenticated: () => !!get().user,

  setAuth: ({ user, accessToken, refreshToken }) =>
    set({ user, accessToken, refreshToken }),

  logout: async () => {
    try {
      await get().apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }

    // Clear all client state
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      myList: [],
    });
  },

  // ---------------- API WRAPPER ----------------
  apiFetch: async (url, options = {}) => {
    let res = await fetch(`${API_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    // Attempt token refresh on 401
    if (res.status === 401) {
      const refresh = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refresh.ok) {
        get().logout();
        return res;
      }

      // Retry original request
      res = await fetch(`${API_URL}${url}`, {
        ...options,
        credentials: "include",
      });
    }

    return res;
  },

  // ---------------- LOAD USER ON APP START ----------------
  loadUser: async () => {
    set({ loadingAuth: true });

    try {
      const res = await get().apiFetch("/auth/me");

      if (res.ok) {
        const data = await res.json();
        set({ user: data.user });
      }
    } catch (err) {
      console.error("Failed to load /auth/me:", err);
    } finally {
      set({ loadingAuth: false });
    }
  },

  // ---------------- LOGIN REQUEST ----------------
  loginRequest: async ({ email, password }) => {
    const res = await get().apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json(); // includes user + tokens
    set({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return data;
  },

  // ---------------- MY LIST ----------------
  myList: [],

  setMyList: (list) => set({ myList: list }),

  fetchList: async () => {
    const res = await get().apiFetch("/api/movies");

    if (res.ok) {
      const data = await res.json();
      set({ myList: data });
    }
  },

  addToList: async (item) => {
    const res = await get().apiFetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(item),
    });

    if (res.ok) {
      const data = await res.json();
      set((state) => ({ myList: [...state.myList, data.movie] }));
    }
  },

  removeFromList: async (movieId) => {
    const res = await get().apiFetch(`/api/movies/${movieId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      set((state) => ({
        myList: state.myList.filter((m) => m.movieId !== movieId),
      }));
    }
  },
}));

export default useStore;

