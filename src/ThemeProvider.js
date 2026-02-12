// TOP OF EVERY FILE - NO EXCEPTIONS!
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import React, { useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {}
});

export function CodeThemeProvider({ 
  children, 
  initialTheme = 'dark',
  enableSystemPreference = true,
  storageKey = 'bertui-theme'
}) {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
    }
    return initialTheme;
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-bertui-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);
  
  useEffect(() => {
    if (!enableSystemPreference || typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (theme === 'system') {
        document.documentElement.setAttribute(
          'data-bertui-theme', 
          e.matches ? 'dark' : 'light'
        );
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, enableSystemPreference]);
  
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'pink';
      if (prev === 'pink') return 'dark';
      return 'dark';
    });
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useCodeTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCodeTheme must be used within CodeThemeProvider');
  }
  return context;
}