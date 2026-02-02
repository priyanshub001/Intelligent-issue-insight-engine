# Intelligent Issue System

A modern issue tracking and management system with AI-powered categorization and percentage-based priority system.

## Features

- **User Interface**: Chat-based issue submission
- **Admin Dashboard**: Complete overview with analytics
- **Priority System**: Percentage-based (0-100%) instead of P1/P2/P3
- **Auto-categorization**: Automatic issue classification
- **Analytics**: Visual charts and insights

## Priority Levels

- **Critical**: 80%+ (Red)
- **High**: 60-79% (Orange)
- **Medium**: 40-59% (Yellow)
- **Low**: <40% (Green)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Admin Login

- **Username**: admin
- **Password**: admin123

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts (for charts)
- Lucide React (for icons)

## Project Structure

```
issue-system/
├── src/
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## How It Works

1. **User submits issue** via chat interface
2. **System analyzes** text and assigns:
   - Category (Network, Facilities, Academic, Admin, IT Support)
   - Priority percentage (based on urgency keywords)
   - Keywords
   - Sentiment score
3. **Issue is created** and visible in admin dashboard
4. **Admin can filter** by category, priority, status

## Priority Calculation

Priority is calculated based on keyword analysis:
- Urgent keywords (+15% each): urgent, critical, emergency, asap, deadline, broken, error
- High keywords (+8% each): important, need, problem, issue, cannot, not working
- Normal keywords (-5% each): how, help, request, question

Base priority starts at 50% and is capped between 20% and 95%.
