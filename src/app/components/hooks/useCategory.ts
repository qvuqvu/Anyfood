import { create } from "zustand";

interface CategoryStore {
  setCategory: (newName: string) => void;
  categoryName: string;
}

const useCategory = create<CategoryStore>((set) => ({
  categoryName: "",
  setCategory: (newName: string) => set({ categoryName: newName }),
}));

export default useCategory;
