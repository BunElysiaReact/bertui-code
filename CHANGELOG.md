# 📁 **CHANGELOG.md**

# Changelog

## [1.0.1] - 2024-02-12

### ✨ Added
- **New Component:** `<CodeVariants />` - Multi-variant code blocks with tabs
- **New Component:** `<CodeVariant />` - Individual variant for tabbed interface
- **New Feature:** Sticky tabs with `stickyTabs={true}` prop
- **New Feature:** Tab position control with `tabPosition="top"|"bottom"`
- **New Feature:** Default variant selection by index or label
- **Documentation:** BertUI compatibility guide with safe/unsafe patterns
- **Documentation:** String variable pattern recommendation

### 🎨 Improved
- **BertUI Certification:** Full compatibility with BertUI's strict transpiler
- **Build System:** Classic JSX runtime with pragma comments
- **Bundle Size:** Optimized build with splitting and minification
- **Theme System:** Better color inheritance for tab components

### 🐛 Fixed
- **Build Error:** Unterminated string literal in fontFamily prop
- **Export Error:** detectLanguage function now properly exported
- **TypeScript:** Removed all TypeScript syntax from .jsx files
- **React Import:** Added explicit React imports with pragma comments

### 📚 Documentation
- Added BertUI Compatibility section with do/don't examples
- Added string variable pattern recommendation
- Added migration guide from v1.0.0
- Added troubleshooting section

### 🔧 Maintenance
- Version locked to 1.0.1 (stable release)
- Cleaned up unused dependencies
- Added prebuild script for JSX pragma injection
- Verified with BertUI test suite

---

## [1.0.0] - 2024-02-10

### ✨ Initial Release
- Basic `<Code />` component with syntax highlighting
- `<InlineCode />` component
- Dark/light/pink themes
- Copy button with feedback
- Line numbers
- 20+ language auto-detection
- Custom color overrides
