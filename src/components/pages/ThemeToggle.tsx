import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for theme preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    // Apply theme class to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none group"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <Sun className={`w-5 h-5 text-yellow-500 absolute transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
        <Moon className={`w-5 h-5 text-blue-400 absolute transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
      </div>
    </button>
  )
}