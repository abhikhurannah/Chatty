import { create } from "zustand"
import { persist } from "zustand/middleware"

// Create a store with Zustand for theme management
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: localStorage.getItem("theme") || "light", // Default theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // Name for localStorage
    },
  ),
)

