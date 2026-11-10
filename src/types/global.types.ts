import Lenis from 'lenis';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  live_url?: string;
  github_url?: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image_url: string;
  credential_url?: string;
  display_order?: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'tech' | 'office';
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}