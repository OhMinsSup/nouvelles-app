import { create } from 'zustand';
import { createSelectors } from './createSelectors';

interface LayoutState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const useLayoutStoreBase = create<LayoutState>()((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },
}));

export const useLayoutStore = createSelectors(useLayoutStoreBase);
