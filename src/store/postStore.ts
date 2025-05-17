import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export const usePostModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
