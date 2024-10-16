import { create } from "zustand";

type Store = {
  isCreateModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useProjectLayoutStore = create<Store>((set) => ({
  isCreateModalOpen: false,
  openModal: () => set({ isCreateModalOpen: true }),
  closeModal: () => set({ isCreateModalOpen: false }),
}));
