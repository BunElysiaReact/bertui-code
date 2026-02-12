// TOP OF EVERY FILE - NO EXCEPTIONS!
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import React from 'react';

export function InlineCode({ children, theme }) {
  return React.createElement('code', {
    className: 'bertui-inline-code',
    'data-theme': theme,
    style: {
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: 'Menlo, Monaco, monospace',
      fontSize: '0.9em'
    }
  }, children);
}