# NAS Internationals — Tours & Travels ✈️🌍

<div align="center">

[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google GenAI](https://img.shields.io/badge/AI_Assistant-Google_GenAI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**100% Online Digital Visa, Passport & Travel Coordination Platform with Real-Time AI Consultation.**

</div>

---

## 📖 Overview

**NAS Internationals Tours & Travels** is a full-stack digital travel services platform engineered by **A Generative Slice**. 

The platform digitizes traditional travel agency workflows—allowing international travelers to apply for tourist and business visas, schedule passport consultations, verify document attestation criteria, and book curated holiday packages completely online with zero physical office visits required.

Backed by **Google GenAI** and **Supabase**, the system acts as an autonomous digital visa officer that answers country-specific embassy requirements, calculates total processing fees, and tracks application lifecycles in real time.

---

## 🌟 Key Features

- 🛂 **Automated Visa Fee & Requirement Calculator**: Real-time pricing engine covering over 50 global destinations (Schengen, UAE, UK, US, Singapore, Malaysia, Saudi Arabia, etc.).
- 🤖 **AI Travel & Visa Consultant**: Embedded conversational AI agent powered by `@google/genai` to analyze applicant circumstances and guide visa documentation.
- 📂 **Digital Document Vault & Verification**: Secure upload pipeline for passport scans, photographs, and bank statements with pre-submission validation.
- 🗄️ **Supabase Cloud Sync**: Real-time PostgreSQL database storing customer applications, status timelines (Submitted → Under Embassy Review → Approved), and receipts.
- 📊 **Administrative Telemetry**: Analytics dashboard built with Recharts visualizing monthly visa volume, revenue metrics, and destination popularity.
- 📄 **Instant PDF Receipt Generation**: Generates branded payment receipts and tracking confirmation vouchers upon booking.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion |
| **Backend** | Express 4 running TypeScript via `tsx` / bundled with `esbuild` |
| **Database & Auth** | Supabase (`@supabase/supabase-js`) |
| **Generative AI** | Google GenAI SDK (`@google/genai`) |
| **Visualizations** | Recharts & Canvas-Confetti |
| **Deployment** | GitHub Pages client build / Node.js Express server |

---

## 📂 Directory Structure

```
NasInternationals/
├── public/                 # Static travel icons and country flags
├── src/
│   ├── components/         # VisaCalculator, AIAssistant, Hero, ApplicationTracker
│   ├── lib/                # Supabase client & GenAI initialization
│   ├── types/              # TypeScript interfaces for visas, bookings, and users
│   ├── App.tsx             # Main client application
│   └── main.tsx            # React root mount
├── server.ts               # Express backend API server
├── package.json            # Scripts & dependency definitions
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build pipeline
└── .env.example            # Environment variable specifications
```

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Supabase Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key

# Server
PORT=5000
```

---

## 🚀 Getting Started

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/A-Generative-Slice/NasInternationals.git
cd NasInternationals

# 2. Install dependencies
npm install

# 3. Start development server (Client + Server via tsx)
npm run dev
```

The application will be accessible at `http://localhost:5173` (Vite) and `http://localhost:5000` (API).

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Runs backend API server with TypeScript execution (`tsx server.ts`) |
| `npm run build:client` | Builds optimized frontend bundle with Vite |
| `npm run build` | Builds frontend and bundles `server.ts` with `esbuild` into `dist/server.cjs` |
| `npm run start` | Runs the compiled production server (`node dist/server.cjs`) |
| `npm run deploy` | Compiles client and deploys to GitHub Pages |

---

## 📄 License & Attribution

Designed and engineered by **A Generative Slice** for **NAS Internationals**.  
Copyright © 2026 NAS Internationals & A Generative Slice. All rights reserved.
