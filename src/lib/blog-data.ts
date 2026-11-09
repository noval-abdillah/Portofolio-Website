export interface BlogPostContent {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  time: string;
  image: string;
  contentHtml: string;
}

export interface BlogPost {
  slug: string;
  en: BlogPostContent;
  id: BlogPostContent;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-i-use-ai-agents-to-build-10x-faster',
    en: {
      title: 'How I Use AI Agents to Build 10x Faster',
      excerpt: 'Discover how AI prompting and collaborative coding can accelerate Next.js and Supabase development without losing architectural quality.',
      category: 'AI & Coding',
      date: 'Jun 25, 2026',
      time: '8 min read',
      image: '/blog/ai-agents.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          AI has shifted from a simple autocomplete tool to an autonomous coding partner. As a developer, my day-to-day workflow doesn't revolve around writing boilerplate code anymore. Instead, I focus on system design, routing architecture, and orchestration.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Prompting as System Specifications</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          The secret to getting production-grade code from AI is giving it precise context. I treat prompts as technical specifications. I outline the input types, state management patterns, and database schemas before asking the agent to generate code.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-green-400">
          // Example specification structure<br/>
          const PromptSpec = {<br/>
          &nbsp;&nbsp;framework: "Next.js 16 App Router",<br/>
          &nbsp;&nbsp;styling: "Tailwind CSS",<br/>
          &nbsp;&nbsp;state: "React Context for localized localization",<br/>
          &nbsp;&nbsp;security: "Row Level Security (RLS) checked"<br/>
          };
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Keeping the Architecture Clean</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          One common issue with AI code is architectural erosion—where code becomes messy over time. To avoid this, I enforce a strict modular component folder structure and define atomic rules for hooks and utilities. I guide the AI to reuse existing hooks instead of creating redundant state machines.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Real-World Case Study: Building a CMS Dashboard</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Recently, I built a complete CMS dashboard for an interior design enterprise using AI-assisted development. The project included role-based access control, image upload to Supabase Storage, and a real-time project management interface. By structuring the project specification first, the AI generated 80% of the boilerplate code, allowing me to focus on business logic and edge cases.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          The key was breaking the dashboard into atomic components: a data table with sorting and filtering, a modal form for project creation, and a notification system for user feedback. Each component was specified with its props interface, state dependencies, and styling requirements before the AI wrote a single line of code.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Testing AI-Generated Code</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Testing is non-negotiable when working with AI-generated code. I use a three-tier verification strategy: TypeScript compilation for type safety, manual code reviews for architectural consistency, and end-to-end testing for critical user flows. AI excels at generating unit tests too—I often prompt it to create test cases for edge scenarios I might have overlooked.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          For complex database operations, I always verify the generated Supabase queries against the actual schema. AI sometimes assumes table structures or column names that don't exist, so cross-referencing the SQL schema definition is essential before deployment.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Conclusion</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          By combining a deep knowledge of software fundamentals with rapid AI orchestration, I can build scalable fullstack products in hours instead of weeks. The future of software is not about who types the fastest, but who designs and directs the best systems.
        </p>
      `
    },
    id: {
      title: 'Cara Saya Menggunakan AI Agent untuk Membangun Aplikasi 10x Lebih Cepat',
      excerpt: 'Pelajari bagaimana rekayasa prompt dan pemrograman kolaboratif AI mempercepat pembuatan Next.js & Supabase tanpa merusak kualitas kode.',
      category: 'AI & Koding',
      date: '25 Jun 2026',
      time: '8 mnt baca',
      image: '/blog/ai-agents.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Kecerdasan Buatan (AI) telah bergeser dari alat pelengkap otomatis (autocomplete) menjadi mitra koding otonom. Sebagai developer, alur kerja harian saya tidak lagi berkisar pada menulis kode boilerplate. Fokus saya sekarang ada pada desain sistem, arsitektur perutean, dan orkestrasi logika tingkat tinggi.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Prompting sebagai Spesifikasi Sistem</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Rahasia mendapatkan kode standar produksi yang kokoh dari AI adalah dengan memberikan konteks yang tepat. Saya memperlakukan perintah (prompt) sebagai spesifikasi teknis. Saya menjabarkan tipe input, pola manajemen status, dan skema database terlebih dahulu sebelum meminta AI membuat kode.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-green-400">
          // Contoh struktur spesifikasi prompt<br/>
          const PromptSpec = {<br/>
          &nbsp;&nbsp;framework: "Next.js 16 App Router",<br/>
          &nbsp;&nbsp;styling: "Tailwind CSS",<br/>
          &nbsp;&nbsp;state: "React Context untuk lokalisasi bahasa",<br/>
          &nbsp;&nbsp;security: "Telah diperiksa dengan Row Level Security (RLS)"<br/>
          };
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Menjaga Arsitektur Tetap Bersih</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Salah satu masalah umum dengan kode buatan AI adalah terjadinya erosi arsitektur—di mana kode menjadi berantakan dari waktu ke waktu karena kurangnya konsistensi pola. Untuk menghindari hal ini, saya menerapkan struktur folder komponen yang ketat dan memandu AI untuk menggunakan kembali fungsi pembantu yang sudah ada.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Studi Kasus: Membangun Dashboard CMS</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Baru-baru ini, saya membangun dashboard CMS lengkap untuk sebuah perusahaan desain interior menggunakan pengembangan berbantuan AI. Proyek ini mencakup kontrol akses berbasis peran (RBAC), unggah gambar ke Supabase Storage, dan antarmuka manajemen proyek real-time. Dengan menyusun spesifikasi proyek terlebih dahulu, AI menghasilkan 80% kode boilerplate, sehingga saya bisa fokus pada logika bisnis dan kasus batas (edge cases).
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Kuncinya adalah memecah dashboard menjadi komponen atomik: tabel data dengan pengurutan dan penyaringan, form modal untuk pembuatan proyek, dan sistem notifikasi untuk umpan balik pengguna. Setiap komponen dispesifikasikan dengan antarmuka props, dependensi state, dan persyaratan gaya sebelum AI menulis satu baris kode pun.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Menguji Kode Buatan AI</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Pengujian adalah syarat mutlak saat bekerja dengan kode buatan AI. Saya menggunakan strategi verifikasi tiga tingkat: kompilasi TypeScript untuk keamanan tipe, tinjauan kode manual untuk konsistensi arsitektur, dan pengujian end-to-end untuk alur pengguna kritis. AI juga sangat baik dalam membuat unit test—saya sering memintanya untuk membuat kasus uji untuk skenario batas yang mungkin terlewatkan.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Untuk operasi database yang kompleks, saya selalu memverifikasi query Supabase yang dihasilkan terhadap skema yang sebenarnya. AI terkadang mengasumsikan struktur tabel atau nama kolom yang tidak ada, sehingga verifikasi silang dengan definisi skema SQL sangat penting sebelum deployment.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Kesimpulan</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Dengan menggabungkan fondasi rekayasa perangkat lunak yang kuat dengan kemampuan akselerasi AI, aplikasi fullstack kelas produksi dapat terwujud dalam hitungan jam. Masa depan pengembangan perangkat lunak tidak lagi ditentukan oleh siapa yang mengetik paling cepat, melainkan siapa yang merancang sistem dengan arsitektur terbaik.
        </p>
      `
    }
  },
  {
    slug: 'automating-workflows-with-n8n',
    en: {
      title: 'Automating Workflows with n8n: Cut Manual Work by 60%',
      excerpt: 'A practical guide to building self-running automation systems with n8n, integrating APIs and AI to eliminate repetitive tasks.',
      category: 'AI & Automation',
      date: 'Jun 18, 2026',
      time: '10 min read',
      image: '/blog/auth-supabase.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Repetitive manual work is the silent killer of productivity. During my work at Perum BULOG, I validated operational data daily with over 98% accuracy — a process that was largely manual and time-consuming. That experience drove me to master n8n, a powerful open-source workflow automation platform that connects APIs, AI, and business tools into self-running pipelines.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. What is n8n and Why Use It?</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          n8n is a node-based workflow automation tool that lets you visually connect services and APIs without heavy custom code. Unlike Zapier, n8n is self-hostable, giving you full control over your data and workflows. I use it to build pipelines that run 24/7, autonomously handling tasks that would otherwise require manual intervention.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-green-400">
          // Example: n8n workflow structure<br/>
          Trigger (Webhook/Schedule)<br/>
          &nbsp;&nbsp;→ HTTP Request (Fetch data from API)<br/>
          &nbsp;&nbsp;→ AI Node (Process/classify data)<br/>
          &nbsp;&nbsp;→ Database (Store results)<br/>
          &nbsp;&nbsp;→ Notification (Slack/Email/WhatsApp)
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Real Use Case: Data Validation Automation</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          At BULOG, data discrepancies were manually identified and escalated — a slow, error-prone process. By automating the validation pipeline with n8n, I was able to reduce data input errors by 30% and ensure data was always up-to-date before reporting deadlines. The workflow automatically flags anomalies, routes them to the right person, and logs everything for audit trails.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Integrating AI into n8n Workflows</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          n8n's AI nodes allow you to plug in models like GPT or Claude directly into your workflow. I use this to classify incoming data, generate summaries, draft responses, and make routing decisions — all automatically. The result is a system that handles 60% of what used to be manual work, freeing the team for higher-value decisions.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Connecting to Web Applications</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          n8n pairs perfectly with full-stack web apps. I build Next.js dashboards that expose webhook endpoints consumed by n8n workflows. When a user submits a form, n8n catches the event, processes it through AI, writes to Supabase, and sends a WhatsApp confirmation — all in seconds with zero manual steps.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Getting Started</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          The best way to start is to identify one repetitive task your team does every week. Map its inputs and outputs, then replicate it in n8n using HTTP Request nodes and a trigger. Once you see it run autonomously for the first time, you'll understand why automation is not optional — it's a competitive advantage.
        </p>
      `
    },
    id: {
      title: 'Otomasi Workflow dengan n8n: Pangkas Kerja Manual hingga 60%',
      excerpt: 'Panduan praktis membangun sistem otomasi mandiri dengan n8n, mengintegrasikan API dan AI untuk menghilangkan pekerjaan berulang secara permanen.',
      category: 'AI & Otomasi',
      date: '18 Jun 2026',
      time: '10 mnt baca',
      image: '/blog/auth-supabase.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Pekerjaan manual berulang adalah pembunuh produktivitas yang senyap. Saat bekerja di Perum BULOG, saya memvalidasi data operasional setiap hari dengan akurasi di atas 98% — proses yang sebagian besar dilakukan secara manual dan memakan waktu. Pengalaman itu mendorong saya untuk menguasai n8n, platform otomasi workflow open-source yang menghubungkan API, AI, dan tools bisnis menjadi pipeline yang berjalan sendiri.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Apa itu n8n dan Mengapa Menggunakannya?</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          n8n adalah tool otomasi workflow berbasis node yang memungkinkan Anda menghubungkan layanan dan API secara visual tanpa banyak kode kustom. Berbeda dari Zapier, n8n bisa di-self-host sehingga Anda punya kontrol penuh atas data dan workflow. Saya menggunakannya untuk membangun pipeline yang berjalan 24/7, menangani tugas yang sebelumnya membutuhkan intervensi manual.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-green-400">
          // Contoh: struktur workflow n8n<br/>
          Trigger (Webhook/Jadwal)<br/>
          &nbsp;&nbsp;→ HTTP Request (Ambil data dari API)<br/>
          &nbsp;&nbsp;→ AI Node (Proses/klasifikasi data)<br/>
          &nbsp;&nbsp;→ Database (Simpan hasil)<br/>
          &nbsp;&nbsp;→ Notifikasi (Slack/Email/WhatsApp)
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Studi Kasus: Otomasi Validasi Data</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Di BULOG, ketidaksesuaian data diidentifikasi dan dieskalasi secara manual — proses lambat dan rawan kesalahan. Dengan mengotomatisasi pipeline validasi menggunakan n8n, saya berhasil menurunkan tingkat kesalahan input hingga 30% dan memastikan data selalu terbarui sebelum tenggat pelaporan. Workflow secara otomatis menandai anomali, mengarahkannya ke pihak yang tepat, dan mencatat segalanya untuk jejak audit.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Mengintegrasikan AI ke Workflow n8n</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Node AI n8n memungkinkan Anda menghubungkan model seperti GPT atau Claude langsung ke workflow. Saya menggunakannya untuk mengklasifikasi data masuk, menghasilkan ringkasan, membuat draf respons, dan membuat keputusan routing — semuanya otomatis. Hasilnya adalah sistem yang menangani 60% pekerjaan yang dulunya manual, membebaskan tim untuk keputusan bernilai lebih tinggi.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Menghubungkan ke Aplikasi Web</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          n8n sangat cocok dipasangkan dengan aplikasi web full-stack. Saya membangun dashboard Next.js yang mengekspos endpoint webhook yang dikonsumsi oleh workflow n8n. Ketika pengguna mengirim form, n8n menangkap event tersebut, memprosesnya melalui AI, menulis ke Supabase, dan mengirim konfirmasi WhatsApp — semua dalam hitungan detik tanpa langkah manual.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Memulai</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Cara terbaik untuk mulai adalah mengidentifikasi satu tugas berulang yang dilakukan tim Anda setiap minggu. Petakan input dan outputnya, lalu replikasi di n8n menggunakan node HTTP Request dan trigger. Begitu Anda melihatnya berjalan mandiri untuk pertama kali, Anda akan mengerti mengapa otomasi bukan pilihan — melainkan keunggulan kompetitif.
        </p>
      `
    }
  },
  {
    slug: 'mastering-nextjs-16-and-supabase-authentication',
    en: {
      title: 'Mastering Next.js 16 and Supabase Authentication',
      excerpt: 'A complete guide to building secure JWT and RBAC authentication flows using Supabase SSR in Next.js App Router.',
      category: 'Fullstack',
      date: 'Jun 18, 2026',
      time: '10 min read',
      image: '/blog/auth-supabase.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Authentication is the gateway of any SaaS platform. With Next.js 16 App Router and Supabase SSR (\`@supabase/ssr\`), we can implement secure cookie-based auth that spans across Server Components, Client Components, and Middleware.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Setting up Server-Side Clients</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Unlike legacy setups, Supabase SSR lets you initialize a client that automatically reads and writes cookies back to the user's browser, preventing stale session tokens. The \`createServerClient\` function from \`@supabase/ssr\` handles cookie serialization seamlessly.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-blue-400">
          // Initializing a Server Client in Next.js Server Components<br/>
          import { createServerClient } from '@supabase/ssr';<br/>
          import { cookies } from 'next/headers';<br/>
          <br/>
          export async function createClient() {<br/>
          &nbsp;&nbsp;const cookieStore = await cookies();<br/>
          &nbsp;&nbsp;return createServerClient(URL, KEY, {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;cookies: {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getAll: () => cookieStore.getAll(),<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setAll: (cookiesToSet) => { ... }<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
          &nbsp;&nbsp;});<br/>
          }
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Protecting Routes in Middleware</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Instead of guarding pages individually, route protection must be handled globally in the \`middleware.ts\` file. This verifies the session state before the user is served any layout files, boosting both security and performance. The middleware pattern also allows us to redirect unauthenticated users to the login page while preserving the original URL for redirect after successful authentication.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Implementing RBAC (Role-Based Access Control)</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          For SaaS admin control panels, we check the role attribute on user metadata or query the database admins table to allow/disallow access to sensitive dashboard functions. In my portfolio project, I maintain a separate \`admins\` table that maps user IDs to admin privileges, ensuring that only authorized personnel can create, update, or delete project entries.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Handling Session Refresh and Token Lifecycle</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          One of the trickiest aspects of authentication is managing token expiration and refresh cycles. Supabase SSR handles this automatically by detecting expired access tokens and using the refresh token stored in cookies to obtain new ones. However, you must ensure that your middleware properly refreshes the session on every request by calling \`supabase.auth.getUser()\`, which triggers the refresh flow when needed.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          A common pitfall is forgetting to call \`getUser()\` in middleware — without it, expired sessions won't be refreshed, and users will unexpectedly be logged out even though their refresh token is still valid. Always make this call in your \`updateSession\` function to keep the session alive.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Best Practices for Production</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          When deploying authentication in production, always use environment variables for sensitive keys, enable Row Level Security (RLS) on all database tables, and implement rate limiting on login endpoints to prevent brute-force attacks. Additionally, consider setting up email confirmation for new user registrations and using Supabase's built-in CAPTCHA protection for public-facing forms.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          For the admin dashboard, I recommend adding an audit log table to track who made changes and when. This not only improves security but also provides accountability for content management operations. Supabase's real-time subscriptions can also be used to notify administrators of suspicious login attempts or unauthorized access patterns.
        </p>
      `
    },
    id: {
      title: 'Menguasai Autentikasi Next.js 16 dan Supabase',
      excerpt: 'Panduan lengkap membangun alur autentikasi JWT dan RBAC yang aman menggunakan Supabase SSR di Next.js App Router.',
      category: 'Fullstack',
      date: '18 Juni 2026',
      time: '10 mnt baca',
      image: '/blog/auth-supabase.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Autentikasi adalah gerbang utama dari setiap aplikasi SaaS. Bersama Next.js 16 App Router dan paket Supabase SSR (\`@supabase/ssr\`), kita dapat merancang sistem keamanan berbasis cookie yang tersinkronisasi di Server Components, Client Components, dan Middleware.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Menginisiasi Client Sisi Server</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Berbeda dari model lama, Supabase SSR memungkinkan klien membaca dan menulis cookie sesi langsung kembali ke browser pengguna untuk menjaga masa aktif token tetap sinkron. Fungsi \`createServerClient\` dari \`@supabase/ssr\` menangani serialisasi cookie dengan mulus.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-blue-400">
          // Inisiasi Server Client di Server Components<br/>
          import { createServerClient } from '@supabase/ssr';<br/>
          import { cookies } from 'next/headers';<br/>
          <br/>
          export async function createClient() {<br/>
          &nbsp;&nbsp;const cookieStore = await cookies();<br/>
          &nbsp;&nbsp;return createServerClient(URL, KEY, {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;cookies: {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getAll: () => cookieStore.getAll(),<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setAll: (cookiesToSet) => { ... }<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
          &nbsp;&nbsp;});<br/>
          }
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Melindungi Rute Melalui Middleware</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Proteksi rute harus dipusatkan pada file \`middleware.ts\`. Ini memastikan status sesi divalidasi sebelum file layout dikirim ke browser pengguna, memberikan respons situs yang lebih cepat dan aman. Pola middleware juga memungkinkan kita mengarahkan pengguna yang belum login ke halaman login sambil menyimpan URL asli untuk pengalihan setelah autentikasi berhasil.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Peran Kontrol Akses (RBAC)</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Untuk dasbor admin portofolio atau SaaS, kita memvalidasi status admin pengguna dengan membandingkan kecocokan email/ID pengguna dengan tabel \`public.admins\` di database Supabase. Dalam proyek portofolio saya, saya memelihara tabel \`admins\` terpisah yang memetakan ID pengguna ke hak istimewa admin, memastikan hanya personel yang berwenang yang dapat membuat, memperbarui, atau menghapus entri proyek.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Menangani Penyegaran Sesi dan Siklus Hidup Token</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Salah satu aspek paling rumit dari autentikasi adalah mengelola kedaluwarsa token dan siklus penyegaran. Supabase SSR menangani ini secara otomatis dengan mendeteksi token akses yang kedaluwarsa dan menggunakan token penyegar yang disimpan di cookie untuk mendapatkan yang baru. Namun, Anda harus memastikan bahwa middleware Anda menyegarkan sesi dengan benar pada setiap permintaan dengan memanggil \`supabase.auth.getUser()\`, yang memicu alur penyegaran saat diperlukan.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Kesalahan umum adalah lupa memanggil \`getUser()\` di middleware — tanpa itu, sesi yang kedaluwarsa tidak akan disegarkan, dan pengguna akan tiba-tiba logout meskipun token penyegar mereka masih valid. Selalu panggil fungsi ini di fungsi \`updateSession\` Anda untuk menjaga sesi tetap aktif.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Praktik Terbaik untuk Produksi</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Saat menerapkan autentikasi di produksi, selalu gunakan variabel lingkungan untuk kunci sensitif, aktifkan Row Level Security (RLS) di semua tabel database, dan terapkan pembatasan laju (rate limiting) pada titik akhir login untuk mencegah serangan brute-force. Selain itu, pertimbangkan untuk mengatur konfirmasi email untuk pendaftaran pengguna baru dan menggunakan perlindungan CAPTCHA bawaan Supabase untuk formulir yang menghadap publik.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Untuk dasbor admin, saya sarankan menambahkan tabel log audit untuk melacak siapa yang melakukan perubahan dan kapan. Ini tidak hanya meningkatkan keamanan tetapi juga memberikan akuntabilitas untuk operasi manajemen konten. Langganan real-time Supabase juga dapat digunakan untuk memberi tahu administrator tentang upaya login yang mencurigakan atau pola akses yang tidak sah.
        </p>
      `
    }
  },
  {
    slug: 'creating-premium-web-animations-with-gsap-and-lenis',
    en: {
      title: 'Creating Premium Web Animations with GSAP and Lenis',
      excerpt: 'Tips and tricks for syncing smooth scrolling animations and scroll-triggered transitions for a state-of-the-art user experience.',
      category: 'Creative Dev',
      date: 'Jun 10, 2026',
      time: '8 min read',
      image: '/blog/animations.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Premium web design requires more than static layouts. By combining Lenis smooth scrolling with GSAP (GreenSock Animation Platform) and ScrollTrigger, we can create immersive user interfaces that respond dynamically to scroll interaction.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Setting up Lenis Smooth Scroll</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Smooth scroll normalizes mouse wheel input speed across different operating systems. It makes animations feel buttery smooth, especially on desktops with high refresh-rate monitors. The key is to synchronize Lenis with GSAP's ScrollTrigger using the RAF (requestAnimationFrame) loop.
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-purple-400">
          // Setup animation loop synchronization<br/>
          const lenis = new Lenis({ lerp: 0.1 });<br/>
          lenis.on('scroll', ScrollTrigger.update);<br/>
          <br/>
          function raf(time) {<br/>
          &nbsp;&nbsp;lenis.raf(time);<br/>
          &nbsp;&nbsp;requestAnimationFrame(raf);<br/>
          }<br/>
          requestAnimationFrame(raf);
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. ScrollTrigger Orchestration</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          We trigger entrance transitions only when components are visible in the user's viewport. Using stagger values allows elements inside a section to fade up sequentially, creating a cascade effect that feels polished and intentional. GSAP's \`fromTo()\` method is preferred over \`from()\` for better control over initial states.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Performance Optimization Tips</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Performance is critical when dealing with animations. Always use \`gsap.context()\` with React's useEffect cleanup to prevent memory leaks. Avoid animating CSS properties that trigger layout recalculations like \`width\` or \`top\` — prefer \`transform\` and \`opacity\` instead (compositor-only properties that don't trigger layout recalculations).
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          For pages with many animated elements, consider using GSAP's \`batch()\` utility or implementing intersection observers to trigger animations only when elements are close to entering the viewport. This is especially important for portfolio sites with multiple sections, where animating everything on page load would be wasteful and cause jank.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Mobile Considerations</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Smooth scrolling can sometimes conflict with native mobile scroll behavior. On iOS, overscroll effects and rubber-banding need to be handled carefully. I recommend disabling smooth scroll on mobile devices with smaller screens or limited processing power. You can detect this via \`window.innerWidth\` or CSS media queries to conditionally enable or disable Lenis.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Additionally, touch events should be handled natively on mobile rather than intercepted by smooth scroll libraries. This ensures that users get the familiar, responsive scroll experience they expect on their phones while desktop users enjoy the premium smooth scrolling effect.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Designing for Performance</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Always clean up animation references when React components unmount by returning \`ctx.revert()\` inside GSAP contexts. This prevents memory leaks and scroll glitches. For complex timeline animations, consider using the \`ScrollTrigger.refresh()\` method after dynamic content loads to recalculate trigger positions.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Finally, use GSAP's \`kill()\` method on tweens and timelines when they are no longer needed, and avoid nesting too many ScrollTriggers on the same element. A well-optimized animation setup should maintain 60fps even on mid-range devices, providing a smooth experience for all users regardless of their hardware.
        </p>
      `
    },
    id: {
      title: 'Membuat Animasi Web Premium dengan GSAP dan Lenis',
      excerpt: 'Tips dan trik mensinkronisasi animasi smooth scroll dan transisi scroll-trigger untuk pengalaman pengguna premium.',
      category: 'Creative Dev',
      date: '10 Juni 2026',
      time: '8 mnt baca',
      image: '/blog/animations.svg',
      contentHtml: `
        <p class="text-zinc-300 leading-relaxed mb-6">
          Desain web premium tidak cukup hanya berupa tampilan statis. Dengan memadukan smooth scrolling Lenis serta kekuatan GSAP (GreenSock Animation Platform) dan ScrollTrigger, kita bisa menciptakan transisi visual mengesankan yang merespons geseran kursor (*scroll*) pengguna.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">1. Konfigurasi Smooth Scroll Lenis</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Smooth scroll menyelaraskan kecepatan pergerakan roda mouse di berbagai sistem operasi, membuat gerak kamera halaman terasa halus dan nyaman dilihat di berbagai perangkat. Kuncinya adalah menyinkronkan Lenis dengan ScrollTrigger milik GSAP menggunakan loop RAF (requestAnimationFrame).
        </p>
        
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6 font-mono text-sm text-purple-400">
          // Sinkronisasi requestAnimationFrame dengan ScrollTrigger<br/>
          const lenis = new Lenis({ lerp: 0.1 });<br/>
          lenis.on('scroll', ScrollTrigger.update);<br/>
          <br/>
          function raf(time) {<br/>
          &nbsp;&nbsp;lenis.raf(time);<br/>
          &nbsp;&nbsp;requestAnimationFrame(raf);<br/>
          }<br/>
          requestAnimationFrame(raf);
        </div>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">2. Orkestrasi ScrollTrigger</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Gunakan ScrollTrigger untuk memicu animasi masuk hanya saat elemen visual masuk ke layar pandang pengguna. Pola ini menghemat beban performa browser secara signifikan. Dengan menggunakan nilai \`stagger\`, elemen dalam satu bagian dapat muncul secara berurutan, menciptakan efek kaskade yang terasa profesional dan terencana.
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">3. Tips Optimasi Performa</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Performa sangat penting saat menangani animasi. Selalu gunakan \`gsap.context()\` bersama pembersihan useEffect React untuk mencegah kebocoran memori. Hindari menganimasi properti CSS yang memicu perhitungan ulang tata letak seperti \`width\` atau \`top\` — lebih baik gunakan \`transform\` dan \`opacity\` (properti yang hanya diproses oleh kompositor).
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Untuk halaman dengan banyak elemen animasi, pertimbangkan menggunakan utilitas \`batch()\` GSAP atau menerapkan intersection observer untuk memicu animasi hanya saat elemen mendekati viewport. Ini sangat penting untuk situs portofolio dengan banyak bagian, di mana menganimasi semua elemen saat muat halaman akan boros dan menyebabkan kegagapan (jank).
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">4. Pertimbangan Perangkat Seluler</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Smooth scrolling terkadang dapat berbenturan dengan perilaku scroll asli perangkat seluler. Di iOS, efek overscroll dan rubber-banding perlu ditangani dengan hati-hati. Saya sarankan untuk menonaktifkan smooth scroll pada perangkat seluler dengan layar lebih kecil atau daya pemrosesan terbatas. Anda dapat mendeteksinya melalui \`window.innerWidth\` atau media query CSS untuk mengaktifkan/menonaktifkan Lenis secara kondisional.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Selain itu, event sentuh harus ditangani secara native di perangkat seluler daripada dicegat oleh library smooth scroll. Ini memastikan pengguna mendapatkan pengalaman scroll yang familier dan responsif di ponsel mereka, sementara pengguna desktop menikmati efek smooth scrolling premium.
        </p>
        
        <h2 class="text-2xl font-bold text-white mt-8 mb-4 font-mono">5. Manajemen Memori Animasi</h2>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Selalu lakukan pembersihan objek (cleanup) saat komponen React dicopot (*unmount*) dengan memanggil \`ctx.revert()\` atau \`tl.kill()\` agar tidak terjadi kebocoran memori pada browser. Untuk animasi timeline yang kompleks, pertimbangkan menggunakan metode \`ScrollTrigger.refresh()\` setelah konten dinamis dimuat untuk menghitung ulang posisi pemicu.
        </p>
        <p class="text-zinc-300 leading-relaxed mb-6">
          Terakhir, gunakan metode \`kill()\` pada tween dan timeline saat tidak lagi diperlukan, dan hindari menumpuk terlalu banyak ScrollTrigger pada elemen yang sama. Pengaturan animasi yang dioptimalkan dengan baik harus mempertahankan 60fps bahkan pada perangkat kelas menengah, memberikan pengalaman yang mulus bagi semua pengguna terlepas dari perangkat keras mereka.
        </p>
      `
    }
  }
];