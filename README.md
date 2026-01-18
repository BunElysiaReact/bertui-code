# 🎨 bertui-code

**Zero-config syntax highlighting for React. Built exclusively for the BertUI ecosystem.**

[![BertUI Compatible](https://img.shields.io/badge/BertUI-Compatible-10b981)](https://bertui.dev)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

The simplest way to add beautiful, functional code blocks to your BertUI applications. Dark theme by default, copy button included, zero configuration required.

> ⚠️ **BertUI Compatibility Note:** bertui-code is built specifically for BertUI's build system. It uses ES modules and works with BertUI's transpiler. Some advanced JavaScript features may need workarounds in BertUI's JSX files.

## ✨ Features

- **Zero-config by default** - Just wrap your code
- **Multiple themes** - Dark, light, pink + custom colors
- **Built-in copy button** - One click to copy any code
- **Line numbers** - Optional, beautifully aligned
- **Inline code snippets** - Perfect for documentation
- **20+ language support** - Auto-detection included
- **BertUI-exclusive** - Optimized for BertUI's build system
- **Zero dependencies** - Except React (peer dependency)
- **Accessible** - Proper ARIA labels, keyboard navigation

## 📦 Installation

```bash
bun add bertui-code
```

## 🚀 Quick Start

```jsx
import { Code, InlineCode } from 'bertui-code';

// Basic usage (zero config!)
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

// Inline code in paragraphs
<p>
  Use the <InlineCode>useState</InlineCode> hook for state management.
</p>
```

## ⚠️ BertUI Compatibility Notes

BertUI's transpiler is lightweight and fast, but has some limitations. Here are workarounds for common issues:

### ✅ **DO: Use simple strings in JSX**
```jsx
// ✅ GOOD - Plain strings work perfectly
<Code>
  console.log("Hello BertUI!");
</Code>

// ✅ GOOD - Pre-defined variables
const myCode = 'function test() {\n  return "works";\n}';
<Code>{myCode}</Code>
```

### ❌ **AVOID: Complex template literals in JSX**
```jsx
// ❌ BAD - BertUI may freak out with nested backticks
<Code>
  {`function test() {
    return \`template literal\`;
  }`}
</Code>

// ✅ GOOD - Escape properly or use variables
const code = 'function test() {\n  return `template literal`;\n}';
<Code>{code}</Code>
```

### ✅ **Best Practice: Store code in variables**
```jsx
// Store complex code in variables
const exampleCode = `function complex() {
  const data = { key: "value" };
  return \`Template: \${data.key}\`;
}`;

// Then use in JSX
<Code>{exampleCode}</Code>
```

## 🎨 Themes & Colors

### Built-in Themes

```jsx
// Dark (default)
<Code theme="dark">console.log("Dark theme");</Code>

// Light
<Code theme="light">// Perfect for docs</Code>

// Pink
<Code theme="pink">// For pink lovers! 🎀</Code>
```

### Custom Colors

```jsx
<Code
  theme="custom"
  colors={{
    background: '#0a0a0a',
    text: '#00ff00',
    header: '#1a1a1a',
    border: '#00ff00',
    meta: '#00ff00',
    button: '#00ff00',
    buttonText: '#0a0a0a',
    success: '#00ff00'
  }}
>
  // Custom hacker theme
</Code>
```

## 📖 API Reference

### `<Code />` Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **Required** | The code to display |
| `language` | `string` | `'javascript'` | Programming language (`'auto'` for detection) |
| `theme` | `'dark' \| 'light' \| 'pink' \| 'custom'` | `'dark'` | Color theme |
| `colors` | `Object` | `{}` | Custom colors for `theme="custom"` |
| `showLineNumbers` | `boolean` | `false` | Show line numbers |
| `showCopyButton` | `boolean` | `true` | Show copy-to-clipboard button |
| `className` | `string` | `''` | Additional CSS classes |

### `<InlineCode />` Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **Required** | The inline code |
| `theme` | `'dark' \| 'light' \| 'pink'` | `'dark'` | Color theme |

### `detectLanguage(code: string): string`

Utility function to detect programming language from code content.

## 🌐 Language Support

bertui-code supports **20+ programming languages** with auto-detection:

- **Web**: JavaScript, TypeScript, JSX, HTML, CSS, JSON
- **Backend**: Python, Ruby, PHP, Java, Go, Rust, C, C++, C#
- **Data**: SQL, YAML, XML
- **Shell**: Bash, Shell, PowerShell
- **Other**: Markdown, Swift, Kotlin, Dart

```jsx
// Auto-detection
<Code language="auto">
  def hello():
      print("Auto-detected as Python!")
</Code>

// Manual specification
<Code language="rust">
  fn main() {
      println!("Hello Rust!");
  }
</Code>
```

## 🔧 Advanced Usage Examples

### Documentation Page (BertUI-safe)
```jsx
import React from 'react';
import { Code, InlineCode } from 'bertui-code';

// Store code in variables (BertUI-safe pattern)
const apiExample = 'function fetchData(url) {\n  return fetch(url).then(r => r.json());\n}';

const errorHandling = `interface Result<T> {
  data: T | null;
  error: string | null;
}

async function getUser(): Promise<Result<User>> {
  try {
    const response = await fetch('/api/user');
    return { data: await response.json(), error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}`;

export default function Documentation() {
  return (
    <article style={{ padding: '2rem' }}>
      <h1>API Reference</h1>
      
      <p>
        Import the component: <InlineCode>import {'{ Code }'} from 'bertui-code'</InlineCode>
      </p>
      
      <h2>Basic Example</h2>
      <Code showLineNumbers>
        {apiExample}
      </Code>
      
      <h2>Error Handling</h2>
      <Code language="typescript" theme="light">
        {errorHandling}
      </Code>
    </article>
  );
}
```

### Interactive Component (BertUI-safe)
```jsx
import React, { useState } from 'react';
import { Code } from 'bertui-code';

export default function InteractiveDemo() {
  const [theme, setTheme] = useState('dark');
  
  // Store dynamic code in variable
  const dynamicCode = `// Current theme: ${theme}
const user = {
  name: "Developer",
  preferences: {
    theme: "${theme}",
    timestamp: new Date().toISOString()
  }
};

console.log(\`Hello \${user.name}!\`);`;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Select Theme: 
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="pink">Pink</option>
          </select>
        </label>
      </div>
      
      <Code theme={theme} showLineNumbers>
        {dynamicCode}
      </Code>
    </div>
  );
}
```

## 🛠️ Troubleshooting BertUI Issues

### Problem: "Unexpected return" or compilation errors
**Solution:** BertUI's transpiler sometimes struggles with:
- Nested template literals in JSX
- Complex string interpolation
- Certain JavaScript syntax in JSX attributes

**Workaround:**
```jsx
// ❌ Problematic
<Code>
  {`function test() {
    return \`Complex \${expression}\`;
  }`}
</Code>

// ✅ Solution - Use variables
const safeCode = 'function test() {\n  return `Complex ${expression}`;\n}';
<Code>{safeCode}</Code>
```

### Problem: Import not working
**Solution:** Make sure:
1. Package is installed : `bun install  bertui-code`
2. BertUI restarted after installing 
3. No cache issues: `rm -rf .bertui` then restart

### Problem: Colors not applying
**Solution:** Ensure custom colors object has all required properties:
```jsx
// Complete custom colors object
colors={{
  background: '#...',
  text: '#...',
  header: '#...',
  border: '#...',
  meta: '#...',
  button: '#...',
  buttonHover: '#...',
  buttonText: '#...',
  success: '#...'
}}
```

## 📁 Project Structure

```
bertui-code/
├── src/
│   ├── Code.js          # Main component (BertUI-safe JS)
│   ├── CopyButton.js    # Copy button component
│   ├── InlineCode.js    # Inline code component
│   └── index.js         # Main exports
├── dist/
│   └── index.js         # Built bundle (ES module)
├── package.json
└── README.md
```

## 🤝 Compatibility

- **BertUI**: ✅ Fully compatible (built specifically for BertUI)
- **React**: ✅ 18.0.0+ (peer dependency)
- **Browsers**: ✅ Chrome, Firefox, Safari, Edge (modern)
- **Other Frameworks**: ❌ Not compatible (BertUI-exclusive optimizations)

## 📄 License

MIT © Pease Ernest

---

<div align="center">
  <p>
    <strong>Part of the BertUI ecosystem</strong><br/>
    Built with ❤️ for developers who value simplicity and beauty
  </p>
  
  <p>
    <a href="https://bertui-docswebsite.pages.dev/">BertUI Website</a> •
    <a href="https://github.com/BunElysiaReact/bertui-code.git">GitHub</a> •
    <a href="https://npmjs.com/package/bertui-code">npm</a>
  </p>
</div>
```

