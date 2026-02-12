// TOP OF EVERY FILE - NO EXCEPTIONS!
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import React, { useState } from 'react';

export function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
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
  
  return React.createElement('button', {
    onClick: handleCopy,
    className: `bertui-copy-button ${copied ? 'copied' : ''}`,
    title: copied ? 'Copied!' : 'Copy code'
  }, copied ? '✓' : '📋');
}