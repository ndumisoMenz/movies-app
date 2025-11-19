import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useStore = create((set, get) => ({
  // ---------- AUTH STATE ----------
  user: null,
  loadingAuth: true,

  setUser: (user) => set({ user }),
  setLoadingAuth: (loading) => set({ loadingAuth: loading }),

  // API wrapper: auto refresh + send cookies
  apiFetch: async (url, options = {}) => {
    let res = await fetch(`${API_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });

    if (res.status === 401) {
      // Try refresh token
      const refresh = await fetch(`${API_URL}/auth/refresh`, { method: "POST", credentials: "include" });
      if (!refresh.ok) {
        get().logout();
        return res;
      }

      res = await fetch(`${API_URL}${url}`, {
        ...options,
        credentials: "include",
      });
    }

    return res;
  },

  login: async (email, password) => {
    const res = await get().apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return { ok: false };

    const data = await res.json();
    set({ user: data.user });
    return { ok: true };
  },

  logout: async () => {
    await get().apiFetch("/auth/logout", { method: "POST" });
    set({ user: null, myList: [] });
  },

  loadUser: async () => {
    set({ loadingAuth: true });
    try {
      const res = await get().apiFetch("/auth/me");
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user });
      }
    } catch (err) {
      console.error("Failed to load user:", err);
    } finally {
      set({ loadingAuth: false });
    }
  },

  // ---------- MY LIST STATE ----------
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
    const movieId = item.movieId.toString();

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
    const res = await get().apiFetch(`/api/movies/${movieId}`, { method: "DELETE" });
    if (res.ok) {
      set((state) => ({ myList: state.myList.filter((m) => m.movieId !== movieId) }));
    }
  },
}));
