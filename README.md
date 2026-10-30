<div align="center">

# 👓 LensCare

### Premium Eyewear E-Commerce & Optical Prescription Platform for Bangladesh

[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma%20v7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<p align="center">
  A commercial-grade, multi-tier eyewear e-commerce platform engineered specifically for the Bangladeshi market. Built with high information density, optical laboratory workflow integrations, localized payments, and modern web ergonomics.
</p>

</div>

---

## 🌟 Key Features

### 🔬 Optical Laboratory & Prescription Workflow
- **Precision Optical Matrix**: Support for OD (Right Eye) and OS (Left Eye) SPH, CYL, Axis, and Pupillary Distance (PD) entry.
- **Prescription Upload & Storage**: Upload physical optical prescriptions to secure Supabase storage.
- **Lens Customization Engine**: Select single-vision, bifocal, progressive, blue-light block, anti-reflective, and photochromic coatings.

### 🇧🇩 Localized Bangladesh Commerce
- **Regional Geography**: Built-in hierarchy for all 8 administrative divisions of Bangladesh (Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Rangpur, Mymensingh) with localized delivery charges.
- **Payment Gateway Integrations**: Prepared checkout paths for bKash, Nagad, Rocket, Cash on Delivery (COD), and SSLCommerz.
- **Optical Tracking Interface**: Real-time tracking from lab processing, lens fitting, QC check, to local courier dispatch.

### ⚡ Technical Highlights
- **Next.js 16 App Router**: Server Components (RSC) for blazing fast initial loads, SEO optimization, and streaming SSR.
- **Prisma v7 ORM**: Strict relational database modeling for products, variants, brands, shapes, prescriptions, and order items.
- **Framer Motion & Radix UI**: High-polish fluid drawer cart, animated modals, accessible selects, and responsive accordions.
- **Dynamic Catalog Filters**: URL-driven faceted navigation by frame shape, material, gender, color, and price range.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    Client["Client Browser (React 19 / Next.js)"]
    
    subgraph Frontend ["Next.js 16 App Router"]
        RSC["Server Components (Catalog, SEO, Static Layouts)"]
        RCC["Client Components (Cart Drawer, Filter State, Prescription Matrix)"]
        Mid["Middleware (Session Refresh & Auth Gate)"]
    end
    
    subgraph Backend ["Services & Database"]
        Prisma["Prisma v7 ORM"]
        Postgres[("PostgreSQL Database")]
        SupaAuth["Supabase Auth (JWT & Roles)"]
        SupaStore["Supabase Storage (Prescriptions & Imagery)"]
    end
    
    Client --> Mid
    Mid --> Frontend
    RSC --> Prisma
    RCC --> SupaAuth
    RCC --> SupaStore
    Prisma --> Postgres
```

---

## 🗄️ Database Entity Relationship Overview

```mermaid
erDiagram
    UserProfile ||--o{ Order : places
    UserProfile ||--o{ Prescription : owns
    UserProfile ||--o{ Address : has
    
    Product ||--o{ ProductImage : contains
    Product ||--o{ ProductVariant : has
    Product }o--|| Category : belongs_to
    Product }o--|| Brand : manufactured_by
    Product }o--|| Shape : silhouette
    
    Order ||--o{ OrderItem : includes
    Order ||--o{ Payment : processed_by
    Cart ||--o{ CartItem : holds
```

---

## 📁 Repository Structure

```text
lenscare/
├── docs/                      # Architectural specs & technical documentation
│   ├── ARCHITECTURE.md        # Deep dive into routes and state management
│   ├── DATABASE.md            # Prisma models and entity relationships
│   ├── API.md                 # REST API endpoints and payload schemas
│   └── DEVELOPMENT_RULES.md   # Code style & engineering conventions
├── prisma/                    # Database configuration
│   └── schema.prisma          # PostgreSQL schema definition
├── public/                    # Static assets, SVG icons, and graphics
├── src/
│   ├── app/                   # App Router pages and layouts
│   │   ├── (auth)/            # Login, register, and password recovery
│   │   ├── shop/              # Catalog with faceted search & filtering
│   │   ├── products/[slug]/   # Interactive product details & prescription wizard
│   │   ├── cart/ & checkout/  # Shopping cart and localized BD checkout
│   │   └── track-order/       # Order tracking timeline
│   ├── components/            # Reusable UI & commercial design system
│   │   ├── ui/                # Radix UI primitives & custom design tokens
│   │   ├── cart/              # Cart drawer & items list
│   │   └── prescription/      # Optical measurement matrix
│   ├── lib/                   # Utility functions, Supabase clients & Prisma instances
│   └── types/                 # TypeScript type definitions and interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later (Node.js 22+ recommended)
- PostgreSQL database instance (or Supabase project)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/siaym/lenscare.git
cd lenscare
npm install
```

### 2. Environment Variables Configuration
Copy the template and provide your database credentials:
```bash
cp .env.example .env
```
Ensure your database URL and Supabase keys are configured:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Initialize Prisma Schema
```bash
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
