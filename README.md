# Frontier Admin Control Demo

A demo implementation of the Frontier Admin Control for M365 Admin Center.

## Features

- Built with React and TypeScript
- Uses Fluent UI components (Microsoft's official design system)
- Responsive design matching M365 Admin Center style
- Three access control options:
  - No access
  - All users
  - Specific user groups

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontier-admin-control/
├── src/
│   ├── App.tsx          # Main component with Frontier Admin Control
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Technologies Used

- React 19
- TypeScript 5
- Vite 7
- Fluent UI React Components 9
