import React from 'react';

export function InlineCode({ children, theme = 'dark' }) {
  const themes = {
    dark: { background: '#2d2d2d', color: '#d4d4d4' },
    light: { background: '#e5e7eb', color: '#374151' },
    pink: { background: '#fce7f3', color: '#831843' }
  };
  
  const colors = themes[theme] || themes.dark;
  
  return React.createElement('code', {
    style: {
      background: colors.background,
      color: colors.color,
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: "'Menlo', 'Monaco', monospace",
      fontSize: '0.9em'
    }
  }, children);
}