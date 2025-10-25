# AgroVision Web Application

React 19 + Vite + Tailwind CSS web application for the AgroVision platform.

## Features

- **Modern UI**: Built with React 19 and Tailwind CSS
- **Dark Mode**: Full dark mode support
- **RTL Support**: Arabic language with right-to-left layout
- **i18n**: Multilingual support (English and Arabic)
- **Responsive**: Mobile-first responsive design
- **API Integration**: Connected to FastAPI backend

## Pages

1. **Dashboard**: Farm overview with health scores and quick stats
2. **Field Health**: Detailed analytics with NDVI, soil moisture, and alerts
3. **Market Prices**: Real-time crop pricing and market intelligence
4. **Reports**: Generate and download comprehensive farm reports

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **i18n**: Tolgee React
- **TypeScript**: Full type safety

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_TOLGEE_API_KEY=your-tolgee-key
```

### Development

```bash
npm run dev
```

Access at: http://localhost:5173

### Build

```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Project Structure

```
web/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── FieldHealth.tsx
│   │   ├── MarketPrices.tsx
│   │   └── Reports.tsx
│   ├── services/        # API client
│   │   └── apiClient.ts
│   ├── locales/         # Translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── styles/          # Global styles
│   │   └── index.css
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # Type definitions
├── public/              # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
├── tailwind.config.js  # Tailwind config
└── README.md           # This file
```

## Features

### Dark Mode

Toggle between light and dark themes using the moon/sun icon in the navbar.

### Language Switching

Switch between English and Arabic using the globe icon. Arabic uses RTL layout automatically.

### API Integration

All API calls go through `src/services/apiClient.ts`:

```typescript
import { api } from '@/services/apiClient';

// Example usage
const response = await api.getProfile();
const data = response.data.data;
```

### Authentication

JWT tokens are stored in localStorage and automatically included in API requests.

## Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

### Vercel

```bash
npm run build
vercel deploy --prod
```

## Environment Variables for Production

Set these in your deployment platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API URL | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Yes |
| `VITE_TOLGEE_API_KEY` | Tolgee API key | Optional |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow React best practices
2. Use TypeScript for type safety
3. Follow Tailwind CSS conventions
4. Test in both light and dark modes
5. Test RTL layout with Arabic language

## License

Copyright © 2025 AgroVision. All rights reserved.
