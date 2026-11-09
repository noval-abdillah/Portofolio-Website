# Noval Abdillah - Portfolio Website 🚀

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-BaaS-emerald?style=flat-square&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Website portofolio interaktif milik **Noval Abdillah** — Full-Stack Developer & AI/n8n Workflow Automation Specialist dari Bekasi Utara, Jawa Barat.

Dibangun dengan **Next.js 16 (App Router)**, **Tailwind CSS**, **Supabase**, animasi **GSAP + Lenis**, dan Three.js untuk elemen 3D interaktif. Dilengkapi CMS admin pribadi untuk mengelola proyek secara dinamis.

---

## 🌟 Fitur Utama

- **⚡ Next.js App Router** — SSR + RSC untuk performa optimal
- **🤖 AI & n8n Automation** — Konten dan FAQ mencerminkan keahlian workflow automation
- **🔐 Admin CMS** — Dashboard aman via Supabase Auth untuk kelola proyek
- **🖼️ Supabase Storage** — Upload thumbnail proyek langsung dari dashboard
- **🌍 Multi-Bahasa (i18n)** — Dukungan Bahasa Indonesia & English
- **🎨 Animasi Premium** — GSAP ScrollTrigger + Lenis smooth scroll + cursor kustom
- **🧊 Three.js Canvas** — Background 3D interaktif di hero section

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React 19, Next.js 16, Tailwind CSS v4, GSAP, Lenis |
| 3D & Animasi | Three.js, @react-three/fiber, @react-three/drei |
| Backend/BaaS | Supabase (PostgreSQL, Auth, Storage) |
| Automation | n8n Workflow Automation, REST API Integration |
| AI Tools | GitHub Copilot (Microsoft Applied Skills), Claude |
| Deployment | Vercel |

---

## 🚀 Instalasi Lokal

### 1. Clone repositori
```bash
git clone https://github.com/noval-abdillah/Portofolio-Website.git
cd Portofolio-Website
```

### 2. Install dependensi
```bash
npm install
```

### 3. Siapkan Supabase
Buat proyek baru di [Supabase](https://supabase.com). Jalankan SQL berikut di **SQL Editor**:

```sql
-- Tabel projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin insert" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete" ON public.projects FOR DELETE TO authenticated USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-thumbnails', 'project-thumbnails', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'project-thumbnails');
CREATE POLICY "Admin upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-thumbnails');
CREATE POLICY "Admin update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-thumbnails');
CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-thumbnails');
```

Buat user admin melalui menu **Authentication > Users** di Supabase.

### 4. Atur Environment Variables
Buat file `.env.local` di root proyek:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_SUPABASE_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
```

### 5. Jalankan dev server
```bash
npm run dev
```
Buka `http://localhost:3000`.

---

## 🔒 Akses Dashboard Admin

1. Buka `/admin/login`
2. Login dengan email & password admin yang dibuat di Supabase Auth
3. Kelola proyek dari dashboard — tambah, edit, hapus, upload gambar

---

## 📂 Struktur Folder

```
├── public/                 # Aset statis (gambar, favicon, resume PDF)
├── scripts/                # Script utilitas & migrasi database
├── src/
│   ├── app/
│   │   ├── (admin)/        # Rute admin (dashboard, login)
│   │   └── (public)/       # Rute publik (home, about, blog, projects, contact)
│   ├── components/
│   │   ├── canvas/         # Three.js 3D components
│   │   ├── home/           # Hero, FAQ sections
│   │   ├── about/          # About page & profile
│   │   ├── blog/           # Blog listing & post
│   │   ├── projects/       # Projects grid
│   │   ├── contact/        # Contact form
│   │   ├── layout/         # Navbar, Footer
│   │   └── ui/             # CustomCursor, SmoothScroll, PageTransition, Icons
│   ├── context/            # LanguageContext (i18n)
│   ├── lib/
│   │   ├── i18n/           # Translations (EN/ID)
│   │   ├── supabase/       # Supabase client/server/middleware
│   │   └── blog-data.ts    # Blog post content
│   └── types/              # TypeScript type declarations
```

---

## 📋 Sertifikasi

- 🏆 Google AI Professional Certificate
- 🏆 Microsoft Applied Skills: Accelerate AI-Assisted Development with GitHub Copilot
- 🏆 Full Stack Developer — Digital Talent Academy (Komdigi)
- 🏆 Problem Solving (Intermediate) — HackerRank

---

## 📞 Kontak

**Noval Abdillah**
- 📧 [noval.abdillah223@gmail.com](mailto:noval.abdillah223@gmail.com)
- 📱 085781101447
- 🔗 [linkedin.com/in/noval-abdillah-415589316](https://www.linkedin.com/in/noval-abdillah-415589316/)
- 🌐 [novalabdillah.online](https://novalabdillah.online)

---

**© 2026 Noval Abdillah.** Semua Hak Cipta Dilindungi.
