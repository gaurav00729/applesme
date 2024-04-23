"use client";
import { create } from "zustand";
import { StoreType } from "./types";

const useStore = create<StoreType>((set) => ({
  authToken: undefined,
  setAuthToken: (authToken?: string) => set(() => ({ authToken: authToken })),
  user: undefined,
  setUser: (user) => set({ user }),
}));

export default useStore;
