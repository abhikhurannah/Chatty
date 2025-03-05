"use client"

import { useState, useEffect, useRef } from "react"
import { Moon, Sun, Check } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore"

const Settings = () => {
  const { theme, setTheme } = useThemeStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const themes = [
    { name: "light", label: "Light" },
    { name: "dark", label: "Dark" },
    { name: "cupcake", label: "Cupcake" },
    { name: "bumblebee", label: "Bumblebee" },
    { name: "emerald", label: "Emerald" },
    { name: "corporate", label: "Corporate" },
    { name: "synthwave", label: "Synthwave" },
    { name: "retro", label: "Retro" },
    { name: "cyberpunk", label: "Cyberpunk" },
    { name: "valentine", label: "Valentine" },
    { name: "halloween", label: "Halloween" },
    { name: "garden", label: "Garden" },
    { name: "forest", label: "Forest" },
    { name: "aqua", label: "Aqua" },
    { name: "lofi", label: "Lo-Fi" },
    { name: "pastel", label: "Pastel" },
    { name: "fantasy", label: "Fantasy" },
    { name: "wireframe", label: "Wireframe" },
    { name: "black", label: "Black" },
    { name: "luxury", label: "Luxury" },
    { name: "dracula", label: "Dracula" },
    { name: "cmyk", label: "CMYK" },
    { name: "autumn", label: "Autumn" },
    { name: "business", label: "Business" },
    { name: "acid", label: "Acid" },
    { name: "lemonade", label: "Lemonade" },
    { name: "night", label: "Night" },
    { name: "coffee", label: "Coffee" },
    { name: "winter", label: "Winter" },
  ]

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>

      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="flex items-center gap-2 btn btn-primary">
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>

        {isOpen && (
          <div className="absolute mt-2 p-2 bg-base-200 rounded-lg shadow-lg z-10 w-64 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.name}
                  className={`flex items-center justify-between px-4 py-2 rounded-md hover:bg-base-300 transition-colors ${
                    theme === themeOption.name ? "bg-primary text-primary-content" : ""
                  }`}
                  onClick={() => {
                    setTheme(themeOption.name)
                    setIsOpen(false)
                  }}
                >
                  <span>{themeOption.label}</span>
                  {theme === themeOption.name && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Theme Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>This card shows how the current theme looks.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded bg-primary"></div>
              <div className="w-12 h-12 rounded bg-secondary"></div>
              <div className="w-12 h-12 rounded bg-accent"></div>
              <div className="w-12 h-12 rounded bg-neutral"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded bg-base-100"></div>
              <div className="w-12 h-12 rounded bg-base-200"></div>
              <div className="w-12 h-12 rounded bg-base-300"></div>
              <div className="w-12 h-12 rounded bg-base-content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
