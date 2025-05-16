import { create } from "zustand";

interface mobileStore {
  ismobile: boolean;
  setIsMobile: (ismobile: boolean | null) => void;
}
export const useMobileStore = create<mobileStore>((set) => ({
  ismobile: null,
  setIsMobile: (ismobile) => set({ ismobile }),
}));
