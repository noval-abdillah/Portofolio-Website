import { createClient } from '@/lib/supabase/client';
import { Certificate, Skill } from '@/types';

// Fallback hardcoded data in case database is empty or offline
export const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Digital Talent Academy (KOMDIGI)',
    issuer: 'Digital Talent Academy (KOMDIGI)',
    image_url: '/cert-dta-komdigi.png',
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Google AI Essentials',
    issuer: 'Google (via Coursera)',
    image_url: '/cert-google-ai.png',
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'AI-Assisted Development',
    issuer: 'GitHub Copilot (Microsoft Applied Skills)',
    image_url: '/cert-github.png',
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    image_url: '/cert-hackerrank.png',
    display_order: 4,
    created_at: new Date().toISOString(),
  },
];

export const FALLBACK_TECH_SKILLS = [
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'n8n Automation',
  'Tailwind CSS',
  'Three.js',
  'GSAP',
  'AI Prompting',
  'REST API Integration',
];

export const FALLBACK_OFFICE_SKILLS = [
  'Microsoft Excel',
  'Microsoft Word',
  'Microsoft PowerPoint',
];

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_CERTIFICATES;
    }

    return data as Certificate[];
  } catch {
    return FALLBACK_CERTIFICATES;
  }
}

export async function getSkills(): Promise<{ tech: string[]; office: string[] }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return { tech: FALLBACK_TECH_SKILLS, office: FALLBACK_OFFICE_SKILLS };
    }

    const tech = (data as Skill[])
      .filter((s) => s.category === 'tech')
      .map((s) => s.name);
    const office = (data as Skill[])
      .filter((s) => s.category === 'office')
      .map((s) => s.name);

    return {
      tech: tech.length > 0 ? tech : FALLBACK_TECH_SKILLS,
      office: office.length > 0 ? office : FALLBACK_OFFICE_SKILLS,
    };
  } catch {
    return { tech: FALLBACK_TECH_SKILLS, office: FALLBACK_OFFICE_SKILLS };
  }
}

export async function getProfileImage(): Promise<string> {
  const fallback = '/images/Profil.jpeg';
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'profile_image_url')
      .maybeSingle();

    if (error || !data || !data.value) {
      return fallback;
    }
    return data.value;
  } catch {
    return fallback;
  }
}

export interface SiteStatItem {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
}

export async function getLiveSiteStats(): Promise<SiteStatItem[]> {
  const fallbackStats: SiteStatItem[] = [
    {
      value: 7,
      suffix: '+',
      label: 'PROYEK SELESAI',
      description: 'SaaS, Fullstack Web, & Automation',
    },
    {
      value: 99.9,
      suffix: '%',
      decimals: 1,
      label: 'SYSTEM RELIABILITY',
      description: 'Production uptime & optimal SLA',
    },
    {
      value: 4,
      suffix: 'VERIFIED',
      label: 'SERTIFIKASI RESMI',
      description: 'Google, Komdigi, Microsoft & HackerRank',
    },
    {
      value: 120,
      suffix: '+',
      label: 'AI WORKFLOWS',
      description: 'Copilot & n8n pipeline integration',
    },
  ];

  try {
    const supabase = createClient();
    const [projRes, certRes] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('certificates').select('issuer', { count: 'exact' }),
    ]);

    const projectCount = projRes.count ?? (projRes.data ? projRes.data.length : 7);
    const certCount = certRes.count ?? (certRes.data ? certRes.data.length : 4);

    let certIssuers = 'Google, Komdigi, Microsoft & HackerRank';
    if (certRes.data && certRes.data.length > 0) {
      const uniqueIssuers = Array.from(
        new Set(
          certRes.data
            .map((c) => c.issuer)
            .filter(Boolean)
            .map((iss) => {
              if (/google/i.test(iss)) return 'Google';
              if (/komdigi|dta/i.test(iss)) return 'Komdigi';
              if (/microsoft|copilot/i.test(iss)) return 'Microsoft';
              if (/hackerrank/i.test(iss)) return 'HackerRank';
              return iss;
            })
        )
      );
      if (uniqueIssuers.length > 0) {
        certIssuers = uniqueIssuers.join(', ');
      }
    }

    return [
      {
        value: projectCount,
        suffix: '+',
        label: 'PROYEK SELESAI',
        description: 'SaaS, Fullstack Web, & Automation',
      },
      {
        value: 99.9,
        suffix: '%',
        decimals: 1,
        label: 'SYSTEM RELIABILITY',
        description: 'Production uptime & optimal SLA',
      },
      {
        value: certCount,
        suffix: 'VERIFIED',
        label: 'SERTIFIKASI RESMI',
        description: certIssuers,
      },
      {
        value: 120,
        suffix: '+',
        label: 'AI WORKFLOWS',
        description: 'Copilot & n8n pipeline integration',
      },
    ];
  } catch {
    return fallbackStats;
  }
}
