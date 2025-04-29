import { create } from "zustand";

interface AuthStore {
  error: string | null;
  setError: (error: string | null) => void;
}
export const authStore = create<AuthStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));
