# Quiz Application - Frontend Assignment

🔗 **Live Demo**: [Your Vercel URL Here]
🔗 **GitHub Repository**: https://github.com/Fazlur4471/quiz-app

## 🎯 Overview

A beautiful, interactive quiz application built with React, TypeScript, and Tailwind CSS. Features smooth animations, progress tracking, and a delightful user experience.

## ✨ Features Implemented

- ✅ **Pixel-perfect design** matching Figma specifications
- ✅ **Smooth page transitions** with crossfade effects
- ✅ **Interactive hover effects** on all options
- ✅ **Animated progress bar** showing quiz completion
- ✅ **Cat paw mascot** with opening/closing animation
- ✅ **Selected state highlighting** with yellow border
- ✅ **Hover state** with pink border
- ✅ **Navigation controls** (previous/next)
- ✅ **Submit functionality** with validation
- ✅ **Results screen** with animated score reveal
- ✅ **Gradient background** with floating animations
- ✅ **Fully accessible** with WCAG 2.1 compliance
- ✅ **TypeScript** for type safety
- ✅ **Responsive animations** using Framer Motion

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/quiz-app.git
cd quiz-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

## 🎨 Key Implementation Details

### Animations
- Page transitions use Framer Motion's `AnimatePresence` with crossfade
- Cat paw opens/closes every 1.5 seconds using `useEffect`
- Hover effects scale buttons by 2% on hover
- Submit triggers a zoom-out transition to results screen
- Score appears with spring animation

### State Management
- Quiz progress tracked with `currentQuestion` state
- Selected answers stored in array
- Hover states managed per-option
- Transition states prevent rapid clicking

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus states on all buttons
- Proper heading hierarchy

### Styling
- Gradient background: `from-blue-200 via-cyan-200 to-blue-300`
- Card shadow: `shadow-2xl` with custom values
- Selected border: `#fbbf24` (yellow)
- Hover border: `#ec4899` (pink)
- Progress bars: `#1e3a8a` (dark blue)

## 📁 Project Structure

```
quiz-app/
├── src/
│   ├── App.tsx           # Main quiz component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Features Breakdown

### Question Navigation
- Previous/Next arrows with disable states
- Progress bar fills as user advances
- Smooth transitions between questions

### Option Selection
- Click to select (yellow border)
- Hover for preview (pink border)
- Only one option selectable per question

### Submit & Results
- Submit button only on last question
- Disabled until option selected
- Animated transition to results
- Score calculated from correct answers

## ⏱️ Time Spent

Approximately **8 hours** breakdown:
- Setup & Configuration: 30 mins
- Component Development: 3 hours
- Animations & Interactions: 2 hours
- Styling & Polish: 1.5 hours
- Testing & Bug Fixes: 1 hour

## 🤔 Assumptions Made

- Desktop-first design (1440px optimal width)
- Modern browser support (Chrome, Firefox, Safari)
- No backend required (client-side only)
- Quiz data hardcoded (easily adaptable for API)
- Score shown as count (not percentage)

## 🚀 Deployment

Deployed on **Vercel** for optimal performance:
- Automatic builds from GitHub
- CDN distribution
- Instant cache invalidation
- Zero-config deployment

## 📝 Git Commit History

This project follows conventional commits:
- `feat:` - New features
- `style:` - Styling updates
- `fix:` - Bug fixes
- `refactor:` - Code improvements
- `docs:` - Documentation

## 🎓 Learning Outcomes

- Advanced Framer Motion animations
- Complex state management in React
- TypeScript best practices
- Tailwind CSS custom configurations
- Git workflow for professional projects

## 📧 Contact

**Your Name**
- Email: slmfazlur@gmail.com
- GitHub: (https://github.com/Fazlur4471)
- LinkedIn: (https://www.linkedin.com/in/fazlur-rehman-137933211/)

---

Built with ❤️ for Frontend Developer Intern Assignment
