# BrandForge AI 🚀

> **The most powerful AI branding suite for founders, designers, and marketers.**  
> Generate complete brand identities — logos, slogans, color palettes, typography & more — in under 5 seconds.

![BrandForge AI Banner](https://res.cloudinary.com/demo/image/upload/brandforge-banner.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brandforge-ai)

---

## ✨ Features

### 6 Powerful AI Tools
| Tool | Description |
|------|-------------|
| 🎨 **AI Logo Generator** | Detailed Midjourney/DALL-E ready logo prompts |
| 💬 **Slogan Generator** | 8+ memorable brand slogans |
| 🎨 **Color Palette Generator** | 3 complete palettes with HEX codes |
| ✍️ **Typography Suggestions** | 2 curated font pairings with rationale |
| 💡 **Brand Name Ideas** | 10 creative, domain-friendly alternatives |
| 📱 **Social Media Ideas** | Platform-specific branding concepts |

### Authentication
- ✅ Google OAuth login (one-click)
- ✅ Email/password signup
- ✅ Protected dashboard routes via middleware
- ✅ Persistent sessions with Supabase
- ✅ Secure server-side auth

### Dashboard
- ✅ Beautiful premium sidebar navigation
- ✅ Generation history & saved logos library
- ✅ Favorite logos system
- ✅ Brand kits organizer
- ✅ User profile management
- ✅ Subscription & billing page
- ✅ Settings with notification preferences
- ✅ Credits usage tracker

### Design System
- ✅ Apple + Linear + Stripe inspired dark theme
- ✅ Glassmorphism cards
- ✅ Purple/blue gradient glows
- ✅ Framer Motion animations
- ✅ Smooth page transitions
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Error states & 404 page
- ✅ Fully responsive (mobile, tablet, desktop)

### Mobile
- ✅ Bottom navigation bar
- ✅ Touch-friendly UI
- ✅ Responsive grids
- ✅ Mobile-optimized dashboard

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Auth + DB** | Supabase |
| **AI** | Groq (Llama 3.3 70B) |
| **Image Storage** | Cloudinary |
| **Deployment** | Vercel |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Toasts** | react-hot-toast |

---

## 📁 Folder Structure

```
brandforge-ai/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   ├── signup/page.tsx      # Signup page
│   │   └── layout.tsx           # Auth layout
│   ├── dashboard/
│   │   ├── page.tsx             # Dashboard home
│   │   ├── generate/page.tsx    # AI generator
│   │   ├── saved/page.tsx       # Saved logos
│   │   ├── brand-kits/page.tsx  # Brand kits
│   │   ├── profile/page.tsx     # User profile
│   │   ├── settings/page.tsx    # Settings
│   │   ├── billing/page.tsx     # Billing
│   │   ├── layout.tsx           # Dashboard layout
│   │   ├── loading.tsx          # Loading skeleton
│   │   └── error.tsx            # Error boundary
│   ├── api/
│   │   ├── generate/route.ts    # AI generation endpoint
│   │   ├── logos/route.ts       # Logo CRUD
│   │   ├── upload/route.ts      # Cloudinary upload
│   │   └── auth/callback/route.ts  # OAuth callback
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── not-found.tsx            # 404 page
│   ├── global-error.tsx         # Global error
│   ├── sitemap.ts               # SEO sitemap
│   └── robots.ts                # Robots.txt
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   ├── dashboard/
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardTopbar.tsx
│   │   └── MobileNav.tsx
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── ColorPaletteCard.tsx
│       ├── TypographyCard.tsx
│       ├── GenerationCard.tsx
│       └── EmptyState.tsx
├── lib/
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client
│       └── middleware.ts       # Auth middleware helper
├── hooks/
│   ├── useAuth.ts
│   ├── useGenerations.ts
│   └── useProfile.ts
├── services/
│   ├── groq.ts                 # Groq AI service
│   └── cloudinary.ts           # Cloudinary service
├── store/
│   └── generationStore.ts      # Zustand store
├── types/
│   └── index.ts                # TypeScript types
├── utils/
│   └── index.ts                # Utilities & constants
├── middleware.ts                # Next.js middleware
├── supabase-schema.sql          # Database schema
└── .env.local.example          # Environment template
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free)
- Groq API key (free)
- Cloudinary account (free)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/brandforge-ai.git
cd brandforge-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in your keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Groq AI (free at console.groq.com)
GROQ_API_KEY=gsk_xxxxxxxxxxxx

# Cloudinary (free at cloudinary.com)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Supabase database

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase-schema.sql`
5. Click **Run**

### 4. Set up Google OAuth

1. Go to **Authentication → Providers → Google** in Supabase
2. Enable Google provider
3. Open [Google Cloud Console](https://console.cloud.google.com)
4. Create a project → **APIs & Services → Credentials**
5. Create **OAuth 2.0 Client ID**
6. Set authorized redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
7. Copy Client ID & Secret back to Supabase

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Install Packages (if needed separately)

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install groq-sdk
npm install framer-motion
npm install react-hot-toast
npm install lucide-react
npm install cloudinary
npm install clsx tailwind-merge class-variance-authority
npm install zustand
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-avatar @radix-ui/react-select @radix-ui/react-switch
```

---

## 🗄️ Database Schema

The app uses 4 tables:

| Table | Purpose |
|-------|---------|
| `profiles` | Extended user data (synced with auth) |
| `logo_generations` | All AI generation results |
| `brand_kits` | Saved brand kits |
| `subscriptions` | User subscription data |

All tables have **Row Level Security (RLS)** enabled so users can only access their own data.

---

## 🌐 Deployment (Vercel)

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brandforge-ai)

### Manual deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add GROQ_API_KEY
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add NEXT_PUBLIC_APP_URL

# Deploy to production
vercel --prod
```

### After deployment

1. Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
2. Update Google OAuth redirect URIs in Google Cloud Console
3. Update Supabase redirect URLs in **Authentication → URL Configuration**

---

## 📱 Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 768px) | Single column, bottom navigation |
| Tablet (768px - 1024px) | Two column, collapsible sidebar |
| Desktop (> 1024px) | Full sidebar + multi-column grids |
| Ultra-wide (> 1440px) | Wider content area |

---

## 🔧 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate` | POST | Generate complete brand identity |
| `/api/logos` | GET | Fetch user's saved logos |
| `/api/logos` | PATCH | Toggle favorite |
| `/api/logos` | DELETE | Delete a generation |
| `/api/upload` | POST | Upload image to Cloudinary |
| `/api/auth/callback` | GET | OAuth callback handler |

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Primary | `#7C3AED` (violet-600) |
| Secondary | `#2563EB` (blue-600) |
| Accent | `#EC4899` (pink-500) |
| Background | `#030303` |
| Card | `rgba(255,255,255,0.03)` |
| Border | `rgba(255,255,255,0.06)` |

---

## 📸 Screenshots

> Add your screenshots here after deployment

- Landing Page (Hero)
- Dashboard Home
- Generate Page
- Saved Logos
- Mobile View

---

## 🔐 Security

- All API routes validate authentication server-side
- Supabase RLS ensures data isolation between users
- Environment variables never exposed to client (except `NEXT_PUBLIC_*`)
- OAuth state validation via Supabase
- Input sanitization on all forms
- Rate limiting via credits system

---

## 📄 License

MIT License — free to use for personal and commercial projects.

---

## 🙏 Built With

- [Next.js](https://nextjs.org) — React framework
- [Supabase](https://supabase.com) — Auth & database
- [Groq](https://groq.com) — Ultra-fast AI inference
- [Cloudinary](https://cloudinary.com) — Image hosting
- [Vercel](https://vercel.com) — Deployment
- [Framer Motion](https://www.framer.com/motion) — Animations
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Lucide](https://lucide.dev) — Icons

---

Made with ❤️ by BrandForge AI
# LogoAi-Generator
