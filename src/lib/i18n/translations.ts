export type Language = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      blog: 'Blog',
    },
    hero: {
      role: 'FULLSTACK DEVELOPER & AI AUTOMATION',
      subtitle: 'Building production-grade web applications and automating workflows with AI & n8n. Cutting repetitive manual work by up to 60% through API integrations and intelligent automation systems.',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
    },
    about: {
      title: 'About Me',
      role: 'Full-Stack Developer | AI & n8n Workflow Automation',
      p1: 'I am a certified Full-Stack Developer with hands-on experience building web applications (front-end and back-end) and automating work processes using AI-powered tools and n8n. I specialize in integrating APIs and various tools to eliminate repetitive manual tasks by up to 60%, delivering self-running, stable systems.',
      p2: 'My core stack includes Next.js, Node.js, PostgreSQL, and Supabase. I combine modern development frameworks with AI-assisted coding and n8n workflow automation to rapidly build robust, scalable, and production-ready applications. Open to full-time positions, freelance projects, and collaborations in web development and AI automation.',
      techStack: 'Technical Stack',
      certifications: 'Certifications',
      aiAssisted: 'Accelerate AI-Assisted Development with GitHub Copilot',
      problemSolving: 'Problem Solving (Intermediate)',
      googleAi: 'Google AI Professional Certificate',
      dtaKomdigi: 'Full Stack Developer - Digital Talent Academy',
      profileBadge: 'Fullstack Dev',
      officeTools: 'Office Tools Proficiency',
      previewCert: 'Preview',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A selection of my recent work in full-stack development, AI automation with n8n, and modern web applications.',
      viewCode: 'Source Code',
      viewLive: 'Live Demo',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a project in mind or want to collaborate? Feel free to reach out. I am currently available for full-time positions, freelance projects, and AI automation collaborations.',
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successDesc: 'Thank you for reaching out. I will get back to you soon.',
      errorTitle: 'Error!',
      errorDesc: 'Something went wrong. Please try again later.',
    },
    blog: {
      title: 'Latest Insights',
      subtitle: 'Sharing thoughts on AI automation with n8n, full-stack development, and workflow engineering.',
      readMore: 'Read Article',
      categories: {
        ai: 'AI & Automation',
        fullstack: 'Fullstack',
        creative: 'Creative Dev',
      },
      posts: [
        {
          title: 'How I Use AI Agents to Build 10x Faster',
          excerpt: 'Discover how AI prompting and collaborative coding can accelerate Next.js and Supabase development without losing architectural quality.',
          date: 'Jun 25, 2026',
          time: '5 min read',
        },
        {
          title: 'Automating Workflows with n8n: Cut Manual Work by 60%',
          excerpt: 'A practical guide to building self-running automation systems with n8n, integrating APIs and AI to eliminate repetitive tasks.',
          date: 'Jun 18, 2026',
          time: '8 min read',
        },
        {
          title: 'Creating Premium Web Animations with GSAP and Lenis',
          excerpt: 'Tips and tricks for syncing smooth scrolling animations and scroll-triggered transitions for a state-of-the-art user experience.',
          date: 'Jun 10, 2026',
          time: '6 min read',
        },
      ],
    },
    footer: {
      description: 'Full-Stack Developer & AI Automation specialist. Building production-grade web apps and n8n automation workflows that cut manual work by up to 60%.',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      rights: 'All rights reserved.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about my development process, services, and technologies.',
      questions: [
        {
          q: 'What services does Noval Abdillah offer?',
          a: 'Noval Abdillah offers full-stack web development, AI workflow automation with n8n, MVP creation, and API integration services. This includes building frontends with Next.js, robust backends with Node.js/PostgreSQL, and automating repetitive business processes using n8n and AI tools — reducing manual work by up to 60%.'
        },
        {
          q: 'What is n8n and how does it help businesses?',
          a: 'n8n is a powerful open-source workflow automation platform. I use it to connect APIs, AI models, and business tools into self-running pipelines — eliminating repetitive manual work, reducing human error, and enabling teams to focus on high-value tasks. Systems I build run stably and autonomously.'
        },
        {
          q: 'What tech stack is used for building applications?',
          a: 'The primary tech stack consists of Next.js, React, Node.js, PostgreSQL, and Supabase. For automation, I leverage n8n with API integrations and AI tools including GitHub Copilot and Claude. I also use Tailwind CSS for responsive styling and GSAP/Lenis for smooth UI interactions.'
        },
        {
          q: 'Can you build a complete MVP from scratch?',
          a: 'Yes, I specialize in taking ideas from concept to a fully functional Minimum Viable Product (MVP). I handle database design, user authentication, API integrations, responsive UI, and secure deployment to production platforms — plus optional n8n automation workflows to power the backend processes.'
        },
        {
          q: 'How is the security of web applications ensured?',
          a: 'Security is implemented at every layer. I configure strict Row-Level Security (RLS) policies in Supabase, implement secure cookie-based JWT authentication, sanitize user inputs to prevent vulnerabilities, and utilize environment variables for sensitive API keys.'
        },
        {
          q: 'What is the typical timeline for a project?',
          a: 'A standard MVP usually takes 2 to 6 weeks depending on complexity. With AI-assisted development for boilerplate and n8n for automation workflows, I can significantly compress timelines and deliver complete, functional systems much faster than traditional development processes.'
        }
      ]
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      contact: 'Kontak',
      blog: 'Blog',
    },
    hero: {
      role: 'FULLSTACK DEVELOPER & AI AUTOMATION',
      subtitle: 'Membangun aplikasi web kelas produksi dan mengotomatisasi alur kerja dengan AI & n8n. Memangkas pekerjaan manual berulang hingga 60% melalui integrasi API dan sistem otomasi cerdas.',
      viewProjects: 'Lihat Proyek',
      downloadResume: 'Unduh Resume',
    },
    about: {
      title: 'Tentang Saya',
      role: 'Full-Stack Developer | AI & n8n Workflow Automation',
      p1: 'Saya adalah Full-Stack Developer bersertifikat dengan pengalaman membangun aplikasi web (front-end dan back-end) serta mengotomatisasi proses kerja berbasis AI menggunakan n8n. Terbiasa mengintegrasikan API dan berbagai tools untuk memangkas pekerjaan manual berulang hingga 60% dan menghasilkan sistem yang berjalan stabil secara mandiri.',
      p2: 'Keahlian utama saya mencakup Next.js, Node.js, PostgreSQL, dan Supabase. Saya memadukan framework modern dengan koding berbantuan AI dan otomasi workflow n8n untuk membangun aplikasi yang kokoh, terukur, dan siap produksi. Terbuka untuk posisi full-time, proyek freelance, dan kolaborasi di bidang web development dan AI automation.',
      techStack: 'Tumpukan Teknologi',
      certifications: 'Sertifikasi',
      aiAssisted: 'Accelerate AI-Assisted Development with GitHub Copilot',
      problemSolving: 'Problem Solving (Intermediate)',
      googleAi: 'Google AI Professional Certificate',
      dtaKomdigi: 'Full Stack Developer - Digital Talent Academy',
      profileBadge: 'Fullstack Dev',
      officeTools: 'Penguasaan Microsoft Office',
      previewCert: 'Pratinjau',
    },
    projects: {
      title: 'Proyek Unggulan',
      subtitle: 'Beberapa hasil karya terbaru saya dalam pengembangan full-stack, otomasi AI dengan n8n, dan aplikasi web modern.',
      viewCode: 'Kode Sumber',
      viewLive: 'Demo Langsung',
    },
    contact: {
      title: 'Hubungi Saya',
      subtitle: 'Punya ide proyek atau ingin berkolaborasi? Jangan ragu untuk menghubungi. Saat ini saya terbuka untuk posisi full-time, proyek freelance, dan kolaborasi otomasi AI.',
      nameLabel: 'Nama',
      namePlaceholder: 'Budi Santoso',
      emailLabel: 'Email',
      emailPlaceholder: 'budi@contoh.com',
      messageLabel: 'Pesan',
      messagePlaceholder: 'Ceritakan tentang proyek Anda...',
      sendMessage: 'Kirim Pesan',
      sending: 'Mengirim...',
      successTitle: 'Pesan Terkirim!',
      successDesc: 'Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.',
      errorTitle: 'Terjadi Kesalahan!',
      errorDesc: 'Ada yang salah. Silakan coba lagi nanti.',
    },
    blog: {
      title: 'Artikel Terbaru',
      subtitle: 'Berbagi wawasan seputar otomasi AI dengan n8n, pengembangan full-stack modern, dan rekayasa workflow.',
      readMore: 'Baca Artikel',
      categories: {
        ai: 'AI & Otomasi',
        fullstack: 'Fullstack',
        creative: 'Creative Dev',
      },
      posts: [
        {
          title: 'Cara Saya Menggunakan AI Agent untuk Membangun Aplikasi 10x Lebih Cepat',
          excerpt: 'Pelajari bagaimana rekayasa prompt dan pemrograman kolaboratif AI mempercepat pembuatan Next.js & Supabase tanpa merusak kualitas kode.',
          date: '25 Jun 2026',
          time: '5 mnt baca',
        },
        {
          title: 'Otomasi Workflow dengan n8n: Pangkas Kerja Manual hingga 60%',
          excerpt: 'Panduan praktis membangun sistem otomasi mandiri dengan n8n, mengintegrasikan API dan AI untuk menghilangkan pekerjaan berulang secara permanen.',
          date: '18 Jun 2026',
          time: '8 mnt baca',
        },
        {
          title: 'Membuat Animasi Web Premium dengan GSAP dan Lenis',
          excerpt: 'Tips dan trik mensinkronisasi animasi smooth scroll dan transisi scroll-trigger untuk pengalaman pengguna premium.',
          date: '10 Jun 2026',
          time: '6 mnt baca',
        },
      ],
    },
    footer: {
      description: 'Full-Stack Developer & spesialis AI Automation. Membangun aplikasi web produksi dan workflow otomasi n8n yang memangkas kerja manual hingga 60%.',
      quickLinks: 'Tautan Cepat',
      connect: 'Terhubung',
      rights: 'Hak cipta dilindungi.',
    },
    faq: {
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Temukan jawaban untuk pertanyaan umum tentang proses pengembangan, layanan, dan teknologi saya.',
      questions: [
        {
          q: 'Layanan apa saja yang ditawarkan oleh Noval Abdillah?',
          a: 'Noval Abdillah menawarkan jasa pengembangan web full-stack, otomasi workflow dengan n8n, pembuatan MVP, dan integrasi API. Layanan mencakup pembuatan frontend dengan Next.js, backend Node.js/PostgreSQL, serta sistem otomasi berbasis AI yang memangkas pekerjaan manual berulang hingga 60% dan berjalan mandiri.'
        },
        {
          q: 'Apa itu n8n dan bagaimana manfaatnya untuk bisnis?',
          a: 'n8n adalah platform otomasi workflow open-source yang powerful. Saya menggunakannya untuk menghubungkan API, model AI, dan tools bisnis menjadi pipeline yang berjalan sendiri — mengeliminasi pekerjaan manual, mengurangi kesalahan manusia, dan membebaskan tim untuk fokus pada pekerjaan bernilai tinggi.'
        },
        {
          q: 'Tumpukan teknologi apa yang digunakan untuk membangun aplikasi?',
          a: 'Stack utama saya terdiri dari Next.js, React, Node.js, PostgreSQL, dan Supabase. Untuk otomasi, saya menggunakan n8n dengan integrasi API dan AI tools termasuk GitHub Copilot dan Claude. Saya juga menggunakan Tailwind CSS untuk styling responsif serta GSAP dan Lenis untuk animasi UI.'
        },
        {
          q: 'Apakah Anda bisa membangun MVP lengkap dari nol?',
          a: 'Ya, saya berpengalaman mengubah ide konsep menjadi produk MVP yang siap pakai. Saya menangani desain database, alur autentikasi, integrasi API, antarmuka responsif, hingga deployment ke produksi — plus workflow otomasi n8n opsional untuk mengotomatiskan proses backend.'
        },
        {
          q: 'Bagaimana Anda memastikan keamanan aplikasi yang dibangun?',
          a: 'Keamanan diterapkan di setiap lapisan. Saya mengonfigurasi aturan Row-Level Security (RLS) ketat di Supabase, menggunakan autentikasi JWT berbasis cookie aman, melakukan sanitasi input, serta menyembunyikan kredensial di variabel lingkungan.'
        },
        {
          q: 'Berapa lama waktu pengerjaan untuk sebuah proyek?',
          a: 'MVP standar biasanya memakan waktu 2 hingga 6 minggu tergantung kompleksitasnya. Dengan pengembangan berbantuan AI untuk boilerplate dan n8n untuk workflow otomasi, saya dapat memangkas durasi pengerjaan secara signifikan dan menghasilkan sistem fungsional jauh lebih cepat.'
        }
      ]
    }
  }
};
