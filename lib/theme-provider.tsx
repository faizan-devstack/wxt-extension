'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    type ReactNode,
} from 'react'

import { getStoredTheme, onStoredThemeChange, setStoredTheme, type Theme } from './theme-storage'

interface ThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system')
    const [isHydrated, setIsHydrated] = useState(false)

    const resolvedTheme = useMemo<'light' | 'dark'>(() => {
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
        return theme
    }, [theme])

    useEffect(() => {
        if (!isHydrated) return

        void setStoredTheme(theme)

        const root = window.document.documentElement
        root.classList.add('theme-root')
        root.classList.toggle('dark', resolvedTheme === 'dark')
    }, [theme, resolvedTheme, isHydrated])

    // Listen to system preference changes when in "system" mode
    useEffect(() => {
        if (!isHydrated || theme !== 'system') return

        const media = window.matchMedia('(prefers-color-scheme: dark)')

        const listener = (e: MediaQueryListEvent) => {
            document.documentElement.classList.add('theme-root')
            document.documentElement.classList.toggle('dark', e.matches)
        }

        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [theme, isHydrated])

    // Initialize from shared extension storage (and stay in sync).
    useEffect(() => {
        let unsubscribe = () => {}

        void (async () => {
            const stored = await getStoredTheme()
            setTheme(stored)
            setIsHydrated(true)
            unsubscribe = onStoredThemeChange(setTheme)
        })()

        return () => unsubscribe()
    }, [])

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