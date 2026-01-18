import React from 'react';
import { CopyButton } from './CopyButton.js';

export function Code({ 
  children, 
  language = 'javascript',
  showLineNumbers = false,
  showCopyButton = true,
  className = '',
  // NEW: Color customization props
  theme = 'dark', // 'dark' | 'light' | 'custom'
  colors = {}
}) {
  const lines = children.split('\n');
  const lineCount = lines.length;
  
  // Theme-based colors
  const themeColors = getThemeColors(theme, colors);
  
  return React.createElement('div', {
    className: `bertui-code ${className}`,
    style: {
      background: themeColors.background,
      borderRadius: '8px',
      fontFamily: "'Menlo', 'Monaco', monospace",
      fontSize: '14px',
      margin: '1rem 0',
      overflow: 'hidden',
      color: themeColors.text
    }
  }, [
    React.createElement('div', {
      key: 'header',
      style: {
        background: themeColors.header,
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${themeColors.border}`
      }
    }, [
      React.createElement('span', {
        key: 'language',
        style: {
          color: themeColors.meta,
          fontSize: '12px',
          fontWeight: '500'
        }
      }, language),
      showCopyButton && React.createElement(CopyButton, {
        key: 'copy',
        code: children,
        themeColors: themeColors
      })
    ].filter(Boolean)),
    React.createElement('div', {
      key: 'content',
      style: {
        display: 'flex',
        padding: '16px 0'
      }
    }, [
      showLineNumbers && React.createElement('div', {
        key: 'lines',
        style: {
          color: themeColors.meta,
          padding: '0 16px',
          textAlign: 'right',
          userSelect: 'none',
          minWidth: '40px'
        }
      }, Array.from({ length: lineCount }).map((_, i) =>
        React.createElement('span', {
          key: i,
          style: {
            display: 'block',
            paddingRight: '8px'
          }
        }, i + 1)
      )),
      React.createElement('pre', {
        key: 'pre',
        style: {
          margin: 0,
          padding: '0 16px',
          flex: 1,
          overflowX: 'auto'
        }
      }, React.createElement('code', {
        className: `language-${language}`,
        style: {
          color: themeColors.text,
          background: 'transparent',
          fontFamily: 'inherit'
        }
      }, children))
    ].filter(Boolean))
  ]);
}

// Helper function to get theme colors
function getThemeColors(theme, customColors = {}) {
  const themes = {
    dark: {
      background: '#1e1e1e',
      header: '#2d2d2d',
      text: '#d4d4d4',
      meta: '#858585',
      border: '#3d3d3d',
      button: '#3d3d3d',
      buttonHover: '#4d4d4d',
      buttonText: '#d4d4d4',
      success: '#2e7d32'
    },
    light: {
      background: '#ffffff',
      header: '#f3f4f6',
      text: '#374151',
      meta: '#6b7280',
      border: '#d1d5db',
      button: '#e5e7eb',
      buttonHover: '#d1d5db',
      buttonText: '#374151',
      success: '#10b981'
    },
    pink: {
      background: '#fdf2f8',
      header: '#fce7f3',
      text: '#831843',
      meta: '#be185d',
      border: '#f472b6',
      button: '#f472b6',
      buttonHover: '#ec4899',
      buttonText: '#ffffff',
      success: '#10b981'
    }
  };
  
  // Start with selected theme
  const base = themes[theme] || themes.dark;
  
  // Override with custom colors if provided
  return { ...base, ...customColors };
}

// NEW: Language detection helper
function detectLanguage(code) {
  const patterns = {
    javascript: /(\bconsole\.|\bfunction\b|\bconst\b|\blet\b|\bvar\b|\bimport\b|\bexport\b)/,
    typescript: /(:\s*\w+\s*[=;]|\binterface\b|\btype\b|\bnamespace\b)/,
    python: /(\bdef\b|\bclass\b|\bimport\b|\bfrom\b|\bprint\b|:\s*$)/,
    html: /(<!DOCTYPE|<\/?\w+[^>]*>|&[a-z]+;)/,
    css: /({[^}]*}|\.\w+\s*{|#\w+\s*{|\bcolor:\s*)/,
    rust: /(\bfn\b|\blet\b|\bmut\b|\bimpl\b|->\s*\w+)/,
    cpp: /(#include|std::|cout\s*<<|->\s*\w+)/,
    java: /(public\s+class|System\.out\.println|\bvoid\b\s+\w+\s*\()/,
    go: /(\bfunc\b|\bpackage\b|:=|fmt\.Println)/,
    php: /(<\?php|\$\w+\s*=|echo\s+)/,
    sql: /(\bSELECT\b|\bFROM\b|\bWHERE\b|\bJOIN\b)/,
    shell: /(^\s*#!|\$\w+|mkdir\s+|cd\s+)/,
    json: /^\s*[{[]/,
    yaml: /(^[\w-]+:\s|^- )/,
    markdown: /(^#+|^-{3,}|^\s*\[)/,
    xml: /(<\?xml|<\/?[\w:]+>)/,
    ruby: /(\bdef\b|\bend\b|\bputs\b|:\w+=>)/,
    swift: /(\bfunc\b|\bvar\b|\blet\b|:\s*\w+\s*{)/,
    kotlin: /(\bfun\b|\bval\b|\bvar\b|:\s*\w+\s*[=;])/
  };
  
  const codeLower = code.toLowerCase();
  
  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(codeLower)) {
      return lang;
    }
  }
  
  return 'plaintext';
}

// Export the helper function
export { detectLanguage };

// Export the getThemeColors function too if needed
export { getThemeColors };