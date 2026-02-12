// TOP OF EVERY FILE - NO EXCEPTIONS!
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import React from 'react';
import { CopyButton } from './CopyButton.js';

export function Code({ 
  children, 
  language = 'javascript',
  showLineNumbers = false,
  showCopyButton = true,
  className = '',
  theme
}) {
  const lines = children.split('\n');
  const lineCount = lines.length;
  
  return React.createElement('div', {
    className: `bertui-code ${className}`,
    'data-theme': theme,
    style: {
      borderRadius: '8px',
      fontFamily: 'Menlo, Monaco, monospace',
      fontSize: '14px',
      margin: '1rem 0',
      overflow: 'hidden'
    }
  }, [
    React.createElement('div', {
      key: 'header',
      className: 'bertui-code-header',
      style: {
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, [
      React.createElement('span', {
        key: 'language',
        className: 'bertui-code-language',
        style: {
          fontSize: '12px',
          fontWeight: '500'
        }
      }, language),
      showCopyButton && React.createElement(CopyButton, {
        key: 'copy',
        code: children
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
        className: 'bertui-line-numbers',
        style: {
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
        className: 'bertui-code-pre',
        style: {
          margin: 0,
          padding: '0 16px',
          flex: 1,
          overflowX: 'auto'
        }
      }, React.createElement('code', {
        className: `language-${language}`,
        style: {
          background: 'transparent',
          fontFamily: 'inherit'
        }
      }, children))
    ].filter(Boolean))
  ]);
}

export function detectLanguage(code) {
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