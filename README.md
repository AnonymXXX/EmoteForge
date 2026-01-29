# EmoteForge (ResizeEmote)

<div align="center">

  ![Logo](https://resizeemote.com/logo.png)

  **The privacy-focused, browser-based image resizer for Twitch, Discord, and YouTube.**

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AnonymXXX/EmoteForge)
  # [🚀 Try it Live: resizeemote.com](https://resizeemote.com)

</div>

## ✨ Why this tool?

Most online image resizers upload your personal photos to a cloud server to process them. This is slow and bad for privacy.

**ResizeEmote** runs 100% locally in your browser using WebAssembly / HTML5 Canvas. Your images **NEVER** leave your device.

## 🎯 Features

- **Client-Side Processing**: Zero server uploads.
- **Auto-Resizing**:
  - **Twitch**: 112px, 56px, 28px (Auto-generated)
  - **Discord**: 128px (Optimized for Emoji)
  - **YouTube**: 48px
- **Batch Download**: One-click download all sizes as a ZIP file.
- **No Watermarks**: Free forever.

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics 4 (Via `react-ga4`)

## 🚀 Running Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/AnonymXXX/EmoteForge.git
   ```

2. **Install dependencies**
   ```bash
   cd EmoteForge
   pnpm install
   ```

3. **Run the app**
   ```bash
   pnpm dev
   ```  

4. **Open the app**
   ```bash
   http://localhost:3000
   ```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).