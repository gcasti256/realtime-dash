# Realtime Dash

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-22b5bf)
![License](https://img.shields.io/badge/License-MIT-green)

A real-time data visualization dashboard built with React, TypeScript, and Recharts. Features live-updating widgets for crypto markets, weather, GitHub activity, and system metrics -- all driven by mock data generators that simulate streaming feeds.

---

## Screenshots

| Desktop (2x2 grid) | Mobile (single column) |
|---------------------|------------------------|
| *screenshot here*   | *screenshot here*      |

---

## Features

- **Live Data** -- Widgets refresh every 3 seconds with smoothly drifting mock values
- **Crypto Markets** -- BTC, ETH, SOL prices with a dual-line chart
- **Weather** -- Temperature and humidity area chart with current conditions
- **GitHub Activity** -- Commits, PRs, issues, stars, and a weekly bar chart
- **System Metrics** -- CPU, memory, disk, and network with color-coded progress bars
- **Dark Theme** -- Purpose-built dark UI with a refined color hierarchy
- **Responsive** -- CSS Grid layout collapses from 2x2 to single column on mobile
- **Refresh** -- Header button resets all widgets and regenerates data

---

## Tech Stack

| Layer        | Technology                |
|--------------|---------------------------|
| Framework    | React 19                  |
| Language     | TypeScript 5              |
| Build Tool   | Vite 6                    |
| Charts       | Recharts                  |
| Date Utility | date-fns                  |
| Styling      | Vanilla CSS (custom props) |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install and Run

```bash
# Clone the repo
git clone <your-repo-url> realtime-dash
cd realtime-dash

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # serves the dist/ folder locally
```

---

## Project Structure

```
realtime-dash/
├── public/
├── src/
│   ├── components/
│   │   ├── DashboardHeader.tsx
│   │   └── widgets/
│   │       ├── CryptoWidget.tsx
│   │       ├── WeatherWidget.tsx
│   │       ├── GithubWidget.tsx
│   │       └── SystemWidget.tsx
│   ├── lib/
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## License

MIT
