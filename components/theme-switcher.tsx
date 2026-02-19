'use client'

import { useTheme } from '@/lib/theme-provider'
import { Moon, Sun, Monitor } from 'lucide-react'

const THEMES = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
] as const

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="top-1 right-1 absolute flex items-center py-2">
            {THEMES.map(({ value, label, icon: Icon }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${theme === value
                        ? 'bg-primary-solid text-primary-on-primary shadow-sm'
                        : 'text-canvas-text hover:bg-canvas-bg-hover'
                        }`}
                    aria-pressed={theme === value}
                >
                    <Icon size={16} />
                    <span className="sr-only sm:not-sr-only">{label}</span>
                </button>
            ))}
        </div>
    )
}