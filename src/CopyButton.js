import React, { useState } from 'react';

export function CopyButton({ code, themeColors = {} }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const buttonStyle = {
    background: copied ? (themeColors.success || '#2e7d32') : (themeColors.button || '#3d3d3d'),
    border: 'none',
    color: themeColors.buttonText || '#d4d4d4',
    cursor: 'pointer',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    transition: 'all 0.2s'
  };
  
  return React.createElement('button', {
    onClick: handleCopy,
    title: copied ? 'Copied!' : 'Copy code',
    style: buttonStyle,
    onMouseEnter: (e) => {
      if (!copied) {
        e.currentTarget.style.background = themeColors.buttonHover || '#4d4d4d';
      }
    },
    onMouseLeave: (e) => {
      if (!copied) {
        e.currentTarget.style.background = themeColors.button || '#3d3d3d';
      }
    }
  }, copied ? '✓' : '📋');
}