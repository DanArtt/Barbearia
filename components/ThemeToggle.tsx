"use client"

import { useTheme } from "../app/context/theme-context"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <Sun
        size={18}
        className={theme === "light" ? "text-yellow-500" : "text-gray-400"}
      />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <Moon
        size={18}
        className={theme === "dark" ? "text-blue-400" : "text-gray-400"}
      />
    </div>
  )
}
