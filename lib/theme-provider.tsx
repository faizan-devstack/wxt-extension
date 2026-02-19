'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    type ReactNode,
} from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Try to read from localStorage first
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme | null
            if (saved && ['light', 'dark', 'system'].includes(saved)) {
                return saved
            }
        }
        return 'system'
    })

    const resolvedTheme = useMemo<'light' | 'dark'>(() => {
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
        return theme
    }, [theme])

    useEffect(() => {
        const root = window.document.documentElement

        // Remove old classes
        root.classList.remove('light', 'dark')

        // Apply new class
        if (resolvedTheme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.add('light')
        }

        // Save preference
        if (theme === 'system') {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', theme)
        }
    }, [theme, resolvedTheme])

    // Listen to system preference changes when in "system" mode
    useEffect(() => {
        if (theme !== 'system') return

        const media = window.matchMedia('(prefers-color-scheme: dark)')

        const listener = (e: MediaQueryListEvent) => {
            document.documentElement.classList.toggle('dark', e.matches)
            document.documentElement.classList.toggle('light', !e.matches)
        }

        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [theme])

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            resolvedTheme,
        }),
        [theme, resolvedTheme]
    )

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}