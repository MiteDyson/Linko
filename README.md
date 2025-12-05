
# 🔗 **Linko – Minimal, Fast & Customizable URL Shortener**

<div align="center">

<img src="https://github.com/MiteDyson/Linko/blob/main/logo.png" width="130" alt="Linko Logo">

### **Create short links instantly — with custom domains, themes, and a clean UI.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-black?logo=shadcnui)](https://ui.shadcn.com)
[![LottieFiles](https://img.shields.io/badge/Animations-Lottie-1AB7EA?logo=lottie)](https://lottiefiles.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://prisma.io/)
[![NeonDB](https://img.shields.io/badge/Database-NeonDB-00E599?logo=neondatabase)](https://neon.tech/)
[![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-black?logo=vercel)](https://vercel.com/)

🔗 **Live App:** [Here](https://linko-io.vercel.app/)
📦 **Repository:** [Here](https://github.com/MiteDyson/Linko)

</div>

---

## ✨ **What is Linko?**

**Linko** is a simple yet powerful URL shortener built for speed, simplicity, and customization.

Create short links in seconds — customize your slug, use your own domain, and enjoy a smooth, modern UI. Powered by **Next.js**, **NeonDB**, and **Prisma**, Linko ensures fast redirects and reliable storage.

---

## 🚀 **Key Features**

### 🔗 Core Features

* **Instant URL Shortening**
* **Custom Slug Support**
* **Custom Domain Support**
* **Database Persistence** using NeonDB + Prisma
* **Fast redirects with Next.js route handlers**

### 🎨 UI & UX

* Clean modern interface
* Built with **shadcn/ui + TailwindCSS**
* **Lottie animations**
* **Theme Support** (Light & Dark)
* Fully responsive

### 🧱 Infrastructure

* **Frontend:** Vercel
* **Database:** NeonDB
* **ORM:** Prisma
* **Framework:** Next.js 16

---

## 🏗️ **Architecture Overview**

```
Linko/
├── app/
│   ├── page.tsx           # Main UI
│   ├── api/create/        # URL creation endpoint
│   ├── api/[slug]/        # Redirect handler
│   └── components/        # UI components
│
├── lib/
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Helper utilities
│
├── prisma/
│   └── schema.prisma      # Database schema
│
└── public/                # Icons, animations, assets
```

---

## 🔧 **Tech Stack Explained**

### 🌐 **Frontend**

| Tech        | Purpose                  |
| ----------- | ------------------------ |
| Next.js 16  | Routing, rendering, APIs |
| React 19    | Components, UI logic     |
| TypeScript  | Type safety              |
| TailwindCSS | Styling                  |
| shadcn/ui   | UI components            |
| Lottie      | Animations               |

### 🖥️ **Backend**

| Tech   | Purpose               |
| ------ | --------------------- |
| NeonDB | Serverless PostgreSQL |
| Prisma | Database ORM          |
| Vercel | Hosting + deployments |

---

## 🔗 **Live Demo**

Try Linko here:

👉 **[https://linko-io.vercel.app/](https://linko-io.vercel.app/)**

Paste a long URL → customize the slug → generate a short link instantly.

---

## ⚙️ **Local Setup**

### Requirements

* Node.js 18+
* NeonDB account (or local Postgres)
* npm / pnpm / yarn

---

### 1️⃣ Clone Project

```bash
git clone https://github.com/MiteDyson/Linko
cd Linko
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env`:

```
DATABASE_URL="your-neon-db-url"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4️⃣ Setup Database

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

App will run at:
➡ [http://localhost:3000](http://localhost:3000)

---

## 📡 **How Link Shortening Works**

1. User submits a long URL
2. Server validates + checks slug availability
3. Prisma writes record to NeonDB
4. Visiting `/your-slug` triggers a redirect

Request flow:

```
POST /api/create
→ validate input
→ prisma.link.create()
→ return short URL
```

Redirect flow:

```
GET /api/[slug]
→ lookup link
→ redirect to original URL
```

---

## 📄 License

Licensed under **MIT** — free to use and modify.

---

<div align="center">

### **Linko – Fast. Clean. Customizable.**

🔗 **[Live Demo](https://linko-io.vercel.app/)**
📦 **[Repo](https://github.com/MiteDyson/Linko)**

</div>

---

