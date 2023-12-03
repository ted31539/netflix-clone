import { create } from 'zustand';

export interface LoadingStoreInterface {
  isLoading: boolean;
  openLoading: () => void;
  closeLoading: () => void
}

const useLoading = create<LoadingStoreInterface>((set)=> ({
  isLoading: false,
  openLoading: () => set({ isLoading: true }),
  closeLoading: () => set({ isLoading: false}),
}))

export default useLoading;