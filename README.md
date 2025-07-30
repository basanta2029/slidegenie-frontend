# SlideGenie Frontend

A modern Next.js 14+ application for creating academic presentations with AI assistance.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your configuration

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
slidegenie-frontend/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth routes group
│   ├── (dashboard)/       # Dashboard routes group
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── layouts/          # Layout components
│   └── providers.tsx     # App providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── api-client.ts    # API client setup
│   ├── utils.ts         # Helper utilities
│   └── validations.ts   # Zod schemas
├── store/               # Zustand stores
├── types/               # TypeScript types
├── config/              # App configuration
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript check

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 🧩 Pre-built components with shadcn/ui
- 🔐 Authentication system ready
- 📊 Data fetching with React Query
- 📝 Form handling with React Hook Form
- 🎭 Beautiful animations with Framer Motion
- 🌙 Dark mode support
- 📱 Mobile-first design
- ⚡ Optimized performance

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

[MIT License](LICENSE)