import { create } from "zustand";

type Store = {
  projectId: string | null;
  isCreateModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setProjectId: (id: string) => void;
  clearProjectId: () => void;
};

export const useProjectSubPagesStore = create<Store>((set) => ({
  projectId: null,
  isCreateModalOpen: false,
  openModal: () => set({ isCreateModalOpen: true }),
  closeModal: () => set({ isCreateModalOpen: false }),
  setProjectId: (id: string) => set({ projectId: id }),
  clearProjectId: () => set({ projectId: null }),
}));
