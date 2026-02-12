// TOP OF EVERY FILE - NO EXCEPTIONS!
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import React, { useState, Children, isValidElement } from 'react';
import { Code } from './Code.js';

export function CodeVariants({ 
  children, 
  theme = 'dark',
  showCopyButton = true,
  className = '',
  defaultVariant = 0,
  stickyTabs = false,
  tabPosition = 'top'
}) {
  const variants = Children.toArray(children).filter(
    child => isValidElement(child) && child.type?.isCodeVariant
  );
  
  if (variants.length === 0) {
    return React.createElement(Code, {
      theme,
      showCopyButton,
      className,
      children
    });
  }
  
  if (variants.length === 1) {
    const variant = variants[0];
    return React.createElement(Code, {
      theme,
      showCopyButton,
      className,
      language: variant.props.language || 'javascript',
      showLineNumbers: variant.props.showLineNumbers || false,
      children: variant.props.children
    });
  }
  
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof defaultVariant === 'number') {
      return Math.min(defaultVariant, variants.length - 1);
    }
    if (typeof defaultVariant === 'string') {
      const index = variants.findIndex(v => v.props.label === defaultVariant);
      return index !== -1 ? index : 0;
    }
    return 0;
  });
  
  const activeVariant = variants[activeIndex];
  const { 
    children: code, 
    language = 'javascript',
    showLineNumbers = false
  } = activeVariant.props;
  
  const id = React.useMemo(() => 
    `bertui-variants-${Math.random().toString(36).substr(2, 9)}`, 
  []);
  
  const getTabStyles = (index) => {
    const isActive = index === activeIndex;
    
    const baseStyles = {
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'inherit',
      borderRadius: '4px 4px 0 0'
    };
    
    if (isActive) {
      return {
        ...baseStyles,
        background: 'var(--bertui-tab-active, #1e1e1e)',
        color: 'var(--bertui-tab-active-text, #ffffff)',
        borderBottom: '2px solid var(--bertui-tab-accent, #3b82f6)'
      };
    }
    
    return {
      ...baseStyles,
      background: 'transparent',
      color: 'var(--bertui-tab-inactive, #858585)',
      borderBottom: '2px solid transparent'
    };
  };
  
  const tabs = React.createElement('div', {
    key: 'tabs',
    role: 'tablist',
    'aria-label': 'Code variants',
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      padding: '12px 16px',
      background: 'var(--bertui-tab-bar, #2d2d2d)',
      borderBottom: tabPosition === 'top' ? '1px solid var(--bertui-border, #3d3d3d)' : 'none',
      borderTop: tabPosition === 'bottom' ? '1px solid var(--bertui-border, #3d3d3d)' : 'none',
      position: stickyTabs ? 'sticky' : 'relative',
      top: stickyTabs && tabPosition === 'top' ? 0 : 'auto',
      bottom: stickyTabs && tabPosition === 'bottom' ? 0 : 'auto',
      zIndex: stickyTabs ? 10 : 'auto'
    }
  }, variants.map((variant, index) => {
    const label = variant.props.label || `Option ${index + 1}`;
    const isActive = index === activeIndex;
    
    return React.createElement('button', {
      key: index,
      role: 'tab',
      'aria-selected': isActive,
      'aria-controls': `${id}-panel`,
      id: `${id}-tab-${index}`,
      onClick: () => setActiveIndex(index),
      style: getTabStyles(index),
      onMouseEnter: (e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--bertui-tab-hover, #3d3d3d)';
          e.currentTarget.style.color = 'var(--bertui-tab-active-text, #ffffff)';
        }
      },
      onMouseLeave: (e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--bertui-tab-inactive, #858585)';
        }
      }
    }, label);
  }));
  
  const elements = [];
  
  if (tabPosition === 'top') {
    elements.push(tabs);
  }
  
  elements.push(React.createElement('div', {
    key: 'code',
    id: `${id}-panel`,
    role: 'tabpanel',
    'aria-labelledby': `${id}-tab-${activeIndex}`,
    style: { padding: '4px 0' }
  }, React.createElement(Code, {
    theme,
    showCopyButton,
    className,
    language,
    showLineNumbers,
    children: code
  })));
  
  if (tabPosition === 'bottom') {
    elements.push(tabs);
  }
  
  return React.createElement('div', {
    className: `bertui-code-variants ${className}`,
    'data-theme': theme,
    style: {
      margin: '1rem 0',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid var(--bertui-border, #3d3d3d)',
      background: 'var(--bertui-bg, #1e1e1e)'
    }
  }, elements);
}