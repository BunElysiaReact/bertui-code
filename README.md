# 📁 **README.md - v1.0.1 Release**

# 🎨 bertui-code

**Zero-config syntax highlighting for React. Built exclusively for the BertUI ecosystem.**

[![BertUI Compatible](https://img.shields.io/badge/BertUI-Compatible-10b981)](https://bertui.dev)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.1-blue)](package.json)

The simplest way to add beautiful, functional code blocks to your BertUI applications. Dark theme by default, copy button included, zero configuration required.

> ⚠️ **BertUI Compatibility Note:** bertui-code v1.0.1 is tested with BertUI's strict transpiler. See the [BertUI Compatibility](#-bertui-compatibility) section for details.

## ✨ Features

- **Zero-config by default** - Just wrap your code
- **Multiple themes** - Dark, light, pink + custom colors
- **Built-in copy button** - One click to copy any code
- **Line numbers** - Optional, beautifully aligned
- **Inline code snippets** - Perfect for documentation
- **20+ language support** - Auto-detection included
- **Multi-variant tabs** - Toggle between npm/pnpm/bun/yarn and more
- **Zero dependencies** - Except React (peer dependency)
- **BertUI-certified** - Tested with BertUI's strict transpiler

## 📦 Installation


bun add bertui-code@1.0.1
# or
npm install bertui-code@1.0.1
# or  


## 🚀 Quick Start


import { Code, InlineCode, CodeVariants, CodeVariant } from 'bertui-code';

// Basic code block
<Code>
  const hello = "world";
  console.log(hello);
</Code>

// With line numbers
<Code showLineNumbers>
  function calculate(a, b) {
    return a + b;
  }
</Code>

// Package manager variants (NEW in v1.0.1!)
<CodeVariants>
  <CodeVariant label="npm">npm install bertui-code</CodeVariant>
  <CodeVariant label="pnpm">pnpm add bertui-code</CodeVariant>
  <CodeVariant label="bun">bun add bertui-code</CodeVariant>
  <CodeVariant label="yarn">yarn add bertui-code</CodeVariant>
</CodeVariants>

// Inline code
<p>
  Use the <InlineCode>useState</InlineCode> hook for state management.
</p>
```

---

## 🎯 **NEW IN v1.0.1: Multi-Variant Code Blocks**

Toggle between different versions of the same code snippet with zero config:


<CodeVariants theme="dark" defaultVariant="bun">
  <CodeVariant label="npm">npm run dev</CodeVariant>
  <CodeVariant label="pnpm">pnpm dev</CodeVariant>
  <CodeVariant label="bun">bun dev</CodeVariant>
  <CodeVariant label="yarn">yarn dev</CodeVariant>


**Features:**
- ✅ Auto-generates tabs from labels
- ✅ Theme-aware styling (dark/light/pink)
- ✅ Sticky tabs for long docs (`stickyTabs={true}`)
- ✅ Configurable tab position (`tabPosition="bottom"`)
- ✅ Keyboard accessible, ARIA compliant

---

## ⚠️ **BertUI Compatibility (CRITICAL)**

bertui-code v1.0.1 is **certified for BertUI's strict transpiler**. Follow these rules and it will **never crash**:


// ✅ GOOD - BertUI never looks inside string variables
const myCode = 
'function hello(name) {\n' +
'  return "Hello " + name + "!";\n' +
'}';

<Code>{myCode}</Code>

// ✅ GOOD - Even JSX/TypeScript works in strings!
const tsCode = 
'interface User {\n' +
'  id: string;\n' +
'  name: string;\n' +
'}\n';

<Code language="typescript">{tsCode}</Code>


### ❌ **NEVER: Use template literals in JSX (ALWAYS CRASHES)**

// ❌ BAD - BertUI WILL crash with "Expected } but found :"
<Code>
  {`function hello() {
    return "world";
  }`}
</Code>
```

### ✅ **DO: Use React.createElement pattern**

// ✅ GOOD - Works in BertUI
import React from 'react';

export default function Page() {
  return React.createElement(Code, {
    language: 'javascript',
    showLineNumbers: true
  }, 'const x = 1;');



// ✅ GOOD - Always use ={true}
<CodeVariants stickyTabs={true}>

// ❌ BAD - BertUI crashes on shorthand


### 📋 **BertUI Compatibility Checklist**

| Pattern | Status | Why |
|---------|--------|-----|
| `const code = '...'` | ✅ **SAFE** | Strings are opaque to BertUI |
| `` <Code>{`code`}</Code> `` | ❌ **CRASH** | BertUI parses template literal content |
| `language="typescript"` | ⚠️ **MAY CRASH** | Only safe if code is in string variable |
| `stickyTabs={true}` | ✅ **SAFE** | Explicit value works |
| `stickyTabs` | ❌ **CRASH** | Shorthand props not supported |
| `React.createElement` | ✅ **SAFE** | No JSX transform needed |

---

## 🎨 **Themes & Colors**

### Built-in Themes
```jsx
<Code theme="dark">   // Default
<Code theme="light">  // Light mode
<Code theme="pink">   // Pink mode
```

### Custom Colors

<Code 
  colors={{
    background: '#0a0a0a',
    text: '#00ff00',
    header: '#1a1a1a',
    border: '#00ff00',
    meta: '#00ff00',
    button: '#00ff00'
  }}
>
  // Custom hacker theme
</Code>

---

## 📖 **API Reference**

### `<Code />` Component
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **Required** | The code to display |
| `language` | `string` | `'javascript'` | Programming language |
| `theme` | `'dark' \| 'light' \| 'pink'` | `'dark'` | Color theme |
| `colors` | `Object` | `{}` | Custom color overrides |
| `showLineNumbers` | `boolean` | `false` | Show line numbers |
| `showCopyButton` | `boolean` | `true` | Show copy button |
| `className` | `string` | `''` | Additional CSS classes |

### `<CodeVariants />` Component (NEW)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `CodeVariant[]` | **Required** | Array of variants |
| `theme` | `'dark' \| 'light' \| 'pink'` | `'dark'` | Color theme |
| `defaultVariant` | `number \| string` | `0` | Default tab by index or label |
| `stickyTabs` | `boolean` | `false` | Make tabs sticky on scroll |
| `tabPosition` | `'top' \| 'bottom'` | `'top'` | Tab bar position |
| `showCopyButton` | `boolean` | `true` | Show copy button |
| `colors` | `Object` | `{}` | Custom colors for code |
| `tabColors` | `Object` | `{}` | Custom colors for tabs |

### `<CodeVariant />` Component (NEW)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **Required** | The code for this variant |
| `label` | `string` | **Required** | Tab label (npm, pnpm, etc) |
| `language` | `string` | `'javascript'` | Language for this variant |
| `showLineNumbers` | `boolean` | `false` | Show line numbers |

### `<InlineCode />` Component
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **Required** | The inline code |
| `theme` | `'dark' \| 'light' \| 'pink'` | `'dark'` | Color theme |

---

## 💡 **Best Practices for BertUI**

### 1. **Store all code examples in string variables**

// code-examples.js
export const npmExample = 'npm install bertui-code';
export const jsExample = 
'function add(a, b) {\n' +
'  return a + b;\n' +
'}';

// page.jsx
import { jsExample } from './code-examples.js';
<Code>{jsExample}</Code>


### 2. **Use string concatenation for readability**

const longCode = 
'import React from "react";\n' +
'\n' +
'export function Button({ children }) {\n' +
'  return (\n' +
'    <button className="btn">\n' +
'      {children}\n' +
'    </button>\n' +
'  );\n' +
'}\n';


### 3. **Keep TypeScript in .ts files**

// ✅ GOOD - In a .ts file
export const tsCode = 'const name: string = "John";';

// ❌ BAD - In a .jsx file
const tsCode = 'const name: string = "John";'; // BertUI may crash!


### 4. **Test your code blocks**

// test-page.jsx - Create a test page to verify BertUI compatibility
import { Code } from 'bertui-code';
const testCode = 'console.log("Hello BertUI!");';

export default function TestPage() {
  return React.createElement(Code, {}, testCode);
}


---

## 📚 **Examples**

### Package Manager Installers

<CodeVariants theme="dark" defaultVariant="bun">
  <CodeVariant label="npm">npm install bertui-code</CodeVariant>
  <CodeVariant label="pnpm">pnpm add bertui-code</CodeVariant>
  <CodeVariant label="bun">bun add bertui-code</CodeVariant>
  <CodeVariant label="yarn">yarn add bertui-code</CodeVariant>
</CodeVariants>


### Language Comparison

<CodeVariants theme="light">
  <CodeVariant label="JavaScript" language="javascript">
    {javascriptExample}
  </CodeVariant>
  <CodeVariant label="TypeScript" language="typescript">
    {typescriptExample}
  </CodeVariant>
  <CodeVariant label="Python" language="python">
    {pythonExample}
  </CodeVariant>
</CodeVariants>


### API Examples

<CodeVariants theme="dark" tabPosition="bottom" stickyTabs={true}>
  <CodeVariant label="cURL" language="bash">{curlExample}</CodeVariant>
  <CodeVariant label="fetch" language="javascript">{fetchExample}</CodeVariant>
  <CodeVariant label="axios" language="javascript">{axiosExample}</CodeVariant>
</CodeVariants>


---

## 🐛 **Known Issues & Workarounds**

### Issue: BertUI crashes with `Expected "}" but found ":"`
**Cause:** TypeScript syntax in .jsx file or template literal in JSX
**Fix:** Move code to string variable outside component

### Issue: React/jsx-dev-runtime not found
**Cause:** BertUI doesn't support React 18 automatic JSX runtime
**Fix:** Use `React.createElement` or add `/** @jsx React.createElement */`

### Issue: Shorthand props crash
**Cause:** BertUI doesn't support `{stickyTabs}` shorthand
**Fix:** Always use `stickyTabs={true}`

---

## 📦 **Project Structure**

bertui-code/
├── src/
│   ├── Code.js           # Main code block component
│   ├── CodeVariants.js   # Multi-variant tabs (NEW)
│   ├── CodeVariant.js    # Individual variant (NEW)
│   ├── CopyButton.js     # Copy button component
│   ├── InlineCode.js     # Inline code component
│   ├── ThemeProvider.js  # Theme context (optional)
│   └── index.js          # Main exports
├── dist/                 # Built files
├── package.json          # v1.0.1
└── README.md            # You are here


---

## 🤝 **Compatibility**

- **BertUI**: ✅ v1.0.1 certified - Tested with strict transpiler
- **React**: ✅ 18.0.0+ (peer dependency)
- **Browsers**: ✅ Chrome, Firefox, Safari, Edge
- **Bun**: ✅ Recommended package manager

---

## 📄 **License**

MIT © Pease Ernest

---

<div align="center">
  <p>
    <strong>Part of the BertUI ecosystem</strong><br/>
    Built with ❤️ for developers who value simplicity and speed
  </p>
  
  <p>
    <a href="https://github.com/yourusername/bertui-code">GitHub</a> •
    <a href="https://npmjs.com/package/bertui-code">npm</a> •
    <a href="#-bertui-compatibility">BertUI Compatibility</a>
  </p>
  
  <p>
    <sub>v1.0.1 • Zero-config • BertUI-certified</sub>
  </p>
</div>
```

