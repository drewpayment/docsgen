# 🚀 sv Documentation Generator

[![Svelte](https://img.shields.io/badge/Svelte-4.0.0-orange?logo=svelte)](https://svelte.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

✨ A modern documentation generator built with SvelteKit, featuring:

- 🎨 Themeable Markdown rendering
- 🔍 Full-text search capabilities
- 🌓 Dark/light mode toggle
- 📱 Mobile-responsive layout
- 🧩 Component-driven architecture

## 📋 Table of Contents
- [Getting Started](#🚀-getting-started)
- [Development](#🛠️-development)
- [Deployment](#🚢-deployment)
- [Contributing](#🤝-contributing)
- [License](#📄-license)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
npx sv create my-docs
cd my-docs
npm install
```

## 🛠️ Development

Start your dev server with hot reload:
```bash
npm run dev

# Or launch with browser auto-open
npm run dev -- --open
```

Project structure:
```
📁 my-docs/
├── 📁 src/              # Source files
├── 📁 static/           # Static assets
├── 📄 svelte.config.js  # Build config
└── 📄 package.json      # Dependencies
```

## 🚢 Deployment

1. Build production assets:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

3. Deploy using your preferred adapter:
```bash
npm install @sveltejs/adapter-static
```

## 🤝 Contributing

We 💛 community contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Issue reporting process
- Pull request workflow

## 📄 License

MIT © 2025 [Your Name Here](https://github.com/yourusername)

---

🐛 Found an issue? [Let us know!](https://github.com/yourusername/sv/issues)
